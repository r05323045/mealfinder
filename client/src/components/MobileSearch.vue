<template>
  <div class="modal" v-show="showModal" :class="{ show: showModal, innerShow: modalContentShow }">
    <div class="modal-background" @click="closeModal"></div>
    <div class="modal-content" v-show="showModal" :class="{ show: modalContentShow }">
      <div v-show="modalContentShow">
        <div class="top-wrapper">
          <div class="search-icon-wrapper">
            <div class="icon search"></div>
          </div>
          <div class="title">搜尋餐廳</div>
          <div class="clear-wrapper">
            <div class="text" @click="clearAll">關閉</div>
          </div>
        </div>
        <div class="filter-container">
          <div class="result-wrapper" v-if="selectDistrict">
            <div class="result" v-if="selectDistrict">{{ selectDistrict === 'all' ? '附近地點' : selectDistrict }}</div>
            <div class="result" v-if="selectCategory">{{ selectCategory === 'all' ? '所有料理' : selectCategory }}</div>
            <div class="result" v-if="sliderValue.length === 2 && !(sliderValue[0] === sliderMin && sliderValue[1] === sliderMax)">{{ sliderValue[0] | priceFormat }} - {{ sliderValue[1] === sliderMax ? sliderMax : sliderValue[1] | priceFormat }}<span v-if="sliderValue[1] === sliderMax"> +</span></div>
          </div>
          <div class="divider" v-if="selectDistrict"></div>
          <div class="selector-wrapper" v-show="searchStep === 1">
            <div class="selector">
              <div class="item-wrapper" @click.stop="completeSelectDistrict('all')">
                <div class="item-icon near district"></div>
                <div class="item">附近地點</div>
              </div>
              <div class="item-wrapper" v-for="district in districts" :key="district.id" @click.stop="completeSelectDistrict(district.name)">
                <img class="item-icon" :src="require(`../assets/district/${district.picture}.svg`)">
                <div class="item">{{ district.name }}．台北市</div>
              </div>
            </div>
          </div>
          <div class="selector-wrapper" v-show="searchStep === 2">
            <div class="selector">
              <div class="item-wrapper" @click.stop="completeSelectCategory('all')">
                <div class="item-icon near category"></div>
                <div class="item">所有料理</div>
              </div>
              <div class="item-wrapper" v-for="category in categories" :key="category.id" @click.stop="completeSelectCategory(category.name)">
                <img class="item-icon" :src="require(`../assets/category/${category.picture}.svg`)">
                <div class="item">{{ category.name }}</div>
              </div>
            </div>
          </div>
          <div class="price" v-show="searchStep === 3">
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
          <div class="filter-button"  v-if="searchStep === 1" :class="{ disabled: !selectDistrict }">
            <div class="button" v-if="!selectDistrict">選擇用餐地區</div>
            <div class="button" v-if="selectDistrict" @click.stop="searchStep += 1">下一步．選擇用餐類別</div>
          </div>
          <div class="filter-button"  v-if="searchStep === 2" :class="{ disabled: !selectCategory }">
            <div class="button" v-if="!selectCategory">選擇用餐類別</div>
            <div class="button" v-if="selectCategory" @click.stop="searchStep += 1">下一步．選擇價格限制</div>
          </div>
          <div class="filter-button"  v-if="searchStep === 3" @click.stop="startSearching">
            <div class="button">開始搜尋</div>
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
      prices: [],
      averagePrice: 0,
      countArray: [],
      labelArray: [],
      sliderValue: [0, 100],
      sliderMin: 0,
      sliderMax: 10000,
      intervalNum: 50,
      intervalWidth: 0,
      selectCategory: '',
      selectDistrict: '',
      barColor: [],
      myChart: {},
      searchStep: 0
    }
  },
  props: {
    showModal: {
      type: Boolean
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
      .then(() => {
        this.searchStep = 1
      })
  },
  mounted () {
    this.createChart()
  },
  watch: {
    showModal () {
      setTimeout(() => {
        this.modalContentShow = this.showModal
      }, 100)
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
    completeSelectDistrict (district) {
      this.selectDistrict = district
    },
    completeSelectCategory (category) {
      this.selectCategory = category
    },
    clearAll () {
      this.searchStep = 1
      this.selectDistrict = ''
      this.selectCategory = ''
      this.sliderValue = [this.sliderMin, this.sliderMax]
      this.closeModal()
    },
    startSearching () {
      const queryStringArray = ['']
      if (this.selectCategory && this.selectCategory !== 'all') {
        queryStringArray.push(`category=${this.selectCategory}`)
      }
      if (this.selectDistrict && this.selectDistrict !== 'all') {
        queryStringArray.push(`district=${this.selectDistrict}`)
      }
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
      if (returnValue.length === 2) {
        queryStringArray.push(`low=${returnValue[0]}`)
        queryStringArray.push(`high=${returnValue[1]}`)
      }
      let queryString = '?page=1'
      if (queryStringArray.length > 1) {
        queryString += queryStringArray.join('&')
      }
      this.$router.push(`/map${queryString}`)
    }
  }
}
</script>

<style lang="scss" scoped>
$ultimategray: #939597;
$divider: #E6ECF0;
.modal {
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
  transform: translateY(100%);
  .modal-background {
    z-index: 998;
    overflow: hidden;
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    background: #666;
    opacity: 0.5;
  }
  .modal-content {
    z-index: 999;
    height: 100%;
    transform: translateY(100%);
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
      .search-icon-wrapper {
        position: absolute;
        left: 10;
        height: 32px;
        width: 32px;
        display: flex;
        justify-content: center;
        align-items: center;
        .icon.search {
          line-height: 32px;
          height: 16px;
          width: 16px;
          background-color: #222222;
          mask: url(../assets/search.svg) no-repeat center;
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
      .result-wrapper {
        padding: 12px 0;
        display: flex;
        flex-direction: row;
        .result {
          margin-right: 12px;
          background: rgb(247, 247, 247);
          padding: 8px 16px;
          border-radius: 30px;
          font-size: 12px;
          font-weight: 800;
          border: 1px solid #000000;
        }
      }
      .divider {
        width: 100%;
        height: 1px;
        background: $divider;
      }
      .selector-wrapper {
        padding-bottom: 90px;
        @media (min-width: 1200px) {
          max-height: 300px;
          height: 300px;
        }
        .selector {
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
          .item-wrapper {
            display: flex;
            flex-direction: row;
            align-items: center;
            cursor: pointer;
            width: 100%;
            padding: 12px 0;
            flex: 1;
            .item-icon {
              margin: auto 0;
              margin-right: 24px;
              height: 36px;
              width: 36px;
            }
            .item-icon.near.district {
              background: url(../assets/city-night.svg) no-repeat center / cover;
            }
            .item-icon.near.category {
              background: url(../assets/cutlery.svg) no-repeat center / cover;
            }
            .item {
              font-size: 16px;
              font-weight: 400;
              text-align: left;
              line-height: 22px;
            }
          }
          .divider-wrapper {
            width: 100%;
            .divider {
              position: absolute;
              left: 0;
              right: 0;
              height: 1px;
              background: $divider;
            }
          }
        }
      }
      .price {
        overflow: hidden;
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
      .filter-button.disabled {
        background: #919191;
      }
    }
  }
  .modal-content.show {
    transform: translateY(0);
    transition: 0.5s;
  }
}
.modal.innerShow {
  transition: 0.3;
  opacity: 1;
}
.modal.show {
  transition: 0.1s;
  transform: translateY(0);
}

</style>
