<template>
  <div class="booking-success">
    <div class="searchbar-wrapper">
      <div class="back-wrapper">
        <div class="icon back"></div>
      </div>
      <div class="searchbar">
        <input v-if="false" class="search-input">
        <div class="wrapper">
          <div class="text">
            ToTsuZen Steak 現切現煎以克計價濕式熟成牛排
          </div>
        </div>
      </div>
    </div>
    <div class="booking-result">
      <div class="title">訂位成功</div>
      <div class="booking-card">
        <div class="header">
          <img class="icon restaurant" src="../assets/restaurant.svg">
          <div class="name">ToTsuZen Steak 現切現煎以克計價濕式熟成牛排</div>
        </div>
        <div class="divider"></div>
        <div class="info">
          <div class="item-wrapper">
            <img class="icon profile" src="../assets/profile.svg">
            <div class="number">2大</div>
          </div>
          <div class="item-wrapper">
            <img class="icon time" src="../assets/calendar.svg">
            <div class="date">2021/01/23 (週六)</div>
          </div>
          <div class="item-wrapper">
            <img class="icon time" src="../assets/clock.svg">
            <div class="time">11:30</div>
          </div>
        </div>
      </div>
      <div class="result-image">
        <img class="image" src="../assets/bookingSuccess.svg">
      </div>
      <div class="result-button-wrapper">
        <button class="result-button" type="submit" @click.prevent="">
          <div class="button">查看訂位資訊</div>
        </button>
        <div class="home-button" @click.prevent="">
          <div class="button">回首頁</div>
        </div>
      </div>
    </div>
    <div ref="footer">
      <Footer></Footer>
    </div>
  </div>
</template>

<script>

import Footer from '@/components/Footer.vue'
export default {
  data () {
    return {
      purpose: ['慶生', '約會', '週年慶', '家庭聚餐', '朋友聚餐', '商務聚餐'],
      submitPurpose: []
    }
  },
  components: {
    Footer
  },
  mounted () {
  },
  methods: {
    onScroll (e) {

    },
    changePurpose (purpose) {
      if (this.submitPurpose.includes(purpose)) {
        this.submitPurpose.splice(this.submitPurpose.indexOf(purpose), 1)
      } else {
        this.submitPurpose = [...this.submitPurpose, purpose]
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
$default-color: #000000;
$primary-color: #222;
@import '~vue2-datepicker/scss/index.scss';
.booking-success {
  height: 100%;
  overflow: scroll;
  position: relative;
  width: 100%;
  .searchbar-wrapper {
    box-shadow: rgba(0, 0, 0, 0.16) 0px -2px 8px;
    z-index: 998;
    background: none;
    position: fixed;
    height: 60px;
    width: 100%;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #ffffff;
    .back-wrapper {
      padding-left: 8px;
      width: 40px;
      height: 48px;
      display: flex;
      justify-content: center;
      align-items: center;
      .icon.back {
        margin: auto;
        height: 16px;
        width: 16px;
        background-color: #000000;
        mask: url(../assets/back.svg) no-repeat center;
      }
    }
    .searchbar {
      background: #ffffff;
      width: 100%;
      border-radius: 100px;
      height: 48px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .search-input {
        border: none;
        &:focus {
          outline: none;
        }
      }
      .wrapper {
        width: 100%;
        display: flex;
        flex-direction: row;
        line-height: 18px;
        .text {
          margin-right: 20%;
          font-size: 14px;
          font-weight: 600;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      }
    }
  }
  .booking-result {
    margin-top: 60px;
    scroll-behavior: smooth;
    padding: 22px 24px;
    .title {
      margin: 12px 0;
      height: 40px;
      font-size: 22px;
      font-weight: 700;
      text-align: left;
      line-height: 22px;
    }
    .booking-card {
      margin-bottom: 20px;
      border: 1px solid $divider;
      border-radius: 8px;
      .header {
        padding: 15px;
        display: flex;
        flex-direction: row;
        .icon.restaurant {
          margin: auto;
          min-height: 20px;
          min-width: 20px;
          margin-right: 20px;
        }
        .name {
          font-size: 18px;
          font-weight: 400;
          line-height: 1.5;
          text-align: left;
        }
      }
      .divider {
        height: 1px;
        background: $divider;
      }
      .info {
        padding: 5px 15px;
        .item-wrapper {
          padding: 10px 0;
          display: flex;
          flex-direction: row;
          line-height: 22px;
          .icon {
            color: #222222;
            height: 20px;
            width: 20px;
            margin-right: 20px;
          }
        }
      }
    }
    .result-button-wrapper {
      border-top: 1px solid $divider;
      width: calc(100vw - 48px);
      background: #ffffff;
      .result-button {
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
      .home-button {
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
  .result-image {
    margin-top: 24px;
    .image {
      width: 100%;
    }
    .text {
      text-align: left;
      font-size: 16px;
      font-weight: 600;
      margin: 24px 0;
    }
  }
}
</style>
