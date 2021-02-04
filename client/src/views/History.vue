<template>
  <div class="history-page">
    <Navbar></Navbar>
    <div class="history-container">
      <div class="title">用餐紀錄</div>
      <div class="history-wrapper">
        <div class="tab-container">
          <div class="tab " :class="{ active: tabFuture }" @click="tabFuture = true">
            即將前往
            <div class="active-line" v-show="tabFuture"></div>
          </div>
          <div class="tab" :class="{ active: !tabFuture }" @click="tabFuture = false">
            過去紀錄
            <div class="active-line" v-show="!tabFuture"></div>
          </div>
          <div class="divider"></div>
        </div>
        <div class="reservation-container">
          <FutureReservation v-if="tabFuture"></FutureReservation>
          <PastReservation v-if="!tabFuture"></PastReservation>
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
import FutureReservation from '@/components/FutureReservation.vue'
import PastReservation from '@/components/PastReservation.vue'

export default {
  data () {
    return {
      tabFuture: true
    }
  },
  components: {
    Navbar,
    Footer,
    FutureReservation,
    PastReservation
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
.history-page {
  height: 100vh;
  overflow: scroll;
  .history-container {
    margin: auto;
    max-width: 1040px;
    padding: 36px 24px;
    text-align: left;
    position: relative;
    @media (min-width: 768px) {
      padding: 36px 40px;
    }
    @media (min-width: 992px) {
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
    .history-wrapper {
      .reservation-container {
        padding-top: 8px;
      }
    }
    .tab-container {
      position: relative;
      margin: 16px -16px;
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
