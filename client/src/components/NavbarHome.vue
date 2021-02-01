<template>
  <div class="navbar-home">
    <div class="navbar-desktop" :class="[{ openSearch: openSearch }, { clickSearch: clickSearch }, { defaultState: defaultState }]">
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
        <div class="searchbar-wrapper" v-show="!openSearch" @click="clickSearchBar">
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
          <div class="side-nav-button" @click="showMenu = !showMenu">
            <img class="icon hamburger" src="../assets/hamburger.svg">
            <img class="icon profile" src="../assets/default-profile.svg">
          </div>
          <div ref="menu-wrapper" class="menu-wrapper" v-show="showMenu">
            <div class="menu">
              <div class="item" @click="$router.push('/users/center').catch(()=>{})">會員中心</div>
              <div class="item" @click="$router.push('/users/history').catch(()=>{})">訂位紀錄</div>
              <div class="item" @click="$router.push('/users/favorite').catch(()=>{})">我的收藏</div>
              <div class="item" @click="$router.push('/coupons').catch(()=>{})">優惠</div>
              <div class="item" @click="$router.push('/users/purchase').catch(()=>{})">購物車</div>
              <div class="item" @click="$router.push('/users/notification').catch(()=>{})">通知</div>
              <div class="divider-wrapper">
                <div class="divider"></div>
              </div>
              <div class="item">登出</div>
            </div>
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
    <div class="navbar-filter" v-show="clickSearch" @click="clickSearchBar"></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      signIn: true,
      openSearch: true,
      clickSearch: false,
      defaultState: true,
      showMenu: false
    }
  },
  mounted () {
    document.body.addEventListener('click', (e) => {
      const parentIsSideNav = e.target.parentElement ? e.target.parentElement.classList.contains('side-nav-button') : false
      const elementIsSideNav = e.target ? e.target.classList.contains('side-nav-button') : false
      const clickButton = parentIsSideNav || elementIsSideNav
      const clickOtherSide = !(e.target.classList.contains('menu-wrapper') || e.target.parentElement.classList.contains('menu'))
      if (this.showMenu && clickOtherSide && !clickButton) {
        if (this.$refs['menu-wrapper']) {
          this.$refs['menu-wrapper'].style.display = 'none'
          this.showMenu = false
        }
      }
      e.stopPropagation()
    })
  },
  methods: {
    clickSearchBar () {
      this.openSearch = !this.openSearch
      this.clickSearch = !this.clickSearch
    }
  }
}
</script>

<style lang="scss" scoped>
$ultimategray: #939597;
$divider: #E6ECF0;
$red: rgb(255, 56, 92);
.navbar-home {
  display: none;
  @media (min-width: 992px) {
    display: block;
    position: absolute;
    top: 50px;
    left: 0;
    z-index: 999;
    width: 100%;
    .navbar-desktop {
      display: block;
      width: 100%;
      background: transparent;
      width: calc(100% - 160px);
      margin: auto;
      max-width: 1440px;
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
            cursor: pointer;
            &:hover {
              filter: brightness(0.8)
            }
            .condition {
              font-size: 16px;
              line-height: 20px;
              font-weight: 400;
              padding: 10px 16px;
              white-space: nowrap;
              color: #ffffff;
            }
            .divider {
              width: 25%;
              height: 2px;
              background: #ffffff;
            }
          }
          .name-wrapper {
            display: flex;
            flex-direction: column;
            justify-content: center;
            cursor: pointer;
            &:hover {
              filter: brightness(0.8)
            }
            .name {
              font-size: 16px;
              line-height: 20px;
              font-weight: 400;
              padding: 10px 16px;
              white-space: nowrap;
              color: #ffffff;
            }
            .divider {
              width: 50%;
              height: 2px;
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
            width: 102px;
            mask: url(../assets/fake-logo.svg) no-repeat center;
            mask-size: cover;
            background: #ffffff;
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
          position: relative;
          .side-nav-button {
            cursor: pointer;
            display: flex;
            align-items: center;
            padding: 5px 5px 5px 12px;
            border-radius: 21px;
            border: 1px solid $divider;
            background: #ffffff;
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
          .menu-wrapper {
            z-index: 999;
            box-shadow: rgba(0, 0, 0, 0.12) 0px 6px 16px;
            position: absolute;
            top: 72px;
            width: 240px;
            background: #ffffff;
            border-radius: 15px;
            .menu {
              margin: 12px 16px;
              width: calc(100% - 32px);
              display: flex;
              flex-direction: column;
              justify-content: flex-start;
              align-items: center;
              .item {
                cursor: pointer;
                width: 100%;
                flex: 1;
                font-size: 14px;
                font-weight: 600;
                text-align: left;
                padding: 12px 16px;
                line-height: 18px;
                &:hover {
                  background: $divider;
                }
              }
              .divider-wrapper {
                width: 100%;
                .divider {
                  position: absolute;
                  left: 0;
                  right: 0;
                  height: 1px;
                  background: $divider;
                }
              }
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
          position: relative;
          .district-wrapper {
            border-top-left-radius: 32px;
            border-bottom-left-radius: 32px;
            height: 100%;
            width: 33.33%;
            cursor: pointer;
            &:hover {
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
          .category-wrapper {
            height: 100%;
            width: 33.33%;
            cursor: pointer;
            display: flex;
            flex-direction: row;
            align-items: center;
            height: 100%;
            width: 33.33%;
            &:hover {
              background: $divider;
            }
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
            border-top-right-radius: 32px;
            border-bottom-right-radius: 32px;
            height: 100%;
            width: 33.33%;
            display: flex;
            flex-direction: row;
            height: 100%;
            width: 33.334%;
            justify-content: flex-start;
            align-items: center;
            cursor: pointer;
            &:hover {
              background: $divider;
            }
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
            position: absolute;
            top: 7px;
            right: 7px;
            min-width: 48px;
            height: 48px;
            width: 48px;
            background-color: $red;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            &:hover {
              filter: brightness(0.8)
            }
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
    .navbar-desktop.openSearch {
      height: 180px;
    }
    .navbar-desktop.defaultState {
      background-color: transparent;
      .navbar-desktop-inner {
        background-color: transparent;
      }
      .navbar-desktop-outer {
        background-color: transparent;
      }
    }
  }
}
</style>
