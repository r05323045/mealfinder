<template>
  <div class="future-reservation">
    <div class="more-container">
      <div class="more-title">還沒想好要吃什麼？</div>
      <div class="illustration-wrapper">
        <div class="cover">
          <div class="button" @click="$router.push('/restaurants')">現在就去找餐廳</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { Toast } from '@/utils/helpers'
import { mapState } from 'vuex'
import reservationsAPI from '@/apis/reservations'
export default {
  data () {
    return {
    }
  },
  created () {
    this.fetchReservations()
  },
  mounted () {
  },
  computed: {
    ...mapState(['currentUser', 'isAuthenticated'])
  },
  methods: {
    async fetchReservations () {
      try {
        const { data } = await reservationsAPI.getReservations()
        console.log(data)
      } catch (error) {
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
.future-reservation {
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
      background: url(../assets/eatNow.svg) no-repeat center;
      background-size: cover;
      @media (min-width: 768px) {
        padding-top: 33.3%;
        background: url(../assets/people-eating-food.svg) no-repeat center;
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
}
</style>
