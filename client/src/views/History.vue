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
        <div class="reservation-container" ref="reservation-container">
          <FutureReservation v-if="tabFuture" :reservations="futureReservation"></FutureReservation>
          <PastReservation v-if="!tabFuture" :reservations="pastReservation"></PastReservation>
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
import reservationsAPI from '@/apis/reservations'
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import FutureReservation from '@/components/FutureReservation.vue'
import PastReservation from '@/components/PastReservation.vue'

export default {
  data () {
    return {
      tabFuture: true,
      reservations: [],
      futureReservation: [],
      pastReservation: []
    }
  },
  components: {
    Navbar,
    Footer,
    FutureReservation,
    PastReservation
  },
  created () {
  },
  mounted () {
    this.fetchReservations()
  },
  computed: {
    ...mapState(['currentUser', 'isAuthenticated'])
  },
  methods: {
    async fetchReservations () {
      const loader = this.$loading.show({
        opacity: 1,
        isFullPage: true
      })
      try {
        const { data } = await reservationsAPI.getReservations()
        this.reservations = data.reservations
        this.futureReservation = this.reservations.filter(r => new Date(new Date(r.date.slice(0, 10)).toDateString()) > Date.now())
        this.pastReservation = this.reservations.filter(r => new Date(new Date(r.date.slice(0, 10)).toDateString()) <= Date.now())
        loader.hide()
      } catch (error) {
        loader.hide()
        console.log(error)
        Toast.fire({
          icon: 'error',
          title: '目前無法取得餐廳，請稍候'
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
.history-page {
  .history-container {
    margin: auto;
    max-width: 1040px;
    padding: 36px 24px;
    text-align: left;
    @media (min-width: 768px) {
      padding: 36px 40px;
      margin-top: 81px;
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
        min-height: 600px;
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
