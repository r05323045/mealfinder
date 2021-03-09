<template>
  <div class="purchase-page">
    <Navbar></Navbar>
    <div class="purchase-container">
      <div class="title">我的購買</div>
      <div class="purchase-wrapper">
        <div class="tab-container">
          <div class="tab " :class="{ active: tabCart }" @click="tabCart = true">
            購物車
            <div class="active-line" v-show="tabCart"></div>
          </div>
          <div class="tab" :class="{ active: !tabCart }" @click="tabCart = false">
            購買紀錄
            <div class="active-line" v-show="!tabCart"></div>
          </div>
          <div class="divider"></div>
        </div>
        <div class="reservation-container">
          <Cart v-if="tabCart"></Cart>
          <PastPurchase v-if="!tabCart"></PastPurchase>
        </div>
      </div>
    </div>
    <div ref="footer">
      <Footer></Footer>
    </div>
  </div>
</template>

<script>

import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import Cart from '@/components/Cart.vue'
import PastPurchase from '@/components/PastPurchase.vue'

export default {
  data () {
    return {
      tabCart: true
    }
  },
  components: {
    Navbar,
    Footer,
    Cart,
    PastPurchase
  },
  mounted () {
  }
}
</script>

<style lang="scss">
$yellow: #F5DF4D;
$ultimategray: #939597;
$divider: #E6ECF0;
$red: rgb(255, 56, 92);
.purchase-page {
  .purchase-container {
    margin: auto;
    max-width: 1040px;
    padding: 36px 24px;
    text-align: left;
    @media (min-width: 768px) {
      margin-top: 81px;
      padding: 36px 40px;
    }
    @media (min-width: 992px) {
      margin-top: 81px;
      padding: 36px 80px;
    }
    .title {
      font-size: 24px;
      font-weight: 800;
      line-height: 1.5;
      @media (min-width: 768px) {
        font-size: 26px;
      }
      @media (min-width: 992px) {
        font-size: 32px;
      }
    }
    .tab-container {
      position: relative;
      margin: 16px -16px 32px -16px;
      display: flex;
      flex-direction: row;
      .divider {
        position: absolute;
        bottom: 0;
        left: 16px;
        right: 16px;
        top: 100%;
        height: 1px;
        background: $divider;
      }
      .tab {
        color: #666;
        cursor: pointer;
        padding: 16px;
        font-size: 14px;
        line-height: 18px;
        font-weight: 600;
        position: relative;
        &:hover {
          background: $divider;
        }
        @media (min-width: 768px) {
          font-size: 16px;
          line-height: 20px;
        }
      }
      .tab.active {
        position: relative;
        color: #222222;
        position: relative;
        &:hover {
          background: #ffffff;
        }
        .active-line {
          z-index: 2;
          position: absolute;
          bottom: -1px;
          left: 16px;
          right: 16px;
          height: 3px;
          background: #222222;
        }
      }
    }
  }
}
</style>
