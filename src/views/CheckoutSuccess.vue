<template>
  <div class="checkout-page">
    <div class="checkout-container">
      <div class="main-title">付款成功！</div>
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
          <div class="divider"></div>
          <div class="item-wrapper summary">
            <div class="text">結帳總金額</div>
            <div class="total-price">$1995</div>
          </div>
        </div>
      </div>
      <div class="illustration-wrapper">
        <div class="cover">
          <!--<div class="button">感謝你的使用！</div>-->
        </div>
      </div>
      <div class="submit-button-wrapper">
        <button class="submit-button" type="submit" @click.prevent="">
          <div class="button">查看更多商品</div>
        </button>
        <div class="back-button" @click.prevent="">
          <div class="button">回首頁看更多</div>
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
    .illustration-wrapper {
      margin: 36px 0;
      width: 100%;
      padding-top: 66.7%;
      position: relative;
      background: url(../assets/bookingSuccess.svg) no-repeat center;
      background-size: cover;
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
