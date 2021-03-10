<template>
  <div class="record-page">
    <Navbar></Navbar>
    <div class="record-container">
      <div class="main-title">在 {{ order.createdAt | normalDate }} 的訂單紀錄</div>
      <div class="info-and-comment">
        <div class="information-container">
          <div class="information-body">
            <div class="item-wrapper product" v-if="order.OrderItem">
              <div class="top-wrapper">
                <img class="icon restaurant" src="../assets/restaurant.svg">
                <div class="title">商品名稱</div>
              </div>
              <div class="content-wrapper" v-for="item in order.OrderItem" :key="item.id">
                <div class="content">{{ item.Coupon.description }}</div>
                <div class="count">x {{ item.quantity }}</div>
              </div>
            </div>
            <div class="item-wrapper">
              <div class="top-wrapper">
                <img class="icon clock" src="../assets/clock.svg">
                <div class="title">使用期限</div>
              </div>
              <div class="content">
                {{ expireData | normalDate }}
              </div>
            </div>
            <div class="item-wrapper">
              <div class="top-wrapper">
                <img class="icon profile" src="../assets/profile.svg">
                <div class="title">商品數量</div>
              </div>
              <div class="content" v-if="order.OrderItem">{{ order.OrderItem.map(item => item.quantity).reduce((a, b)=> a + b, 0) }}</div>
            </div>
            <div class="item-wrapper">
              <div class="top-wrapper">
                <img class="icon profile" src="../assets/profile.svg">
                <div class="title">購買人姓名</div>
              </div>
              <div class="content">
                <span class="name">{{ order.name }}</span>
              </div>
            </div>
            <div class="item-wrapper">
              <div class="top-wrapper">
                <img class="icon email" src="../assets/email.svg">
                <div class="title">購買人Email</div>
              </div>
              <div class="content">{{ order.email }}</div>
            </div>
            <div class="item-wrapper">
              <div class="top-wrapper">
                <img class="icon map" src="../assets/map.svg">
                <div class="title">付款方式</div>
              </div>
              <div class="content">信用卡</div>
            </div>
            <div class="item-wrapper">
              <div class="top-wrapper">
                <img class="icon map" src="../assets/map.svg">
                <div class="title">付款金額</div>
              </div>
              <div class="content">{{ order.total_amount | priceFormat }}</div>
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
import cartsAPI from '@/apis/carts'
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'

export default {
  data () {
    return {
      tabFuture: true,
      order: {},
      expireData: new Date()
    }
  },
  components: {
    Navbar,
    Footer
  },
  created () {
    this.fetchOrder()
  },
  computed: {
    ...mapState(['currentUser', 'isAuthenticated'])
  },
  methods: {
    async fetchOrder () {
      const loader = this.$loading.show({
        isFullPage: true,
        opacity: 1
      })
      try {
        const { data } = await cartsAPI.getOrder(this.$route.params.id)
        this.order = data.order
        const year = new Date(this.order.createdAt).getFullYear()
        const month = new Date(this.order.createdAt).getMonth()
        const day = new Date(this.order.createdAt).getDate()
        this.expireData = new Date(year + 1, month, day)
        loader.hide()
      } catch (error) {
        loader.hide()
        console.log(error)
        Toast.fire({
          icon: 'error',
          title: '目前無法取得所有歷史訂單'
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
.record-page {
  overflow: scroll;
  .record-container {
    margin: auto;
    max-width: 1040px;
    padding: 36px 24px 60px 24px;
    text-align: left;
    @media (min-width: 768px) {
      margin-top: 81px;
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
        font-size: 32px;
      }
    }
    .info-and-comment {
      width: 100%;
      display: flex;
      flex-direction: column;
      @media (min-width: 992px) {
        flex-direction: row;
      }
      .information-container {
        flex: 2;
        margin-bottom: 24px;
        border: 1px solid $divider;
        box-shadow: rgba(0, 0, 0, 0.12) 0px 6px 16px;
        border-radius: 8px;
        padding: 12px 24px;
        @media (min-width: 992px) {
          margin-right: 36px;
        }
        .information-body {
          .item-wrapper {
            margin-bottom: 12px;
            .top-wrapper {
              display: flex;
              flex-direction: row;
              .title {
                margin: 12px 0;
                font-size: 14px;
                font-weight: 600;
                line-height: 1.5;
                @media (min-width: 768px) {
                  font-size: 16px;
                }
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
              margin-left: 24px;
              margin-bottom: 12px;
              font-weight: 400;
              text-align: left;
              font-size: 12px;
              line-height: 1.5;
              position: relative;
              display: flex;
              flex-direction: row;
              @media (min-width: 768px) {
                font-size: 14px;
              }
              .name {
                margin-right: 8px;
              }
            }
            .content-wrapper {
              font-size: 12px;
              font-weight: 600;
              display: flex;
              flex-direction: row;
              justify-content: space-between;
              align-items: center;
              .count {
                margin-left: 24px;
              }
            }
          }
          .item-wrapper.product {
            margin-bottom: 0
          }
        }
      }
      .comment-card-wrapper {
        flex: 1;
        .comment-card {
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
              font-size: 14px;
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
            .user-info-wrapper {
              display: flex;
              flex-direction: row;
              .avatar {
                width: 48px;
                height: 48px;
                background: $ultimategray;
                border-radius: 50%;
                margin-right: 12px;
              }
              .user-info {
                display: flex;
                flex-direction: column;
                font-size: 14px;
                font-weight: 400;
                justify-content: center;
                .name {
                  margin-bottom: 8px;
                }
              }
            }
            .rating-container {
              width: 100%;
              position: relative;
              margin-top: 24px;
              .star-wrapper {
                width: 50%;
                max-width: 120px;
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                .star {
                  width: 20px;
                  height: 20px;
                  mask: url(../assets/empty-star.svg) no-repeat center;
                  mask-size: cover;
                  background: #666;
                }
                .star.rated {
                  width: 20px;
                  height: 20px;
                  mask: url(../assets/google-star.svg) no-repeat center;
                  mask-size: cover;
                  background: #FFCE44;
                }
              }
              .text {
                position: absolute;
                top: 0;
                right: 0;
                font-size: 14px;
                font-weight: 400;
              }
            }
            .text-container {
              margin-top: 24px;
              .text-area {
                outline: none;
                font-size: 16px;
                line-height: 1.5;
                font-weight: 400;
                padding: 8px 12px;
                border: 1px solid $ultimategray;
                border-radius: 8px;
                width: calc(100% - 24px);
                min-height: 100px;
                &::placeholder {
                  font-size: 16px;
                }
              }
              .note-count {
                font-size: 12px;
                color: #222;
                font-weight: 400;
                text-align: right;
              }
            }
          }
          .write-comment {
            padding: 12px 12px 36px 12px;
            .button-wrapper {
              border: 1px solid #666666;
              border-radius: 15px;
              background: #ffffff;
              padding: 12px 0;
              font-size: 14px;
              font-weight: 600;
              display: flex;
              flex-direction: row;
              align-items: center;
              justify-content: center;
              line-height: 1.5;
              .button {
                color: #222222;
              }
            }
          }
        }
      }
    }
  }
}
</style>
