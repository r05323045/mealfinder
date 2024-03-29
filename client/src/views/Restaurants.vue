<template>
  <div class="restaurants" :class="{modalShow: showModal}">
    <Navbar class="restaurant-navbar"></Navbar>
    <div class="searchbar-wrapper-mobile">
      <div class="searchbar">
        <input v-if="false" class="search-input">
        <div class="wrapper">
          <div class="tab-container">
            <div class="tab active">
              清單搜尋
              <div class="active-line"></div>
            </div>
            <div class="tab" @click="$router.push('/map')">
              地圖模式
              <div class="active-line" v-show="false"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="filter-wrapper" :class="{ 'filter-on': filter.length > 1 }" @click="showModal = !showModal">
        <div class="icon filter"></div>
      </div>
    </div>
    <div class="list-container" ref="list-container">
      <div class="restaurant-list" ref="restaurant-list">
        <div class="title">
          <div class="result-count">{{ resultCount > 1000 ? '超過1,000' : resultCount }}間餐廳</div>
          台北市各地的餐廳
        </div>
        <div class="filter-button-wrapper">
          <div class="filter-button" :class="{ 'filter-on': districtsFilter.length > 0 }" @click="showChangeModal = !showChangeModal">地區</div>
          <div class="filter-button" :class="{ 'filter-on': categoriesFilter.length > 0 }" @click="showAddModal = !showAddModal">類型</div>
          <div class="filter-button" :class="{ 'filter-on': priceFilter.length === 2 }" @click="showPriceModal = !showPriceModal">預算</div>
        </div>
        <div class="sub-title">
          <img class="sub-title-img" src="../assets/ramen.svg">
          MealFinder 收錄台北市數千家餐廳，探索你週邊的美食
        </div>
        <div class="restaurant-card-deck-wrapper no-restaurant" v-if="restaurants.length === 0">
          <div class="no-result" v-if="resultCount === 0">沒有結果</div>
          <div class="no-result-sub" v-if="resultCount === 0">請試著調整搜尋條件，如移除篩選條件或縮小地圖範圍</div>
        </div>
        <div v-if="restaurants.length > 0" ref="restaurant-card-deck-wrapper" class="restaurant-card-deck-wrapper">
          <div v-for="pageNum in numOfPage" :key="`page-num-${pageNum}`">
            <div class="restaurant-card-deck" v-for="deckNum in Math.ceil(restaurants.slice((pageNum - 1) * 24, pageNum * 24).length/cardPerDeck)" :key="`deck-num-${deckNum}`">
              <div class="restaurant-card"
                v-for="(item, idx) in restaurants.slice((pageNum - 1) * 24, pageNum * 24).slice((deckNum - 1) * cardPerDeck, deckNum * cardPerDeck)"
                :key="idx" :class="{ 'last-card': idx === cardPerDeck}"
                @click="$router.push(`/restaurants/${item.id}`)"
                :style="`flex: ${1/cardPerDeck}`"
              >
                <div class="card-image-wrapper">
                  <div class="heart-wrapper" v-if="isAuthenticated" @click.stop="item.isFavorited ? deleteFavorite(Number(item.id)) : addFavorite(Number(item.id))">
                    <div class="icon heart" :class="{ isFavorited: item.isFavorited }"></div>
                  </div>
                  <div class="card-image" :style="`background: url(${item.picture}) no-repeat center / cover`"></div>
                </div>
                <div class="rating-wrapper">
                  <svg class="icon star"></svg>
                  <div class="rating">
                    <span class="number"><span>{{ item.rating.padEnd(3, '.0') }}</span></span>
                    <span class="count"><span>({{ item.CommentsCount }})</span></span>
                  </div>
                </div>
                <div class="name">{{ item.name }}</div>
                <div class="category-wrapper">
                  <span v-if="item.Category" class="category">{{ item.Category.name }}</span>
                  <span class="bullet">·</span>
                  <span v-if="item.District" class="district">{{ item.District.name }}</span>
                </div>
                <div class="expense" v-if="item.average_consumption">${{ item.average_consumption }} / 人</div>
              </div>
            </div>
          </div>
        </div>
        <div class="load-more">
          <div class="load-more-button" v-if="!noMoreData && restaurants.length > 0 && restaurants.length % 24 === 0" @click="fetchRestaurants(filter)">載入更多結果</div>
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
      :priceFilter = priceFilter
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
    <PriceRange
      :showModal="showPriceModal"
      @closePriceModal="completePricing"
      :priceFilter = priceFilter
    >
    </PriceRange>
  </div>
</template>

<script>

import { Toast } from '@/utils/helpers'
import { mapState } from 'vuex'
import restaurantsAPI from '@/apis/restaurants'
import usersAPI from '@/apis/users'
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import FilterModal from '@/components/Filter.vue'
import AddCategory from '@/components/AddCategory.vue'
import ChangeDistrict from '@/components/ChangeDistrict.vue'
import PriceRange from '@/components/PriceRange.vue'

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
      restaurants: [],
      numOfPage: 0,
      filter: [''],
      showAddModal: false,
      showChangeModal: false,
      showPriceModal: false,
      categoriesFilter: [],
      districtsFilter: [],
      priceFilter: [],
      priceQueryString: [],
      noMoreData: false,
      resultCount: 0
    }
  },
  components: {
    Navbar,
    Footer,
    FilterModal,
    AddCategory,
    ChangeDistrict,
    PriceRange
  },
  created () {
    if (!(Object.keys(this.$route.query).length === 0 && this.$route.query.constructor === Object)) {
      if (this.$route.query.category && this.$route.query.district) {
        this.categoriesFilter = typeof this.$route.query.category === 'string' ? [this.$route.query.category] : [...this.$route.query.category]
        this.districtsFilter = typeof this.$route.query.district === 'string' ? [this.$route.query.district] : [...this.$route.query.district]
        this.filter = ['', ...this.categoriesFilter.map(item => 'category=' + item), ...this.districtsFilter.map(item => 'district=' + item)]
      } else if (this.$route.query.category && !this.$route.query.district) {
        this.categoriesFilter = typeof this.$route.query.category === 'string' ? [this.$route.query.category] : [...this.$route.query.category]
        this.filter = ['', ...this.categoriesFilter.map(item => 'category=' + item)]
      } else if (!this.$route.query.category && this.$route.query.district) {
        this.districtsFilter = typeof this.$route.query.district === 'string' ? [this.$route.query.district] : [...this.$route.query.district]
        this.filter = ['', ...this.districtsFilter.map(item => 'district=' + item)]
      }
    } else {
      this.fetchRestaurants()
    }
  },
  mounted () {
    this.$refs['list-container'].addEventListener('scroll', this.onScroll, { passive: true })
    this.divHeight = this.$refs['list-container'].scrollHeight
    this.scrollBarHeight = this.$refs['list-container'].clientHeight
    window.addEventListener('resize', this.onResize)
    this.defineCardDeck()
  },
  watch: {
    windowWidth () {
      this.defineCardDeck()
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
    closeFilter (isEditing, cateFilter, distFilter, pFilter) {
      this.showModal = false
      if (isEditing) {
        this.categoriesFilter = cateFilter
        this.districtsFilter = distFilter
        this.priceFilter = pFilter
        if (this.priceFilter.length === 2) {
          this.priceQueryString[0] = `min=${this.priceFilter[0]}`
          this.priceQueryString[1] = `max=${this.priceFilter[1]}`
        } else {
          this.priceQueryString = []
        }
        this.filter = ['', ...this.priceQueryString, ...this.categoriesFilter.map(item => 'category=' + item), ...this.districtsFilter.map(item => 'district=' + item)]
        this.restaurants = []
        this.numOfPage = 0
        this.fetchRestaurants(this.filter)
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
    async fetchRestaurants (filter) {
      const loader = this.$loading.show({
        container: this.$refs['restaurant-card-deck-wrapper'],
        opacity: 1,
        isFullPage: false
      })
      try {
        const { data } = this.isAuthenticated ? await restaurantsAPI.getUsersRestaurants(this.numOfPage + 1, filter) : await restaurantsAPI.getRestaurants(this.numOfPage + 1, filter)
        this.noMoreData = data.data.length === 0
        this.restaurants = [...this.restaurants, ...data.data]
        this.numOfPage += 1
        this.resultCount = data.count
        loader.hide()
      } catch (error) {
        loader.hide()
        console.log(error)
        Toast.fire({
          icon: 'error',
          title: '目前無法取得餐廳，請稍候'
        })
      }
    },
    completeAdding (isAdding, filter) {
      this.showAddModal = false
      if (isAdding) {
        this.categoriesFilter = filter
        this.filter = ['', ...this.priceQueryString, ...this.categoriesFilter.map(item => 'category=' + item), ...this.districtsFilter.map(item => 'district=' + item)]
        this.restaurants = []
        this.numOfPage = 0
        this.fetchRestaurants(this.filter)
      }
    },
    completeChanging (isChanging, filter) {
      this.showChangeModal = false
      if (isChanging) {
        this.districtsFilter = filter
        this.filter = ['', ...this.priceQueryString, ...this.categoriesFilter.map(item => 'category=' + item), ...this.districtsFilter.map(item => 'district=' + item)]
        this.restaurants = []
        this.numOfPage = 0
        this.fetchRestaurants(this.filter)
      }
    },
    completePricing (isPricing, filter) {
      this.showPriceModal = false
      if (isPricing) {
        this.restaurants = []
        this.numOfPage = 1
        this.priceFilter = filter
        if (this.priceFilter.length === 2) {
          this.priceQueryString[0] = `min=${this.priceFilter[0]}`
          this.priceQueryString[1] = `max=${this.priceFilter[1]}`
        } else {
          this.priceQueryString = []
        }
        this.filter = ['', ...this.priceQueryString, ...this.categoriesFilter.map(item => 'category=' + item), ...this.districtsFilter.map(item => 'district=' + item)]
        this.restaurants = []
        this.numOfPage = 0
        this.fetchRestaurants(this.filter)
      }
    },
    async addFavorite (id) {
      try {
        const { data } = await usersAPI.addFavorite(id)
        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        this.restaurants.forEach(restaurant => {
          if (restaurant.id === id) {
            restaurant.isFavorited = true
          }
        })
        Toast.fire({
          icon: 'success',
          title: '已加入收藏'
        })
      } catch (error) {
        console.log(error)
        Toast.fire({
          icon: 'error',
          title: '目前無法收藏餐廳，請稍後'
        })
      }
    },
    async deleteFavorite (id) {
      try {
        const { data } = await usersAPI.deleteFavorite(id)
        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        this.restaurants.forEach(restaurant => {
          if (restaurant.id === id) {
            restaurant.isFavorited = false
          }
        })
        Toast.fire({
          icon: 'success',
          title: '已移除收藏'
        })
      } catch (error) {
        console.log(error)
        Toast.fire({
          icon: 'error',
          title: '目前無法取消收藏餐廳，請稍後'
        })
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
.restaurants {
  width: 100%;
  .searchbar-wrapper-mobile {
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
    .searchbar {
      padding-left: 8px;
      background: #ffffff;
      width: 100%;
      border-radius: 100px;
      height: 48px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .wrapper {
        border-right: 1px solid $divider;
        width: 100%;
        display: flex;
        flex-direction: row;
        line-height: 18px;
        margin-left: 12px;
        .tab-container {
          position: relative;
          margin: 12px -12px;
          display: flex;
          flex-direction: row;
          .divider {
            position: absolute;
            bottom: 0;
            left: 12px;
            right: 12px;
            top: 100%;
            height: 1px;
            background: $divider;
          }
          .tab {
            color: #666;
            cursor: pointer;
            padding: 8px 16px;
            font-size: 12px;
            line-height: 18px;
            font-weight: 600;
            position: relative;
          }
          .tab.active {
            color: #222222;
            position: relative;
            .active-line {
              z-index: 2;
              position: absolute;
              bottom: -1px;
              left: 16px;
              right: 16px;
              height: 3px;
              background: #222222;
            }
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
    .restaurant-list {
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
      .sub-title {
        display: flex;
        align-items: center;
        margin: 12px 0;
        text-align: left;
        font-weight: 600;
        font-size: 16px;
        line-height: 20px;
        .sub-title-img {
          margin-right: 16px;
          height: 40px;
          width: 40px;
        }
      }
      .restaurant-card-deck-wrapper {
        min-height: 600px;
        .no-result {
          margin-top: 32px;
          text-align: left;
          font-size: 22px;
          line-height: 26px;
          font-weight: 600;
        }
        .no-result-sub {
          text-align: left;
          margin: 4 0 32px;
          font-size: 16px;
          line-height: 24px;
        }
        .restaurant-card-deck {
          width: 100%;
          @media (min-width: 768px) {
            display: flex;
            flex-direction: row;
          }
          .restaurant-card {
            cursor: pointer;
            flex: 1;
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
                  background: url(../assets/black-heart.svg) no-repeat center;
                  background-size: cover;
                }
                .icon.heart.isFavorited {
                  background: url(../assets/red-heart.svg) no-repeat center;
                  background-size: cover;
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
                background-size: cover !important;
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
              margin-bottom: 8px;
              text-align: left;
              font-size: 16px;
              line-height: 20px;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box !important;
              -webkit-line-clamp: 1 !important;
              -webkit-box-orient: vertical !important;
            }
            .expense {
              margin-bottom: 4px;
              text-align: left;
              font-weight: 800;
              font-size: 16px;
              line-height: 20px;
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
