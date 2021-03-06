<template>
  <div class="booking" ref="booking">
    <Navbar class="restaurant-navbar"></Navbar>
    <div class="booking-searchbar-wrapper" v-show="scrollY < 60 || scrollUp">
      <div class="back-wrapper" @click="$router.go(-1)">
        <div class="icon back"></div>
      </div>
      <div class="searchbar">
        <input v-if="false" class="search-input">
        <div class="wrapper">
          <div class="text">
            {{ restaurant.name }}
          </div>
        </div>
      </div>
    </div>
    <form class="booking-form">
      <div class="card-container">
        <div class="card-container-title">確認訂位與填寫聯絡資訊</div>
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
        <div class="contact-card-wrapper">
          <validation-observer ref="formvalidation" v-slot="{ handleSubmit, invalid }">
            <form @submit.prevent="handleSubmit(submitReservation(invalid || !submitPurpose))">
              <div class="title">確認訂位與填寫聯絡資訊</div>
              <div class="contact-card">
                <div class="all-wrapper">
                  <validation-provider v-slot="{ errors, classes }" rules="required">
                    <label for="name" class="all-text">訂位人姓名</label>
                    <input id="name" type="text" class="all-input" v-model="userName" :class="classes">
                    <span v-if="errors[0]" class="invalid-text">{{ errors[0].replace('name ', '姓名') }}</span>
                  </validation-provider>
                  <div class="gender">
                    <span class="item-wrapper">
                      <label for="gender-female" class="item">
                        <span class="radio-input">
                          <input name="gender" id="gender-female" role="radio" value="female" type="radio" checked v-model="userGender">
                          <span class="radio-control"></span>
                        </span>
                        <span class="text">小姐</span>
                      </label>
                    </span>
                    <span class="item-wrapper">
                      <label for="gender-male" class="item">
                        <span class="radio-input">
                          <input name="gender" id="gender-male" role="radio" value="male" type="radio" v-model="userGender">
                          <span class="radio-control"></span>
                        </span>
                        <span class="text">先生</span>
                      </label>
                    </span>
                    <span class="item-wrapper">
                      <label for="gender-other" class="item">
                        <span class="radio-input">
                          <input name="gender" id="gender-other" role="radio" value="other" type="radio" v-model="userGender">
                          <span class="radio-control"></span>
                        </span>
                        <span class="text">其他</span>
                      </label>
                    </span>
                  </div>
                </div>
                <div class="all-wrapper">
                  <validation-provider v-slot="{ errors, classes }" rules="required">
                    <label for="phone" class="all-text">訂位人手機號碼</label>
                    <input id="phone" type="text" class="all-input" v-model="userPhone" :class="classes">
                    <span v-if="errors[0]" class="invalid-text">{{ errors[0].replace('phone ', '手機號碼') }}</span>
                  </validation-provider>
                </div>
                <div class="all-wrapper">
                  <validation-provider v-slot="{ errors, classes }" rules="required|email">
                    <label for="email" class="all-text">訂位人電子郵件</label>
                    <input id="email" type="email" class="all-input" v-model="userEmail" :class="classes">
                    <span v-if="errors[0]" class="invalid-text">{{ errors[0].replace('email ', '電子郵件') }}</span>
                  </validation-provider>
                </div>
                <div class="all-wrapper">
                  <label for="purpose" class="all-text">用餐目的</label>
                  <div class="button-wrapper">
                    <button class="button" v-for="(el, idx) in purpose" :key="`purpose-${idx}`" @click.prevent="changePurpose(el)" :class="{select: submitPurpose.includes(el)}">
                      <span class="text">{{ el }}</span>
                    </button>
                    <span v-if="!submitPurpose && firstClickSubmit" class="invalid-text">請選擇用餐目的</span>
                  </div>
                </div>
                <div class="all-wrapper">
                  <validation-provider v-slot="{ errors, classes }" rules="max:140">
                    <label for="note" class="all-text">其他備註</label>
                    <textarea id="note" class="all-input text-area" placeholder="有任何特殊需求嗎？可以先寫在這裡喔！（例如：行動不便、過敏）" v-model="userNote" :class="classes"></textarea>
                    <div class="note-count">({{ userNote.length }}/140)</div>
                    <span v-if="errors[0]" class="invalid-text note-error">{{ errors[0].replace('note ', '其他備註') }}</span>
                  </validation-provider>
                </div>
              </div>
              <div class="submit-button-wrapper">
                <button class="submit-button" type="submit">
                  <div class="button">確認訂位</div>
                </button>
                <div class="back-button" @click.prevent="$router.go(-1)">
                  <div class="button">回上一步</div>
                </div>
              </div>
            </form>
          </validation-observer>
        </div>
      </div>
    </form>
    <div ref="footer">
      <Footer></Footer>
    </div>
  </div>
</template>

<script>

import { Toast } from '@/utils/helpers'
import { mapState } from 'vuex'
import restaurantsAPI from '@/apis/restaurants'
import reservationsAPI from '@/apis/reservations'
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
export default {
  data () {
    return {
      purpose: ['慶生', '約會', '家庭聚餐', '朋友聚餐', '商務聚餐', '其他'],
      submitPurpose: '',
      scrollY: 0,
      scrollUp: true,
      restaurant: {},
      restaurantId: 0,
      bookingTime: '',
      bookingDate: new Date(),
      adultNum: 0,
      childNum: 0,
      userName: '',
      userGender: 'female',
      userPhone: '',
      userEmail: '',
      userNote: '',
      firstClickSubmit: false
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
    if (this.currentUser) {
      this.userName = this.currentUser.name
      this.userGender = this.currentUser.gender
      this.userPhone = this.currentUser.phone_number
      this.userEmail = this.currentUser.email
    }
  },
  mounted () {
    window.addEventListener('scroll', this.onScroll, { passive: true })
  },
  computed: {
    ...mapState(['currentUser', 'isAuthenticated'])
  },
  methods: {
    onScroll (e) {
      this.scrollUp = this.scrollY > window.scrollY
      this.scrollY = window.scrollY
    },
    changePurpose (purpose) {
      this.submitPurpose = purpose
    },
    async fetchRestaurant (id) {
      const loader = this.$loading.show({
        isFullPage: true,
        opacity: 1
      })
      try {
        const { data } = this.isAuthenticated ? await restaurantsAPI.getUsersRestaurant(id) : await restaurantsAPI.getRestaurant(id)
        this.restaurant = data
        loader.hide()
      } catch (error) {
        loader.hide()
        console.log(error)
        Toast.fire({
          icon: 'error',
          title: '目前無法取得餐廳，請稍候'
        })
      }
    },
    async addReservation () {
      try {
        const formData = {
          date: this.bookingDate,
          time: this.bookingTime,
          partySize_adult: this.adultNum,
          partySize_kids: this.childNum,
          UserId: this.currentUser.id,
          RestaurantId: this.restaurantId,
          name: this.userName,
          gender: this.userGender,
          phone: this.userPhone,
          email: this.userEmail,
          purpose: this.submitPurpose,
          note: this.userNote
        }
        const { data } = await reservationsAPI.addReservation(formData)
        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        Toast.fire({
          icon: 'success',
          title: '訂位成功'
        })
        this.$router.push(`/booking/success?restaurant=${this.restaurantId}&adult=${this.adultNum}&child=${this.childNum}&date=${new Date(this.bookingDate).getTime()}&time=${this.bookingTime}`).catch(() => {})
      } catch (error) {
        console.log(error)
        Toast.fire({
          icon: 'error',
          title: '目前無法訂位'
        })
      }
    },
    submitReservation (invalid) {
      if (!this.firstClickSubmit) {
        this.firstClickSubmit = true
      }
      if (!invalid) {
        this.addReservation()
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
$darkred: #c13515;
@import '~vue2-datepicker/scss/index.scss';
.booking {
  overflow: scroll;
  width: 100%;
  .booking-searchbar-wrapper {
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
  .booking-form {
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
    .card-container {
      display: flex;
      flex-direction: column;
      @media (min-width: 992px) {
        flex-direction: row;
      }
      .card-container-title {
        margin: 24px 0;
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
      .contact-card-wrapper {
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
        .contact-card {
          padding: 15px;
          margin-bottom: 24px;
          border: 1px solid $divider;
          border-radius: 8px;
          text-align: left;
          box-shadow: rgba(0, 0, 0, 0.12) 0px 6px 16px;
          @media (min-width: 768px) {
            padding: 30px;
          }
          .all-wrapper {
            margin-bottom: 24px;
            width: 100%;
            position: relative;
            .all-text {
              width: 100%;
              font-size: 16px;
              font-weight: 400;
              line-height: 1.5;
            }
            .all-input {
              margin-top: 8px;
              outline: none;
              font-size: 16px;
              line-height: 1.5;
              font-weight: 400;
              padding: 8px 12px;
              border: 1px solid $divider;
              border-radius: 8px;
              width: calc(100% - 24px);
            }
            .all-input.is-invalid {
              border: 1px solid $darkred;
            }
            .invalid-text {
              font-size: 12px;
              line-height: 1.5;
              color: $darkred;
            }
            .invalid-text.note-error {
              position: absolute;
              top: 100%;
              left: 0;
            }
            .gender {
              display: flex;
              flex-direction: row;
              margin-top: 12px;
              .item-wrapper {
                .item {
                  display: flex;
                  flex-direction: row;
                }
                margin-right: 12px;
                *:before,
                *:after {
                  box-sizing: border-box;
                }
                line-height: 1.5;
                transition: 180ms all ease-in-out;
                opacity: 0.8;
                .radio-input {
                  width: 1.5rem;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  input {
                    margin: 0;
                    opacity: 0;
                    width: 0;
                    height: 0;
                    &:focus + .radio-control {
                      box-shadow: 0 0 0 0.05rem #fff, 0 0 0.15em 0.1em currentColor;
                    }
                  }
                  input:focus {
                    outline: none;
                  }
                  .radio-control {
                    overflow: hidden;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                  }
                  input + .radio-control::before {
                    content: "";
                    display: block;
                    width: 0.62rem;
                    height: 0.6rem;
                    background: #222222;
                    box-shadow: inset 0.8em 0.8em currentColor;
                    border-radius: 50%;
                    transition: 180ms transform ease-in-out;
                    transform: scale(0);
                  }
                  .radio-control {
                    width: 1.05rem;
                    height: 1rem;
                    border-radius: 50%;
                    border: 0.1em solid $divider;
                  }
                  input:checked + .radio-control::before {
                    transform: scale(1);
                  }
                }
                .text {
                  color: #222222;
                  line-height: 1.5;
                  transition: 180ms all ease-in-out;
                  opacity: 0.8;
                  padding: 0 12px;
                  font-size: 16px;
                  font-weight: 400;
                }
              }
            }
            .text-area {
              font-size: 14px;
              min-height: 100px;
              &::placeholder {
                font-size: 14px;
              }
            }
            .note-count {
              position: absolute;
              right: 0;
              top: 100%;
              font-size: 12px;
              line-height: 1.5;
              color: #666;
              font-weight: 400;
              text-align: right;
            }
            .button-wrapper {
              text-align: left;
              margin-top: 16px;
              .button {
                cursor: pointer;
                margin: 0 4px 16px;
                height: 44px;
                padding: 8px 12px;
                appearance: none;
                width: calc(50% - 10px);
                border-radius: 8px;
                border: 1px solid $divider;
                background: none;
                text-align: left;
                .text {
                  color: #666;
                  font-weight: 400;
                  font-size: 14px;
                  line-height: 1.5;
                  width: 100%;
                  text-align: center;
                }
              }
              .button.select {
                border: none;
                background: #000000;
                .text {
                  font-weight: 600;
                  color: #ffffff;
                }
              }
              .button:focus {
                outline: none;
              }
            }
          }
        }
      }
    }
    .submit-button-wrapper {
      border-top: 1px solid $divider;
      width: 100%;
      background: #ffffff;
      .submit-button {
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
      .back-button {
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
</style>
