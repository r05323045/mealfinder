<template>
  <div class="about">
    <Navbar class="restaurant-navbar"></Navbar>
    <div class="about-searchbar-wrapper">
      <div class="back-wrapper" @click="$router.go(-1)">
        <div class="icon back"></div>
      </div>
      <div class="searchbar">
        <input v-if="false" class="search-input">
        <div class="wrapper">
          <div class="text">返回</div>
        </div>
      </div>
    </div>
    <div class="about-content">
      <div class="content-container">
        <div class="about-content-title">關於 Meal Finder</div>
        <div class="logo-container">
          <div class="food-image-wrapper image-up">
            <img class="food-image" src="https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1267&q=80)">
          </div>
          <div class="logo-wrapper">
            <div class="logo">
              <span class="company-first-name">Meal</span><span class="company-last-name">Finder</span>
            </div>
            <div class="slogan">Eazy to find the meal you want</div>
          </div>
          <div class="food-image-wrapper image-down">
            <img class="food-image" src="https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1267&q=80)">
          </div>
        </div>
        <div class="description-container">
          <p class="text">
            MealFinder 是一個線上餐廳訂位平台，可以幫助你探索餐廳並快速地進行進位。我們的願景是使人們更容易，更迅速，更聰明地找到合適的餐點。 自2021年以來，MealFinder已在台北拓展超過2,000家餐廳，我們的會員數也正在快速增長。 藉由 MealFinder，你將能輕鬆找到想要的餐點。 不知道晚餐要吃什麼嗎？ 你來對地方了！
          </p>
          <p class="text">
            MealFinder is an online restaurant reservation platform that can help you explore restaurants and make a quick reservation. Our vision is to make people find suitable meals easier, sooner, and smarter. Since 2021, MealFinder has expanded to over 2,000 restaurants in Taipei, and the number of members is fast growing. With MealFinder, find the meal you want is easier. No idea what’s for dinner? You got the right place!
          </p>
          <div class="button-wrapper">
            <a class="button" href="https://github.com/r05323045/mealfinder">了解更多</a>
          </div>
        </div>
      </div>
    </div>
    <div ref="footer">
      <Footer></Footer>
    </div>
  </div>
</template>

<script>

import { mapState } from 'vuex'
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
export default {
  data () {
    return {
    }
  },
  components: {
    Footer,
    Navbar
  },
  created () {
  },
  mounted () {
  },
  computed: {
    ...mapState(['currentUser', 'isAuthenticated'])
  },
  methods: {
  }
}
</script>

<style lang="scss">
$yellow: #F5DF4D;
$ultimategray: #939597;
$divider: #E6ECF0;
$red: rgb(255, 56, 92);
$default-color: #000000;
$primary-color: #222;
@import '~vue2-datepicker/scss/index.scss';
.about {
  height: 100%;
  overflow: scroll;
  width: 100%;
  .about-searchbar-wrapper {
    box-shadow: rgba(0, 0, 0, 0.16) 0px -2px 8px;
    z-index: 998;
    background: none;
    position: fixed;
    height: 60px;
    width: 100%;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #ffffff;
    @media (min-width: 768px) {
      display: none;
    }
    .back-wrapper {
      padding-left: 8px;
      width: 40px;
      height: 48px;
      display: flex;
      justify-content: center;
      align-items: center;
      .icon.back {
        margin: auto;
        height: 16px;
        width: 16px;
        background-color: #000000;
        mask: url(../assets/back.svg) no-repeat center;
      }
    }
    .searchbar {
      background: #ffffff;
      width: 100%;
      border-radius: 100px;
      height: 48px;
      display: flex;
      justify-content: flex-start;
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
        line-height: 18px;
        .text {
          margin-right: 20%;
          font-size: 14px;
          font-weight: 600;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      }
    }
  }
  .about-content {
    padding: 0px 24px 22px 24px;
    margin: 60px auto 0;
    max-width: 1040px;
    @media (min-width: 768px) {
      margin-top: 81px;
      padding: 0px 40px 35px 40px;
    }
    @media (min-width: 992px) {
      padding: 48px 80px;
    }
    .content-container {
      padding: 24px 0;
      @media (min-width: 768px) {
        padding: 0;
      }
      .about-content-title {
        margin: 24px 0;
        height: 40px;
        font-size: 22px;
        font-weight: 700;
        text-align: left;
        line-height: 22px;
        @media (min-width: 768px) {
          font-size: 26px;
          line-height: 30px;
        }
      }
      .logo-container {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        @media (min-width: 768px) {
          flex-direction: row;
          margin-bottom: 64px;
        }
        .food-image-wrapper {
          flex: 1;
          height: 100%;
          @media (min-width: 768px) {
            margin-left: 24px;
            display: block;
          }
          .food-image {
            border-radius: 30px;
            width: 100%;
            object-fit: cover;
          }
        }
        .food-image-wrapper.image-down {
          display: none;
          @media (min-width: 768px) {
            display: block;
          }
        }
        .food-image-wrapper.image-up {
          @media (min-width: 768px) {
            display: none;
          }
        }
        .logo-wrapper {
          height: 100%;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          margin: 48px 0;
          @media (min-width: 768px) {
            align-items: flex-start;
          }
          .logo {
            cursor: default;
            display: inline-block;
            color: $red;
            font-weight: 800;
            text-align: left;
            margin-bottom: 24px;
            font-size: 36px;
            line-height: 36px;
            height: 36px;
            @media (min-width: 768px) {
              font-size: 54px;
              line-height: 54px;
              height: 54px;
              margin-bottom: 48px;
            }
            @media (min-width: 992px) {
              font-size: 72px;
              line-height: 72px;
              height: 72px;
            }
            .company-last-name {
              color: #000000;
              margin-left: 6px;
              @media (min-width: 768px) {
                margin-left: 16px;
              }
            }
          }
          .slogan {
            text-align: left;
            cursor: default;
            font-size: 18px;
            line-height: 18px;
            color: #000000;
            @media (min-width: 768px) {
              font-size: 24px;
              line-height: 24px;
            }
            @media (min-width: 992px) {
              font-size: 36px;
              line-height: 36px;
            }
          }
        }
      }
      .description-container {
        max-width: 680px;
        margin: auto;
        @media (min-width: 992px) {
          padding: 48px 0;
        }
        .text {
          text-align: justify;
          margin: 24px 0;
          font-size: 18px;
          font-weight: 700;
          line-height: 1.5;
          @media (min-width: 768px) {
            font-size: 22px;
            text-align: left;
          }
        }
        .button-wrapper {
          margin: 64px 0 36px;
          display: flex;
          .button {
            width: 100%;
            @media (min-width: 768px) {
              width: auto;
            }
            cursor: pointer;
            border-radius: 15px;
            font-size: 16px;
            font-weight: 700;
            line-height: 1.5;
            border: 1px solid #222222;
            padding: 10px 22px;
            color: #222222;
            text-decoration: none;
            &:hover {
              background: #222222;
              color: #ffffff;
            }
          }
        }
      }
    }
  }
}
</style>
