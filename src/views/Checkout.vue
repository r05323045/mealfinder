<template>
  <div class="checkout-page">
    <div class="checkout-container">
      <div class="main-title">確認訂位與選擇付款方式</div>
      <div class="order-card">
        <div class="header">
          <div class="title">訂單摘要</div>
        </div>
        <div class="divider"></div>
        <div class="card-content">
          <div class="item-wrapper">
            <div class="text">商品總計</div>
            <div class="total-price">$1995</div>
          </div>
          <div class="item-wrapper">
            <div class="text">數量總計</div>
            <div class="total-price">5</div>
          </div>
          <div class="discount">使用優惠券</div>
          <div class="divider"></div>
          <div class="item-wrapper summary">
            <div class="text">結帳總金額</div>
            <div class="total-price">$1995</div>
          </div>
        </div>
      </div>
      <div class="contact-card">
        <div class="all-wrapper">
          <label for="name" class="all-text">購買人姓名</label>
          <input id="name" class="all-input">
        </div>
        <div class="all-wrapper">
          <label for="email" class="all-text">購買人 Email</label>
          <input id="email" class="all-input">
        </div>
        <div class="all-wrapper">
          <label for="purpose" class="all-text">付款方式</label>
          <div class="button-wrapper">
            <button class="button" v-for="(el, idx) in payby" :key="`payby-${idx}`" @click.prevent="submitPayby = el" :class="{select: submitPayby === el}">
              <span class="text">{{ el }}</span>
            </button>
          </div>
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
    </div>
    <div ref="footer">
      <Footer></Footer>
    </div>
    <div>
      <Navbar></Navbar>
    </div>
  </div>
</template>

<script>

import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'

export default {
  data () {
    return {
      payby: ['信用卡', 'ATM轉帳'],
      submitPayby: ''
    }
  },
  components: {
    Navbar,
    Footer
  },
  mounted () {
  },
  methods: {
    rating (num) {
      console.log(num)
      this.rated = num
    }
  }
}
</script>

<style lang="scss">
$yellow: #F5DF4D;
$ultimategray: #939597;
$divider: #E6ECF0;
$red: rgb(255, 56, 92);
.checkout-page {
  height: 100vh;
  overflow: scroll;
  .checkout-container {
    margin: 36px 24px 60px 24px;
    text-align: left;
    position: relative;
    .main-title {
      font-size: 24px;
      font-weight: 800;
      line-height: 1.5;
      margin-bottom: 24px;
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
    }
    .contact-card {
      padding: 15px;
      margin-bottom: 24px;
      border: 1px solid $divider;
      border-radius: 8px;
      text-align: left;
      box-shadow: rgba(0, 0, 0, 0.12) 0px 6px 16px;
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
