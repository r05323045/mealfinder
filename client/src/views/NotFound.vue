<template>
  <div class="not-found">
    <Navbar class="restaurant-navbar"></Navbar>
    <div class="main-title">Oops...</div>
    <div class="not-found-container">
      <div class="title">404 Page Not Found</div>
      <div class="illustration-wrapper">
        <div class="cover">
          <div class="button" @click="$router.push('/')">回首頁</div>
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

export default {
  components: {
    Footer,
    Navbar
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
.not-found {
  overflow: scroll;
  .main-title {
    margin: auto;
    max-width: 1040px;
    text-align: left;
    padding: 36px 24px 0px;
    font-size: 24px;
    font-weight: 800;
    line-height: 1.5;
    @media (min-width: 768px) {
      margin-top: 81px;
      padding: 36px 40px 0px;
    }
    @media (min-width: 992px) {
      padding: 36px 80px 0px;
    }
  }
  .not-found-container {
    margin: auto;
    max-width: 1040px;
    padding: 36px 24px;
    @media (min-width: 768px) {
      padding: 36px 40px;
    }
    @media (min-width: 992px) {
      padding: 36px 80px;
    }
    .divider {
      background: $divider;
      height: 1px;
    }
    .title {
      margin-top: 24px;
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
