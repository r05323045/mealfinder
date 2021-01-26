<template>
  <div class="navbar">
    <div class="item-wrapper" :class="{ signIn: signIn}">
      <div class="nav-item" @click="$router.push('/').catch(()=>{})" :class="{ active: $route.path === '/' || $route.path.includes('/restaurants') }">
        <div class="wrapper">
          <div class="icon search"></div>
          <div class="text">探索</div>
        </div>
      </div>
      <div class="nav-item" @click="$router.push('/coupons').catch(()=>{})" :class="{ active: $route.path.includes('/coupons') }">
        <div class="wrapper">
          <div class="icon gift"></div>
          <div class="text">優惠</div>
        </div>
      </div>
      <div class="nav-item" v-if="signIn" @click="$router.push('/users/history').catch(()=>{})" :class="{ active: $route.path.includes('/history') }">
        <div class="wrapper">
          <div class="icon restaurant"></div>
          <div class="text">訂位</div>
        </div>
      </div>
      <div class="nav-item" v-if="signIn" @click="$router.push('/users/notification').catch(()=>{})" :class="{ active: $route.path === '/users/notification' }">
        <div class="wrapper">
          <div class="icon noti"></div>
          <div class="text">通知</div>
        </div>
      </div>
      <div class="nav-item" @click="signIn ? $router.push('/users/center').catch(()=>{}) : $router.push('/signin').catch(()=>{})" :class="{ active: $route.path.includes === '/sign' || ($route.path.includes('/users') && !$route.path.includes('/users/notification') && !$route.path.includes('/users/history')) }">
        <div class="wrapper">
          <div class="icon user"></div>
          <div class="text" v-if="signIn">會員</div>
          <div class="text" v-if="!signIn">登入</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      signIn: true
    }
  }

}
</script>

<style lang="scss">
$ultimategray: #939597;
$divider: #E6ECF0;
$red: rgb(255, 56, 92);
.navbar {
  z-index: 999;
  background: #ffffff;
  border-top: 1px solid $divider;
  position: fixed;
  bottom: 0;
  left: 0;
  height: 54px;
  width: 100%;
  .item-wrapper.signIn {
    width: 100%;
  }
  .item-wrapper {
    margin: 0 auto;
    width: 225px;
    height: 100%;
    display: flex;
    flex-direction: row;
    .nav-item {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      .wrapper {
        height: 44px;
        width: 75px;
        .icon {
          margin: 0 auto;
          background-color: $ultimategray;
          width: 100%;
          height: 100%;
          max-height: 21px;
          max-width: 21px;
        }
        .icon.search {
          mask: url(../assets/search.svg) no-repeat center;
        }
        .icon.user {
          mask: url(../assets/user.svg) no-repeat center;
        }
        .icon.gift {
          mask: url(../assets/gift.svg) no-repeat center;
        }
        .icon.noti {
          mask: url(../assets/notification.svg) no-repeat center;
        }
        .icon.restaurant {
          mask: url(../assets/restaurant.svg) no-repeat center;
        }
        .text {
          font-size: 10px;
          line-height: 24px;
          font-weight: 600;
          color: #666;
        }
      }
    }
    .nav-item.active {
      .wrapper {
        .icon {
          background: $red;
        }
        .text {
          color: #222222;
        }
      }
    }
  }
}
</style>
