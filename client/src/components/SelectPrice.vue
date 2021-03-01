<template>
  <div class="selector-container" v-show="showSelector">
    <div class="selector-wrapper">
      <div class="selector">
        <div class="price">
          <div class="title">平均價格為 {{ averagePrice | priceFormat }} / 人</div>
          <canvas class="chart-canvas" ref="myChart"></canvas>
          <div class="slider-bar-container" ref="slider">
              <vue-slider
              v-model="sliderValue"
              :interval="intervalNum"
              :process="false"
              :tooltip="'none'"
              :max="sliderMax"
              :min="sliderMin"
            >
            </vue-slider>
          </div>
          <div class="slider-input-container">
            <div class="input-wrapper">
              <div class="input-content">
                <div class="input-title">最低價格</div>
                <div class="input-text-wrapper">
                  <div class="money-symbol">$</div>
                  <input class="input-text" v-model="sliderValue[0]">
                </div>
              </div>
            </div>
            <div class="input-divider-wrapper">
              <div class="input-divider"></div>
            </div>
            <div class="input-wrapper">
              <div class="input-content">
                <div class="input-title">最高價格</div>
                <div class="input-text-wrapper">
                  <div class="money-symbol">$</div>
                  <input class="input-text" v-model="sliderValue[1]">
                  <div class="plus-symbol" v-if="sliderValue[1] === sliderMax">+</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="button-wrapper">
        <div class="clear-button inside-button" @click.stop="sliderValue = [sliderMin, sliderMax]">清除</div>
        <div class="filter-button inside-button" @click.stop="completeSelect">完成</div>
      </div>
    </div>
  </div>
</template>

<script>

import Chart from 'chart.js'
import VueSlider from 'vue-slider-component'
import '@/assets/vue-slider-component.css'
import { Toast } from '@/utils/helpers'
import restaurantsAPI from '@/apis/restaurants'
export default {
  data () {
    return {
      prices: [],
      averagePrice: 0,
      countArray: [],
      labelArray: [],
      sliderValue: [0, 100],
      sliderMin: 0,
      sliderMax: 10000,
      intervalNum: 50,
      intervalWidth: 0,
      barColor: [],
      myChart: {}
    }
  },
  components: {
    VueSlider
  },
  props: {
    showSelector: {
      type: Boolean
    }
  },
  created () {
    this.fetchPrices()
  },
  mounted () {
    this.createChart()
  },
  watch: {
    sliderValue () {
      this.barColor = []
      if (!this.sliderValue[0]) {
        this.sliderValue[0] = 0
      } else if (this.sliderValue[0] < this.sliderMin) {
        this.sliderValue[0] = this.sliderMin
      }
      if (!this.sliderValue[1]) {
        this.sliderValue[1] = this.sliderMax
      } else if (this.sliderValue[1] > this.sliderMax) {
        this.sliderValue[1] = this.sliderMax
      } else if (this.sliderValue[1] < this.sliderMin + this.intervalWidth) {
        this.sliderValue[1] = this.sliderMin + this.intervalWidth
      }
      this.sliderValue[0] = Number(this.sliderValue[0])
      this.sliderValue[1] = Number(this.sliderValue[1])
      for (let i = this.sliderMin; i < this.sliderMax; i += this.intervalWidth) {
        if (i >= this.sliderValue[0] && i + this.intervalWidth <= this.sliderValue[1]) {
          this.barColor.push('rgb(176, 176, 176)')
        } else {
          this.barColor.push('rgb(221, 221, 221)')
        }
      }
      this.myChart.data.datasets[0].backgroundColor = this.barColor
      this.myChart.update()
    }
  },
  methods: {
    createChart () {
      const ctx = this.$refs.myChart
      const data = {
        labels: this.labelArray,
        datasets: [{
          data: this.countArray,
          backgroundColor: this.barColor
        }]
      }
      const option = {
        tooltips: {
          enabled: false
        },
        legend: {
          display: false
        },
        scales: {
          yAxes: [{
            display: false
          }],
          xAxes: [{
            gridLines: {
              display: false
            },
            scaleLabel: {
              display: false
            }
          }]
        }
      }
      this.myChart = new Chart.Bar(ctx, {
        data: data,
        options: option
      })
    },
    pricesGrouping (Num) {
      const mean = this.prices.reduce((a, b) => a + b, 0) / this.prices.length
      this.averagePrice = Math.ceil(mean)
      const std = Math.sqrt(this.prices.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / this.prices.length)
      const min = mean - 2 * std < 0 ? 0 : mean - 2 * std
      this.sliderMin = min
      let max = mean + 2 * std
      this.intervalWidth = Math.ceil((max - min) / Num)
      max = min + this.intervalWidth * Num
      this.sliderMax = max
      this.sliderValue = [min, max]
      for (let i = min; i < max; i += this.intervalWidth) {
        let count = 0
        this.prices.forEach(p => {
          if (p >= i && p < i + this.intervalWidth) {
            count += 1
          }
        })
        this.countArray.push(count)
        this.labelArray.push('')
        this.barColor.push('rgb(221, 221, 221)')
      }
    },
    async fetchPrices () {
      try {
        const { data } = await restaurantsAPI.getPrices()
        this.prices = data.data
        this.pricesGrouping(this.intervalNum)
      } catch (error) {
        console.log(error)
        Toast.fire({
          icon: 'error',
          title: '目前無法取得價格，請稍候'
        })
      }
    },
    completeSelect () {
      let returnValue = []
      returnValue[0] = this.sliderValue[0]
      if (this.sliderValue[1] === this.sliderMax) {
        returnValue[1] = 9999
      } else {
        returnValue[1] = this.sliderValue[1]
      }
      if (returnValue[0] === this.sliderMin && returnValue[1] === 9999) {
        returnValue = []
      }
      this.$emit('selectPrice', returnValue)
    }
  }
}
</script>

<style lang="scss" scoped>
$ultimategray: #939597;
$divider: #E6ECF0;
$red: rgb(255, 56, 92);
.selector-container {
  z-index: 999;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 6px 16px;
  position: absolute;
  top: 72px;
  right: 0;
  width: 375px;
  height: 304px;
  background: #ffffff;
  border-radius: 32px;
  max-height: 304px;
  overflow: hidden;
  @media (min-width: 1200px) {
    height: 364px;
    max-height: 364px;
    width: 450px;
  }
  .selector-wrapper {
    position: relative;
    overflow: hidden;
    max-height: 268px;
    height: 268px;
    padding: 12px 0 24px 0;
    @media (min-width: 1200px) {
      padding: 16px 0 48px 0;
      max-height: 300px;
      height: 300px;
    }
    .selector {
      overflow: scroll;
      max-height: 268px;
      height: 268px;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      @media (min-width: 1200px) {
        max-height: 300px;
        height: 300px;
      }
      .price {
        height: 100%;
        width: 100%;
        .title {
          width: calc(100% - 64px);
          text-align: left;
          line-height: 18px;
          padding: 8px 32px;
          font-size: 14px;
          font-weight: 600;
          @media (min-width: 1200px) {
            font-size: 18px;
            line-height: 22px;
            padding: 8px 32px;
          }
        }
        .chart-canvas {
          margin: auto;
          height: 160px !important;
          width: 320px !important;
          @media (min-width: 1200px) {
            height: 180px !important;
          }
        }
        .slider-bar-container {
          margin: auto;
          max-width: 320px !important;
          position: relative;
          width: 100%;
          .vue-slider.vue-slider-ltr {
            height: 2px !important;
            padding: 12.5px 0 !important;
            width: 100%;
            position: absolute;
            top: -36px;
            right: 10px;
            left: 10px;
          }
        }
        .slider-input-container {
          display: flex;
          flex-direction: row;
          width: 320px;
          margin: auto;
          max-height: 48px;
          @media (min-width: 1200px) {
            height: 100%;
          }
          .input-wrapper {
            border-radius: 8px;
            border: 1px solid rgb(176, 176, 176);
            height: 100%;
            padding: 4px 8px;
            max-width: calc(100% - 16px);
            cursor: pointer;
            .input-content {
              text-align: left;
              .input-title {
                font-size: 12px;
                color: #666;
              }
              .input-text-wrapper {
                font-size: 14px;
                font-weight: 400;
                display: flex;
                flex-direction: row;
                position: relative;
                line-height: 18px;
                @media (min-width: 1200px) {
                  padding: 4px;
                  font-size: 18px;
                  line-height: 24px;
                }
                .money-symbol {
                  font-size: 14px;
                  font-weight: 400;
                  @media (min-width: 1200px) {
                    font-size: 20px;
                  }
                }
                .input-text {
                  padding: 0;
                  width: 100%;
                  outline: none;
                  border: none;
                  appearance: none;
                  font-size: 14px;
                  font-weight: 400;
                  @media (min-width: 1200px) {
                    font-size: 20px;
                  }
                }
                .plus-symbol {
                  position: absolute;
                  left: 50px;
                  @media (min-width: 1200px) {
                    left: 65px;
                  }
                }
              }
            }
          }
          .input-divider-wrapper {
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 8px;
            width: 7px;
            height: 56px;
            .input-divider {
              background: rgb(176, 176, 176);
              width: 7px;
              height: 1px;
            }
          }
        }
        .item-group {
          .item {
            padding: 12px 4px;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            .text-wrapper {
              font-size: 16px;
              font-weight: 400;
            }
            .input-container {
              height: 24px;
              width: 24px;
              .input-wrapper {
                width: 100%;
                height: 100%;
                cursor: pointer;
                input[type=checkbox] {
                  display: none;
                }
                input[type=checkbox]+span {
                  border-radius: 4px;
                  display: inline-block;
                  border: 1px solid #000000;
                  user-select: none;
                }
                span {
                  width: 100%;
                  height: 100%;
                }
                input[type=checkbox]:checked+span {
                  background-color:#000000;
                  position: relative;
                  .icon.check {
                    position: absolute;
                    top: 4px;
                    left: 4px;
                    width: 16px;
                    height: 16px;
                    mask: url(../assets/check.svg) no-repeat center;
                    background: #ffffff;
                  }
                }
              }
            }
          }
        }
      }
    }
    .button-wrapper {
      position: absolute;
      bottom: 6px;
      right: 64px;
      height: 36px;
      width: calc(100% - 64px);
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      justify-content: flex-end;
      @media (min-width: 1200px) {
        bottom: 0;
        height: 48px;
      }
      .inside-button {
        cursor: pointer;
        font-weight: 700;
        font-size: 12px;
        color: #ffffff;
        line-height: 18px;
        background: #222222;
        border-radius: 8px;
        padding: 6px 12px;
      }
      .clear-button {
        margin-right: 16px;
        color: #222222;
        background: #ffffff;
        text-decoration: underline;
      }
    }
  }
}
</style>
