<template>
  <div class="restaurants" :class="{modalShow: showModal}">
    <Navbar class="restaurant-navbar"></Navbar>
    <div class="searchbar-wrapper-mobile">
      <div class="back-wrapper" @click="$router.go(-1)">
        <div class="icon back"></div>
      </div>
      <div class="searchbar">
        <input v-if="false" class="search-input">
        <div class="wrapper">
          <div class="text">我收藏的餐廳</div>
        </div>
      </div>
    </div>
    <div class="list-container" ref="list-container">
      <div class="restaurant-list" ref="restaurant-list">
        <div class="title">我收藏的餐廳</div>
        <div class="sub-title">
          <img class="sub-title-img" src="../assets/diet.svg">
          MealFinder 收錄台北市數千家餐廳，探索你週邊的美食
        </div>
        <div class="restaurant-card-deck-wrapper no-restaurant" v-if="restaurants.length === 0" ref="restaurant-card-deck-wrapper">
          <div class="no-result">沒有任何收藏的餐廳</div>
          <div class="no-result-sub">使用 <a href="/map">地圖模式</a> 或 <a href="/restaurants">清單搜尋</a> 探索喜歡的餐廳</div>
        </div>
        <div v-if="restaurants.length > 0" class="restaurant-card-deck-wrapper" ref="restaurant-card-deck-wrapper">
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
                <div class="description">{{ item.description }}</div>
                <div class="expense">${{ item.average_consumption }} / 人</div>
              </div>
            </div>
          </div>
        </div>
        <div class="load-more">
          <div class="load-more-button" v-if="restaurants.length > 0 && restaurants.length % 24 === 0" @click="fetchFavorites(filter)">載入更多結果</div>
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
import usersAPI from '@/apis/users'
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
      restaurants: [],
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
    window.addEventListener('resize', () => {
      this.windowWidth = window.innerWidth
    })
    this.defineCardDeck()
    this.fetchFavorites()
  },
  watch: {
    windowWidth () {
      this.defineCardDeck()
    },
    filter () {
      this.restaurants = []
      this.numOfPage = 0
      this.fetchFavorites(this.filter)
    }
  },
  computed: {
    ...mapState(['currentUser', 'isAuthenticated'])
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
    async fetchFavorites (filter) {
      const loader = this.$loading.show({
        container: this.$refs['restaurant-card-deck-wrapper'],
        opacity: 1,
        isFullPage: false
      })
      try {
        const { data } = await usersAPI.getFavorites(this.numOfPage + 1, filter)
        this.restaurants = [...this.restaurants, ...data.data]
        this.numOfPage += 1
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
        this.filter = ['', ...this.districtsFilter.map(item => 'district=' + item), ...filter.map(item => 'category=' + item)]
      }
    },
    completeChanging (isChanging, filter) {
      this.showChangeModal = false
      if (isChanging) {
        this.districtsFilter = filter
        this.filter = ['', ...this.categoriesFilter.map(item => 'category=' + item), ...filter.map(item => 'district=' + item)]
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
        this.restaurants.splice(this.restaurants.map(r => r.id).indexOf(id), 1)
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
  height: 100vh;
  .searchbar-wrapper-mobile {
    box-shadow: rgba(0, 0, 0, 0.16) 0px -2px 8px;
    z-index: 998;
    background: none;
    display: flex;
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
        margin-bottom: 24px;
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
          a {
            color: #222222;
          }
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
