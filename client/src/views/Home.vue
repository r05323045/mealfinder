<template>
  <div class="home" ref="home">
    <Navbar v-show="scrollY > 58"></Navbar>
    <div class="page-container" ref="page-container">
      <div class="banner">
        <div v-if="windowWidth < 768" class="searchbar-wrapper-outside" :class="{ toFront: scrollY > 50 && scrollUp }">
          <div class="searchbar" @click="showModal = !showModal">
            <input v-if="false" class="search-input" v-show="scrollY > 50 && scrollUp">
            <div class="wrapper" v-show="scrollY > 50 && scrollUp">
              <div class="icon search"></div>
              <div class="text">想吃什麼？</div>
            </div>
          </div>
        </div>
        <div class="searchbar-wrapper-inner">
          <div class="searchbar" @click="showModal = !showModal">
            <input v-if="false" class="search-input">
            <div class="icon-wrapper">
              <div class="icon search"></div>
              <div class="text">想吃什麼？</div>
            </div>
          </div>
        </div>
        <NavbarHome v-if="windowWidth >= 768" v-show="scrollY <= 58"></NavbarHome>
        <div class="background-image"></div>
        <div class="banner-container">
          <div class="wrapper">
            <div class="text">
              <span>今晚...</span><br>
              <span>我想來點</span>
            </div>
            <div class="button" @click="$router.push('/map')">瀏覽周邊餐廳</div>
          </div>
        </div>
      </div>
      <div class="area">
        <div class="title">前往熱門地區</div>
        <div v-if="windowWidth < 768" class="district-deck">
          <div class="district" @click="$router.push('/map?district=大安區')">
            <div class="background">
              <div class="image" style="background: url(https://images.unsplash.com/photo-1597413097376-a3fff34811f2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80) no-repeat center / cover"></div>
              <div class="text-wrapper">
                <span class="text">大安區</span>
              </div>
            </div>
          </div>
          <div class="district" @click="$router.push('/map?district=中山區')">
            <div class="background">
              <div class="image" style="background: url(https://images.unsplash.com/photo-1594614296789-8080214c6fca?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=675&q=80) no-repeat center / cover"></div>
              <div class="text-wrapper">
                <span class="text">中山區</span>
              </div>
            </div>
          </div>
        </div>
        <div v-if="windowWidth < 768" class="district-deck">
          <div class="district" @click="$router.push('/map?district=信義區')">
            <div class="background">
              <div class="image" style="background: url(https://images.unsplash.com/photo-1580281250542-2995bf0c15ae?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80) no-repeat center / cover"></div>
              <div class="text-wrapper">
                <span class="text">信義區</span>
              </div>
            </div>
          </div>
          <div class="district" @click="$router.push('/map?district=中正區')">
            <div class="background">
              <div class="image" style="background: url(https://images.unsplash.com/photo-1547211453-719b1bdec5f6?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80) no-repeat center / cover"></div>
              <div class="text-wrapper">
                <span class="text">中正區</span>
              </div>
            </div>
          </div>
        </div>
        <div v-if="windowWidth < 768" class="district-deck">
          <div class="district" @click="$router.push('/map?district=松山區')">
            <div class="background">
              <div class="image" style="background: url(https://images.unsplash.com/photo-1552993873-0dd1110e025f?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=675&q=80) no-repeat center / cover"></div>
              <div class="text-wrapper">
                <span class="text">松山區</span>
              </div>
            </div>
          </div>
          <div class="district"  @click="$router.push('/map')">
            <div class="background">
              <div class="image" style="background: url(https://images.unsplash.com/photo-1502951364727-7acb8ea79a39?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=675&q=80) no-repeat center / cover"></div>
              <div class="text-wrapper">
                <span class="text">更多地區</span>
              </div>
            </div>
          </div>
        </div>
        <div v-if="windowWidth >= 768" class="district-deck-desktop">
          <div class="district" @click="$router.push('/map?district=大安區')">
            <div class="background top">
              <div class="image" style="background: url(https://images.unsplash.com/photo-1597413097376-a3fff34811f2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80) no-repeat center / cover"></div>
              <div class="text-wrapper">
                <span class="text">大安區</span>
              </div>
            </div>
          </div>
          <div class="district" @click="$router.push('/map?district=松山區')">
            <div class="background top">
              <div class="image" style="background: url(https://images.unsplash.com/photo-1552993873-0dd1110e025f?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=675&q=80) no-repeat center / cover"></div>
              <div class="text-wrapper">
                <span class="text">松山區</span>
              </div>
            </div>
          </div>
        </div>
        <div v-if="windowWidth >= 768" class="district-deck-desktop">
          <div class="district" @click="$router.push('/map?district=信義區')">
            <div class="background bottom">
              <div class="image" style="background: url(https://images.unsplash.com/photo-1580281250542-2995bf0c15ae?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80) no-repeat center / cover"></div>
              <div class="text-wrapper">
                <span class="text">信義區</span>
              </div>
            </div>
          </div>
          <div class="district" @click="$router.push('/map?district=中正區')">
            <div class="background bottom">
              <div class="image" style="background: url(https://images.unsplash.com/photo-1547211453-719b1bdec5f6?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80) no-repeat center / cover"></div>
              <div class="text-wrapper">
                <span class="text">中正區</span>
              </div>
            </div>
          </div>
          <div class="district"  @click="$router.push('/map')">
            <div class="background bottom">
              <div class="image" style="background: url(https://images.unsplash.com/photo-1502951364727-7acb8ea79a39?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=675&q=80) no-repeat center / cover"></div>
              <div class="text-wrapper">
                <span class="text">更多地區</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="category">
        <div class="category-container">
          <div class="title">探索更多美食</div>
          <div class="description">對於某些料理情有獨鍾嗎？我們都幫你整理好了</div>
          <div class="swiper-container">
            <div class="swiper-wrapper">
              <div class="swiper-slide" @click="$router.push('/map?category=日式料理')">
                <div class="inner-wrapper">
                  <div class="background">
                    <div class="image" style="background: url(https://images.unsplash.com/photo-1496112774951-bf41010eed5e?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=675&q=80) no-repeat center / cover"></div>
                  </div>
                </div>
                <div class="category-name">日式料理</div>
                <div class="category-intro">拉麵、壽司、燒肉等料理等你來品嚐</div>
              </div>
              <div class="swiper-slide" @click="$router.push('/map?category=港式料理')">
                <div class="inner-wrapper">
                  <div class="background">
                    <div class="image" style="background: url(https://images.unsplash.com/photo-1562492901-e7021f6af8c2?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=675&q=80) no-repeat center / cover"></div>
                  </div>
                </div>
                <div class="category-name">港式料理</div>
                <div class="category-intro">喜歡香港風味的你，不能錯過</div>
              </div>
              <div class="swiper-slide" @click="$router.push('/map?category=韓式料理')">
                <div class="inner-wrapper">
                  <div class="background">
                    <div class="image" style="background: url(https://images.unsplash.com/photo-1498654896293-37aacf113fd9?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=675&q=80) no-repeat center / cover"></div>
                  </div>
                </div>
                <div class="category-name">韓式料理</div>
                <div class="category-intro">聊天、聚餐的好選擇</div>
              </div>
              <div class="swiper-slide" @click="$router.push('/map?category=早午餐')">
                <div class="inner-wrapper">
                  <div class="background">
                    <div class="image" style="background: url(https://images.unsplash.com/photo-1455853739633-8c94c03d8121?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80) no-repeat center / cover"></div>
                  </div>
                </div>
                <div class="category-name">早午餐</div>
                <div class="category-intro">精選台北特色人氣早午餐</div>
              </div>
              <div class="swiper-slide" @click="$router.push('/map?category=餐酒館')">
                <div class="inner-wrapper">
                  <div class="background">
                    <div class="image" style="background: url(https://images.unsplash.com/photo-1468072114808-903e572b8ead?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=675&q=80) no-repeat center / cover"></div>
                  </div>
                </div>
                <div class="category-name">餐酒館</div>
                <div class="category-intro">放鬆你的夜晚，搜羅不同風格餐酒館</div>
              </div>
              <div class="swiper-slide" @click="$router.push('/map')">
                <div class="inner-wrapper">
                  <div class="background">
                    <div class="image" style="background: url(https://images.unsplash.com/photo-1543992321-cefacfc2322e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1332&q=80) no-repeat center / cover"></div>
                  </div>
                </div>
                <div class="category-name">更多類型</div>
                <div class="category-intro">尋找更多不同特色餐廳</div>
              </div>
            </div>
            <div class="swiper-button-next"></div>
            <div class="swiper-button-prev"></div>
          </div>
        </div>
      </div>
      <div class="do-more">
        <div class="category-container">
          <div class="title">尋找更多</div>
          <div class="swiper-container">
            <div class="swiper-wrapper">
              <div class="swiper-slide" @click="$router.push('/coupons')">
                <div class="inner-wrapper">
                  <div class="background">
                    <div class="image" style="background: url(https://images.unsplash.com/photo-1513639776629-7b61b0ac49cb?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTZ8fHByb21vdGlvbnxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80) no-repeat center / cover"></div>
                  </div>
                </div>
                <div class="category-name">購買餐券</div>
              </div>
              <div class="swiper-slide" @click="$router.push('/map')">
                <div class="inner-wrapper">
                  <div class="background">
                    <div class="image" style="background: url(https://images.unsplash.com/photo-1548345680-f5475ea5df84?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=675&q=80) no-repeat center / cover"></div>
                  </div>
                </div>
                <div class="category-name">地圖探索</div>
              </div>
              <div class="swiper-slide" @click="$router.push('/restaurants')">
                <div class="inner-wrapper">
                  <div class="background">
                    <div class="image" style="background: url(https://images.unsplash.com/photo-1556155092-490a1ba16284?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80) no-repeat center / cover"></div>
                  </div>
                </div>
                <div class="category-name">餐廳清單</div>
              </div>
            </div>
            <div class="swiper-button-next"></div>
            <div class="swiper-button-prev"></div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
    <MobileSearch
      :showModal="showModal"
      @closeModal="closeFilter"
    >
    </MobileSearch>
  </div>
</template>

<script>

import Swiper from 'swiper/swiper-bundle.js'
import 'swiper/swiper-bundle.css'
import MobileSearch from '@/components/MobileSearch.vue'
import Navbar from '@/components/Navbar.vue'
import NavbarHome from '@/components/NavbarHome.vue'
import Footer from '@/components/Footer.vue'

export default {
  components: {
    Navbar,
    Footer,
    NavbarHome,
    MobileSearch
  },
  name: 'Home',
  data () {
    return {
      scrollY: 0,
      scrollUp: false,
      showModal: false,
      windowWidth: window.innerWidth
    }
  },
  mounted () {
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize)
    })
    // eslint-disable-next-line no-unused-vars
    const swiper = new Swiper('.swiper-container', {
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
      breakpoints: {
        992: {
          slidesPerView: 3.0,
          spaceBetween: '18%'
        },
        768: {
          slidesPerView: 2.1,
          spaceBetween: '15%'
        },
        576: {
          slidesPerView: 1.5,
          spaceBetween: '15%'
        },
        375: {
          slidesPerView: 1.1,
          spaceBetween: '15%',
          slidesPerGroup: 1
        }
      }
    })
    window.addEventListener('scroll', this.onScroll, { passive: true })
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.onResize)
  },
  watch: {
    showModal () {
      if (this.showModal) {
        this.$refs['page-container'].style.overflow = 'hidden'
        this.$refs.home.style.overflow = 'hidden'
        document.body.style.overflow = 'hidden'
      } else {
        this.$refs['page-container'].style.overflow = 'auto'
        this.$refs.home.style.overflow = 'scroll'
        document.body.style.overflow = 'auto'
      }
    }
  },
  methods: {
    onScroll (e) {
      this.scrollUp = this.scrollY > window.scrollY
      this.scrollY = window.scrollY
    },
    closeFilter (isEditing) {
      this.showModal = false
    },
    onResize () {
      this.windowWidth = window.innerWidth
    }
  }
}
</script>

<style lang="scss" scoped>
$yellow: #F5DF4D;
$ultimategray: #939597;
$divider: #E6ECF0;
$red: rgb(255, 56, 92);
.home {
  height: auto;
  overflow-y: scroll;
  overflow-x: hidden;
  overflow: hidden;
  .page-container {
    .searchbar-wrapper-outside {
      z-index: -999;
      width: calc(100% - 48px);
      position: fixed;
      padding: 16px 24px;
      top: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      @media (min-width: 768px) {
        display: none;
      }
      .searchbar {
        padding: 0 4px 0 12px;
        background: #ffffff;
        width: 100%;
        border-radius: 100px;
        height: 48px;
        display: flex;
        justify-content: center;
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
          justify-content: flex-start;
          line-height: 18px;
          .icon {
            margin: auto 0;
            padding-right: 16px;
            background-color: #222222;
            height: 16px;
            width: 16px;
          }
          .icon.search {
            mask: url(../assets/search.svg) no-repeat center;
          }
          .text {
            font-size: 16px;
            font-weight: 400;
            color: rgb(34,34,34)
          }
        }
      }
    }
    .searchbar-wrapper-outside.toFront {
      z-index: 997;
      background: #ffffff;
      .searchbar {
        box-shadow: rgba(0, 0, 0, 0.12) 0px 6px 16px;
      }
    }
    .searchbar-wrapper.leave-top {
      background: #ffffff;
    }
    .banner {
      overflow: hidden;
      height: 538px;
      width: 100%;
      position: relative;
      background: url(https://images.unsplash.com/photo-1581781870027-04212e231e96?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=634&q=80) no-repeat center;
      background-size: cover;
      @media (min-width: 768px) {
        background: none;
        height: calc(min(588/744 * 100vw, 85vh) + 50px);
      }
      @media (min-width: 992px) {
        height: calc(min(563/1128 * 100vw, 85vh) + 58px);
      }
      .searchbar-wrapper-inner {
        width: calc(100% - 48px);
        z-index: 997;
        background: transparent;
        position: absolute;
        padding: 16px 24px;
        top: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        @media (min-width: 768px) {
          display: none;
        }
        .searchbar {
          box-shadow: rgba(0, 0, 0, 0.12) 0px 6px 16px;
          padding: 0 4px 0 12px;
          background: #ffffff;
          width: 100%;
          border-radius: 100px;
          height: 48px;
          display: flex;
          justify-content: center;
          align-items: center;
          .search-input {
            border: none;
            &:focus {
              outline: none;
            }
          }
          .icon-wrapper {
            flex: 1;
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            line-height: 18px;
            .icon {
              margin: auto 0;
              padding-right: 16px;
              background-color: #222222;
              height: 16px;
              width: 16px;
            }
            .icon.search {
              mask: url(../assets/search.svg) no-repeat center;
            }
            .text {
              font-size: 16px;
              font-weight: 400;
              color: rgb(34,34,34)
            }
          }
        }
      }
      .background-image {
        z-index: -1;
        height: 100%;
        width: 100%;
        filter: brightness(0.6);
        @media (min-width: 768px) {
          background: url(https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1950&q=80) no-repeat center;
          background-size: cover;
        }
      }
      .banner-container {
        position: absolute;
        top: 50%;
        left: 0;
        right: 0;
        bottom: 0;
        @media (min-width: 768px) {
          top: 0;
        }
        .wrapper {
          @media (min-width: 768px) {
            width: 100%;
            height: calc(100% - 348px);
            padding: 308px 40px 40px 40px;
            display: flex;
            align-items: flex-start;
            justify-content: center;
            flex-direction: column;
          }
          @media (min-width: 992px) {
            padding: 204px 80px 40px 80px;
            height: calc(100% - 244px);
            max-width: 1440px;
            margin: auto;
          }
          .text {
            text-align: left;
            margin: 24px 0 0 24px;
            color: #ffffff;
            font-size: 32px;
            line-height: 48px;
            font-weight: 600;
            @media (min-width: 768px) {
              margin: 0;
              font-size: 42px;
              line-height: 48px;
            }
            @media (min-width: 992px) {
              margin: 0;
              font-size: 52px;
              line-height: 58px;
            }
          }
          .button {
            cursor: pointer;
            margin: 24px 0 0 24px;
            float: left;
            background: #ffffff;
            padding: 7px 15px;
            border-radius: 8px;
            line-height: 18px;
            font-size: 14px;
            font-weight: 600;
            @media (min-width: 768px) {
              margin: 24px 0 0 0;
            }
            &:hover {
              transition: ease-in-out 0.3s;
              background: #000000;
              color: #ffffff;
            }
          }
        }
      }
    }
    .area {
      margin-top: 40px;
      padding: 0 24px;
      @media (min-width: 768px) {
        padding: 0 40px;
        margin: 64px auto 0;
      }
      @media (min-width: 992px) {
        padding: 0 80px;
        max-width: 1440px;
      }
      .title {
        height: 40px;
        font-size: 22px;
        font-weight: 700;
        text-align: left;
        line-height: 22px;
        @media (min-width: 768px) {
          font-size: 26px;
          line-height: 30px;
          padding-bottom: 16px;
        }
        @media (min-width: 992px) {
          font-size: 32px;
          line-height: 36px;
          padding-bottom: 16px;
        }
      }
      .district-deck {
        display: flex;
        flex-direction: row;
        margin: 10px 0;
        @media (min-width: 768px) {
          display: none;
        }
        .district {
          margin: 0 5px;
          flex: 1;
          width: 50%;
          .background {
            cursor: pointer;
            padding-bottom: 100%;
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            .image {
              background: url(https://images.unsplash.com/photo-1589251204996-3367cc27f084?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=779&q=80) no-repeat center;
              background-size: cover;
              border-radius: 8px;
              position: absolute;
              top: 0;
              bottom: 0;
              right: 0;
              left:0;
            }
            .text-wrapper {
              position: absolute;
              top: 0;
              bottom: 0;
              right: 0;
              left:0;
              display: flex;
              justify-content: center;
              align-items: center;
              .text {
                color: #ffffff;
                font-weight: 600;
                font-size: 18px;
              }
            }
            &:hover {
              transform: scale(1.02);
              transition: ease-in-out 0.3s;
              .image {
                filter: brightness(0.9);
              }
            }
          }
        }
      }
      .district-deck-desktop {
        display: none;
        @media (min-width: 768px) {
          display: flex;
          flex-direction: row;
          margin: 10px 0;
        }
        .district {
          margin: 5px 10px;
          flex: 1;
          width: 50%;
          .background {
            cursor: pointer;
            padding-bottom: 66.7%;
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            .image {
              background: url(https://images.unsplash.com/photo-1589251204996-3367cc27f084?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=779&q=80) no-repeat center;
              background-size: cover;
              border-radius: 8px;
              filter: brightness(.6);
              position: absolute;
              top: 0;
              bottom: 0;
              right: 0;
              left:0;
            }
            .text-wrapper {
              position: absolute;
              top: 0;
              bottom: 0;
              right: 0;
              left:0;
              display: flex;
              justify-content: center;
              align-items: center;
              .text {
                color: #ffffff;
                font-weight: 600;
                font-size: 18px;
              }
            }
            &:hover {
              transform: scale(1.02);
              transition: ease-in-out 0.3s;
              .image {
                filter: brightness(0.9);
              }
            }
          }
          .background.bottom {
            padding-bottom: 100%;
          }
        }
      }
    }
    .category {
      background: #000000;
      color: #ffffff;
      margin-top: 40px;
      padding: 24px 0 32px 24px;
      @media (min-width: 768px) {
        margin-top: 64px;
        padding: 40px;
      }
      @media (min-width: 992px) {
        padding: 40px 80px 40px 80px;
      }
      .category-container {
        width: 100%;
        max-width: 1440px;
        margin: auto;
        .title {
          height: 40px;
          font-size: 22px;
          font-weight: 700;
          text-align: left;
          line-height: 22px;
          @media (min-width: 992px) {
            font-size: 32px;
            line-height: 36px;
            margin-bottom: 8px;
          }
        }
        .description {
          text-align: left;
          height: 34px;
          line-height: 18px;
          font-size: 14px;
          font-weight: 700;
          margin-bottom: 8px;
        }
        .swiper-container {
          width: 100%;
          height: 100%;
          position: relative;
          overflow: hidden;
          .swiper-wrapper {
            height: 100%;
            .swiper-slide {
              text-align: center;
              font-size: 18px;
              width: 50%;
              .inner-wrapper {
                cursor: pointer;
                width: 100%;
                .background {
                  padding-bottom: 100%;
                  position: relative;
                  .image {
                    background: url(https://images.unsplash.com/photo-1496113912021-34ed23aad177?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=634&q=80) no-repeat center;
                    background-size: cover;
                    border-radius: 8px;
                    position: absolute;
                    top: 0;
                    bottom: 0;
                    right: 0;
                    left:0;
                    @media (min-width: 768px) {
                      filter: brightness(0.8);
                    }
                  }
                }
                &:hover {
                  transform: scale(1.02);
                  transition: ease-in-out 0.3s;
                  .background {
                    .image {
                      filter: brightness(1);
                    }
                  }
                }
              }
              .category-name {
                margin-top: 8px;
                text-align: left;
                font-size: 18px;
                font-weight: 700;
                line-height: 22px;
              }
              .category-intro {
                margin-top: 4px;
                text-align: left;
                font-size: 14px;
                line-height: 18px;
              }
            }
          }
          .swiper-button-next,
          .swiper-button-prev {
            display: none;
            @media (min-width: 768px) {
              display: block;
              position: absolute;
              right: 0rem;
              top: calc(50% - 1.5rem);
              background: #ffffff;
              border-radius: 50%;
              box-shadow: 1px 1px 2px 0 rgba(0,0,0,0.2);
              width: 3rem;
              height: 3rem;
              &:hover {
                transform: scale(1.05);
                transition: ease-in-out 0.3s;
              }
              &:focus {
                outline: none;
              }
              &::after {
                width: 3rem;
                height: 3rem;
                line-height: 3rem;
                font-size: 1.5rem;
                font-weight: 700;
                color: $ultimategray;
              }
            }
          }
          .swiper-button-prev {
            left: 0;
          }
        }
      }
    }
    .do-more {
      margin-top: 24px;
      padding: 24px 0 32px 24px;
      @media (min-width: 768px) {
        padding: 40px;
      }
      @media (min-width: 992px) {
        padding: 40px 80px 40px 80px;
      }
      .category-container {
        width: 100%;
        max-width: 1440px;
        margin: auto;
        .title {
          height: 40px;
          font-size: 22px;
          font-weight: 700;
          text-align: left;
          line-height: 22px;
          @media (min-width: 992px) {
            padding-bottom: 16px;
            font-size: 32px;
            line-height: 36px;
            margin-bottom: 8px;
          }
        }
        .swiper-container {
          width: 100%;
          height: 100%;
          position: relative;
          overflow: hidden;
          .swiper-wrapper {
            height: 100%;
            .swiper-slide {
              text-align: center;
              font-size: 18px;
              width: 50%;
              .inner-wrapper {
                cursor: pointer;
                width: 100%;
                .background {
                  padding-bottom: 66.7%;
                  position: relative;
                  .image {
                    background: url(https://images.unsplash.com/photo-1496113912021-34ed23aad177?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=634&q=80) no-repeat center;
                    background-size: cover;
                    border-radius: 8px;
                    position: absolute;
                    top: 0;
                    bottom: 0;
                    right: 0;
                    left:0;
                    @media (min-width: 768px) {
                      filter: brightness(0.8);
                    }
                  }
                }
                &:hover {
                  transform: scale(1.02);
                  transition: ease-in-out 0.3s;
                  .background {
                    .image {
                      filter: brightness(1);
                    }
                  }
                }
              }
              .category-name {
                margin-top: 8px;
                text-align: left;
                font-size: 18px;
                font-weight: 700;
                line-height: 22px;
              }
            }
          }
          .swiper-button-next,
          .swiper-button-prev {
            display: none;
            @media (min-width: 768px) {
              display: block;
              position: absolute;
              right: 0rem;
              top: calc(50% - 1.5rem);
              background: #ffffff;
              border-radius: 50%;
              box-shadow: 1px 1px 2px 0 rgba(0,0,0,0.2);
              width: 3rem;
              height: 3rem;
              &:hover {
                transform: scale(1.05);
                transition: ease-in-out 0.3s;
              }
              &:focus {
                outline: none;
              }
              &::after {
                width: 3rem;
                height: 3rem;
                line-height: 3rem;
                font-size: 1.5rem;
                font-weight: 700;
                color: $ultimategray;
              }
            }
            @media (min-width: 992px) {
              display: none;
            }
          }
          .swiper-button-prev {
            left: 0;
          }
        }
      }
    }
    .find-more {
      margin: 40px 0;
      padding: 0 24px;
      @media (min-width: 768px) {
        padding: 0 40px;
      }
      @media (min-width: 992px) {
        padding: 0 80px;
      }
      @media (min-width: 1600px) {
        width: 100%;
        max-width: 1440px;
        margin: 40px auto;
      }
      .title {
        height: 40px;
        font-size: 22px;
        font-weight: 700;
        text-align: left;
        line-height: 22px;
        @media (min-width: 768px) {
          font-size: 26px;
          line-height: 30px;
          margin-bottom: 8px;
        }
        @media (min-width: 992px) {
          font-size: 32px;
          line-height: 36px;
          margin-bottom: 8px;
        }
      }
      .container {
        display: flex;
        flex-direction: row;
        .illustration-wrapper {
          display: none;
          @media (min-width: 768px) {
            display: block;
            flex: 1.5;
            padding-top: 33.33%;
            position: relative;
            background: url(../assets/people-eating-food.svg) no-repeat center;
            background-size: cover;
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
            .button-wrapper {
              flex: 1;
              .button {
                display: inline-block;
                padding: 12px 36px;
                border-radius: 30px;
                background: #000000;
                color: #ffffff;
                cursor: pointer;
                font-weight: 700;
                font-size: 16px;
                line-height: 20px;
                &:hover {
                  box-shadow: rgba(0, 0, 0, 0.16) 0px -2px 8px;
                  transform: scale(1.02);
                  transition: ease-in-out 0.3s;
                }
              }
              .button.map {
                border: 1px solid #000000;
                color: #000000;
                background: #ffffff;
              }
            }
          }
        }
        .item-group {
          width: 100%;
          padding-top: 66.7%;
          position: relative;
          @media (min-width: 768px) {
            display: none;
          }
          .item-wrapper {
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            display: flex;
            flex-direction: column;
            .item {
              margin: 16px 0;
              width: 100%;
              flex: 1;
              display: flex;
              justify-content: center;
              align-items: center;
              font-size: 18px;
              font-weight: 700;
              line-height: 22px;
              position: relative;
              .background {
                border-radius: 32px;
                background: url(https://storage.googleapis.com/gweb-cloudblog-publish/images/063-MAP-Supporting_Kotlin-ER_2880x1200_1_X.max-2200x2200.png) no-repeat center;
                background-size: cover;
                position: absolute;
                filter: brightness(0.3);
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
              }
              .background.restaurant-background {
                background: url(https://images.unsplash.com/photo-1589505603958-adb54f67a6c8?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80) no-repeat center;
                background-size: cover;
              }
              .text {
                color: #ffffff;
                z-index: 1;
              }
            }
          }
        }
      }
    }
    @media (min-width: 768px) {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      .searchbar-wrapper {
        display: none;
      }
    }
  }
}
</style>
