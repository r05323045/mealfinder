<template>
  <div class="home" ref="home">
    <Navbar v-show="scrollY > 50"></Navbar>
    <div class="top-banner"></div>
    <div class="searchbar-wrapper">
      <div class="searchbar">
        <input v-if="false" class="search-input">
        <div class="wrapper">
          <div class="icon search"></div>
          <div class="text">想吃什麼？</div>
        </div>
      </div>
    </div>
    <div class="banner">
      <NavbarHome v-show="scrollY <= 50"></NavbarHome>
      <div class="background-image"></div>
      <div class="wrapper">
        <div class="text">
          <span>今晚...</span><br>
          <span>我想來點</span>
        </div>
        <div class="button">瀏覽周邊餐廳</div>
      </div>
    </div>
    <div class="area">
      <div class="title">前往熱門地區</div>
      <div class="district-deck">
        <div class="district">
          <div class="background">
            <div class="image"></div>
            <div class="text-wrapper">
              <span class="text">大安區</span>
            </div>
          </div>
        </div>
        <div class="district">
          <div class="background">
            <div class="image"></div>
            <div class="text-wrapper">
              <span class="text">士林區</span>
            </div>
          </div>
        </div>
      </div>
      <div class="district-deck">
        <div class="district">
          <div class="background">
            <div class="image"></div>
            <div class="text-wrapper">
              <span class="text">信義區</span>
            </div>
          </div>
        </div>
        <div class="district">
          <div class="background">
            <div class="image"></div>
            <div class="text-wrapper">
              <span class="text">中正區</span>
            </div>
          </div>
        </div>
      </div>
      <div class="district-deck">
        <div class="district">
          <div class="background">
            <div class="image"></div>
            <div class="text-wrapper">
              <span class="text">中山區</span>
            </div>
          </div>
        </div>
        <div class="district">
          <div class="background">
            <div class="image"></div>
            <div class="text-wrapper">
              <span class="text">查看更多地區</span>
            </div>
          </div>
        </div>
      </div>
      <div class="district-deck-desktop">
        <div class="district">
          <div class="background top">
            <div class="image"></div>
            <div class="text-wrapper">
              <span class="text">大安區</span>
            </div>
          </div>
        </div>
        <div class="district">
          <div class="background top">
            <div class="image"></div>
            <div class="text-wrapper">
              <span class="text">士林區</span>
            </div>
          </div>
        </div>
      </div>
      <div class="district-deck-desktop">
        <div class="district">
          <div class="background bottom">
            <div class="image"></div>
            <div class="text-wrapper">
              <span class="text">信義區</span>
            </div>
          </div>
        </div>
        <div class="district">
          <div class="background bottom">
            <div class="image"></div>
            <div class="text-wrapper">
              <span class="text">中山區</span>
            </div>
          </div>
        </div>
        <div class="district">
          <div class="background bottom">
            <div class="image"></div>
            <div class="text-wrapper">
              <span class="text">更多地區</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="category">
      <div class="title">探索更多美食</div>
      <div class="description">對於某些料理情有獨鍾嗎？我們都幫你整理好了</div>
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide">
            <div class="inner-wrapper">
              <div class="background">
                <div class="image"></div>
              </div>
            </div>
            <div class="category-name">日式料理</div>
            <div class="category-intro">拉麵、壽司、燒肉等料理等你來品嚐</div>
          </div>
          <div class="swiper-slide">
            <div class="inner-wrapper">
              <div class="background">
                <div class="image"></div>
              </div>
            </div>
            <div class="category-name">日式料理</div>
            <div class="category-intro">拉麵、壽司、燒肉等料理等你來品嚐</div>
          </div>
          <div class="swiper-slide">
            <div class="inner-wrapper">
              <div class="background">
                <div class="image"></div>
              </div>
            </div>
            <div class="category-name">日式料理</div>
            <div class="category-intro">拉麵、壽司、燒肉等料理等你來品嚐</div>
          </div>
          <div class="swiper-slide">
            <div class="inner-wrapper">
              <div class="background">
                <div class="image"></div>
              </div>
            </div>
            <div class="category-name">日式料理</div>
            <div class="category-intro">拉麵、壽司、燒肉等料理等你來品嚐</div>
          </div>
          <div class="swiper-slide">
            <div class="inner-wrapper">
              <div class="background">
                <div class="image"></div>
              </div>
            </div>
            <div class="category-name">日式料理</div>
            <div class="category-intro">拉麵、壽司、燒肉等料理等你來品嚐</div>
          </div>
        </div>
        <div class="swiper-button-next"></div>
        <div class="swiper-button-prev"></div>
      </div>
    </div>
    <div class="find-more">
      <div class="title">尋找更多</div>
      <div class="container">
        <div class="illustration-wrapper">
          <div class="cover"></div>
        </div>
        <div class="item-group">
          <div class="item-wrapper">
            <div class="item" @click="$router.push('/restaurants')">
              <div class="background"></div>
              <span class="text">餐廳清單</span>
            </div>
            <div class="item" @click="$router.push('/restaurants')">
              <div class="background"></div>
              <span class="text">地圖探索</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer></Footer>
    <div class="space-for-nav-mobile" style="height: 54px;"></div>
  </div>
</template>

<script>

import Swiper from 'swiper/swiper-bundle.js'
import 'swiper/swiper-bundle.css'
import Navbar from '@/components/Navbar.vue'
import NavbarHome from '@/components/NavbarHome.vue'
import Footer from '@/components/Footer.vue'

export default {
  components: { Navbar, Footer, NavbarHome },
  name: 'Home',
  data () {
    return {
      scrollY: 0
    }
  },
  mounted () {
    // eslint-disable-next-line no-unused-vars
    const swiper = new Swiper('.swiper-container', {
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
      breakpoints: {
        1200: {
          slidesPerView: 3.1,
          spaceBetween: '18%'
        },
        992: {
          slidesPerView: 2.5,
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
    this.$refs.home.addEventListener('scroll', this.onScroll)
  },
  methods: {
    onScroll (e) {
      this.scrollY = this.$refs.home.scrollTop
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
  width: 100vw;
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  .top-banner {
    display: block;
    background: #000000;
    height: 50px;
    @media (min-width: 992px) {
      display: none;
    }
  }
  .searchbar-wrapper {
    z-index: 998;
    background: #000000;
    position: sticky;
    height: 80px;
    width: 100%;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    .searchbar {
      background: #ffffff;
      width: 80%;
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
        width: 108px;
        display: flex;
        flex-direction: row;
        line-height: 18px;
        .icon {
          margin: auto 0;
          padding-right: 8px;
          background-color: $red;
          height: 16px;
          width: 16px;
        }
        .icon.search {
          mask: url(../assets/search.svg) no-repeat center;
        }
        .text {
          font-size: 16px;
          font-weight: 600;
        }
      }
    }
  }
  .banner {
    height: 408px;
    width: 100%;
    position: relative;
    @media (min-width: 992px) {
      height: calc(80vh + 50px);
    }
    .background-image {
      z-index: -1;
      height: 100%;
      width: 100%;
      background: url(https://images.unsplash.com/photo-1573080519806-93cec30f99c4?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80) no-repeat center;
      background-size: cover;
      filter: brightness(.4);
      @media (min-width: 992px) {
        background: url(https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1950&q=80) no-repeat center;
        background-size: cover;
      }
    }
    .wrapper {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      @media (min-width: 992px) {
        padding: 196px 80px 40px 80px;
        display: flex;
        align-items: flex-start;
        justify-content: center;
        flex-direction: column;
      }
      .text {
        text-align: left;
        margin: 24px 0 0 24px;
        color: #ffffff;
        font-size: 32px;
        line-height: 48px;
        font-weight: 600;
        @media (min-width: 992px) {
          font-size: 52px;
          line-height: 58px;
        }
      }
      .button {
        margin: 24px 0 0 24px;
        float: left;
        background: #ffffff;
        padding: 7px 15px;
        border-radius: 8px;
        line-height: 18px;
        font-size: 14px;
        font-weight: 600;
      }
    }
  }
  .area {
    margin-top: 40px;
    padding: 0 24px;
    @media (min-width: 992px) {
      padding: 0 80px;
      margin-top: 64px;
    }
    .title {
      height: 40px;
      font-size: 22px;
      font-weight: 700;
      text-align: left;
      line-height: 22px;
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
      @media (min-width: 992px) {
        display: none;
      }
      .district {
        margin: 0 5px;
        flex: 1;
        width: 50%;
        .background {
          padding-bottom: 100%;
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          .image {
            background: url(https://images.unsplash.com/photo-1589251204996-3367cc27f084?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=779&q=80) no-repeat center;
            background-size: cover;
            border-radius: 8px;
            filter: brightness(.4);
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
        }
      }
    }
    .district-deck-desktop {
      display: none;
      @media (min-width: 992px) {
        display: flex;
        flex-direction: row;
        margin: 10px 0;
      }
      .district {
        margin: 5px 10px;
        flex: 1;
        width: 50%;
        .background {
          padding-bottom: 66.7%;
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          .image {
            background: url(https://images.unsplash.com/photo-1589251204996-3367cc27f084?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=779&q=80) no-repeat center;
            background-size: cover;
            border-radius: 8px;
            filter: brightness(.4);
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
    @media (min-width: 992px) {
      margin-top: 64px;
      padding: 40px 0 40px 80px;
    }
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
      overflow: visible;
      .swiper-wrapper {
        height: 100%;
        .swiper-slide {
          text-align: center;
          font-size: 18px;
          width: 50%;
          .inner-wrapper {
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
        @media (min-width: 992px) {
          display: block;
          position: absolute;
          right: 0;
          top: calc(50% - 1.5rem);
          background: #ffffff;
          border-radius: 50%;
          box-shadow: 1px 1px 2px 0 rgba(0,0,0,0.2);
          width: 3rem;
          height: 3rem;
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
        left: -32px;
      }
    }
  }
  .find-more {
    margin: 40px 0;
    padding: 0 24px;
    @media (min-width: 992px) {
      padding: 0 80px;
    }
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
    .container {
      display: flex;
      flex-direction: row;
      .illustration-wrapper {
        display: none;
        @media (min-width: 992px) {
          display: block;
          flex: 1.5;
          padding-top: 33.33%;
          position: relative;
          background: url(../assets/food-landscape.svg) no-repeat center;
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
      .item-group {
        width: 100%;
        padding-top: 66.7%;
        position: relative;
        @media (min-width: 992px) {
          padding-top: 0;
          flex: 1;
          justify-content: center;
          align-items: center;
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
              background: url(https://images.unsplash.com/photo-1589251204996-3367cc27f084?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=779&q=80) no-repeat center;
              background-size: cover;
              position: absolute;
              filter: brightness(0.3);
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
            }
            .text {
              color: #ffffff;
              z-index: 1;
            }
            @media (min-width: 992px) {
              font-size: 24px;
              line-height: 28px;
            }
          }
        }
      }
    }
  }
  @media (min-width: 992px) {
    .searchbar-wrapper {
      display: none;
    }
    .space-for-nav-mobile {
      display: none;
    }
  }
}
</style>
