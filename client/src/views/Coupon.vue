<template>
  <div class="coupon" ref="coupon">
    <Navbar class="restaurant-navbar" v-show="scrollUp"></Navbar>
    <div class="coupon-searchbar-wrapper">
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
          <div class="icon share"
            v-clipboard:copy="copyPath"
            v-clipboard:success="onCopy"
            v-clipboard:error="onError">
          </div>
        </div>
      </div>
    </div>
    <div class="info-container" ref="info-container">
      <div class="mobile-picture-wrapper" v-if="coupon.Restaurant">
        <div class="picture" :style="`background: url(${coupon.Restaurant.picture}) no-repeat center / cover`"></div>
      </div>
      <div class="coupon-info" ref="coupon-info">
        <div class="picture-wrapper" v-if="coupon.Restaurant">
          <div class="picture" :style="`background: url(${coupon.Restaurant.picture}) no-repeat center / cover`"></div>
        </div>
        <div class="title-wrapper">
          <h1 class="title">
            {{ coupon.description }}
          </h1>
          <div class="info-wrapper">
            <div class="price-wrapper">
              <div class="icon-container">
                <div class="share-wrapper">
                  <div class="icon share"
                    v-clipboard:copy="copyPath"
                    v-clipboard:success="onCopy"
                    v-clipboard:error="onError">
                  </div>
                </div>
              </div>
              <div class="price">{{ coupon.price | priceFormat }}</div>
              <div class="unit">/ 個</div>
              <div class="origin-price" v-if="coupon.Restaurant">原價 {{ Number(coupon.price) + Math.round((5 - Number(coupon.Restaurant.rating)) * 100)  | priceFormat }}</div>
            </div>
            <div class="number-wrapper">
              <div class="text">數量</div>
              <div class="select-wrapper">
                <select class="select" v-model="productNum" v-if="productNum < 5">
                  <option value="0">請選擇購買數量</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5+</option>
                </select>
                <input class="select input" type="number" v-if="productNum > 4" v-model.lazy="productNum">
              </div>
            </div>
          </div>
        </div>
        <div class="rule-wrapper">
          <div class="divider"></div>
          <div class="title">使用說明</div>
          <ul class="description">
            <li>本餐券使用期限為1年，請在使用期限內用餐完成，超過使用期限後無法退款</li>
            <li>本餐券僅能兌換單一餐點，如需加購品項請依餐廳規定補差額</li>
            <li>本餐券僅供兌換餐點，用餐座位請依餐廳現場安排</li>
            <li>若餐廳已不提供兌換本餐券所贈送之餐點，請來信 support@mealfinder.com</li>
          </ul>
        </div>
        <div ref="information-wrapper" class="information-wrapper">
          <div class="divider"></div>
          <div class="title">餐廳資訊</div>
          <div class="info-and-map" v-if="coupon.Restaurant">
            <div class="map-wrapper">
              <iframe :src="`https://www.google.com/maps/embed/v1/place?key=${GOOGLE_MAP_API_KEY}&q=${coupon.Restaurant.google_map_url.split('&q=')[1]}`" class="google-map"></iframe>
            </div>
            <div class="information-body">
              <div class="item-wrapper">
                <div class="top-wrapper">
                  <img class="icon map" src="../assets/map.svg">
                  <div class="title">地址</div>
                </div>
                <div class="content" v-if="coupon.Restaurant">台北市{{ `${coupon.Restaurant.DistrictName}${coupon.Restaurant.address}` }}</div>
              </div>
              <div class="item-wrapper">
                <div class="top-wrapper">
                  <img class="icon phone" src="../assets/phone.svg">
                  <div class="title">電話</div>
                </div>
                <div class="content">{{ coupon.Restaurant.tel }}</div>
              </div>
              <div class="item-wrapper">
                <div class="top-wrapper">
                  <img class="icon time" src="../assets/clock.svg">
                  <div class="title">營業時間</div>
                </div>
                <div class="content business-hour" @click="showBusinessHour = !showBusinessHour">
                  {{ todayBusinessHours }}
                  <div class="show-more" :class="{ showing: showBusinessHour}"></div>
                </div>
                <div class="business-hour-wrapper" v-show="showBusinessHour">
                  <div class="content-wrapper">
                    <div class="content" v-for="(time, idx) in coupon.Restaurant.business_hours" :key="`business_hours-${idx}`">{{ time }}</div>
                  </div>
                </div>
              </div>
              <div class="item-wrapper last">
                <div class="top-wrapper">
                  <img class="icon map" src="../assets/restaurant.svg">
                  <div class="title">餐廳類型</div>
                </div>
                <div class="content">{{ coupon.Restaurant.CategoryName }}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="eat-now-wrapper">
          <div class="divider"></div>
          <div class="title">擔心沒位子用餐？</div>
          <div class="illustration-wrapper">
            <div class="cover">
              <div class="button" @click="$router.push(`/restaurants/${$route.params.id}`)">現在訂位</div>
            </div>
          </div>
        </div>
      </div>
      <div ref="footer">
        <Footer></Footer>
      </div>
    </div>
    <div class="filter-button-wrapper" v-show="couponInfoHeight >  scrollY + footerHeight">
      <div v-if="isAuthenticated" class="filter-button" @click="productNum > 0 ? postCart() : ''" :disabled="productNum < 1" :class="{ disabled: productNum < 1 }">
        <div class="button">{{ productNum > 0 ? '加入購物車' : '請選擇數量' }}</div>
      </div>
      <div v-if="!isAuthenticated" class="filter-button disabled" @click="$router.push('/signin')" disabled>
        <div class="button">請先登入再加入購物車</div>
      </div>
    </div>
  </div>
</template>

<script>

import moment from 'moment'
import { Toast } from '@/utils/helpers'
import { mapState } from 'vuex'
import couponsAPI from '@/apis/coupons'
import cartsAPI from '@/apis/carts'
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
export default {
  data () {
    return {
      showModal: false,
      scrollY: 0,
      scrollUp: true,
      couponInfoHeight: 1,
      footerHeight: 0,
      scrollBarHeight: 0,
      productNum: 0,
      coupon: {},
      todayBusinessHours: '',
      showBusinessHour: false
    }
  },
  components: {
    Footer,
    Navbar
  },
  created () {
    this.fetchCoupon(this.$route.params.id)
  },
  mounted () {
    this.$refs.coupon.addEventListener('scroll', this.onScroll, { passive: true })
    this.footerHeight = this.$refs.footer.offsetHeight
    this.couponInfoHeight = this.$refs.coupon.scrollHeight
    this.scrollBarHeight = this.$refs.coupon.clientHeight
  },
  watch: {
    productNum () {
      this.productNum = this.productNum < 0 ? 0 : this.productNum
    }
  },
  computed: {
    ...mapState(['currentUser', 'isAuthenticated']),
    copyPath () {
      return `${window.location}`
    },
    GOOGLE_MAP_API_KEY () {
      return process.env.VUE_APP_GOOGLE_MAP_API_KEY
    }
  },
  methods: {
    onScroll (e) {
      this.scrollUp = this.scrollY > this.$refs.coupon.scrollTop
      this.scrollY = this.$refs.coupon.scrollTop
    },
    async fetchCoupon (id) {
      try {
        const { data } = await couponsAPI.getCoupon(id)
        this.coupon = data
        this.coupon.Restaurant.business_hours = JSON.parse(this.coupon.Restaurant.business_hours)
        this.findTodayBusinessHours()
      } catch (error) {
        console.log(error)
        Toast.fire({
          icon: 'error',
          title: '目前無法取得餐券資訊，請稍候'
        })
      }
    },
    findTodayBusinessHours () {
      this.coupon.Restaurant.business_hours.forEach((b, idx) => {
        if (b.slice(0, 3) === moment(new Date()).format('dddd')) {
          this.todayBusinessHours = this.coupon.Restaurant.business_hours[idx]
        }
      })
    },
    async postCart () {
      try {
        const cartData = {
          CouponId: this.coupon.id,
          quantity: this.productNum
        }
        const { data } = await cartsAPI.postCart(cartData)
        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        Toast.fire({
          icon: 'success',
          title: '已新增至購物車'
        })
        this.$router.go(-1)
      } catch (error) {
        console.log(error)
        Toast.fire({
          icon: 'error',
          title: '目前無法新增至購物車'
        })
      }
    },
    onCopy: function (e) {
      Toast.fire({
        icon: 'success',
        title: '複製到剪貼簿'
      })
    },
    onError: function (e) {
      Toast.fire({
        icon: 'error',
        title: '目前無法複製，請稍候'
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
.coupon {
  overflow: scroll;
  position: relative;
  width: 100%;
  height: 100%;
  .restaurant-navbar {
    display: none;
    @media (min-width: 768px) {
      display: block;
    }
  }
  .coupon-searchbar-wrapper {
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
    @media (min-width: 768px) {
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
      .share-wrapper {
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
    width: 100%;
    height: 100%;
    scroll-behavior: smooth;
    position: absolute;
    top: 60px;
    @media (min-width: 768px) {
      top: 0px;
    }
    .mobile-picture-wrapper {
      width: 100%;
      padding-top: 66.7%;
      position: relative;
      @media (min-width: 768px) {
        display: none;
      }
      .picture {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: url(https://inline.imgix.net/branch/-LNTA3as3A6I5JWKglD6:inline-live-2a466--LNTA3bp4eBC0NuJ-TSc-48484d1f-999e-401f-94ae-b716e1d3abf5.jpg) no-repeat center;
        background-size: cover;
      }
    }
    .coupon-info {
      margin: auto;
      max-width: 1040px;
      padding: 0 24px;
      @media (min-width: 768px) {
        padding: 105px 40px 0;
      }
      @media (min-width: 992px) {
        padding: 105px 80px 0;
      }
      .picture-wrapper {
        display: none;
         @media (min-width: 768px) {
          display: block;
          width: 100%;
          padding-top: 50%;
          position: relative;
        }
        .picture {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url(https://inline.imgix.net/branch/-LNTA3as3A6I5JWKglD6:inline-live-2a466--LNTA3bp4eBC0NuJ-TSc-48484d1f-999e-401f-94ae-b716e1d3abf5.jpg) no-repeat center;
          background-size: cover;
          border-radius: 12px;
        }
      }
      .title-wrapper {
        padding: 32px 0px 24px 0px;
        .title {
          text-align: left;
          margin: 0;
        }
        .info-wrapper {
          margin-top: 24px;
          margin-bottom: 12px;
          .price-wrapper {
            display: flex;
            flex-direction: row;
            position: relative;
            .icon-container {
              display: none;
              @media (min-width: 768px) {
                position: absolute;
                bottom: 0px;
                right: 0;
                display: flex;
                flex-direction: row;
              }
              .share-wrapper {
                cursor: pointer;
                margin-right: 20px;
                width: 24px;
                height: 24px;
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
            .price{
              margin-bottom: 4px;
              text-align: left;
              font-weight: 800;
              font-size: 24px;
              line-height: 24px;
              margin-right: 8px;
            }
            .unit {
              text-align: left;
              font-weight: 400;
              font-size: 14px;
              line-height: 24px;
              margin-right: 18px;
            }
            .origin-price {
              text-decoration: line-through;
              color: #666;
              text-align: left;
              font-weight: 800;
              font-size: 18px;
              line-height: 24px;
            }
          }
          .number-wrapper {
            margin-top: 24px;
            text-align: left;
            .text {
              font-size: 16px;
              font-weight: 400;
            }
            .select-wrapper {
              margin-top: 12px;
              flex: 1;
              .select {
                cursor: pointer;
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
              .select.input {
                background: none;
                width: calc(100% - 2.2rem);
              }
            }
          }
        }
      }
      .rule-wrapper {
        padding: 0px 0px 24px 0px;
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
      .information-wrapper {
        padding: 0px 0px 24px 0px;
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
              position: relative;
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
                line-height: 1.5;
                margin-bottom: 12px;
                position: relative;
                .show-more {
                  cursor: pointer;
                  position: absolute;
                  right: 0;
                  top: 4px;
                  width: 16px;
                  height: 16px;
                  background-image: url("../assets/down-arrow.svg");
                  background-repeat: no-repeat;
                }
                .show-more.showing {
                  background-image: url("../assets/up-arrow.svg");
                  background-repeat: no-repeat;
                }
              }
              .content.business-hour {
                cursor: pointer;
              }
              .business-hour-wrapper {
                z-index: 3;
                box-shadow: rgba(0, 0, 0, 0.12) 0px 6px 16px;
                position: absolute;
                top: 100%;
                left: 0;
                width: 100%;
                background: #ffffff;
                border-radius: 15px;
                .content-wrapper {
                  margin: 12px 12px 0px;
                  display: flex;
                  flex-direction: column;
                  justify-content: flex-start;
                  align-items: center;
                  .content {
                    width: 100%;
                    flex: 1;
                    text-align: left;
                  }
                }
              }
            }
            .item-wrapper.last {
              border: none;
            }
          }
        }
      }
      .eat-now-wrapper {
        padding: 0px 0px 24px 0px;
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
        .illustration-wrapper {
          width: 100%;
          padding-top: 66.7%;
          position: relative;
          background: url(../assets/eatNow.svg) no-repeat center;
          background-size: cover;
          @media (min-width: 768px) {
            padding-top: 33.3%;
            background: url(../assets/people-eating-food.svg) no-repeat center;
            background-size: cover;
          }
          @media (min-width: 992px) {
            padding-top: 25%;
          }
          .cover {
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            .button {
              padding: 12px 36px;
              border-radius: 30px;
              background: #000000;
              color: #ffffff;
              cursor: pointer;
              font-weight: 700;
              font-size: 16px;
              line-height: 20px;
            }
          }
        }
      }
    }
  }
  .filter-button-wrapper {
    box-shadow: rgba(0, 0, 0, 0.12) 0px 6px 16px;
    border-top: 1px solid $divider;
    position: fixed;
    bottom: 0;
    width: calc(100vw - 48px);
    height: 48px;
    padding: 16px 24px;
    background: #ffffff;
    @media (min-width: 768px) {
      width: calc(100vw - 80px);
      padding: 12px 40px;
    }
    @media (min-width: 992px) {
      width: calc(100vw - 160px);
      padding: 16px 80px;
    }
    .filter-button {
      cursor: pointer;
      margin: auto;
      max-width: 1040px;
      height: 100%;
      width: calc(100vw - 48px);
      background: #000000;
      border-radius: 8px;
      display: flex;
      justify-content: center;
      align-items: center;
      @media (min-width: 768px) {
        width: calc(100vw - 80px);
      }
      @media (min-width: 992px) {
        width: calc(100vw - 160px);
      }
      .button {
        color: #ffffff;
        cursor: pointer;
        font-weight: 700;
        font-size: 16px;
        line-height: 20px;
      }
    }
    .filter-button.disabled {
      background-color: #666;
    }
  }
}
</style>
