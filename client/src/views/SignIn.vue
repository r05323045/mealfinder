<template>
  <div class="signin">
    <div class="signin-form">
      <div class="signin-container">
        <div class="logo-wrapper">
          <div class="logo"></div>
        </div>
        <div class="signin-card">
          <form class="signin-content">
            <div class="all-wrapper">
              <label for="account" class="all-text">帳號</label>
              <input id="account" class="all-input">
            </div>
            <div class="all-wrapper">
              <label for="password" class="all-text">密碼</label>
              <input id="password" class="all-input">
            </div>
            <div class="submit-button-wrapper">
              <button class="submit-button" type="submit" @click.prevent="">
                <div class="button">登入</div>
              </button>
            </div>
            <div class="text-wrapper">
              <span class="text">還沒有帳號嗎？</span>
              <span class="text register" @click="$router.push('/signup')">立即註冊</span>
            </div>
          </form>
          <div class="social-media-signin">
            <div class="text">使用社群帳號快速登入</div>
            <div class="social-button google" @click.prevent="">
              <img src="../assets/google-signin.svg">
              <div class="button">
                <span>使用 Google 帳號登入</span>
              </div>
            </div>
            <div class="social-button google" @click.prevent="">
              <img src="../assets/facebook-signin.svg">
              <div class="button">
                <span>使用 Facebook 帳號登入</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      purpose: ['慶生', '約會', '週年慶', '家庭聚餐', '朋友聚餐', '商務聚餐'],
      submitPurpose: []
    }
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
.signin {
  height: 100%;
  overflow: hidden;
  position: relative;
  width: 100%;
  .signin-form {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    scroll-behavior: smooth;
    padding: 24px;
    .signin-container {
      flex: 1;
      max-width: 500px;
      .logo-wrapper {
        padding-top: 25%;
        position: relative;
        margin-bottom: 24px;
        .logo {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url(../assets/people-eating-food.svg) no-repeat center;
          background-size: cover;
        }
      }
      .signin-card {
        padding: 24px 24px 0 24px;
        margin-bottom: 24px;
        border: 1px solid $divider;
        border-radius: 8px;
        text-align: left;
        box-shadow: rgba(0, 0, 0, 0.12) 0px 6px 16px;
        .signin-content {
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
              cursor: pointer;
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
              cursor: pointer;
              text-decoration: underline;
            }
          }
        }
        .social-media-signin {
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
}
</style>