<template>
  <div class="restaurant">
    <Navbar class="restaurant-navbar" v-show="scrollUp"></Navbar>
    <div class="restaurant-searchbar-wrapper">
      <div class="back-wrapper" @click="$router.go(-1)">
        <div class="icon back"></div>
      </div>
      <div class="searchbar">
        <input v-if="false" class="search-input">
        <div class="wrapper">
          <div class="text"></div>
        </div>
      </div>
      <div class="icon-container">
        <div class="share-wrapper">
          <div class="icon share"></div>
        </div>
        <div class="favorite-wrapper">
          <div class="icon favorite"></div>
        </div>
      </div>
    </div>
    <div class="info-container" ref="info-container">
      <div class="restaurant-info" ref="restaurant-info">
        <div class="picture-wrapper">
          <div class="picture"></div>
        </div>
        <div class="title-wrapper">
          <h1 class="title">
            ToTsuZen Steak 現切現煎以克計價濕式熟成牛排
          </h1>
          <div class="info-wrapper">
            <div class="rating-wrapper">
              <div class="icon star"></div>
              <div class="rating">4.58</div>
              <div class="rating-count">(84)</div>
            </div>
            <div class="dot">·</div>
            <div class="district">大安區</div>
          </div>
          <div class="address-wrapper">
            台北市敦化南路一段1巷1號
          </div>
          <div class="contact-wrapper">
            <div class="phone-wrapper">
              <img class="icon phone" src="../assets/phone.svg">
              <div class="phone">02-0000-0000</div>
            </div>
            <div class="map-wrapper">
              <img class="icon map" src="../assets/map.svg">
              <div class="map" @click="scrollToMap">查看地圖</div>
            </div>
          </div>
        </div>
        <div class="description-wrapper">
          <div class="divider"></div>
          <div class="title">餐廳簡介</div>
          <div class="description">
            ToTsuZen是日文漢字裡面"突然"的發音, 店名取名為ToTsuZen 的用意是以速食牛排的概念, 讓"突然"想吃高品質牛排的客人, 就可以很輕鬆自在的依照自己想吃的份量, 幾百塊的價格, 享受高端餐廳的牛排品質與美味.
          </div>
        </div>
        <div class="rule-wrapper">
          <div class="divider"></div>
          <div class="title">用餐守則</div>
          <ul class="description">
            <li>用餐時間從訂位時間起的90分鐘計算</li>
            <li>座位皆保留十分鐘，如無法按照預期的時間抵達，請致電告知更改時間</li>
            <li>若有須更改人數，請來電確認位子是否可以新增或調整</li>
            <li>用餐座位依餐廳現場安排，恕不指定座位</li>
            <li>網路訂位僅提供1~4位預訂，人數超過4位以上需來電訂位</li>
          </ul>
        </div>
        <div class="reservation-wrapper">
          <div class="divider"></div>
          <div class="number-wrapper">
            <div class="title">用餐人數</div>
            <div class="select-container">
              <div class="select-wrapper">
                <select class="select adult" v-model="adultNum">
                  <option value="0">請選擇用餐人數</option>
                  <option value="1">1位大人</option>
                  <option value="2">2位大人</option>
                  <option value="3">3位大人</option>
                  <option value="4">4位大人</option>
                </select>
              </div>
              <div class="select-wrapper children">
                <select class="select children" v-model="childrenNum">
                  <option value="0">0位小孩</option>
                  <option value="1">1位小孩</option>
                  <option value="2">2位小孩</option>
                  <option value="3">3位小孩</option>
                </select>
              </div>
            </div>
          </div>
          <div class="date-wrapper">
            <div class="title">用餐日期</div>
            <date-picker
              v-model="pickDate"
              type="date"
              :formatter="momentFormat"
              :placeholder="pickDate | pickDateFormate"
              :disabled-date="notBeforeToday"
              :editable="false"
              :clearable="false"
            ></date-picker>
          </div>
          <div class="time-wrapper">
            <div class="title">用餐時段</div>
            <div class="explain">*灰色表示該時間已客滿，可點選其他可訂位日期</div>
            <div class="book-container">
              <div class="divider-wrapper">
                <div class="text">中午</div>
                <div class="divider"></div>
              </div>
              <div class="button-wrapper">
                <button class="button" v-for="(el, idx) in noon[0]" :key="`noon-${idx}`" :class="{ active: bookingTime === el}" @click="bookingTime = el">
                  <span class="text">{{ el }}</span>
                </button>
              </div>
              <div class="button-wrapper">
                <button class="button" v-for="(el, idx) in noon[1]" :key="`noon-${idx}`" :class="{ active: bookingTime === el}" @click="bookingTime = el">
                  <span class="text">{{ el }}</span>
                </button>
              </div>
              <div class="divider-wrapper">
                <div class="text">下午</div>
                <div class="divider"></div>
              </div>
              <div class="button-wrapper">
                <button class="button" v-for="(el, idx) in afternoon[0]" :key="`afternoon-${idx}`" :class="{ active: bookingTime === el}" @click="bookingTime = el">
                  <span class="text">{{ el }}</span>
                </button>
              </div>
              <div class="button-wrapper">
                <button class="button" v-for="(el, idx) in afternoon[1]" :key="`afternoon-${idx}`" :class="{ active: bookingTime === el}" @click="bookingTime = el">
                  <span class="text">{{ el }}</span>
                </button>
              </div>
              <div class="divider-wrapper">
                <div class="text">晚上</div>
                <div class="divider"></div>
              </div>
              <div class="button-wrapper">
                <button class="button" v-for="(el, idx) in night[0]" :key="`night-${idx}`" :class="{ active: bookingTime === el}" @click="bookingTime = el">
                  <span class="text">{{ el }}</span>
                </button>
              </div>
              <div class="button-wrapper">
                <button class="button" v-for="(el, idx) in night[1]" :key="`night-${idx}`" :class="{ active: bookingTime === el}" @click="bookingTime = el">
                  <span class="text">{{ el }}</span>
                </button>
              </div>
              <div class="button-wrapper">
                <button class="button" v-for="(el, idx) in night[2]" :key="`night-${idx}`" :class="{ active: bookingTime === el}" @click="bookingTime = el">
                  <span class="text">{{ el }}</span>
                </button>
                <div style="flex: 1; margin: 0 4px 16px"></div>
                <div style="flex: 1; margin: 0 4px 16px"></div>
              </div>
            </div>
            <div class="note">如有訂位以外的需求，請在下一步訂位資訊填寫</div>
          </div>
        </div>
        <div ref="information-wrapper" class="information-wrapper">
          <div class="divider"></div>
          <div class="title">餐廳資訊</div>
          <div class="info-and-map">
            <div class="map-wrapper">
              <iframe :src="`https://www.google.com/maps/embed/v1/place?key=AIzaSyCUFAw8OHDSgUFUvBetDdPGUJI8xMGLAGk&q=%E5%8F%B0%E5%8C%97%E5%B8%82%E6%95%A6%E5%8C%96%E5%8D%97%E8%B7%AF%E4%B8%80%E6%AE%B5233%E5%B7%B759%E8%99%9F`" class="google-map"></iframe>
            </div>
            <div class="information-body">
              <div class="item-wrapper">
                <div class="top-wrapper">
                  <img class="icon map" src="../assets/map.svg">
                  <div class="title">地址</div>
                </div>
                <div class="content">台北市敦化南路一段的巷59號</div>
              </div>
              <div class="item-wrapper">
                <div class="top-wrapper">
                  <img class="icon phone" src="../assets/phone.svg">
                  <div class="title">電話</div>
                </div>
                <div class="content">02-0000-0000</div>
              </div>
              <div class="item-wrapper">
                <div class="top-wrapper">
                  <img class="icon time" src="../assets/clock.svg">
                  <div class="title">營業時間</div>
                </div>
                <div class="content">11:00 - 21:00</div>
              </div>
              <div class="item-wrapper last">
                <div class="top-wrapper">
                  <img class="icon map" src="../assets/restaurant.svg">
                  <div class="title">餐廳類型</div>
                </div>
                <div class="content">牛排</div>
              </div>
            </div>
          </div>
        </div>
        <div class="menu-wrapper">
          <div class="divider"></div>
          <div class="title">菜單</div>
          <div class="img-wrapper">
            <div class="menu-img">
            </div>
          </div>
        </div>
        <div class="comment-wrapper">
          <div class="divider"></div>
          <div class="text-wrapper">
            <div class="icon star"></div>
            <div class="text">4.47（49則評價）</div>
          </div>
          <div class="comment-container-deck" v-for="i in 5" :key="`comment-deck-${i}`">
            <div class="comment-container"  v-for="i in 2" :key="`comment-${i}`">
              <div class="comment-user">
                <div class="avatar"></div>
                <div class="name-wrapper">
                  <div class="name">Jim</div>
                  <div class="time">2018年4月</div>
                </div>
              </div>
              <div class="content">很好吃</div>
              <div class="like-wrapper">
                <div class="icon like"></div>
                <div class="count">3</div>
              </div>
            </div>
          </div>
          <div class="load-more">
            <div class="load-more-button">載入更多評論</div>
          </div>
        </div>
      </div>
      <div ref="footer">
        <Footer></Footer>
      </div>
    </div>
    <div class="booking-button-wrapper" v-show="restaurantInfoHeight >  scrollY + footerHeight + scrollBarHeight">
      <div class="booking-info-wrapper">
        <div class="booking-info">{{ pickDate | pickDateFormate }}</div>
        <div class="booking-info">
          <span>{{ adultNum }}大</span>
          <span v-if="childrenNum > 0">{{ childrenNum }}小</span>
        </div>
        <div v-if="bookingTime" class="booking-info">{{ bookingTime }}</div>
      </div>
      <div class="divider"></div>
      <div class="booking-button" :class="{ invalid: !bookingTime}" :disabled="!bookingTime">
        <div class="text" v-if="bookingTime">下一步，填寫聯絡資訊</div>
        <div class="text" v-if="!bookingTime">選擇用餐時間</div>
      </div>
    </div>
  </div>
</template>

<script>

import Navbar from '@/components/Navbar.vue'
import moment from 'moment'
import Footer from '@/components/Footer.vue'
import DatePicker from 'vue2-datepicker'
export default {
  data () {
    return {
      showModal: false,
      scrollY: 0,
      scrollUp: true,
      restaurantInfoHeight: 1,
      footerHeight: 0,
      today: `${moment().format('M/DD')} ${moment().format('ddd')} (今日)`,
      chooseDate: false,
      pickDate: Date.now(),
      momentFormat: {
        stringify: (date) => {
          if (moment(date).format('M/DD') === moment().format('M/DD')) {
            return `${moment().format('M/DD')} ${moment().format('ddd')} (今日)`
          } else {
            return `${moment(date).format('M/DD')} ${moment(date).format('ddd')}`
          }
        }
      },
      scrollBarHeight: 0,
      adultNum: 2,
      childrenNum: 0,
      bookingTime: '',
      noon: [['11:00', '11:30', '12:00'], ['12:30', '13:00', '13:30']],
      afternoon: [['14:00', '14:30', '15:00'], ['15:30', '16:00', '16:30']],
      night: [['17:00', '17:30', '18:00'], ['18:30', '19:00', '19:30'], ['20:00']]
    }
  },
  components: {
    DatePicker,
    Footer,
    Navbar
  },
  mounted () {
    this.$refs['info-container'].addEventListener('scroll', this.onScroll)
    this.footerHeight = this.$refs.footer.offsetHeight
    this.restaurantInfoHeight = this.$refs['info-container'].scrollHeight
    this.scrollBarHeight = this.$refs['info-container'].clientHeight
  },
  methods: {
    onScroll (e) {
      this.scrollUp = this.scrollY > this.$refs['info-container'].scrollTop
      this.scrollY = this.$refs['info-container'].scrollTop
    },
    closeFilter () {
      this.showModal = false
    },
    selectDate () {
      this.chooseDate = !this.chooseDate
    },
    notBeforeToday (date) {
      return date < new Date(new Date().setHours(0, 0, 0, 0))
    },
    scrollToMap () {
      this.$refs['information-wrapper'].scrollIntoView({
        behavior: 'auto',
        block: 'center',
        inline: 'center'
      })
    }
  }
}
</script>

<style lang="scss">
$yellow: #F5DF4D;
$ultimategray: #939597;
$divider: #E6ECF0;
$red: rgb(255, 56, 92);
$default-color: #000000;
$primary-color: #222;
@import '~vue2-datepicker/scss/index.scss';
.restaurant {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
  padding-bottom: 81px;
  .restaurant-navbar {
    display: none;
    @media (min-width: 992px) {
      display: block;
    }
  }
  .restaurant-searchbar-wrapper {
    box-shadow: rgba(0, 0, 0, 0.16) 0px -2px 8px;
    z-index: 998;
    background: none;
    position: fixed;
    height: 60px;
    width: 100%;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #ffffff;
    @media (min-width: 992px) {
      display: none;
    }
    .back-wrapper {
      padding-left: 8px;
      width: 40px;
      height: 48px;
      display: flex;
      justify-content: center;
      align-items: center;
      .icon.back {
        margin: auto;
        height: 16px;
        width: 16px;
        background-color: #000000;
        mask: url(../assets/back.svg) no-repeat center;
      }
    }
    .searchbar {
      background: #ffffff;
      width: 100%;
      border-radius: 100px;
      height: 48px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .search-input {
        border: none;
        &:focus {
          outline: none;
        }
      }
      .wrapper {
        border-right: 1px solid $divider;
        width: 100%;
        display: flex;
        flex-direction: row;
        line-height: 18px;
        .icon {
          margin: auto 0;
          padding-right: 8px;
          background-color: $ultimategray;
          height: 16px;
          width: 16px;
        }
        .icon.search {
          mask: url(../assets/search.svg) no-repeat center;
        }
        .text {
          font-size: 14px;
          font-weight: 600;
        }
      }
    }
    .icon-container {
      display: flex;
      flex-direction: row;
      padding: 6px 24px 0 8px;
      .favorite-wrapper {
        width: 16px;
        height: 16px;
        display: flex;
        justify-content: center;
        align-items: center;
        .icon.favorite {
          margin: auto;
          height: 16px;
          width: 16px;
          background-color: #000000;
          mask: url(../assets/favorite.svg) no-repeat center;
        }
      }
      .share-wrapper {
        margin-right: 20px;
        width: 16px;
        height: 16px;
        display: flex;
        justify-content: center;
        align-items: center;
        .icon.share {
          margin: auto;
          height: 16px;
          width: 16px;
          background-color: #000000;
          mask: url(../assets/share.svg) no-repeat center;
        }
      }
    }
  }
  .info-container {
    height: 100%;
    overflow: scroll;
    scroll-behavior: smooth;
    position: absolute;
    top: 0;
    .restaurant-info {
      @media (min-width: 992px) {
        padding: 105px 80px 0;
      }
      .picture-wrapper {
        width: 100%;
        padding-top: 66.7%;
        position: relative;
        @media (min-width: 992px) {
          padding-top: 50%;
        }
        .picture {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url(https://inline.imgix.net/branch/-LNTA3as3A6I5JWKglD6:inline-live-2a466--LNTA3bp4eBC0NuJ-TSc-48484d1f-999e-401f-94ae-b716e1d3abf5.jpg) no-repeat center;
          background-size: cover;
          @media (min-width: 992px) {
            border-radius: 12px;
          }
        }
      }
      .title-wrapper {
        padding: 32px 24px 24px 24px;
        .title {
          text-align: left;
          margin: 0;
        }
        .info-wrapper {
          padding-top: 12px;
          display: flex;
          flex-direction: row;
          margin-bottom: 12px;
          .rating-wrapper {
            display: flex;
            flex-direction: row;
            line-height: 18px;
            .icon {
              margin: auto 0;
              margin-right: 4px;
              background-color: $red;
              height: 14px;
              width: 14px;
              line-height: 18px;
            }
            .icon.star {
              mask: url(../assets/star.svg) no-repeat center;
            }
            .rating {
              font-size: 14px;
              font-weight: 600;
              margin-right: 4px;
              line-height: 18px;
            }
            .rating-count {
              font-size: 14px;
              font-weight: 400;
            }
          }
          .dot {
            color: #717171;
            font-weight: 400;
            margin: 0 8px;
            line-height: 18px;
          }
          .district {
            color: #717171;
            font-weight: 400;
            line-height: 18px;
          }
        }
        .address-wrapper {
          margin-bottom: 12px;
          text-align: left;
          font-weight: 400;
          line-height: 18px;
          font-size: 16px;
        }
        .contact-wrapper {
          display: flex;
          flex-direction: row;
          .phone-wrapper {
            display: flex;
            flex-direction: row;
            margin-right: 20px;
            .icon.phone {
              margin: auto 0;
              margin-right: 10px;
              height: 16px;
              width: 16px;
            }
            .phone {
              font-weight: 400;
              line-height: 1.5;
              font-size: 16px;
            }
          }
          .map-wrapper {
            display: flex;
            flex-direction: row;
            margin-right: 20px;
            .icon.map {
              margin: auto 0;
              margin-right: 10px;
              height: 16px;
              width: 16px;
            }
            .map {
              font-weight: 400;
              text-decoration: underline;
              line-height: 1.5;
              font-size: 16px;
            }
          }
        }
      }
      .description-wrapper {
        padding: 0px 24px 24px 24px;
        .divider {
          background: $divider;
          height: 1px;
        }
        .title {
          margin-top: 24px;
          margin-bottom: 24px;
          font-size: 22px;
          font-weight: 700;
          text-align: left;
          line-height: 22px;
        }
        .description {
          text-align: left;
          font-weight: 400;
          line-height: 1.5;
          font-size: 16px;
        }
      }
      .rule-wrapper {
        padding: 0px 24px 24px 24px;
        .divider {
          background: $divider;
          height: 1px;
        }
        .title {
          margin-top: 24px;
          margin-bottom: 24px;
          font-size: 22px;
          font-weight: 700;
          text-align: left;
          line-height: 22px;
        }
        .description {
          list-style-type: decimal;
          text-align: left;
          font-weight: 400;
          line-height: 1.5;
          font-size: 16px;
          padding-inline-start: 24px;
          li {
            word-wrap: break-word;
          }
        }
      }
      .reservation-wrapper {
        padding: 0px 24px 24px 24px;
        .divider {
          background: $divider;
          height: 1px;
        }
        .number-wrapper {
          margin-top: 24px;
          .title {
            margin-bottom: 24px;
            font-size: 18px;
            font-weight: 700;
            text-align: left;
            line-height: 18px;
          }
          .select-container {
            display: flex;
            .select-wrapper {
              padding: 0 4px;
              flex: 1;
              @media (min-width: 992px) {
                padding: 0 8px;
              }
              .select {
                width: 100%;
                padding: 0 1.4rem 0 0.8rem;
                appearance: none;
                border: 1px solid $ultimategray;
                line-height: 40px;
                border-radius: 8px;
                font-size: 16px;
                font-weight: 400;
                outline: none;
                background: transparent;
                background-image: url("../assets/down-arrow.svg");
                background-repeat: no-repeat;
                background-position: right 0.5em top 50%, 0px 0px;
                background-size: 12px;
              }
            }
          }
        }
        .date-wrapper {
          margin-top: 24px;
          .title {
            margin-bottom: 24px;
            font-size: 18px;
            font-weight: 700;
            text-align: left;
            line-height: 18px;
          }
          .mx-datepicker {
            width: 100%;
            .mx-input-wrapper {
              padding: 0 4px;
              flex: 1;
              @media (min-width: 992px) {
                padding: 0 8px;
              }
              .mx-input {
                height: 40px;
                padding: 0 1.4rem 0 0.8rem;
                appearance: none;
                text-align: left;
                appearance: none;
                border: 1px solid $ultimategray;
                line-height: 40px;
                border-radius: 8px;
                font-size: 16px;
                font-weight: 400;
                outline: none;
              }
              .mx-input::placeholder {
                color: #222222;
              }
              .mx-icon-calendar {
                right: 12px;
                @media (min-width: 992px) {
                  right: 16px;
                }
              }
            }
            svg {
              fill: #222222;
            }
          }
        }
        .time-wrapper {
          margin-top: 24px;
          .title {
            margin-bottom: 24px;
            font-size: 18px;
            font-weight: 700;
            text-align: left;
            line-height: 18px;
          }
          .explain {
            margin-bottom: 24px;
            font-size: 14px;
            font-weight: 400;
            text-align: left;
            line-height: 1.5;
          }
          .book-container {
            margin-bottom: 24px;
            .divider-wrapper {
              margin: 12px 0;
              display: flex;
              flex-direction: row;
              align-items: center;
              .text {
                color: $ultimategray;
                font-size: 14px;
                font-weight: 400;
                text-align: left;
                line-height: 1.5;
              }
              .divider {
                margin-left: 8px;
                height: 1px;
                background: $divider;
                flex-grow: 1
              }
            }
            .button-wrapper {
              text-align: left;
              display: flex;
              .button {
                margin: 0 4px 16px;
                height: 44px;
                padding: 8px 0;
                appearance: none;
                flex: 1;
                border-radius: 8px;
                border: 1px solid $ultimategray;
                background: none;
                .text {
                  font-weight: 400;
                  font-size: 16px;
                  line-height: 1.5;
                  width: 100%;
                  text-align: center;
                }
              }
              .button:focus {
                outline: none;
              }
              .button.active {
                background: #000000;
                .text {
                  color: #ffffff
                }
              }
            }
          }
          .note {
            width: 100%;
            text-align: center;
            margin-bottom: 24px;
            font-size: 14px;
            font-weight: 600;
            line-height: 1.5;
          }
        }
      }
      .information-wrapper {
        padding: 0px 24px 24px 24px;
        .divider {
          background: $divider;
          height: 1px;
        }
        .title {
          margin-top: 24px;
          margin-bottom: 24px;
          font-size: 22px;
          font-weight: 700;
          text-align: left;
          line-height: 22px;
        }
        .info-and-map {
          display: flex;
          flex-direction: column;
          @media (min-width: 992px) {
            flex-direction: row;
          }
          .map-wrapper {
            flex: 1.5;
            margin-bottom: 24px;
            width: 100%;
            @media (min-width: 992px) {
              margin-bottom: 0;
            }
            .google-map {
              height: 100%;
              width: 100%;
              border: none;
              min-height: 233px;
            }
          }
          .information-body {
            flex: 1;
            @media (min-width: 992px) {
              margin-left: 32px;
            }
            .item-wrapper {
              border-bottom: 1px solid $divider;
              .top-wrapper {
                display: flex;
                flex-direction: row;
                .title {
                  margin: 12px 0;
                  font-size: 16px;
                  font-weight: 600;
                  line-height: 1.5;
                }
                .icon {
                  fill: $ultimategray;
                  margin: auto 0;
                  margin-right: 10px;
                  height: 14px;
                  width: 14px;
                }
              }
              .content {
                text-align: left;
                margin-left: 24px;
                font-size: 16px;
                font-weight: 00;
                line-height: 1.5;
                margin-bottom: 12px;
              }
            }
            .item-wrapper.last {
              border: none;
            }
          }
        }
      }
      .menu-wrapper {
        padding: 0px 24px 24px 24px;
        .divider {
          background: $divider;
          height: 1px;
        }
        .title {
          margin-top: 24px;
          margin-bottom: 24px;
          font-size: 22px;
          font-weight: 700;
          text-align: left;
          line-height: 22px;
        }
        .img-wrapper {
          margin-bottom: 24px;
          padding-top: 66.7%;
          position: relative;
          @media (min-width: 992px) {
            padding-top: 33.3%;
          }
          .menu-img {
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            right: 50%;
            background: url(https://inline.imgix.net/menus/-LNTA3as3A6I5JWKglD6:inline-live-2a466--LNTA3bp4eBC0NuJ-TSc-abf54248-3e5f-4faa-8367-5a6f171277f9_201912-01.jpg) no-repeat center;
            background-size: cover;
            @media (min-width: 992px) {
              right: 75%;
            }
          }
        }
      }
      .comment-wrapper {
        padding: 0px 24px 24px 24px;
        .divider {
          background: $divider;
          height: 1px;
        }
        .text-wrapper {
          display: flex;
          flex-direction: row;
          .icon.star {
            margin: auto 0;
            margin-right: 8px;
            background-color: $red;
            height: 1rem;
            width: 1rem;
            line-height: 1rem;
            mask: url(../assets/star.svg) no-repeat center;
          }
          .text {
            margin-top: 24px;
            margin-bottom: 24px;
            font-size: 22px;
            font-weight: 700;
            text-align: left;
            line-height: 22px;
          }
        }
        .comment-container-deck {
          display: flex;
          flex-direction: column;
          @media (min-width: 992px) {
            flex-direction: row;
          }
          .comment-container {
            padding: 0px;
            flex: 1;
            margin-bottom: 40px;
            @media (min-width: 992px) {
              padding: 24px;
            }
            .comment-user {
              display: flex;
              flex-direction: row;
              margin-bottom: 12px;
              align-items: center;
              .avatar {
                height: 40px;
                width: 40px;
                border-radius: 50%;
                background: $ultimategray;
              }
              .name-wrapper {
                margin-left: 12px;
                text-align: left;
                .name {
                  font-size: 16px;
                  line-height: 20px;
                  font-weight: 600;
                }
                .time {
                  font-size: 14px;
                  line-height: 20px;
                  font-weight: 400;
                  color: $ultimategray;
                }
              }
            }
            .content {
              text-align: left;
              font-size: 16px;
              line-height: 24px;
              font-weight: 400;
              margin-bottom: 12px;
              min-height: 72px;
            }
            .like-wrapper {
              display: flex;
              flex-direction: row;
              line-height: 18px;
              .icon.like {
                margin: auto 0;
                margin-right: 8px;
                background-color: #222222;
                height: 14px;
                width: 14px;
                mask: url(../assets/like.svg) no-repeat center;
              }
              .count {
                font-size: 14px;
                font-weight: 400;
              }
            }
          }
        }
        .load-more {
          width: 100%;
          margin: 40px 0;
          .load-more-button {
            width: auto;
            margin: auto;
            padding: 14px 24px;
            border-radius: 8px;
            background: #000000;
            font-size: 16px;
            line-height: 20px;
            font-weight: 600;
            color: #ffffff;
            display: inline-block;
          }
        }
      }
    }
  }
  .booking-button-wrapper {
    box-shadow: rgba(0, 0, 0, 0.12) 0px 6px 16px;
    border-top: 1px solid $divider;
    position: fixed;
    bottom: 0;
    width: calc(100vw - 48px);
    padding: 8px 24px;
    background: #ffffff;
    @media (min-width: 992px) {
      width: calc(100vw - 160px);
      padding: 16px 80px;
    }
    .booking-info-wrapper {
      display: flex;
      flex-direction: row;
      .booking-info {
        margin-right: 8px;
        font-size: 14px;
        background: $divider;
        padding: 8px 12px;
        border-radius: 8px;
      }
    }
    .divider {
      background: $divider;
      height: 1px;
      width: 100%;
      margin: 8px 0;
    }
    .booking-button {
      height: 48px;
      width: calc(100vw - 48px);
      background: #000000;
      border-radius: 8px;
      display: flex;
      justify-content: center;
      align-items: center;
      @media (min-width: 992px) {
        width: calc(100vw - 160px);
      }
      .text {
        color: #ffffff;
        cursor: pointer;
        font-weight: 700;
        font-size: 16px;
        line-height: 20px;
      }
    }
    .booking-button.invalid {
      background: $ultimategray;
    }
  }
}
</style>
