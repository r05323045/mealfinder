<template>
  <div class="coupons" :class="{modalShow: showModal}">
    <div class="searchbar-wrapper">
      <div class="back-wrapper" @click="$router.go(-1)">
        <div class="icon back"></div>
      </div>
      <div class="searchbar">
        <input v-if="false" class="search-input">
        <div class="wrapper">
          <div class="text">所有餐券</div>
        </div>
      </div>
      <div class="filter-wrapper" @click="showModal = !showModal">
        <div class="icon filter"></div>
      </div>
    </div>
    <div class="list-container" ref="list-container">
      <div class="coupon-list" ref="coupon-list">
        <div class="title">餐券列表</div>
        <div class="restaurant-card-deck">
          <div class="restaurant-card" v-for="i in 10" :key="i">
            <div class="card-image-wrapper">
              <div class="heart-wrapper">
                <img class="icon heart" src="../assets/black-heart.svg">
              </div>
              <div class="card-image"></div>
            </div>
            <div class="rating-wrapper">
              <svg class="icon star"></svg>
              <div class="rating">
                <span class="number">4.85</span>
                <span class="count">(20)</span>
              </div>
            </div>
            <div class="name">711便利商店 - 大亨堡</div>
            <div class="category-wrapper">
              <span class="category">台式餐廳</span>
              <span class="bullet">·</span>
              <span class="district">大安區</span>
            </div>
            <div class="description">全台最大連鎖餐廳，小資族下班聚餐好去處好去處好去處好去處</div>
            <div class="price-wrapper">
              <div class="price">$299</div>
              <div class="origin-price">$359</div>
            </div>
          </div>
        </div>
      </div>
      <div ref="footer">
        <Footer></Footer>
      </div>
    </div>
    <div v-show="scrollUp">
      <Navbar></Navbar>
    </div>
    <FilterModal :showModal="showModal" @closeModal="closeFilter"></FilterModal>
  </div>
</template>

<script>

import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import FilterModal from '@/components/Filter.vue'

export default {
  data () {
    return {
      showModal: false,
      scrollY: 0,
      scrollUp: true
    }
  },
  components: {
    Navbar,
    Footer,
    FilterModal
  },
  mounted () {
    this.$refs['list-container'].addEventListener('scroll', this.onScroll)
  },
  methods: {
    closeFilter () {
      this.showModal = false
    },
    onScroll (e) {
      this.scrollUp = this.scrollY > this.$refs['list-container'].scrollTop
      this.scrollY = this.$refs['list-container'].scrollTop
    }
  }
}
</script>

<style lang="scss">
$yellow: #F5DF4D;
$ultimategray: #939597;
$divider: #E6ECF0;
$red: rgb(255, 56, 92);
.coupons {
  width: 100%;
  .searchbar-wrapper {
    box-shadow: rgba(0, 0, 0, 0.16) 0px -2px 8px;
    z-index: 998;
    background: none;
    position: sticky;
    height: 60px;
    width: 100%;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #ffffff;
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
      width: 80%;
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
        border-right: 1px solid $divider;
        width: 100%;
        display: flex;
        flex-direction: row;
        line-height: 18px;
        .icon {
          margin: auto 0;
          padding-right: 8px;
          background-color: $ultimategray;
          height: 16px;
          width: 16px;
        }
        .icon.search {
          mask: url(../assets/search.svg) no-repeat center;
        }
        .text {
          font-size: 14px;
          font-weight: 600;
        }
      }
    }
  }
  .filter-wrapper {
    padding-right: 8px;
    width: 40px;
    height: 48px;
    display: flex;
    justify-content: center;
    align-items: center;
    .icon.filter {
      margin: auto;
      height: 16px;
      width: 16px;
      background-color: #000000;
      mask: url(../assets/filter.svg) no-repeat center;
    }
  }
  .list-container {
    height: calc(100vh - 60px);
    overflow: scroll;
    .coupon-list {
      margin: 22px 0;
      padding: 0 24px;
      .title {
        margin-bottom: 24px;
        height: 22px;
        font-size: 22px;
        font-weight: 700;
        text-align: left;
        line-height: 22px;
      }
      .restaurant-card-deck {
        width: 100%;
        .restaurant-card {
          padding-top: 12px;
          margin-bottom: 28px;
          .card-image-wrapper {
            .heart-wrapper {
              z-index: 1;
              position: absolute;
              top: 0;
              right: 0;
              padding-right: 8px;
              width: 40px;
              height: 48px;
              display: flex;
              justify-content: center;
              align-items: center;
              .icon.heart {
                cursor: pointer;
                margin: auto;
                height: 24px;
                width: 24px;
              }
            }
            margin-bottom: 10px;
            padding-top: 66.7%;
            position: relative;
            .card-image {
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              width: 100%;
              border-radius: 16px;
              background: url(https://images.unsplash.com/photo-1512058564366-18510be2db19?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80) no-repeat center;
              background-size: cover;
            }
          }
          .rating-wrapper {
            margin-bottom: 6px;
            width: 100%;
            font-size: 14px;
            font-weight: 500;
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: center;
            line-height: 18px;
            .icon {
              margin: auto 0;
              margin-right: 4px;
              background-color: $red;
              height: 14px;
              width: 14px;
            }
            .icon.star {
              mask: url(../assets/star.svg) no-repeat center;
            }
            .rating {
              .number {
                margin-right: 4px;
              }
            }
          }
          .name {
            margin-bottom: 6px;
            font-weight: 800;
            text-align: left;
            font-size: 18px;
            line-height: 22px;
          }
          .category-wrapper {
            margin-bottom: 4px;
            text-align: left;
            font-size: 16px;
            line-height: 20px;
            .bullet {
              margin: 0 4px;
            }
          }
          .description {
            margin-bottom: 16px;
            text-align: left;
            font-size: 16px;
            line-height: 20px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box !important;
            -webkit-line-clamp: 1 !important;
            -webkit-box-orient: vertical !important;
          }
          .price-wrapper {
            display: flex;
            flex-direction: row;
            .price{
              margin-bottom: 4px;
              text-align: left;
              font-weight: 800;
              font-size: 18px;
              line-height: 20px;
              margin-right: 12px;
            }
            .origin-price {
              text-decoration: line-through;
              color: #666;
              margin-bottom: 4px;
              text-align: left;
              font-weight: 800;
              font-size: 16px;
              line-height: 20px;
            }
          }
        }
      }
    }
  }
}
.restaurants.modalShow {
  height: 100vh;
  overflow: hidden;
}
</style>
