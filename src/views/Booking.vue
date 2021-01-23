<template>
  <div class="booking">
    <div class="searchbar-wrapper">
      <div class="back-wrapper">
        <div class="icon back"></div>
      </div>
      <div class="searchbar">
        <input v-if="false" class="search-input">
        <div class="wrapper">
          <div class="text">
            ToTsuZen Steak 現切現煎以克計價濕式熟成牛排
          </div>
        </div>
      </div>
    </div>
    <form class="booking-form">
      <div class="title">確認訂位與填寫聯絡資訊</div>
      <div class="booking-card">
        <div class="header">
          <img class="icon restaurant" src="../assets/restaurant.svg">
          <div class="name">ToTsuZen Steak 現切現煎以克計價濕式熟成牛排</div>
        </div>
        <div class="divider"></div>
        <div class="info">
          <div class="item-wrapper">
            <img class="icon profile" src="../assets/profile.svg">
            <div class="number">2大</div>
          </div>
          <div class="item-wrapper">
            <img class="icon time" src="../assets/calendar.svg">
            <div class="date">2021/01/23 (週六)</div>
          </div>
          <div class="item-wrapper">
            <img class="icon time" src="../assets/clock.svg">
            <div class="time">11:30</div>
          </div>
        </div>
      </div>
      <div class="contact-card">
        <div class="all-wrapper">
          <label for="name" class="all-text">訂位人姓名</label>
          <input id="name" class="all-input">
          <div class="gender">
            <span class="item-wrapper">
              <label for="gender-female" class="item">
                <span class="radio-input">
                  <input name="gender" id="gender-female" role="radio" value="1" type="radio" checked>
                  <span class="radio-control"></span>
                </span>
                <span class="text">小姐</span>
              </label>
            </span>
            <span class="item-wrapper">
              <label for="gender-male" class="item">
                <span class="radio-input">
                  <input name="gender" id="gender-male" role="radio" value="1" type="radio">
                  <span class="radio-control"></span>
                </span>
                <span class="text">先生</span>
              </label>
            </span>
            <span class="item-wrapper">
              <label for="gender-other" class="item">
                <span class="radio-input">
                  <input name="gender" id="gender-other" role="radio" value="1" type="radio">
                  <span class="radio-control"></span>
                </span>
                <span class="text">其他</span>
              </label>
            </span>
          </div>
        </div>
        <div class="all-wrapper">
          <label for="phone" class="all-text">訂位人手機號碼</label>
          <input id="phone" class="all-input">
        </div>
        <div class="all-wrapper">
          <label for="email" class="all-text">訂位人 Email</label>
          <input id="email" class="all-input">
        </div>
        <div class="all-wrapper">
          <label for="purpose" class="all-text">用餐目的</label>
          <div class="button-wrapper">
            <button class="button" v-for="(el, idx) in purpose" :key="`purpose-${idx}`" @click.prevent="changePurpose(el)" :class="{select: submitPurpose.includes(el)}">
              <span class="text">{{ el }}</span>
            </button>
          </div>
        </div>
        <div class="all-wrapper">
          <label for="note" class="all-text">其他備註</label>
          <textarea id="note" class="all-input text-area" placeholder="有任何特殊需求嗎？可以先寫在這裡喔！（例如：行動不便、過敏）"></textarea>
          <div class="note-count">(0/140)</div>
        </div>
      </div>
      <div class="submit-button-wrapper">
        <button class="submit-button" type="submit" @click.prevent="">
          <div class="button">確認訂位</div>
        </button>
        <div class="back-button" @click.prevent="">
          <div class="button">回上一步</div>
        </div>
      </div>
    </form>
    <div ref="footer">
      <Footer></Footer>
    </div>
  </div>
</template>

<script>

import Footer from '@/components/Footer.vue'
export default {
  data () {
    return {
      purpose: ['慶生', '約會', '週年慶', '家庭聚餐', '朋友聚餐', '商務聚餐'],
      submitPurpose: []
    }
  },
  components: {
    Footer
  },
  mounted () {
  },
  methods: {
    onScroll (e) {

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
.booking {
  height: 100%;
  overflow: scroll;
  position: relative;
  width: 100%;
  .searchbar-wrapper {
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
    margin-top: 60px;
    scroll-behavior: smooth;
    padding: 22px 24px;
    .title {
      margin: 12px 0;
      height: 40px;
      font-size: 22px;
      font-weight: 700;
      text-align: left;
      line-height: 22px;
    }
    .booking-card {
      margin-bottom: 20px;
      border: 1px solid $divider;
      border-radius: 8px;
      .header {
        padding: 15px;
        display: flex;
        flex-direction: row;
        .icon.restaurant {
          margin: auto;
          min-height: 20px;
          min-width: 20px;
          margin-right: 20px;
        }
        .name {
          font-size: 18px;
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
        .item-wrapper {
          padding: 10px 0;
          display: flex;
          flex-direction: row;
          line-height: 22px;
          .icon {
            color: #222222;
            height: 20px;
            width: 20px;
            margin-right: 20px;
          }
        }
      }
    }
    .contact-card {
      padding: 15px;
      margin-bottom: 24px;
      border: 1px solid $divider;
      border-radius: 8px;
      text-align: left;
      .all-wrapper {
        margin-bottom: 24px;
        width: 100%;
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
                display: flex;
                align-items: center;
                justify-content: center;
              }
              input + .radio-control::before {
                content: "";
                display: block;
                background: $red;
                width: 0.6em;
                height: 0.6em;
                box-shadow: inset 0.6em 0.6em currentColor;
                border-radius: 50%;
                transition: 180ms transform ease-in-out;
                transform: scale(0);
              }
              .radio-control {
                width: 1rem;
                height: 1rem;
                border-radius: 50%;
                border: 0.1em solid $divider;
              }
              input:checked + .radio-control::before {
                background: $red;
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
          font-size: 12px;
          color: #666;
          font-weight: 400;
          text-align: right;
        }
        .button-wrapper {
          text-align: left;
          margin-top: 16px;
          .button {
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
    .submit-button-wrapper {
      border-top: 1px solid $divider;
      width: calc(100vw - 48px);
      background: #ffffff;
      .submit-button {
        border: none;
        appearance: none;
        margin-bottom: 20px;
        height: 48px;
        width: calc(100vw - 48px);
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
        border: 1px solid #222222;
        margin-bottom: 12px;
        height: 46px;
        width: calc(100vw - 48px);
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
