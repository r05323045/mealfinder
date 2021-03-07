<template>
  <div class="signin">
    <div class="signin-form">
      <div class="signin-container">
        <div class="signin-wrapper">
          <div class="logo-container">
            <div class="logo-wrapper">
              <div class="logo" @click="$router.push('/').catch(() => {})">
                <span class="company-first-name">Meal</span><span class="company-last-name">Finder</span>
              </div>
            </div>
          </div>
          <div class="signin-card">
            <validation-observer ref="formvalidation" v-slot="{ invalid }">
              <form class="signin-content">
                <div class="all-wrapper">
                  <validation-provider v-slot="{ errors, classes }" rules="required|email">
                    <label for="email" class="all-text">電子郵件</label>
                    <input id="email" type="email" class="all-input" v-model="email" :class="classes">
                    <span v-if="errors[0]" class="invalid-text">{{ errors[0].replace('email ', '電子郵件') }}</span>
                  </validation-provider>
                </div>
                <div class="all-wrapper">
                  <validation-provider v-slot="{ errors, classes }" rules="required">
                    <label for="password" class="all-text">密碼</label>
                    <input id="password" type="password" class="all-input" v-model="password" :class="classes">
                    <span v-if="errors[0]" class="invalid-text">{{ errors[0].replace('password ', '密碼') }}</span>
                  </validation-provider>
                </div>
                <div class="submit-button-wrapper">
                  <button class="submit-button" type="submit" @click.prevent="signin" :disabled="invalid">
                    <div class="button">登入</div>
                  </button>
                </div>
                <div class="text-wrapper">
                  <span class="text">還沒有帳號嗎？</span>
                  <span class="text register" @click="$router.push('/signup')">立即註冊</span>
                </div>
              </form>
            </validation-observer>
            <div class="social-media-signin">
              <div class="text">使用社群帳號快速登入</div>
              <div class="social-button google" @click="signInByGoogle">
                <img src="../assets/google-signin.svg">
                <div class="button">
                  <span>使用 Google 帳號登入</span>
                </div>
              </div>
              <div class="social-button google" @click="signInByFacebook">
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
  </div>
</template>

<script>

import authorizationAPI from '@/apis/authorization'
import { Toast } from '@/utils/helpers'
export default {
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    async signin () {
      try {
        const response = await authorizationAPI.signIn({
          email: this.email,
          password: this.password
        })

        const { data } = response

        if (data.status !== 'success') {
          this.password = ''
          throw new Error(data.message)
        }

        localStorage.setItem('token', data.token)
        this.$store.commit('setCurrentUser', data.user)
        this.$router.push('/')
        Toast.fire({
          icon: 'success',
          title: '登入成功'
        })
      } catch (error) {
        this.password = ''
        this.isProcessing = false
        Toast.fire({
          icon: 'warning',
          title: '請確認您輸入了正確的電子郵件與密碼'
        })
      }
    },
    async signInByFacebook () {
      try {
        window.location.href = 'http://localhost:3000/api/auth/facebook'
      } catch (error) {
        Toast.fire({
          icon: 'warning',
          title: '暫時無法使用 Facebook 帳號登入'
        })
      }
    },
    async signInByGoogle () {
      try {
        window.location.href = 'http://localhost:3000/api/auth/google'
      } catch (error) {
        Toast.fire({
          icon: 'warning',
          title: '暫時無法使用 Google 帳號登入'
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
.signin {
  height: 100%;
  position: relative;
  width: 100%;
  overflow: auto;
  .signin-form {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .signin-container {
      margin: auto;
      width: calc(100% - 48px);
      padding: 48px 24px;
      max-width: 500px;
      .signin-wrapper {
        .logo-container {
          margin-bottom: 24px;
          .logo-wrapper {
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
}
</style>
