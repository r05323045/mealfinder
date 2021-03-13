<template>
  <div class="navbar" :class="{ openSearch: openSearch }">
    <div class="navbar-mobile">
      <div class="item-wrapper" :class="{ signIn: isAuthenticated }">
        <div class="nav-item" @click="$router.push('/map').catch(()=>{})" :class="{ active: ($route.path === '/' && !isAuthenticated) || $route.path.includes('/restaurants') || $route.path.includes('/map')}">
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
        <div class="nav-item" v-if="isAuthenticated" @click="$router.push('/').catch(()=>{})" :class="{ active: $route.path === '/' }">
          <div class="wrapper">
            <div class="icon home-icon"></div>
            <div class="text">首頁</div>
          </div>
        </div>
        <div class="nav-item" v-if="isAuthenticated" @click="$router.push('/users/history').catch(()=>{})" :class="{ active: $route.path.includes('/history') }">
          <div class="wrapper">
            <div class="icon icon-restaurant"></div>
            <div class="text">訂位</div>
          </div>
        </div>
        <div class="nav-item" @click="isAuthenticated ? $router.push('/users/center').catch(()=>{}) : $router.push('/signin').catch(()=>{})" :class="{ active: $route.path.includes === '/sign' || ($route.path.includes('/users') && !$route.path.includes('/users/notification') && !$route.path.includes('/users/history')) }">
          <div class="wrapper">
            <div class="icon user"></div>
            <div class="text" v-if="isAuthenticated">會員</div>
            <div class="text" v-if="!isAuthenticated">登入</div>
          </div>
        </div>
      </div>
    </div>
    <div class="navbar-desktop" :class="{ openSearch: openSearch, atMap: $route.path.includes('/map') }">
      <div class="navbar-desktop-inner">
        <div class="logo-wrapper">
          <div class="logo" @click="$router.push('/').catch(()=>{})"><span class="company-first-name">Meal</span><span class="company-last-name">Finder</span></div>
        </div>
        <div class="tab-wrapper" v-show="openSearch">
          <div class="condition-wrapper">
            <div class="condition">餐廳</div>
            <div class="divider"></div>
          </div>
          <div class="name-wrapper" @click="$router.push('/coupons').catch(()=>{})">
            <div class="name">優惠</div>
            <div class="divider"></div>
          </div>
        </div>
        <div class="searchbar-wrapper" v-if="!($route.path.includes('users') || $route.path.includes('map'))" v-show="!openSearch" @click="openSearch = true">
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
          <div class="side-nav-button side-nav-element" @click="showMenu = !showMenu">
            <img class="icon hamburger side-nav-element" src="../assets/hamburger.svg">
            <img class="icon profile side-nav-element" v-if="!isAuthenticated" src="../assets/default-profile.svg">
            <img class="icon profile side-nav-element" v-if="isAuthenticated" :src="currentUser.avatar">
          </div>
          <div ref="menu-wrapper" class="menu-wrapper side-nav-element" v-show="showMenu">
            <div class="menu">
              <div class="item side-nav-element" v-if="isAuthenticated" @click="$router.push('/users/center').catch(()=>{})">會員中心</div>
              <div class="item side-nav-element" v-if="isAuthenticated" @click="$router.push('/users/history').catch(()=>{})">訂位紀錄</div>
              <div class="item side-nav-element" v-if="isAuthenticated" @click="$router.push('/users/favorite').catch(()=>{})">我的收藏</div>
              <div class="item side-nav-element" @click="$router.push('/map').catch(()=>{})">探索餐廳</div>
              <div class="item side-nav-element" @click="$router.push('/coupons').catch(()=>{})">優惠</div>
              <div class="item side-nav-element" v-if="isAuthenticated" @click="$router.push('/users/purchase').catch(()=>{})">購物車</div>
              <div class="divider-wrapper side-nav-element" v-if="isAuthenticated">
                <div class="divider side-nav-element"></div>
              </div>
              <div class="item side-nav-element" v-if="!isAuthenticated" @click="$router.push('/signin').catch(()=>{})">登入</div>
              <div class="item side-nav-element" v-if="!isAuthenticated" @click="$router.push('/signup').catch(()=>{})">註冊</div>
              <div class="item side-nav-element" v-if="isAuthenticated" @click="signout">登出</div>
            </div>
          </div>
        </div>
      </div>
      <div class="navbar-desktop-middle" v-show="openSearch">
        <div class="tab-wrapper">
          <div class="condition-wrapper">
            <div class="condition">餐廳</div>
            <div class="divider"></div>
          </div>
          <div class="name-wrapper" @click="$router.push('/coupons').catch(()=>{})">
            <div class="name">優惠</div>
            <div class="divider"></div>
          </div>
        </div>
      </div>
      <div class="navbar-desktop-outer" v-show="openSearch">
        <div class="searchbar-wrapper search-input-element">
          <div class="district-wrapper search-input-element" @click.stop="openSelector('district')">
            <div class="search-input">
              <div class="title search-input-element">地區</div>
              <div class="text search-input-element">{{ selectDistrict ? selectDistrict : '附近的地區' }}</div>
            </div>
            <SelectDistrict
              :showSelector="showSelectorDistrict"
              @selectDistrict="getDistrict"
            >
            </SelectDistrict>
          </div>
          <div class="category-wrapper search-input-element" @click.stop="openSelector('category')">
            <div class="divider search-input-element"></div>
            <div class="search-input search-input-element">
              <div class="title search-input-element">類型</div>
              <div class="text search-input-element">{{ selectCategory ? selectCategory : '所有類型' }}</div>
            </div>
            <SelectCategory
              :showSelector="showSelectorCategory"
              @selectCategory="getCategory"
            >
            </SelectCategory>
          </div>
          <div class="budget-wrapper search-input-element" @click.stop="openSelector('price')">
            <div class="divider"></div>
            <div class="search-input search-input-element">
              <div class="title search-input-element">預算</div>
              <div class="text search-input-element" v-if="selectPrice.length !== 2">價格不限</div>
              <div class="text search-input-element" v-if="selectPrice.length === 2">{{ selectPrice[0] | priceFormat }} - {{ selectPrice[1] === 9999 ? maxPrice : selectPrice[1] | priceFormat }}<span v-if="selectPrice[1] === 9999"> +</span></div>
            </div>
            <SelectPrices
              class="search-input-element"
              :showSelector="showSelectorPrice"
              @selectPrice="getPrice">
            </SelectPrices>
          </div>
          <div class="icon-wrapper" @click="startSearching">
            <div class="icon search"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="navbar-filter" v-show="openSearch" @click="openSearch = false"></div>
  </div>
</template>

<script>

import SelectDistrict from '@/components/SelectDistrict.vue'
import SelectCategory from '@/components/SelectCategory.vue'
import SelectPrices from '@/components/SelectPrice.vue'
import { Toast } from '@/utils/helpers'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      openSearch: false,
      showMenu: false,
      showSelectorDistrict: false,
      showSelectorCategory: false,
      showSelectorPrice: false,
      selectPrice: [],
      maxPrice: 9999,
      selectCategory: '',
      selectDistrict: ''
    }
  },
  components: {
    SelectDistrict,
    SelectCategory,
    SelectPrices
  },
  computed: {
    ...mapState(['currentUser', 'isAuthenticated'])
  },
  mounted () {
    document.body.addEventListener('click', (e) => {
      const sideNavElement = e.target ? e.target.classList.contains('side-nav-element') : false
      const searshInputElement = e.target ? e.target.classList.contains('search-input-element') : false
      if (this.showMenu && !sideNavElement) {
        if (this.$refs['menu-wrapper']) {
          this.$refs['menu-wrapper'].style.display = 'none'
          this.showMenu = false
        }
      } else if (!searshInputElement) {
        this.showSelectorDistrict = false
        this.showSelectorCategory = false
        this.showSelectorPrice = false
      }
      e.stopPropagation()
    })
  },
  methods: {
    clickSearchBar () {
      this.openSearch = !this.openSearch
      this.clickSearch = !this.clickSearch
    },
    openSelector (target) {
      if (target === 'district') {
        this.showSelectorDistrict = true
        this.showSelectorCategory = false
        this.showSelectorPrice = false
      } else if (target === 'category') {
        this.showSelectorCategory = true
        this.showSelectorDistrict = false
        this.showSelectorPrice = false
      } else if (target === 'price') {
        this.showSelectorPrice = true
        this.showSelectorDistrict = false
        this.showSelectorCategory = false
      }
    },
    signout () {
      this.$store.commit('revokeAuthentication')
      this.showMenu = false
      if (this.$route.path.includes('/users')) {
        this.$router.push('/signin').catch(() => {})
      } else {
        this.$router.push('/').catch(() => {})
      }
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
      Toast.fire({
        icon: 'success',
        title: '成功登出'
      })
    },
    getCategory (category) {
      this.selectCategory = category
      this.showSelectorCategory = false
    },
    getDistrict (district) {
      this.selectDistrict = district
      this.showSelectorDistrict = false
    },
    getPrice (data) {
      this.selectPrice = data.price
      this.maxPrice = data.max
      this.showSelectorPrice = false
    },
    startSearching () {
      const queryStringArray = ['']
      if (this.selectCategory) {
        queryStringArray.push(`category=${this.selectCategory}`)
      }
      if (this.selectDistrict) {
        queryStringArray.push(`district=${this.selectDistrict}`)
      }
      if (this.selectPrice.length === 2) {
        queryStringArray.push(`low=${this.selectPrice[0]}`)
        queryStringArray.push(`high=${this.selectPrice[1]}`)
      }
      let queryString = '?page=1'
      if (queryStringArray.length > 1) {
        queryString += queryStringArray.join('&')
      }
      this.$router.push(`/map${queryString}`)
    }
  }
}
</script>

<style lang="scss" scoped>
$ultimategray: #939597;
$divider: #E6ECF0;
$red: rgb(255, 56, 92);
.navbar {
  background: #ffffff;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 6px 16px;
  .navbar-desktop {
    display: none;
  }
  .navbar-mobile {
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
          .icon.home-icon {
            mask: url(../assets/home.svg) no-repeat center;
          }
          .icon-restaurant {
            margin: 0 auto;
            background-color: $ultimategray;
            width: 100%;
            height: 100%;
            max-height: 21px;
            max-width: 21px;
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
          .icon-restaurant {
            background: $red;
          }
          .text {
            color: #222222;
          }
        }
      }
    }
  }
  @media (min-width: 768px) {
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    .navbar-mobile {
      display: none;
    }
    .navbar-desktop {
      display: block;
      border-bottom: 1px solid $divider;
      background: #ffffff;
      width: calc(100% - 80px);
      margin: auto;
      max-width: 1440px;
      padding: 0 40px;
      @media (min-width: 992px) {
        width: calc(100% - 160px);
        padding: 0 80px;
      }
      .navbar-desktop-inner {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        height: 80px;
        .tab-wrapper {
          display: none;
          @media (min-width: 992px) {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
          }
          .condition-wrapper {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            &:hover {
              color: #666;
              .divider {
                background: #666;
              }
            }
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
            cursor: pointer;
            &:hover {
              color: #666;
              .divider {
                background: #666;
              }
            }
            .name {
              font-size: 16px;
              line-height: 20px;
              font-weight: 400;
              padding: 10px 16px;
              white-space: nowrap;
            }
            .divider {
              width: 0%;
              height: 2px
            }
          }
        }
        .logo-wrapper {
          height: 100%;
          display: flex;
          align-items: center;
          @media (min-width: 992px) {
            width: 100%;
            flex: 1;
          }
          .logo {
            cursor: pointer;
            font-size: 24px;
            line-height: 24px;
            color: $red;
            font-weight: 800;
            text-align: left;
            height: 24px;
            .company-last-name {
              color: #000000;
              margin-left: 4px;
            }
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
              cursor: pointer;
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
            cursor: pointer;
            display: flex;
            align-items: center;
            padding: 5px 5px 5px 12px;
            border-radius: 21px;
            border: 1px solid $divider;
            .icon.hamburger {
              height: 16px;
              width: 16px;
              object-fit: cover;
            }
            .icon.profile {
              border-radius: 100%;
              height: 30px;
              width: 30px;
              margin-left: 12px;
              object-fit: cover;
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
      .navbar-desktop-middle {
        display: none;
        @media (min-width: 768px) {
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          height: 80px;
        }
        @media (min-width: 992px) {
          display: none;
        }
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
            }
            .divider {
              width: 25%;
              height: 2px;
              background: #222222;
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
            }
            .divider {
              width: 50%;
              height: 2px;
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
    .navbar-desktop.atMap {
      max-width: none;
      padding: 0 24px;
      width: calc(100% - 48px);
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
  position: fixed;
  width: 100%;
}
</style>
