<template>
  <div class="map-page" ref="map-page" :style="`overflow: ${windowWidth >= 992 ? 'scroll' : 'hidden'}`">
    <Navbar class="restaurant-navbar"></Navbar>
    <div class="map-searchbar-wrapper">
      <div class="searchbar">
        <input v-if="false" class="search-input">
        <div class="wrapper">
          <div class="tab-container">
            <div class="tab" @click="$router.push('/restaurants')">
              清單搜尋
              <div class="active-line" v-show="false"></div>
            </div>
            <div class="tab active">
              地圖模式
              <div class="active-line"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="filter-wrapper" :class="{ 'filter-on': filter.length > 5 }" @click="showModal = !showModal">
        <div class="icon filter"></div>
      </div>
    </div>
    <div class="map-container" :style="`overflow: ${windowWidth >= 992 ? 'scroll' : 'hidden'}`">
      <div class="map-wrapper" :style="`overflow: ${windowWidth >= 992 ? 'scroll' : 'hidden'}`">
        <div class="restaurants-list" ref="restaurants-list" :class="{ leaveTop: this.scrollY > 0}">
          <div class="title">
            <div class="result-count">{{ resultCount > 1000 ? '超過1,000' : resultCount }}間餐廳</div>
            所選地圖範圍的餐廳
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
          <div class="restaurant-list-card" ref="restaurant-list-card">
            <div class="card-content">
              <div class="no-result" v-if="resultCount === 0">沒有結果</div>
              <div class="no-result-sub" v-if="resultCount === 0">請試著調整搜尋條件，如移除篩選條件或縮小地圖範圍</div>
              <div class="item-wrapper"
                v-for="(r, index) in restaurants"
                :key="`${index}`"
                @click="$router.push(`restaurants/${r.id}`)"
                @mouseover="hoverRestaurant(r)"
              >
                <div class="container">
                  <div class="image-container">
                    <div class="image-wrapper">
                      <div class="image" :style="`background: url(${r.picture}) no-repeat center / cover`"></div>
                    </div>
                  </div>
                  <div class="card-right-wrapper">
                    <div class="top-wrapper">
                      <div class="restaurant-name"><span>{{ r.name }}</span></div>
                      <div class="heart-wrapper" v-if="isAuthenticated" @click.stop="r.isFavorited ? deleteFavorite(Number(r.id)) : addFavorite(Number(r.id))">
                        <div class="icon heart" :class="{ isFavorited: r.isFavorited }"></div>
                      </div>
                    </div>
                    <div class="card-divider"></div>
                    <div class="card-text">{{ r.Category.name }}</div>
                    <div class="card-text">{{ r.address }}</div>
                    <div class="rating-wrapper">
                      <svg class="icon star"></svg>
                      <div class="rating" v-if="r.rating">
                        <span class="number"><span>{{ r.rating.padEnd(3, '.0') }}</span></span>
                        <span class="count"><span>({{ r.CommentsCount }})</span></span>
                      </div>
                    </div>
                    <div class="expense" v-if="r.average_consumption">{{ r.average_consumption | priceFormat }} / 人</div>
                  </div>
                </div>
                <div class="divider"></div>
              </div>
            </div>
          </div>
          <div class="load-more">
            <div class="load-more-button" v-if="!noMoreData && restaurants.length > 0 && restaurants.length % 24 === 0" @click="fetchNearByRestaurants(hasPage=true)">搜尋更多</div>
          </div>
        </div>
        <div class="google-map" id="map" ref="google-map" :style="`overflow: ${windowWidth >= 992 ? 'scroll' : 'hidden'}`">
          <div class="fix-button" @click="fetchNearByRestaurants()" v-if="!infoWindow.open">
            <div class="button-text">在此範圍搜尋</div>
          </div>
          <GmapMap
            disableDefaultUI="true"
            :center="mapCenter"
            :zoom="13"
            map-type-id="terrain"
            style="width: 100%; height: 100%; display: block; overflow: hidden"
            ref="gmap"
            @click="closeInfoWindow($event)"
            :options="options"
          >
            <gmap-custom-marker
              :key="index"
              v-for="(r, index) in restaurants"
              :marker="r.position"
              @click.native="clickMarker(r)"
            >
              <div class="marker-wrapper marker-item" :class="{ markerFocus: hoverOn === r.id || infoWindow.open && infoWindow.restaurant.id === r.id}">
                <div class="marker-text marker-item">{{ r.Category.name }}</div>
                <div class="heart-wrapper marker-item" v-if="isAuthenticated && r.isFavorited">
                  <div class="icon heart marker-item"></div>
                </div>
              </div>
            </gmap-custom-marker>
            <gmap-info-window
              :position="infoWindow.position"
              :opened="infoWindow.open"
              :options="{
                pixelOffset: {
                  width: 0,
                  height: -35
                }
              }"
            >
              <div class="restaurant-card"
                @click="$router.push(`/restaurants/${infoWindow.restaurant.id}`)"
              >
                <div class="card-image-wrapper">
                  <div class="heart-wrapper" v-if="isAuthenticated" @click.stop="infoWindow.restaurant.isFavorited ? deleteFavorite(Number(infoWindow.restaurant.id)) : addFavorite(Number(infoWindow.restaurant.id))">
                    <div class="icon heart" :class="{ isFavorited: infoWindow.restaurant.isFavorited }"></div>
                  </div>
                  <div class="card-image" :style="`background: url(${infoWindow.restaurant.picture}) no-repeat center / cover`"></div>
                </div>
                <div class="card-content">
                  <div class="rating-wrapper">
                    <svg class="icon star"></svg>
                    <div class="rating" v-if="infoWindow.restaurant.rating">
                      <span class="number"><span>{{ infoWindow.restaurant.rating.padEnd(3, '.0') }}</span></span>
                      <span class="count"><span>({{ infoWindow.restaurant.CommentsCount }})</span></span>
                    </div>
                  </div>
                  <div class="name">{{ infoWindow.restaurant.name }}</div>
                  <div class="category-wrapper">
                    <span v-if="infoWindow.restaurant.Category" class="category">{{ infoWindow.restaurant.Category.name }}</span>
                    <span class="bullet">·</span>
                    <span v-if="infoWindow.restaurant.District" class="district">{{ infoWindow.restaurant.District.name }}</span>
                  </div>
                  <div class="description">{{ infoWindow.restaurant.address }}</div>
                  <div class="expense" v-if="infoWindow.restaurant.average_consumption">{{ infoWindow.restaurant.average_consumption | priceFormat }} / 人</div>
                </div>
              </div>
            </gmap-info-window>
          </GmapMap>
        </div>
      </div>
      <div ref="footer" v-show="windowWidth >= 992">
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

import GmapCustomMarker from 'vue2-gmap-custom-marker'
import { Toast } from '@/utils/helpers'
import { mapState } from 'vuex'
import usersAPI from '@/apis/users'
import restaurantsAPI from '@/apis/restaurants'
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import FilterModal from '@/components/Filter.vue'
import AddCategory from '@/components/AddCategory.vue'
import ChangeDistrict from '@/components/ChangeDistrict.vue'
import PriceRange from '@/components/PriceRange.vue'
export default {
  data () {
    return {
      windowWidth: window.innerWidth,
      showModal: false,
      restaurants: [],
      showAddModal: false,
      showChangeModal: false,
      showPriceModal: false,
      categoriesFilter: [],
      districtsFilter: [],
      priceFilter: [],
      priceQueryString: [],
      mobileBound: { lat: 24.96428535078719, lng: 121.47942180559336 },
      mapCenter: { lat: 25.0469724, lng: 121.5460995 },
      filter: ['', 'clat=25.0469724', 'clng=121.5460995', 'blat=24.96428535078719', 'blng=121.47942180559336'],
      options: {
        clickableIcons: false
      },
      infoWindow: {
        position: { lat: 25.0196471, lng: 121.5334885 },
        open: false,
        restaurant: {}
      },
      noMoreData: false,
      scrollY: 0,
      numOfPage: 1,
      hoverOn: 0,
      resultCount: 0
    }
  },
  components: {
    GmapCustomMarker,
    Footer,
    Navbar,
    FilterModal,
    AddCategory,
    ChangeDistrict,
    PriceRange
  },
  created () {
    if (!(Object.keys(this.$route.query).length === 0 && this.$route.query.constructor === Object)) {
      if (this.$route.query.district) {
        this.districtsFilter = typeof this.$route.query.district === 'string' ? [this.$route.query.district] : [...this.$route.query.district]
      }
      if (this.$route.query.category) {
        this.categoriesFilter = typeof this.$route.query.category === 'string' ? [this.$route.query.category] : [...this.$route.query.category]
      }
      if (this.$route.query.low && this.$route.query.high) {
        this.priceFilter.push(Number(this.$route.query.low))
        this.priceFilter.push(Number(this.$route.query.high))
      }
    }
  },
  mounted () {
    this.fetchNearByRestaurants()
    window.scrollTo({ top: 0 })
    window.addEventListener('resize', this.onResize)
    window.addEventListener('scroll', this.onScroll, { passive: true })
  },
  computed: {
    ...mapState(['currentUser', 'isAuthenticated'])
  },
  methods: {
    onScroll (e) {
      this.scrollY = window.scrollY
    },
    onResize () {
      this.windowWidth = window.innerWidth
    },
    closeFilter (isEditing, cateFilter, distFilter, pFilter) {
      this.showModal = false
      if (isEditing) {
        this.categoriesFilter = cateFilter
        this.districtsFilter = distFilter
        this.priceFilter = pFilter
        this.restaurants = []
        this.numOfPage = 1
        this.fetchNearByRestaurants()
      }
    },

    completeAdding (isAdding, filter) {
      this.showAddModal = false
      if (isAdding) {
        this.restaurants = []
        this.numOfPage = 1
        this.categoriesFilter = filter
        this.fetchNearByRestaurants()
      }
    },
    completeChanging (isChanging, filter) {
      this.showChangeModal = false
      if (isChanging) {
        this.restaurants = []
        this.numOfPage = 1
        this.districtsFilter = filter
        this.fetchNearByRestaurants()
      }
    },
    completePricing (isPricing, filter) {
      this.showPriceModal = false
      if (isPricing) {
        this.restaurants = []
        this.numOfPage = 1
        this.priceFilter = filter
        this.fetchNearByRestaurants()
      }
    },
    closeInfoWindow () {
      if (!event.target.classList.contains('marker-item') && this.infoWindow.open) {
        this.infoWindow.open = false
        this.hoverOn = 0
      }
    },
    clickMarker (restaurant) {
      this.mapCenter = restaurant.position
      this.openInfoWindow(restaurant)
    },
    async fetchNearByRestaurants (hasPage) {
      const loader = this.$loading.show({
        container: this.windowWidth < 992 ? this.$refs['google-map'] : this.$refs['restaurant-list-card'],
        opacity: 1
      })
      try {
        if (this.priceFilter.length === 2) {
          this.priceQueryString[0] = `min=${this.priceFilter[0]}`
          this.priceQueryString[1] = `max=${this.priceFilter[1]}`
        } else {
          this.priceQueryString = []
        }
        if (this.$refs.gmap.$mapObject) {
          if (!(this.$refs.gmap.$mapObject.getCenter().lat() === this.mapCenter.lat && this.$refs.gmap.$mapObject.getCenter().lng() === this.mapCenter.lng)) {
            this.mapCenter = { lat: this.$refs.gmap.$mapObject.getCenter().lat(), lng: this.$refs.gmap.$mapObject.getCenter().lng() }
          }
          const latKey = Object.keys(this.$refs.gmap.$mapObject.getBounds())[0]
          const lngKey = Object.keys(this.$refs.gmap.$mapObject.getBounds())[1]
          this.filter = ['', ...this.priceQueryString, ...this.categoriesFilter.map(item => 'category=' + item), ...this.districtsFilter.map(item => 'district=' + item), `clat=${this.mapCenter.lat}`, `clng=${this.mapCenter.lng}`, `blat=${this.$refs.gmap.$mapObject.getBounds()[`${latKey}`].i}`, `blng=${this.$refs.gmap.$mapObject.getBounds()[`${lngKey}`].i}`]
        } else {
          this.filter = [...this.filter, ...this.priceQueryString, ...this.categoriesFilter.map(item => 'category=' + item), ...this.districtsFilter.map(item => 'district=' + item)]
        }
        if (!hasPage) {
          this.numOfPage = 1
        }
        const { data } = this.isAuthenticated ? await restaurantsAPI.getUserNearByRestaurants(this.numOfPage, this.filter) : await restaurantsAPI.getNearByRestaurants(this.numOfPage, this.filter)
        this.noMoreData = data.data.length === 0
        this.restaurants = data.data
        this.restaurants.forEach(r => {
          r.position = { lat: Number(r.latitude), lng: Number(r.longitude) }
        })
        this.numOfPage += 1
        this.resultCount = data.count
        loader.hide()
        window.scrollTo({ top: 0, behavior: 'smooth' })
        this.$refs['restaurants-list'].scrollTo({ top: 0, behavior: 'smooth' })
      } catch (error) {
        loader.hide()
        console.log(error)
        Toast.fire({
          icon: 'error',
          title: '目前無法取得餐廳，請稍候'
        })
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
    },
    openInfoWindow (restaurant) {
      this.hoverOn = restaurant.id
      this.infoWindow.open = true
      this.infoWindow.position = restaurant.position
      this.infoWindow.restaurant = restaurant
    },
    hoverRestaurant (restaurant) {
      this.hoverOn = restaurant.id
    }
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
$darkred: #c13515;
@import '~vue2-datepicker/scss/index.scss';
.map-page {
  height: calc(100% - 55px);
    @media (min-width: 992px) {
      height: 100%;
    }
  .map-searchbar-wrapper {
    box-shadow: rgba(0, 0, 0, 0.16) 0px -2px 8px;
    height: 60px;
    width: 100%;
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
      padding-left: 8px;
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
  .map-container {
    z-index: 1;
    height: calc(100% - 55px);
    @media (min-width: 992px) {
      height: 100%;
    }
    .map-wrapper {
      height: 100%;
      margin: auto;
      display: flex;
      @media (min-width: 768px) {
        height: calc(100vh - 80px);
        padding-top: 80px;
      }
      .restaurants-list {
        display: none;
        @media (min-width: 992px) {
          overflow: scroll;
          margin: 22px 0;
          padding: 0 24px;
          min-width: 600px;
          display: flex;
          flex-direction: column;
          flex: 0.5
        }
        @media (min-width: 1441px) {
          flex: calc(7/16)
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
        .restaurant-list-card {
          width: 100%;
          margin-bottom: 24px;
          border-radius: 12px;
          position: relative;
          .card-content {
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
            .item-wrapper {
              cursor: pointer;
              background: #ffffff;
              position: relative;
              padding: 15px 0;
              display: flex;
              flex-direction: column;
              justify-content: flex-start;
              .container {
                display: flex;
                flex-direction: column;
                @media (min-width: 992px) {
                  flex-direction: row;
                }
                .image-container {
                  display: none;
                  @media (min-width: 992px) {
                    display: block;
                  }
                  .image-wrapper {
                    width: 300px;
                    padding-top: 66.7%;
                    position: relative;
                    .image {
                      border-radius: 8px;
                      position: absolute;
                      top: 0;
                      left: 0;
                      right: 0;
                      bottom: 0;
                      background: url(https://inline.imgix.net/branch/-LNTA3as3A6I5JWKglD6:inline-live-2a466--LNTA3bp4eBC0NuJ-TSc-48484d1f-999e-401f-94ae-b716e1d3abf5.jpg) no-repeat center;
                      background-size: cover;
                    }
                  }
                }
                .card-right-wrapper {
                  margin-left: 16px;
                  position: relative;
                  width: 100%;
                  .top-wrapper {
                    width: 100%;
                    position: relative;
                    display: flex;
                    flex-direction: column;
                    align-items: right;
                    .restaurant-name {
                      text-align: left;
                      font-size: 18px;
                      font-weight: 600;
                      line-height: 24px;
                      max-width: 250px;
                      overflow: hidden;
                      text-overflow: ellipsis;
                      display: -webkit-box !important;
                      -webkit-line-clamp: 1 !important;
                      -webkit-box-orient: vertical !important;
                      @media (min-width: 1440px) {
                        max-width: 250px;
                      }
                    }
                    .heart-wrapper {
                      z-index: 1;
                      position: absolute;
                      top: 0;
                      right: 0;
                      display: flex;
                      justify-content: center;
                      align-items: center;
                      .icon.heart {
                        cursor: pointer;
                        margin: auto;
                        height: 24px;
                        width: 24px;
                        background: url(../assets/empty-heart.svg) no-repeat center;
                        background-size: cover;
                      }
                      .icon.heart.isFavorited {
                        background: url(../assets/red-heart.svg) no-repeat center;
                        background-size: cover;
                      }
                    }
                  }
                  .card-divider {
                    margin: 12px 0;
                    width: 32px;
                    border-bottom: 1px solid $divider;
                  }
                  .card-text {
                    text-align: left;
                    font-weight: 400;
                    line-height: 18px;
                    font-size: 14px;
                    margin-bottom: 12px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box !important;
                    -webkit-line-clamp: 1 !important;
                    -webkit-box-orient: vertical !important;
                  }
                  .rating-wrapper {
                    position: absolute;
                    bottom: 0;
                    left: 0;
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
                        font-weight: 600;
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
                  .expense {
                    position: absolute;
                    bottom: 0;
                    right: 0;
                    line-height: 24px;
                    font-size: 18px;
                    font-weight: 600;
                  }
                }
              }
            }
          }
          .divider {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 1px;
            background: $divider;
          }
          .info {
            padding: 5px 15px;
            .item-wrapper {
              font-size: 12px;
              font-weight: 400;
              padding: 8px 0;
              display: flex;
              flex-direction: row;
              align-items: center;
              line-height: 1.5;
              .icon {
                color: #222222;
                height: 16px;
                width: 16px;
                margin-right: 16px;
              }
            }
          }
        }
        .load-more {
          width: 100%;
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
      .restaurants-list.leaveTop {
        overflow: hidden;
      }
      .google-map {
        flex: 1;
        height: 100%;
        position: relative;
        overflow: hidden;
        @media (min-width: 992px) {
          flex: 0.5;
        }
        @media (min-width: 1441px) {
          flex: calc(9/16)
        }
        .fix-button {
          cursor: pointer;
          position: absolute;
          top: 24px;
          left: calc(50% - 54px);
          height: 28px;
          z-index: 998;
          background: #000000;
          color: #ffffff;
          border-radius: 28px;
          padding: 0 12px;
          display: flex;
          justify-content: center;
          align-items: center;
          @media (min-width: 768px) {
            top: 24px;
            left: calc(50% - 40px);
          }
          .button-text {
            line-height: 18px;
            font-size: 14px;
            font-weight: 600;
          }
        }
        .marker-wrapper {
          height: 28px;
          z-index: 99;
          background: #ffffff;
          border-radius: 28px;
          padding: 0 12px;
          display: flex;
          justify-content: center;
          align-items: center;
          box-shadow: rgba(0, 0, 0, 0.12) 0px 6px 16px;
          .marker-text {
            line-height: 18px;
            font-size: 14px;
            font-weight: 600;
          }
          .heart-wrapper {
            margin-left: 4px;
            z-index: 1;
            display: flex;
            justify-content: center;
            align-items: center;
            .icon.heart {
              margin: auto;
              width: 18px;
              height: 18px;
              background: url(../assets/red-heart.svg) no-repeat center;
              background-size: cover;
            }
          }
        }
        .marker-wrapper.markerFocus {
          z-index: 999 !important;
          background: #000000;
          color: #ffffff;
          transform: scale(1.1);
          transition: ease-in-out 0.3s;
          .heart-wrapper {
            .icon.heart {
              background: #ffffff;
              mask: url(../assets/red-heart.svg) no-repeat center / cover;
            }
          }

        }
        .gm-style {
          overflow: hidden;
        }
        .gmnoprint,
        .gm-fullscreen-control {
          display: none;
        }
        .gm-style-iw {
          padding: 0;
          .gm-ui-hover-effect {
            display: none !important;
          }
          .gm-style-iw-d {
            padding: 0;
            overflow: visible !important;
            max-height: 999px !important;
            min-width: 249px;
            max-width: 249px;
            @media (min-width: 768px) {
              min-width: 300px;
              max-width: 300px;
            }
            .restaurant-card {
              cursor: pointer;
              flex: 1;
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
                  background: url(https://images.unsplash.com/photo-1512058564366-18510be2db19?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80) no-repeat center;
                  background-size: cover !important;
                }
              }
              .card-content {
                padding: 0 24px 24px;
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
            }
          }
        }
      }
    }
  }
}
</style>
