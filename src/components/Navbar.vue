<template>
  <div class="navbar" :class="{ openSearch: openSearch }">
    <div class="navbar-mobile">
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
    <div class="navbar-desktop" :class="{ openSearch: openSearch }">
      <div class="navbar-desktop-inner">
        <div class="logo-wrapper">
          <div class="logo"></div>
        </div>
        <div class="tab-wrapper" v-show="openSearch">
          <div class="condition-wrapper">
            <div class="condition">條件</div>
            <div class="divider"></div>
          </div>
          <div class="name-wrapper">
            <div class="name">名稱</div>
            <div class="divider"></div>
          </div>
        </div>
        <div class="searchbar-wrapper" v-show="!openSearch" @click="openSearch = true">
          <div class="searchbar">
            <div class="searchbar-button">
              <input v-if="false" class="search-input">
              <div class="search-input">
                <div class="text">開始搜尋</div>
              </div>
              <div class="icon-wrapper">
                <div class="icon search"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="side-nav">
          <div class="side-nav-button">
            <img class="icon hamburger" src="../assets/hamburger.svg">
            <img class="icon profile" src="../assets/default-profile.svg">
          </div>
        </div>
      </div>
      <div class="navbar-desktop-outer" v-show="openSearch">
        <div class="searchbar-wrapper">
          <div class="district-wrapper">
            <div class="search-input">
              <div class="title">地區</div>
              <div class="text">選擇地區</div>
            </div>
          </div>
          <div class="category-wrapper">
            <div class="divider"></div>
            <div class="search-input">
              <div class="title">類型</div>
              <div class="text">選擇類型</div>
            </div>
          </div>
          <div class="budget-wrapper">
            <div class="divider"></div>
            <div class="search-input">
              <div class="title">預算</div>
              <div class="text">選擇預算</div>
            </div>
          </div>
          <div class="icon-wrapper">
            <div class="icon search"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="navbar-filter" v-show="openSearch" @click="openSearch = false"></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      signIn: true,
      openSearch: false
    }
  }
}
</script>

<style lang="scss" scoped>
$ultimategray: #939597;
$divider: #E6ECF0;
$red: rgb(255, 56, 92);
.navbar {
  .navbar-desktop {
    display: none;
  }
  .navbar-mobile {
    box-shadow: rgba(0, 0, 0, 0.12) 0px 6px 16px;
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
  @media (min-width: 992px) {
    position: sticky;
    top: 0;
    left: 0;
    z-index: 999;
    .navbar-mobile {
      display: none;
    }
    .navbar-desktop {
      display: block;
      box-shadow: rgba(0, 0, 0, 0.12) 0px 6px 16px;
      border-bottom: 1px solid $divider;
      width: 100%;
      background: #ffffff;
      width: calc(100% - 160px);
      padding: 0 80px;
      .navbar-desktop-inner {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        height: 80px;
        .tab-wrapper {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          .condition-wrapper {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            .condition {
              font-size: 16px;
              line-height: 20px;
              font-weight: 400;
              padding: 10px 16px;
              white-space: nowrap;
            }
            .divider {
              width: 25%;
              height: 2px;
              background: #222;
            }
          }
          .name-wrapper {
            display: flex;
            flex-direction: column;
            justify-content: center;
            .name {
              font-size: 16px;
              line-height: 20px;
              font-weight: 400;
              padding: 10px 16px;
              white-space: nowrap;
            }
            .divider {
              width: 50%;
              height: 2px
            }
          }
        }
        .logo-wrapper {
          width: 30px;
          height: 100%;
          display: flex;
          align-items: center;
          @media (min-width: 992px) {
            width: 100%;
            flex: 1;
          }
          .logo {
            height: 32px;
            width: 30px;
            mask: url(../assets/logo.svg) no-repeat center;
            mask-size: cover;
            background: $red;
          }
        }
        .searchbar-wrapper {
          z-index: 998;
          padding: 0 24px;
          background: #ffffff;
          position: sticky;
          height: 100%;
          width: 300px;
          top: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          .searchbar {
            border: 1px solid $divider;
            background: #ffffff;
            width: 100%;
            border-radius: 100px;
            height: 48px;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            .searchbar-button {
              display: flex;
              justify-content: flex-start;
              align-items: center;
              flex-direction: row;
              height: 100%;
              width: 100%;
              padding-left: 8px;
              .search-input {
                display: flex;
                align-items: center;
                flex: 1;
                padding: 0 16px;
                border: none;
                &:focus {
                  outline: none;
                }
                .text {
                  line-height: 18px;;
                  font-size: 14px;
                  font-weight: 600;
                }
              }
              .icon-wrapper {
                margin: 7px 7px 7px 0;
                height: 32px;
                width: 32px;
                background-color: $red;
                border-radius: 50%;
                display: flex;
                justify-content: center;
                align-items: center;
                .icon.search {
                  background: #ffffff;
                  mask: url(../assets/search.svg) no-repeat center;
                  height: 12px;
                  width: 12px;
                }
              }
            }
          }
        }
        .side-nav {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          height: 100%;
          flex: 1;
          .side-nav-button {
            display: flex;
            align-items: center;
            padding: 5px 5px 5px 12px;
            border-radius: 21px;
            border: 1px solid $divider;
            .icon.hamburger {
              height: 16px;
              width: 16px;
            }
            .icon.profile {
              height: 30px;
              width: 30px;
              margin-left: 12px;
            }
          }
        }
      }
      .navbar-desktop-outer {
        margin: 0 auto;
        width: 100%;
        max-width: 850px;
        height: 100px;
        display: flex;
        justify-content: center;
        align-items: flex-start;
        .searchbar-wrapper {
          width: 100%;
          display: flex;
          flex-direction: row;
          background: #ffffff;
          border-radius: 32px;
          border: 1px solid $divider;
          height: 64px;
          .district-wrapper {
            height: 100%;
            width: 33.33%;
            .search-input {
              text-align: left;
              padding: 14px 24px;
              .title {
                font-size: 12px;
                font-weight: 600;
              }
              .text {
                font-size: 14px;
                font-weight: 400;
                color: #666;
              }
            }
          }
          .category-wrapper {
            display: flex;
            flex-direction: row;
            align-items: center;
            height: 100%;
            width: 33.33%;
            .divider {
              height: calc(100% - 28px);
              width: 1px;
              background: $divider;
            }
            .search-input {
              text-align: left;
              padding: 14px 24px;
              .title {
                font-size: 12px;
                font-weight: 600;
              }
              .text {
                font-size: 14px;
                font-weight: 400;
                color: #666;
              }
            }
          }
          .budget-wrapper {
            display: flex;
            flex-direction: row;
            height: 100%;
            width: 33.334%;
            justify-content: flex-start;
            align-items: center;
            .divider {
              height: calc(100% - 28px);
              width: 1px;
              background: $divider;
            }
            .search-input {
              text-align: left;
              padding: 14px 24px;
              .title {
                font-size: 12px;
                font-weight: 600;
              }
              .text {
                font-size: 14px;
                font-weight: 400;
                color: #666;
              }
            }
          }
          .icon-wrapper {
            margin: 7px 7px 7px 0;
            min-width: 48px;
            height: 48px;
            width: 48px;
            background-color: $red;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            .icon.search {
              background: #ffffff;
              mask: url(../assets/search.svg) no-repeat center;
              height: 16px;
              width: 16px;
            }
          }
        }
      }
    }
    .navbar-filter {
      position: absolute;
      top: 181;
      width: 100%;
      left: 0;
      height: calc(100vh - 181px);
      background: #000000;
      opacity: 0.7;
    }
  }
}
.navbar.openSearch {
  .navbar-desktop {
    height: 180px;
  }
}
</style>
