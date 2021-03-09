<template>
  <div class="signup">
    <div class="signup-form">
      <div class="signup-container">
        <div class="logo-container">
          <div class="logo-wrapper">
            <div class="logo" @click="$router.push('/').catch(() => {})">
              <span class="company-first-name">Meal</span><span class="company-last-name">Finder</span>
            </div>
          </div>
        </div>
        <div class="signup-card">
          <validation-observer ref="formvalidation" v-slot="{ handleSubmit }">
            <form class="signup-content" @submit.prevent="handleSubmit(signup)">
              <validation-provider v-slot="{ errors, classes }" rules="required">
                <div class="all-wrapper">
                  <label for="name" class="all-text">名稱</label>
                  <input id="name" type="text" class="all-input" v-model="name" :class="classes">
                  <span v-if="errors[0]" class="invalid-text">{{ errors[0].replace('name ', '名稱') }}</span>
                </div>
              </validation-provider>
              <validation-provider v-slot="{ errors, classes }" rules="required|email">
                <div class="all-wrapper">
                  <label for="email" class="all-text">電子郵件</label>
                  <input id="email" type="email" class="all-input" v-model="email" :class="classes">
                  <span v-if="errors[0]" class="invalid-text">{{ errors[0].replace('email ', '電子郵件') }}</span>
                </div>
              </validation-provider>
              <validation-provider name="password" v-slot="{ errors, classes }" rules="required|password:@confirm">
                <div class="all-wrapper">
                  <label for="password" class="all-text">密碼</label>
                  <input id="password" type="password" class="all-input" v-model="password" :class="classes">
                  <span v-if="errors[0]" class="invalid-text">{{ errors[0].replace('password ', '密碼') }}</span>
                </div>
              </validation-provider>
              <validation-provider name="confirm" v-slot="{ errors, classes }" rules="required|password:@password">
                <div class="all-wrapper">
                  <label for="password-confirm" class="all-text">密碼確認</label>
                  <input id="password-confirm" type="password" class="all-input" v-model="passwordConfirm" :class="classes">
                  <span v-if="errors[0]" class="invalid-text">{{ errors[0].replace('confirm ', '密碼確認') }}</span>
                </div>
              </validation-provider>
              <div class="submit-button-wrapper">
                <button class="submit-button" type="submit">
                  <div class="button">註冊</div>
                </button>
              </div>
              <div class="text-wrapper">
                <span class="text">已經有帳號？</span>
                <span class="text register" @click="$router.push('/signin')">立即登入</span>
              </div>
            </form>
          </validation-observer>
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
    </div>
  </div>
</template>

<script>

import authorizationAPI from '@/apis/authorization'
import { Toast } from '@/utils/helpers'
export default {
  data () {
    return {
      name: '',
      email: '',
      password: '',
      passwordConfirm: ''
    }
  },
  methods: {
    async signup () {
      try {
        const { data } = await authorizationAPI.signUp({ name: this.name, email: this.email, password: this.password, passwordConfirm: this.passwordConfirm })
        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        Toast.fire({
          icon: 'success',
          title: '註冊成功'
        })

        this.$router.push('/signin')
      } catch (error) {
        console.log(error)
        Toast.fire({
          icon: 'error',
          title: error
        })
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
$darkred: #c13515;
.signup {
  height: 100vh;
  overflow: scroll;
  width: 100%;
  .signup-form {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .signup-container {
      overflow: auto;
      padding: 48px 24px;
      width: calc(100% - 48px);
      max-width: 500px;
      .logo-container {
        padding-top: 12.5%;
        position: relative;
        margin-bottom: 24px;
        .logo-wrapper {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          .logo {
            cursor: pointer;
            display: inline-block;
            font-size: 48px;
            line-height: 48px;
            color: $red;
            font-weight: 800;
            text-align: left;
            .company-last-name {
              color: #000000;
              margin-left: 8px;
            }
          }
        }
      }
      .signup-card {
        padding: 24px;
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
            .all-input.is-invalid {
              border: 1px solid $darkred;
            }
            .invalid-text {
              font-size: 12px;
              line-height: 1.5;
              color: $darkred;
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
}
</style>
