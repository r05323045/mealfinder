<template>
  <div class="checkout-page">
    <Navbar></Navbar>
    <div class="checkout-container">
      <div class="main-title">確認購買與選擇付款方式</div>
      <div class="page-container">
        <div class="order-card-wrapper">
          <div class="order-card">
            <div class="header">
              <div class="title">訂單摘要</div>
            </div>
            <div class="divider"></div>
            <div class="card-content">
            <div class="item-wrapper">
              <div class="text">商品總計</div>
              <div class="total-price">{{ totalPrice | priceFormat }}</div>
            </div>
            <div class="item-wrapper">
              <div class="text">數量總計</div>
              <div class="total-price">{{totalQuantity }}</div>
            </div>
            <div v-if="false" class="discount">使用優惠券</div>
            <div class="divider"></div>
            <div class="item-wrapper summary">
              <div class="text">結帳總金額</div>
              <div class="total-price">{{ totalPrice | priceFormat }}</div>
            </div>
            </div>
          </div>
        </div>
        <div class="contact-and-submit">
          <validation-observer ref="formvalidation" v-slot="{ handleSubmit, invalid }">
            <form @submit.prevent="handleSubmit(postTradeInfo)" >
              <div class="title">確認購買與選擇付款方式</div>
              <div class="contact-card" ref="contact-card">
                <div class="all-wrapper">
                  <validation-provider v-slot="{ errors, classes }" rules="required">
                    <label for="name" class="all-text">購買人姓名</label>
                    <input id="name" type="text" class="all-input" v-model="userName" :class="classes" :disabled="tradeInfo.TradeInfo">
                    <span v-if="errors[0]" class="invalid-text">{{ errors[0].replace('name ', '姓名') }}</span>
                  </validation-provider>
                </div>
                <div class="all-wrapper">
                  <validation-provider v-slot="{ errors, classes }" rules="required|email">
                    <label for="email" class="all-text">購買人電子郵件</label>
                    <input id="email" type="email" class="all-input" v-model="userEmail" :class="classes" :disabled="tradeInfo.TradeInfo">
                    <span v-if="errors[0]" class="invalid-text">{{ errors[0].replace('email ', '電子郵件') }}</span>
                  </validation-provider>
                </div>
                <div class="all-wrapper">
                  <validation-provider v-slot="{ errors, classes }" rules="required">
                    <label for="phone" class="all-text">購買人手機號碼</label>
                    <input id="phone" type="text" class="all-input" v-model="userPhone" :class="classes" :disabled="tradeInfo.TradeInfo">
                    <span v-if="errors[0]" class="invalid-text">{{ errors[0].replace('phone ', '手機號碼') }}</span>
                  </validation-provider>
                </div>
                <div class="all-wrapper">
                  <validation-provider v-slot="{ errors, classes }" rules="required">
                    <label for="address" class="all-text">購買人地址</label>
                    <input id="address" type="text" class="all-input" v-model="userAddress" :class="classes" :disabled="tradeInfo.TradeInfo">
                    <span v-if="errors[0]" class="invalid-text">{{ errors[0].replace('address ', '地址') }}</span>
                  </validation-provider>
                </div>
                <div class="all-wrapper">
                  <label for="purpose" class="all-text">付款方式</label>
                  <div class="button-wrapper">
                    <button class="button" v-for="(el, idx) in payby" :key="`payby-${idx}`" :class="{select: submitPayby === el}" :disabled="tradeInfo.TradeInfo">
                      <span class="text">{{ el }}</span>
                    </button>
                  </div>
                </div>
                <div class="all-wrapper">
                  <validation-provider v-slot="{ errors, classes }" rules="max:140">
                    <label for="note" class="all-text">其他備註</label>
                    <textarea id="note" class="all-input text-area" placeholder="有任何特殊需求嗎？可以先寫在這裡喔！" v-model="userNote" :class="classes" :disabled="tradeInfo.TradeInfo"></textarea>
                    <div class="note-count">({{ userNote.length }}/140)</div>
                    <span v-if="errors[0]" class="invalid-text note-error">{{ errors[0].replace('note ', '其他備註') }}</span>
                  </validation-provider>
                </div>
              </div>
              <div class="submit-button-wrapper" v-if="!tradeInfo.PayGateWay">
                <button class="submit-button" type="submit" :class="{ disabled: invalid }">
                  <div class="button">確認購買</div>
                </button>
                <div class="back-button" @click.prevent="$router.go(-1)">
                  <div class="button">回上一步</div>
                </div>
              </div>
            </form>
          </validation-observer>
          <form name='Spgateway' :action='tradeInfo.PayGateWay' method="POST">
            <input v-show="false" type="text" name="MerchantID" v-model="tradeInfo.MerchantID">
            <input v-show="false" type="text" name="TradeInfo" v-model="tradeInfo.TradeInfo">
            <input v-show="false" type="text" name="TradeSha" v-model="tradeInfo.TradeSha">
            <input v-show="false" type="text" name="Version" v-model="tradeInfo.Version">
            <button class="spgateway-button" v-show="tradeInfo.PayGateWay" id="spgateway-button" type="submit">
              <div class="button">前往付款頁面</div>
            </button>
            <div class="stop-pay-button" v-show="tradeInfo.PayGateWay" @click.prevent="$router.go(-1)">
              <div class="button">回上一步</div>
            </div>
          </form>
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
import cartsAPI from '@/apis/carts'
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
export default {
  data () {
    return {
      payby: ['信用卡', 'ATM轉帳(未開放)'],
      submitPayby: '信用卡',
      cart: [],
      totalPrice: 0,
      totalQuantity: 0,
      userName: '',
      userEmail: '',
      userPhone: '',
      userAddress: '',
      userNote: '',
      tradeInfo: {}
    }
  },
  components: {
    Navbar,
    Footer
  },
  created () {
    this.fetchCart()
    if (this.currentUser) {
      this.userName = this.currentUser.name
      this.userPhone = this.currentUser.phone_number
      this.userEmail = this.currentUser.email
    }
  },
  computed: {
    ...mapState(['currentUser', 'isAuthenticated'])
  },
  methods: {
    async fetchCart () {
      const loader = this.$loading.show({
        isFullPage: true,
        opacity: 1
      })
      try {
        const { data } = await cartsAPI.getCart()
        this.cart = data.data
        this.calculateTotalPrice()
        loader.hide()
      } catch (error) {
        loader.hide()
        console.log(error)
        Toast.fire({
          icon: 'error',
          title: '目前無法取得購物車資訊，請稍候'
        })
      }
    },
    calculateTotalPrice () {
      this.totalPrice = 0
      this.totalQuantity = 0
      this.cart.forEach(c => {
        c.subTotalPrice = c.quantity * Number(c.Coupon.price)
        this.totalPrice += Number(c.subTotalPrice)
        this.totalQuantity += Number(c.quantity)
      })
    },
    async postTradeInfo () {
      const loader = this.$loading.show({
        container: this.$refs['contact-card'],
        opacity: 1,
        isFullPage: false
      })
      try {
        const orderData = {
          totalPrice: this.totalPrice,
          address: this.userAddress,
          phone: this.userPhone,
          name: this.userName,
          email: this.userEmail
        }
        const { data } = await cartsAPI.postTradeInfo(orderData)
        console.log(data)
        if (data.status !== 'success') {
          loader.hide()
          throw new Error(data.message)
        }
        this.tradeInfo = data.tradeInfo
        loader.hide()
      } catch (error) {
        loader.hide()
        console.log(error)
        Toast.fire({
          icon: 'error',
          title: '目前無法成立訂單'
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
.checkout-page {
  height: 100vh;
  overflow: scroll;
  .checkout-container {
    padding: 36px 24px 60px 24px;
    text-align: left;
    position: relative;
    margin: auto;
    max-width: 1040px;
    @media (min-width: 768px) {
      padding: 36px 40px 60px;
    }
    @media (min-width: 992px) {
      padding: 36px 80px 60px;
    }
    .main-title {
      font-size: 24px;
      font-weight: 800;
      line-height: 1.5;
      margin-bottom: 24px;
      @media (min-width: 768px) {
        font-size: 26px;
      }
      @media (min-width: 992px) {
        display: none;
      }
    }
    .page-container {
      width: 100%;
      display: flex;
      flex-direction: column;
      @media (min-width: 992px) {
        flex-direction: row;
      }
      .order-card-wrapper {
        flex: 1;
        @media (min-width: 992px) {
          max-width: 300px;
          margin: 60px 36px 0 0;
        }
        .order-card {
          margin-bottom: 24px;
          border: 1px solid $divider;
          border-radius: 12px;
          box-shadow: rgba(0, 0, 0, 0.12) 0px 6px 16px;
          .header {
            border-top-left-radius: 12px;
            border-top-right-radius: 12px;
            padding: 15px;
            background: #000000;
            .title {
              font-size: 16px;
              color: #ffffff;
              font-weight: 600;
            }
          }
          .divider {
            height: 1px;
            background: $divider;
          }
          .card-content {
            padding: 16px 16px 32px 16px;
            .item-wrapper {
              margin-bottom: 24px;
              font-size: 16px;
              font-weight: 600;
              display: flex;
              flex-direction: row;
              justify-content: space-between;
            }
            .divider {
              height: 1px;
              background: $divider;
              margin: 24px -16px;
            }
            .item-wrapper.summary {
              font-size: 20px;
              margin-bottom: 0;
            }
          }
        }
      }
      .contact-and-submit {
        flex: 2;
        .title {
          display: none;
          @media (min-width: 992px) {
            font-weight: 800;
            margin-bottom: 24px;
            display: block;
            font-size: 32px;
            line-height: 36px;
            text-align: center;
          }
        }
        .contact-card {
          padding: 15px;
          margin-bottom: 24px;
          border: 1px solid $divider;
          border-radius: 8px;
          text-align: left;
          box-shadow: rgba(0, 0, 0, 0.12) 0px 6px 16px;
          @media (min-width: 992px) {
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
                cursor: not-allowed;
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
                cursor: pointer;
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
          .submit-button.disabled {
            background-color: $ultimategray;
            cursor: not-allowed;
            .button {
              cursor: not-allowed;
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
        .spgateway-button {
          cursor: pointer;
          border: none;
          appearance: none;
          margin-bottom: 20px;
          height: 48px;
          width: 100%;
          background: #000000;
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
        .stop-pay-button {
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
</style>
