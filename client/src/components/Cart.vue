<template>
  <div class="cart-page">
    <div class="page-container" ref="page-container">
      <div class="more-container" v-if="cart.length < 1">
        <div class="more-title">還沒想好要買什麼？</div>
        <div class="illustration-wrapper">
          <div class="cover">
            <div class="button" @click="$router.push('/coupons')">現在就去找餐券</div>
          </div>
        </div>
      </div>
      <div class="purchase-card-wrapper" v-if="cart.length > 0">
        <div class="purchase-card">
          <div class="card-content">
            <div class="item-wrapper" v-for="cartItem in cart" :key="cartItem.id">
              <div class="icon close" @click="deleteCart(cartItem.id)"></div>
              <div class="container">
                <div class="image-container">
                  <div class="image-wrapper">
                    <div class="image" :style="`background: url(${cartItem.Coupon.picture}) no-repeat center / cover`"></div>
                  </div>
                </div>
                <div class="name" v-if="cartItem.Coupon">{{ cartItem.Coupon.description }}</div>
                <div class="price-wrapper">
                  <div class="adjust-wrapper">
                    <div class="icon-wrapper" :class="{ equalOne: cartItem.quantity === 1}">
                      <div class="icon minus" v-if="cartItem.quantity > 1" @click="reduceCartItem(cartItem.id)"></div>
                    </div>
                    <div class="number">{{ cartItem.quantity }}</div>
                    <div class="icon-wrapper">
                      <div class="icon plus" @click="addCartItem(cartItem.id)"></div>
                    </div>
                  </div>
                  <div class="price">{{ cartItem.subTotalPrice | priceFormat }}</div>
                </div>
              </div>
              <div class="divider"></div>
            </div>
          </div>
          <div class="total-price-wrapper">
            <div class="text">總計</div>
            <div class="total-price">{{ totalPrice | priceFormat }}</div>
          </div>
        </div>
      </div>
      <div class="order-card-wrapper" v-if="cart.length > 0">
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
          <div class="go-check">
            <div class="button-wrapper" @click="$router.push('/users/checkout')">
              <div class="button">前往結帳</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { Toast } from '@/utils/helpers'
import cartsAPI from '@/apis/carts'
export default {
  data () {
    return {
      cart: [],
      totalPrice: 0,
      totalQuantity: 0
    }
  },
  created () {
    this.fetchCart()
  },
  methods: {
    async fetchCart () {
      const loader = this.$loading.show({
        container: this.$refs['page-container'],
        opacity: 1,
        isFullPage: false
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
    async deleteCart (id) {
      try {
        const { data } = await cartsAPI.deleteCart(id)
        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        this.cart = this.cart.filter(c => c.id !== id)
        this.calculateTotalPrice()
        Toast.fire({
          icon: 'success',
          title: '已移除商品'
        })
      } catch (error) {
        console.log(error)
        Toast.fire({
          icon: 'error',
          title: '目前無法移除商品，請稍後'
        })
      }
    },
    async addCartItem (id) {
      try {
        const { data } = await cartsAPI.addCartItem(id)
        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        this.cart.forEach(c => {
          if (c.id === id) {
            c.quantity += 1
          }
        })
        this.calculateTotalPrice()
      } catch (error) {
        console.log(error)
        Toast.fire({
          icon: 'error',
          title: '目前無法增加數量，請稍後'
        })
      }
    },
    async reduceCartItem (id) {
      try {
        const { data } = await cartsAPI.reduceCartItem(id)
        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        this.cart.forEach(c => {
          if (c.id === id) {
            c.quantity -= 1
          }
        })
        this.calculateTotalPrice()
      } catch (error) {
        console.log(error)
        Toast.fire({
          icon: 'error',
          title: '目前無法增加數量，請稍後'
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
.cart-page {
  .page-container {
    display: flex;
    flex-direction: column;
    @media (min-width: 992px) {
      flex-direction: row;
    }
    .more-container {
      width: 100%;
      padding: 12px 0;
      .divider {
        background: $divider;
        height: 1px;
      }
      .more-title {
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
        background: url(../assets/drink-coffee.svg) no-repeat center;
        background-size: cover;
        @media (min-width: 768px) {
          border-radius: 54px;
          padding-top: 33.3%;
          background: url(../assets/people-meeting.svg) no-repeat center;
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
    .purchase-card-wrapper {
      flex: 2;
      @media (min-width: 992px) {
        margin-right: 36px;
      }
      .purchase-card {
        margin-bottom: 24px;
        border: 1px solid $divider;
        border-radius: 12px;
        box-shadow: rgba(0, 0, 0, 0.12) 0px 6px 16px;
        position: relative;
        .card-content {
          .item-wrapper {
            position: relative;
            padding: 15px;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            .icon.close {
              cursor: pointer;
              position: absolute;
              right: 15px;
              top: 15px;
              width: 16px;
              height: 16px;
              mask: url(../assets/close.svg) no-repeat center;
              background: #222222;
              mask-size: cover;
            }
            .container {
              display: flex;
              flex-direction: column;
              @media (min-width: 992px) {
                flex-direction: row;
              }
              .image-container {
                display: none;
                @media (min-width: 992px) {
                  display: block;
                  flex: 1;
                  margin-right: 24px;
                }
                .image-wrapper {
                  width: 100%;
                  padding-top: 100%;
                  position: relative;
                  .image {
                    border-radius: 8px;
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: url(https://inline.imgix.net/branch/-LNTA3as3A6I5JWKglD6:inline-live-2a466--LNTA3bp4eBC0NuJ-TSc-48484d1f-999e-401f-94ae-b716e1d3abf5.jpg) no-repeat center;
                    background-size: cover;
                  }
                }
              }
              .price-wrapper {
                flex: 1;
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                align-items: flex-end;
                width: 100%;
                @media (min-width: 992px) {
                  flex-direction: row;
                }
                .adjust-wrapper {
                  flex: 1;
                  display: flex;
                  flex-direction: row;
                  align-items: center;
                  .number {
                    margin-right: 12px;
                    color: #222222;
                    font-weight: 700;
                  }
                  .icon-wrapper {
                    width: 16px;
                    height: 16px;
                    border-radius: 100%;
                    margin-right: 12px;
                    mask-size: cover;
                    background: #000000;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    .icon {
                      cursor: pointer;
                      width: 12px;
                      height: 12px;
                      background: #ffffff;
                      mask-size: cover;
                    }
                    .icon.plus {
                      mask: url(../assets/plus.svg) no-repeat center;
                    }
                    .icon.minus {
                      mask: url(../assets/minus.svg) no-repeat center;
                    }
                  }
                  .icon-wrapper.equalOne {
                    background: #ffffff;
                  }
                }
                .price {
                  font-size: 18px;
                  font-weight: 600;
                }
              }
              .name {
                flex: 2;
                margin: 24px 0;
                font-size: 16px;
                font-weight: 400;
                line-height: 1.5;
                text-align: left;
                @media (min-width: 992px) {
                  margin-right: 24px;
                }
              }
            }
          }
        }
        .divider {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 1px;
          background: $divider;
        }
        .info {
          padding: 5px 15px;
          .item-wrapper {
            font-size: 12px;
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
        .total-price-wrapper {
          padding: 15px;
          font-size: 18px;
          font-weight: 600;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
        }
      }
    }
    .order-card-wrapper {
      flex: 1;
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
          padding: 16px;
          .item-wrapper {
            margin-bottom: 24px;
            font-size: 16px;
            font-weight: 600;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
          }
          .discount {
            margin: 12px 0;
            font-size: 14px;
            font-weight: 800;
            color: navy;
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
        .go-check {
          padding: 12px 12px 36px 12px;
          .button-wrapper {
            cursor: pointer;
            border: 1px solid #666666;
            border-radius: 15px;
            background: #ffffff;
            padding: 12px 0;
            font-size: 16px;
            font-weight: 600;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            line-height: 1.5;
            &:hover {
              background-color: #000000;
              .button {
                color: #ffffff;
              }
            }
            .button {
              color: #222222;
            }
          }
        }
      }
    }
  }
}
</style>
