<template>
  <div class="modal" v-show="showModal" :class="{ show: showModal, innerShow: modalContentShow }">
    <div class="modal-background" @click="closeModal"></div>
    <div class="modal-content" v-show="showModal" :class="{ show: modalContentShow }">
      <div v-show="modalContentShow">
        <div class="top-wrapper">
          <div class="close-wrapper" @click="closeModal">
            <div class="icon close"></div>
          </div>
          <div class="title">篩選條件</div>
          <div class="clear-wrapper">
            <div class="text" @click="clearAll">清除</div>
          </div>
        </div>
        <div class="filter-container">
          <div class="district">
            <div class="title">用餐地區</div>
            <div class="item-group">
              <label class="item" v-for="(item, idx) in districts" :key="`district-${idx}`">
                <div class="text-wrapper">
                  <div class="text">{{ item.name }}</div>
                </div>
                <div class="input-container" :for="`checkbox-district-${idx}`">
                  <div class="input-wrapper">
                    <input
                      class="input"
                      type="checkbox"
                      :id="`checkbox-district-${idx}`"
                      @click="addToFilter(item.name, 'district')"
                      :checked="tempDistrictsFilter.includes(item.name)"
                    >
                    <span>
                      <span class="icon check"></span>
                    </span>
                  </div>
                </div>
              </label>
            </div>
          </div>
          <div class="category">
            <div class="title">餐廳類型</div>
            <div class="item-group">
              <label class="item" v-for="(item, idx) in categories" :key="`category-${idx}`">
                <div class="text-wrapper">
                  <div class="text">{{ item.name }}</div>
                </div>
                <div class="input-container" :for="`checkbox-category-${idx}`">
                  <div class="input-wrapper">
                    <input
                      class="input"
                      type="checkbox"
                      :id="`checkbox-category-${idx}`"
                      @click="addToFilter(item.name, 'category')"
                      :checked="tempCategoriesFilter.includes(item.name)"
                    >
                    <span>
                      <span class="icon check"></span>
                    </span>
                  </div>
                </div>
              </label>
            </div>
          </div>
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
        <div class="filter-button-wrapper">
          <div class="filter-button"  @click="completeEditing">
            <div class="button">顯示結果</div>
          </div>
        </div>
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
      modalContentShow: false,
      districts: [],
      categories: [],
      tempCategoriesFilter: [],
      tempDistrictsFilter: [],
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
  props: {
    showModal: {
      type: Boolean
    },
    categoriesFilter: {
      type: Array
    },
    districtsFilter: {
      type: Array
    },
    priceFilter: {
      type: Array
    }
  },
  components: {
    VueSlider
  },
  created () {
    return Promise.all([
      this.fetchCategories(),
      this.fetchDistricts(),
      this.fetchPrices()
    ])
      .then(() => {})
  },
  mounted () {
    this.createChart()
  },
  watch: {
    showModal () {
      setTimeout(() => {
        this.modalContentShow = this.showModal
      }, 100)
      if (this.categoriesFilter) {
        this.tempCategoriesFilter = this.categoriesFilter
      }
      if (this.districtsFilter) {
        this.tempDistrictsFilter = this.districtsFilter
      }
      if (this.priceFilter.length === 2) {
        this.sliderValue = this.priceFilter
      }
    },
    categoriesFilter () {
      this.tempCategoriesFilter = this.categoriesFilter
    },
    districtsFilter () {
      this.tempDistrictsFilter = this.districtsFilter
    },
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
    closeModal () {
      this.$emit('closeModal')
    },
    async fetchDistricts () {
      try {
        const { data } = await restaurantsAPI.getDistricts()
        this.districts = data.districts
      } catch (error) {
        console.log(error)
        Toast.fire({
          icon: 'error',
          title: '目前無法取得類別，請稍候'
        })
      }
    },
    async fetchCategories () {
      try {
        const { data } = await restaurantsAPI.getCategories()
        this.categories = data.categories
      } catch (error) {
        console.log(error)
        Toast.fire({
          icon: 'error',
          title: '目前無法取得類別，請稍候'
        })
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
    addToFilter (item, type) {
      switch (type) {
        case 'district':
          if (this.tempDistrictsFilter.includes(item)) {
            this.tempDistrictsFilter.splice(this.tempDistrictsFilter.indexOf(item), 1)
          } else {
            this.tempDistrictsFilter = [...this.tempDistrictsFilter, item]
          }
          break
        case 'category':
          if (this.tempCategoriesFilter.includes(item)) {
            this.tempCategoriesFilter.splice(this.tempCategoriesFilter.indexOf(item), 1)
          } else {
            this.tempCategoriesFilter = [...this.tempCategoriesFilter, item]
          }
          break
      }
    },
    completeEditing () {
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
      this.$emit('closeModal', true, this.tempCategoriesFilter, this.tempDistrictsFilter, returnValue)
    },
    clearAll () {
      this.tempCategoriesFilter = []
      this.tempDistrictsFilter = []
      this.sliderValue = [this.sliderMin, this.sliderMax]
    }
  }
}
</script>

<style lang="scss" scoped>
$ultimategray: #939597;
$divider: #E6ECF0;
.modal.show {
  overflow: hidden;
  z-index: 999;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  transition: 0.1s;
  transform: translateY(0);
}
.modal-background {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background: #666;
  opacity: 0.5;
}
.modal-content.show {
  height: 100%;
  transform: translateY(0);
  transition: 0.5s;
  .top-wrapper {
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    margin-top: 8px;
    padding: 12px 16px 10px;
    background: #ffffff;
    height: 32px;
    width: calc(100vw - 32px);
    position: relative;
    border-bottom: 1px solid $divider;
    .close-wrapper {
      position: absolute;
      left: 10;
      height: 32px;
      width: 32px;
      display: flex;
      justify-content: center;
      align-items: center;
      .icon.close {
        line-height: 32px;
        height: 16px;
        width: 16px;
        background-color: #222222;
        mask: url(../assets/close.svg) no-repeat center;
      }
    }
    .title {
      line-height: 32px;
      font-size: 16px;
      font-weight: 600;
    }
    .clear-wrapper {
      position: absolute;
      top: 12px;
      right: 26px;
      height: 32px;
      display: flex;
      justify-content: center;
      align-items: center;
      .text {
        font-size: 16px;
        font-weight: 600;
        line-height: 20px;
        text-decoration: underline;
      }
    }
  }
  .filter-container {
    overflow-y: scroll;
    background: #ffffff;
    height: calc(100vh - 168px);
    width: calc(100vw - 48px);
    padding: 12px 24px;
    .category,
    .district {
      padding: 8px 0 24px 0;
      .title {
        text-align: left;
        line-height: 22px;
        padding: 16px 0;
        font-size: 18px;
        font-weight: 600;
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
    .price {
      height: 100%;
      padding: 8px 0 24px 0;
      .title {
        text-align: left;
        line-height: 22px;
        padding: 16px 0;
        font-size: 18px;
        font-weight: 600;
      }
      .chart-canvas {
        margin: 24px auto 0;
        height: 180px !important;
        width: 320px !important;
        @media (min-width: 600px) {
          height: 270px !important;
          width: 480px !important;
        }
      }
      .slider-bar-container {
        margin: auto;
        max-width: 320px !important;
        @media (min-width: 600px) {
          max-width: 480px !important;
        }
        position: relative;
        width: 100%;
        .vue-slider.vue-slider-ltr {
          height: 2px !important;
          padding: 12.5px 0 !important;
          width: 100%;
          position: absolute;
          top: -48px;
          right: 10px;
          left: 10px;
          @media (min-width: 600px) {
            top: -44px;
          }
        }
      }
      .slider-input-container {
        display: flex;
        flex-direction: row;
        width: 320px;
        margin: auto;
        @media (min-width: 600px) {
          width: 480px;
        }
        .input-wrapper {
          border-radius: 8px;
          border: 1px solid rgb(176, 176, 176);
          height: 100%;
          padding: 10px 12px;
          max-width: calc(100% - 24px);
          cursor: pointer;
          .input-content {
            text-align: left;
            .input-title {
              font-size: 16px;
              color: #666;
            }
            .input-text-wrapper {
              font-size: 20px;
              font-weight: 400;
              display: flex;
              flex-direction: row;
              position: relative;
              .input-text {
                width: 100%;
                outline: none;
                border: none;
                appearance: none;
                font-size: 20px;
                font-weight: 400;
              }
              .plus-symbol {
                position: absolute;
                left: 65px;
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
  .filter-button-wrapper {
    border-top: 1px solid $divider;
    position: fixed;
    bottom: 0;
    width: calc(100vw - 48px);
    height: 48px;
    padding: 16px 24px;
    background: #ffffff;
    .filter-button {
      height: 100%;
      width: calc(100vw - 48px);
      background: #222222;
      border-radius: 8px;
      display: flex;
      justify-content: center;
      align-items: center;
      .button {
        cursor: pointer;
        font-weight: 700;
        font-size: 16px;
        color: #ffffff;
        line-height: 20px;
      }
    }
  }
}
.modal.innerShow {
  transition: 0.3;
  opacity: 100%;
}
.modal {
  transform: translateY(100%);
}
.modal-content {
  transform: translateY(100%);
}

</style>
