<template>
  <div class="coupons" :class="{modalShow: showModal}">
    <Navbar class="restaurant-navbar"></Navbar>
    <div class="coupons-searchbar-wrapper">
      <div class="back-wrapper" @click="$router.go(-1)">
        <div class="icon back"></div>
      </div>
      <div class="searchbar">
        <input v-if="false" class="search-input">
        <div class="wrapper">
          <div class="text">返回</div>
        </div>
      </div>
      <div class="filter-wrapper" :class="{ 'filter-on': filter.length > 1 }" @click="showModal = !showModal">
        <div class="icon filter"></div>
      </div>
    </div>
    <div class="list-container" ref="list-container">
      <div class="coupon-list" ref="coupon-list">
        <div class="title">餐券列表</div>
        <div class="filter-button-wrapper">
          <div class="filter-button" :class="{ 'filter-on': districtsFilter.length > 0 }" @click="showChangeModal = !showChangeModal">地區</div>
          <div class="filter-button" :class="{ 'filter-on': categoriesFilter.length > 0 }" @click="showAddModal = !showAddModal">類型</div>
        </div>
        <div class="restaurant-card-deck-wrapper no-restaurant" ref="restaurant-card-deck-wrapper" v-if="coupons.length === 0"></div>
        <div v-if="coupons.length > 0" class="restaurant-card-deck-wrapper" ref="restaurant-card-deck-wrapper">
          <div v-for="pageNum in numOfPage" :key="`page-num-${pageNum}`">
            <div class="restaurant-card-deck"  v-for="deckNum in Math.ceil(coupons.slice((pageNum - 1) * 24, pageNum * 24).length/cardPerDeck)" :key="`deck-num-${deckNum}`">
              <div class="restaurant-card"
                v-for="(item, idx) in coupons.slice((pageNum - 1) * 24, pageNum * 24).slice((deckNum - 1) * cardPerDeck, deckNum * cardPerDeck)"
                :key="idx" :class="{ 'last-card': idx === cardPerDeck}"
                @click="$router.push(`/coupons/${item.id}`)"
                :style="`flex: ${1/cardPerDeck}`"
              >
                <div class="card-image-wrapper">
                  <div class="heart-wrapper">
                    <div class="icon heart"></div>
                  </div>
                  <div class="card-image" :style="`background: url(${item.Restaurant.picture}) no-repeat center / cover`"></div>
                </div>
                <div class="rating-wrapper">
                  <svg class="icon star"></svg>
                  <div class="rating">
                    <span class="number"><span>{{ item.Restaurant.rating.padEnd(3, '.0') }}</span></span>
                  </div>
                </div>
                <div class="name">{{ item.description }}</div>
                <div class="category-wrapper">
                  <span v-if="item.Restaurant" class="category">{{ item.Restaurant.CategoryName }}</span>
                  <span class="bullet">·</span>
                  <span v-if="item.Restaurant" class="district">{{ item.Restaurant.DistrictName }}</span>
                </div>
                <div class="description">{{ item.Restaurant.description }}</div>
                <div class="price-wrapper">
                  <div class="price">{{ item.price | priceFormat }}</div>
                  <div class="origin-price">{{ Number(item.price) + Math.round((5 - Number(item.Restaurant.rating)) * 100)  | priceFormat }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="load-more">
          <div class="load-more-button" v-if="coupons.length > 0 && coupons.length % 24 === 0" @click="fetchCoupons(filter)">載入更多結果</div>
        </div>
      </div>
      <div ref="footer">
        <Footer></Footer>
      </div>
    </div>
    <FilterModal
      :showModal="showModal"
      @closeModal="closeFilter"
      :categoriesFilter = categoriesFilter
      :districtsFilter = districtsFilter
    >
    </FilterModal>
    <AddCategory
      :showModal="showAddModal"
      @closeAddModal="completeAdding"
      :categoriesFilter = categoriesFilter
    >
    </AddCategory>
    <ChangeDistrict
      :showModal="showChangeModal"
      @closeChangeModal="completeChanging"
      :districtsFilter = districtsFilter
    >
    </ChangeDistrict>
  </div>
</template>

<script>

import { Toast } from '@/utils/helpers'
import { mapState } from 'vuex'
import couponsAPI from '@/apis/coupons'
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import FilterModal from '@/components/Filter.vue'
import AddCategory from '@/components/AddCategory.vue'
import ChangeDistrict from '@/components/ChangeDistrict.vue'

export default {
  data () {
    return {
      showModal: false,
      scrollY: 0,
      scrollUp: true,
      divHeight: 0,
      scrollBarHeight: 0,
      windowWidth: window.innerWidth,
      cardPerDeck: 1,
      coupons: [],
      numOfPage: 0,
      filter: [''],
      showAddModal: false,
      showChangeModal: false,
      categoriesFilter: [],
      districtsFilter: []
    }
  },
  components: {
    Navbar,
    Footer,
    FilterModal,
    AddCategory,
    ChangeDistrict
  },
  mounted () {
    this.$refs['list-container'].addEventListener('scroll', this.onScroll, { passive: true })
    this.divHeight = this.$refs['list-container'].scrollHeight
    this.scrollBarHeight = this.$refs['list-container'].clientHeight
    window.addEventListener('resize', this.onResize)
    this.defineCardDeck()
    this.fetchCoupons()
  },
  watch: {
    windowWidth () {
      this.defineCardDeck()
    },
    filter () {
      this.coupons = []
      this.numOfPage = 0
      this.fetchCoupons(this.filter)
    },
    showModal () {
      if (this.showModal) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = 'auto'
      }
    }
  },
  computed: {
    ...mapState(['currentUser', 'isAuthenticated'])
  },
  beforeDestroy () {
    this.$refs['list-container'].removeEventListener('scroll', this.onScroll)
    window.removeEventListener('resize', this.onResize)
    document.body.style.overflow = 'auto'
  },
  methods: {
    closeFilter (isEditing, cateFilter, distFilter) {
      this.showModal = false
      if (isEditing) {
        this.categoriesFilter = cateFilter
        this.districtsFilter = distFilter
        this.filter = ['', ...this.categoriesFilter.map(item => 'category=' + item), ...this.districtsFilter.map(item => 'district=' + item)]
      }
    },
    onScroll (e) {
      this.scrollUp = this.scrollY > this.$refs['list-container'].scrollTop
      this.scrollY = this.$refs['list-container'].scrollTop
    },
    onResize () {
      this.windowWidth = window.innerWidth
    },
    defineCardDeck () {
      if (this.windowWidth < 768) {
        this.cardPerDeck = 1
      } else if (this.windowWidth < 992) {
        this.cardPerDeck = 2
      } else if (this.windowWidth < 1200) {
        this.cardPerDeck = 3
      } else {
        this.cardPerDeck = 4
      }
    },
    async fetchCoupons (filter) {
      const loader = this.$loading.show({
        container: this.$refs['restaurant-card-deck-wrapper'],
        opacity: 1,
        isFullPage: false
      })
      try {
        const { data } = await couponsAPI.getCoupons(this.numOfPage + 1, filter)
        this.coupons = [...this.coupons, ...data.data]
        this.numOfPage += 1
        loader.hide()
      } catch (error) {
        loader.hide()
        console.log(error)
        Toast.fire({
          icon: 'error',
          title: '目前無法取得餐券，請稍候'
        })
      }
    },
    completeAdding (isAdding, filter) {
      this.showAddModal = false
      if (isAdding) {
        this.categoriesFilter = filter
        this.filter = ['', ...this.districtsFilter.map(item => 'district=' + item), ...filter.map(item => 'category=' + item)]
      }
    },
    completeChanging (isChanging, filter) {
      this.showChangeModal = false
      if (isChanging) {
        this.districtsFilter = filter
        this.filter = ['', ...this.categoriesFilter.map(item => 'category=' + item), ...filter.map(item => 'district=' + item)]
      }
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
  .coupons-searchbar-wrapper {
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
    .filter-wrapper {
      padding-right: 8px;
      width: 40px;
      height: 48px;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      .icon.filter {
        margin: auto;
        height: 16px;
        width: 16px;
        background-color: #000000;
        mask: url(../assets/filter.svg) no-repeat center;
      }
    }
    .filter-wrapper.filter-on:after {
      background-color: $red;
      border-radius: 50%;
      content: "";
      height: 6px;
      width: 6px;
      left: 50%;
      position: absolute;
      top: 8px;
    }
  }
  .list-container {
    position: absolute;
    top: 60px;
    width: 100%;
    height: calc(100vh - 60px);
    @media (min-width: 768px) {
      top: 81px;
      height: calc(100vh - 81px);
    }
    .coupon-list {
      margin: 22px 0;
      padding: 0 24px;
      @media (min-width: 768px) {
        padding: 0 40px;
        margin: 32px auto;
      }
      @media (min-width: 992px) {
        padding: 0 80px;
        max-width: 1440px;
      }
      .title {
        font-size: 22px;
        font-weight: 700;
        text-align: left;
        line-height: 22px;
        @media (min-width: 768px) {
          padding-top: 36px;
          font-size: 26px;
          line-height: 30px;
        }
        @media (min-width: 992px) {
          padding-top: 50px;
          font-size: 32px;
          line-height: 36px;
        }
        .result-count {
          font-size: 14px;
          line-height: 18px;
          padding-bottom: 8px;
          font-weight: 400;
        }
      }
      .filter-button-wrapper {
        display: none;
        @media (min-width: 768px) {
          display: flex;
          flex-direction: row;
          margin: 24px 0;
        }
        .filter-button {
          cursor: pointer;
          margin-right: 16px;
          border: 1px solid $divider;
          font-size: 14px;
          font-weight: 400;
          padding: 8px 16px;
          border-radius: 30px;
          &:hover {
            font-weight: 800;
            border: 1px solid #000000;
            transition: ease-in-out 0.3s;
          }
        }
        .filter-button.filter-on {
          font-weight: 800;
          border: 1px solid #000000;
          background: rgb(247, 247, 247);
        }
      }
      .restaurant-card-deck-wrapper {
        min-height: 600px;
        .restaurant-card-deck {
          width: 100%;
          @media (min-width: 768px) {
            display: flex;
            flex-direction: row;
          }
          .restaurant-card {
            cursor: pointer;
            padding-top: 12px;
            margin-bottom: 28px;
            @media (min-width: 768px) {
              margin-right: 16px;
            }
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
                display: flex;
                flex-direction: row;
                .number {
                  height: 18px;
                  margin-right: 4px;
                  display: flex;
                  align-items: center;
                  span {
                    height: 14px;
                  }
                }
                .count {
                  height: 18px;
                  display: flex;
                  align-items: center;
                  span {
                    height: 14px;
                  }
                }
              }
            }
            .name {
              margin-bottom: 6px;
              font-weight: 800;
              text-align: left;
              font-size: 18px;
              line-height: 22px;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box !important;
              -webkit-line-clamp: 1 !important;
              -webkit-box-orient: vertical !important;
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
          .restaurant-card.last-card {
            @media (min-width: 768px) {
              margin-right: 0;
            }
          }
        }
      }
      .load-more {
        width: 100%;
        margin: 80px 0 80px;
        .load-more-button {
          cursor: pointer;
          width: auto;
          margin: auto;
          padding: 14px 24px;
          border-radius: 8px;
          background: #000000;
          font-size: 16px;
          line-height: 20px;
          font-weight: 600;
          color: #ffffff;
          display: inline-block;
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
