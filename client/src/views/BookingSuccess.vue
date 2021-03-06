<template>
  <div class="booking-success">
    <Navbar class="restaurant-navbar"></Navbar>
    <div class="booking-success-searchbar-wrapper">
      <div class="back-wrapper" @click="$router.push(`/restaurants/${restaurantId}`)">
        <div class="icon back"></div>
      </div>
      <div class="searchbar">
        <input v-if="false" class="search-input">
        <div class="wrapper">
          <div class="text">返回餐廳</div>
        </div>
      </div>
    </div>
    <div class="booking-result">
      <div class="result-container">
        <div class="booking-result-title">訂位成功！</div>
        <div class="booking-card-wrapper">
          <div class="booking-card">
            <div class="picture-wrapper">
              <div class="picture" :style="`background: url(${restaurant.picture}) no-repeat center; background-size: cover`"></div>
            </div>
            <div class="header">
              <img class="icon-restaurant" src="../assets/restaurant.svg">
              <div class="name">{{ restaurant.name }}</div>
            </div>
            <div class="divider"></div>
            <div class="info">
              <div class="item-wrapper">
                <img class="icon profile" src="../assets/profile.svg">
                <div class="number">{{ adultNum }}大<span v-if="childNum > 0">{{ childNum }}小</span></div>
              </div>
              <div class="item-wrapper">
                <img class="icon time" src="../assets/calendar.svg">
                <div class="date">{{ bookingDate | bookingDateFormat  }}</div>
              </div>
              <div class="item-wrapper">
                <img class="icon time" src="../assets/clock.svg">
                <div class="time">{{ bookingTime }}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="illustration-and-result">
          <div class="title">訂位成功！</div>
          <div class="illustration-wrapper">
            <div class="cover">
              <!--<div class="button">感謝你的使用！</div>-->
            </div>
          </div>
          <div class="result-button-wrapper">
            <button class="result-button" type="submit" @click.prevent="$router.push('/users/history')">
              <div class="button">查看訂位資訊</div>
            </button>
            <div class="home-button" @click.prevent="$router.push('/')">
              <div class="button">回首頁</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div ref="footer">
      <Footer></Footer>
    </div>
  </div>
</template>

<script>

import { Toast } from '@/utils/helpers'
import { mapState } from 'vuex'
import restaurantsAPI from '@/apis/restaurants'
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
export default {
  data () {
    return {
      restaurant: {},
      restaurantId: 0,
      bookingTime: '',
      bookingDate: new Date(),
      adultNum: 0,
      childNum: 0
    }
  },
  components: {
    Footer,
    Navbar
  },
  created () {
    this.restaurantId = this.$route.query.restaurant
    this.adultNum = Number(this.$route.query.adult)
    this.childNum = Number(this.$route.query.child)
    this.bookingDate = new Date(Number(this.$route.query.date))
    this.bookingTime = this.$route.query.time
    this.fetchRestaurant(this.restaurantId)
  },
  mounted () {
  },
  computed: {
    ...mapState(['currentUser', 'isAuthenticated'])
  },
  methods: {
    async fetchRestaurant (id) {
      try {
        const { data } = this.isAuthenticated ? await restaurantsAPI.getUsersRestaurant(id) : await restaurantsAPI.getRestaurant(id)
        this.restaurant = data
      } catch (error) {
        console.log(error)
        Toast.fire({
          icon: 'error',
          title: '目前無法取得餐廳，請稍候'
        })
      }
    },
    changePurpose (purpose) {
      if (this.submitPurpose.includes(purpose)) {
        this.submitPurpose.splice(this.submitPurpose.indexOf(purpose), 1)
      } else {
        this.submitPurpose = [...this.submitPurpose, purpose]
      }
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
.booking-success {
  height: 100%;
  overflow: scroll;
  position: relative;
  width: 100%;
  .restaurant-navbar {
    display: none;
    @media (min-width: 768px) {
      display: block;
    }
  }
  .booking-success-searchbar-wrapper {
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
        width: 100%;
        display: flex;
        flex-direction: row;
        line-height: 18px;
        .text {
          margin-right: 20%;
          font-size: 14px;
          font-weight: 600;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      }
    }
  }
  .booking-result {
    scroll-behavior: smooth;
    padding: 0px 24px 22px 24px;
    margin: 60px auto 0;
    max-width: 1040px;
    @media (min-width: 768px) {
      margin-top: 0px;
      padding: 0px 40px 35px 40px;
    }
    @media (min-width: 992px) {
      margin-top: 0px;
      padding: 48px 80px;
    }
    .result-container {
      display: flex;
      flex-direction: column;
      @media (min-width: 992px) {
        flex-direction: row;
      }
      .booking-result-title {
        margin: 24px 0;
        height: 40px;
        font-size: 22px;
        font-weight: 700;
        text-align: left;
        line-height: 22px;
        @media (min-width: 768px) {
          font-size: 26px;
          line-height: 30px;
        }
        @media (min-width: 992px) {
          display: none;
        }
      }
      .booking-card-wrapper {
        min-width: 300px;
        flex: 1;
        @media (min-width: 992px) {
          padding-top: 60px;
        }
        .booking-card {
          margin-bottom: 20px;
          border: 1px solid $divider;
          border-radius: 8px;
          box-shadow: rgba(0, 0, 0, 0.12) 0px 6px 16px;
          .picture-wrapper {
            width: 100%;
            padding-top: 50%;
            position: relative;
            .picture {
              border-top-left-radius: 8px;
              border-top-right-radius: 8px;
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              background: url(https://inline.imgix.net/branch/-LNTA3as3A6I5JWKglD6:inline-live-2a466--LNTA3bp4eBC0NuJ-TSc-48484d1f-999e-401f-94ae-b716e1d3abf5.jpg) no-repeat center;
              background-size: cover;
            }
          }
          .header {
            padding: 15px;
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            @media (min-width: 768px) {
              padding: 30px;
            }
            @media (min-width: 992px) {
              padding: 15px;
            }
            .icon-restaurant {
              height: 16px;
              width: 16px;
              margin-right: 16px;
            }
            .name {
              font-size: 16px;
              font-weight: 400;
              line-height: 1.5;
              text-align: left;
            }
          }
          .divider {
            height: 1px;
            background: $divider;
          }
          .info {
            padding: 5px 15px;
            @media (min-width: 768px) {
              padding: 10px 30px;
            }
            @media (min-width: 992px) {
              padding: 5px 15px;
            }
            .item-wrapper {
              font-size: 15px;
              font-weight: 400;
              padding: 8px 0;
              display: flex;
              flex-direction: row;
              align-items: center;
              line-height: 1.5;
              .icon {
                color: #222222;
                height: 16px;
                width: 16px;
                margin-right: 16px;
              }
            }
          }
        }
      }
      .illustration-and-result {
        flex: 3;
        @media (min-width: 992px) {
          padding: 0 36px;
        }
        .title {
          display: none;
          @media (min-width: 992px) {
            display: block;
            margin-bottom: 24px;
            font-size: 32px;
            font-weight: 700;
            text-align: center;
            line-height: 36px;
          }
        }
        .illustration-wrapper {
          margin: 36px 0;
          width: 100%;
          padding-top: 50%;
          position: relative;
          background: url(../assets/female-chatting.svg) no-repeat center;
          background-size: contain;
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
        .result-button-wrapper {
          border-top: 1px solid $divider;
          width: 100%;
          background: #ffffff;
          .result-button {
            cursor: pointer;
            border: none;
            appearance: none;
            margin-bottom: 20px;
            height: 48px;
            width: 100%;
            background: $red;
            border-radius: 8px;
            display: flex;
            justify-content: center;
            align-items: center;
            &:focus {
              outline: none;
            }
            .button {
              color: #ffffff;
              cursor: pointer;
              font-weight: 600;
              font-size: 16px;
              line-height: 20px;
            }
          }
          .home-button {
            cursor: pointer;
            border: 1px solid #222222;
            margin-bottom: 12px;
            height: 46px;
            width: 100%;
            background: #ffffff;
            border-radius: 8px;
            display: flex;
            justify-content: center;
            align-items: center;
            &:focus {
              outline: none;
            }
            .button {
              color: #222222;
              cursor: pointer;
              font-weight: 400;
              font-size: 16px;
              line-height: 20px;
            }
          }
        }
      }
    }
  }
}
</style>
