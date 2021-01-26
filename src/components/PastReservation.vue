<template>
  <div class="past-reservation">
    <div class="booking-card" v-for="i in 5" :key="i" @click="$router.push(`/users/history/${i}`)">
      <div class="picture-wrapper">
        <div class="picture"></div>
      </div>
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
      <div class="divider"></div>
      <div class="write-comment">
        <div class="button-wrapper">
          <div class="button">填寫評論</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
    }
  },
  mounted () {
  },
  methods: {
  }
}
</script>

<style lang="scss">
$yellow: #F5DF4D;
$ultimategray: #939597;
$divider: #E6ECF0;
$red: rgb(255, 56, 92);
.past-reservation {
  .booking-card {
    margin-bottom: 24px;
    border: 1px solid $divider;
    border-radius: 12px;
    box-shadow: rgba(0, 0, 0, 0.12) 0px 6px 16px;
    .picture-wrapper {
      width: 100%;
      padding-top: 50%;
      position: relative;
      .picture {
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: url(https://inline.imgix.net/branch/-LNTA3as3A6I5JWKglD6:inline-live-2a466--LNTA3bp4eBC0NuJ-TSc-48484d1f-999e-401f-94ae-b716e1d3abf5.jpg) no-repeat center;
        background-size: cover;
      }
    }
    .header {
      padding: 15px;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      .icon.restaurant {
        min-height: 16px;
        min-width: 16px;
        margin-right: 16px;
      }
      .name {
        font-size: 14px;
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
    .write-comment {
      padding: 12px;
      .button-wrapper {
        font-size: 14px;
        font-weight: 600;
        padding: 8px 0;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        line-height: 1.5;
        .button {
          text-decoration: underline;
          color: #222222;
        }
      }
    }
  }
}
</style>
