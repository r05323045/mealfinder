<template>
  <div class="past-reservation">
    <div class="more-container" v-if="restaurants.length < 1">
      <div class="more-title">過去沒有訂位的紀錄</div>
      <div class="illustration-wrapper">
        <div class="cover">
          <div class="button" @click="$router.push('/map')">現在就去找餐廳</div>
        </div>
      </div>
    </div>
    <div v-if="restaurants.length > 0">
      <div class="card-deck" v-for="i in Math.ceil(restaurants.length/cardPerDeck)" :key="`card-deck-${i}`">
        <div class="booking-card" v-for="(restaurant, index) in restaurants.slice((i - 1) * cardPerDeck, i * cardPerDeck)" :key="restaurant.id" :class="{ 'last-card': index === 3 }" @click="$router.push(`/users/history/${restaurant.id}`)">
          <div class="picture-wrapper">
            <div class="picture" :style="`background: url(${restaurant.Restaurant_picture}) no-repeat center / cover`"></div>
          </div>
          <div class="header">
            <img class="icon restaurant" src="../assets/restaurant.svg">
            <div class="name">{{ restaurant.Restaurant_name }}</div>
          </div>
          <div class="divider"></div>
          <div class="info">
            <div class="item-wrapper">
              <img class="icon profile" src="../assets/profile.svg">
              <div class="number">{{ restaurant.partySize_adult }}大<span v-if="restaurant.partySize_kids > 0">小</span></div>
            </div>
            <div class="item-wrapper">
              <img class="icon time" src="../assets/calendar.svg">
              <div class="date">{{ new Date(new Date(restaurant.date.slice(0, 10)).toDateString()) | bookingDateFormat }}</div>
            </div>
            <div class="item-wrapper">
              <img class="icon time" src="../assets/clock.svg">
              <div class="time">{{ restaurant.time.slice(0, 5) }}</div>
            </div>
          </div>
        </div>
        <div class="booking-card" style="box-shadow: none; border: none" v-if="cardPerDeck > 1 && restaurants.slice((i - 1) * cardPerDeck, i * cardPerDeck).length < cardPerDeck"></div>
        <div class="booking-card" style="box-shadow: none; border: none" v-if="cardPerDeck > 2 && restaurants.slice((i - 1) * cardPerDeck, i * cardPerDeck).length + 1 < cardPerDeck"></div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      windowWidth: window.innerWidth,
      cardPerDeck: 1,
      restaurants: []
    }
  },
  props: {
    reservations: {
      type: Array
    }
  },
  created () {
    this.restaurants = this.reservations
  },
  mounted () {
    window.addEventListener('resize', () => {
      this.windowWidth = window.innerWidth
    })
    this.defineCardDeck()
  },
  watch: {
    windowWidth () {
      this.defineCardDeck()
    },
    reservations () {
      this.restaurants = this.reservations
    }
  },
  methods: {
    defineCardDeck () {
      if (this.windowWidth < 768) {
        this.cardPerDeck = 1
      } else if (this.windowWidth < 992) {
        this.cardPerDeck = 2
      } else {
        this.cardPerDeck = 3
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
.past-reservation {
  .more-container {
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
  .card-deck {
    display: flex;
    flex-direction: column;
    @media (min-width: 768px) {
      flex-direction: row;
    }
    .booking-card {
      cursor: pointer;
      flex: 1;
      margin-bottom: 24px;
      border: 1px solid $divider;
      border-radius: 12px;
      box-shadow: rgba(0, 0, 0, 0.12) 0px 6px 16px;
      @media (min-width: 768px) {
        margin-right: 24px;
      }
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
          height: 16px;
          width: 16px;
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
          cursor: pointer;
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
    .booking-card.last-card {
      @media (min-width: 768px) {
        margin-right: 0;
      }
    }
  }
}
</style>
