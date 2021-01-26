<template>
  <div class="signup">
    <div class="signup-form">
      <div class="logo-wrapper">
        <div class="logo"></div>
      </div>
      <div class="signup-card">
        <form class="signup-content">
          <div class="all-wrapper">
            <label for="account" class="all-text">帳號</label>
            <input id="account" class="all-input">
          </div>
          <div class="all-wrapper">
            <label for="name" class="all-text">名稱</label>
            <input id="name" class="all-input">
          </div>
          <div class="all-wrapper">
            <label for="email" class="all-text">Email</label>
            <input id="email" class="all-input">
          </div>
          <div class="all-wrapper">
            <label for="password" class="all-text">密碼</label>
            <input id="password" class="all-input">
          </div>
          <div class="all-wrapper">
            <label for="password-comfirm" class="all-text">密碼確認</label>
            <input id="password-comfirm" class="all-input">
          </div>
          <div class="submit-button-wrapper">
            <button class="submit-button" type="submit" @click.prevent="">
              <div class="button">註冊</div>
            </button>
          </div>
          <div class="text-wrapper">
            <span class="text">已經有帳號？</span>
            <span class="text register" @click="$router.push('/signup')">立即登入</span>
          </div>
        </form>
        <div class="social-media-signup">
          <div class="text">使用社群帳號快速註冊</div>
          <div class="social-button google" @click.prevent="">
            <img src="../assets/google-signin.svg">
            <div class="button">
              <span>使用 Google 帳號註冊</span>
            </div>
          </div>
          <div class="social-button google" @click.prevent="">
            <img src="../assets/facebook-signin.svg">
            <div class="button">
              <span>使用 Facebook 帳號註冊</span>
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
.signup {
  height: 100%;
  overflow: scroll;
  position: relative;
  width: 100%;
  .signup-form {
    margin-top: 60px;
    scroll-behavior: smooth;
    padding: 22px 24px;
    .logo-wrapper {
      padding-top: 66.7%;
      position: relative;
      margin-bottom: 24px;
      .logo {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: url(../assets/eatNow.svg) no-repeat center;
        background-size: cover;
      }
    }
    .signup-card {
      padding: 24px 24px 0 24px;
      margin-bottom: 24px;
      border: 1px solid $divider;
      border-radius: 8px;
      text-align: left;
      box-shadow: rgba(0, 0, 0, 0.12) 0px 6px 16px;
      .signup-content {
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
        }
        .submit-button-wrapper {
          width: 100%;
          background: #ffffff;
          .submit-button {
            width: 100%;
            border: none;
            appearance: none;
            margin-bottom: 20px;
            height: 48px;
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
        }
        .text-wrapper {
          width: 100%;
          .text {
            font-size: 14px;
            line-height: 1.5;
            font-weight: 600;
            color: #666;
          }
          .text.register {
            text-decoration: underline;
          }
        }
      }
      .social-media-signup {
        border-top: 1px solid $divider;
        margin-top: 24px;
        margin-left: -24px;
        width: 100%;
        padding: 24px;
        border-bottom-right-radius: 8px;
        border-bottom-left-radius: 8px;
        .text {
          font-size: 14px;
          line-height: 1.5;
          font-weight: 600;
          color: #666;
          margin-bottom: 24px;
        }
        .social-button {
          padding-left: 12px;
          width: calc(100% - 12px);
          margin-bottom: 20px;
          height: 46px;
          border: 1px solid $ultimategray;
          border-radius: 8px;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          cursor: pointer;
          .button {
            display: flex;
            align-items: center;
            height: 20px;
            span {
              color: #666;
              font-weight: 400;
              font-size: 14px;
              line-height: 14px;
            }
          }
          img {
            margin-right: 8px;
            width: 20px;
            height: 20px;
          }
        }
      }
    }
  }
}
</style>
