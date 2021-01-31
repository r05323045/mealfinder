<template>
  <div class="notification-page">
    <div class="notification-container">
      <div class="title">我的通知</div>
      <div class="notification-card">
        <div class="card-content">
          <div class="item-wrapper" v-for="i in 5" :key="i">
            <div class="inner-wrapper">
              <div class="avatar"></div>
              <div class="text">ToTsuZen Steak 現切現煎以克計價濕式熟成牛排</div>
            </div>
            <div class="time">2021/01/01</div>
            <div class="divider"></div>
          </div>
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
      tabFuture: true
    }
  },
  components: {
    Navbar,
    Footer
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
.notification-page {
  height: 100vh;
  overflow: scroll;
  .notification-container {
    margin: 36px 24px;
    text-align: left;
    position: relative;
    .title {
      font-size: 24px;
      font-weight: 800;
      line-height: 1.5;
    }
    .notification-card {
      margin: 24px 0 ;
      border: 1px solid $divider;
      border-radius: 8px;
      .card-content {
        .item-wrapper {
          position: relative;
          padding: 30px 15px 15px 15px;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          .time {
            position: absolute;
            top: 10px;
            right: 15px;
            font-size: 12px;
            color: #666;
            font-weight: 600;
          }
          .inner-wrapper {
            display: flex;
            flex-direction: row;
            align-items: center;
            .text {
              flex: 1;
              font-size: 16px;
              font-weight: 400;
              line-height: 1.5;
              text-align: left;
            }
            .avatar {
              width: 48px;
              height: 48px;
              background: $ultimategray;
              border-radius: 50%;
              margin-right: 12px;
            }
          }
        }
      }
      .divider {
        position: absolute;
        bottom: 0;
        right: 0;
        left: 0;
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
    }
  }
}
</style>
