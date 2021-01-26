<template>
  <div class="member">
    <div class="info-container">
      <div class="title">會員中心</div>
      <div class="account-wrapper">
        <div class="name">Jim Lin</div>
        <div class="account">@jimlin</div>
      </div>
      <div class="link" @click="$router.push('/users/profile')">前往個人資料</div>
    </div>
    <div class="card-deck-container">
      <div class="link-card-deck">
        <div class="link-card-wrapper" @click="$router.push('/users/profile')">
          <div class="link-card">
            <div class="icon-wrapper">
              <img src="../assets/flat_profile.svg" class="icon">
              <div class="text">個人資料</div>
            </div>
          </div>
        </div>
        <div class="link-card-wrapper" @click="$router.push('/users/favorite')">
          <div class="link-card">
            <div class="icon-wrapper">
              <img src="../assets/flat_plate.svg" class="icon">
              <div class="text">我的收藏</div>
            </div>
          </div>
        </div>
      </div>
      <div class="link-card-deck">
        <div class="link-card-wrapper" @click="$router.push('/users/history')">
          <div class="link-card">
            <div class="icon-wrapper">
              <img src="../assets/flat_reserved.svg" class="icon">
              <div class="text">用餐</div>
            </div>
          </div>
        </div>
        <div class="link-card-wrapper" @click="$router.push('/users/purchase')">
          <div class="link-card">
            <div class="icon-wrapper">
              <img src="../assets/flat_shopping-cart.svg" class="icon">
              <div class="text">購買</div>
            </div>
          </div>
        </div>
      </div>
      <div class="link-card-deck">
        <div class="link-card-wrapper" @click="$router.push('/users/notification')">
          <div class="link-card">
            <div class="icon-wrapper">
              <img src="../assets/flat_notification.svg" class="icon">
              <div class="text">我的通知</div>
            </div>
          </div>
        </div>
        <div class="link-card-wrapper" @click="$router.push('/users/record')">
          <div class="link-card">
          </div>
        </div>
      </div>
    </div>
    <div class="more-container">
      <div class="title">專屬你的推薦餐廳</div>
      <div class="illustration-wrapper">
        <div class="cover">
          <div class="button" @click="$router.push('/restaurants')">現在就去看看</div>
        </div>
      </div>
    </div>
    <div ref="footer">
      <Footer></Footer>
    </div>
    <div v-show="scrollUp">
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
      scrollY: 0,
      scrollUp: true
    }
  },
  components: {
    Navbar,
    Footer
  },
  mounted () {
  },
  methods: {
    onScroll (e) {
    }
  }
}
</script>

<style lang="scss">
$yellow: #F5DF4D;
$ultimategray: #939597;
$divider: #E6ECF0;
$red: rgb(255, 56, 92);
.member {
  height: 100vh;
  overflow: scroll;
  .info-container {
    padding: 0 40px;
    margin: 64px 0 36px 0;
    text-align: left;
    .title {
      font-size: 32px;
      font-weight: 800;
      line-height: 1.5;
    }
    .account-wrapper {
      display: flex;
      flex-direction: row;
      margin-top: 8px;
      font-size: 18px;
      font-weight: 400;
      line-height: 1.5;
      .name {
        margin-right: 12px;
        font-weight: 600;
      }
      .account {
        color: #666;
      }
    }
    .link {
      margin-top: 8px;
      color: #008489;
      font-weight: 600;
    }
  }
  .card-deck-container {
    padding: 0 24px;
    .link-card-deck {
      display: flex;
      flex-direction: row;
      .link-card-wrapper {
        width: 50%;
        flex: 1;
        padding: 8px;
        .link-card {
          border-radius: 8px;
          box-shadow: rgba(0, 0, 0, 0.16) 0px 2px 8px;
          .icon-wrapper {
            padding: 26px 5px;
            .icon {
              margin: 8px auto;
              height: 32px;
              width: 32px;
            }
            .text {
              font-size: 14px;
              font-weight: 600;
            }
          }
        }
      }
    }
  }
  .more-container {
    padding: 40px;
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
      background: url(../assets/eatNow.svg) no-repeat center;
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
  }
}
</style>
