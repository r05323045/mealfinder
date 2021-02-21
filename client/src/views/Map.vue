<template>
  <div class="map-page" ref="map-page">
    <Navbar class="restaurant-navbar"></Navbar>
    <div class="map-searchbar-wrapper">
      <div class="back-wrapper" @click="$router.go(-1)">
        <div class="icon back"></div>
      </div>
      <div class="searchbar">
        <input v-if="false" class="search-input">
        <div class="wrapper">
          <div class="text">
          </div>
        </div>
      </div>
    </div>
    <div class="map-container">
      <div class="map-wrapper">
        <div class="restaurants-list"></div>
        <div class="google-map" id="map">
          <GmapMap
            :center="mapCenter"
            :zoom="12"
            map-type-id="terrain"
            style="width: 100%; height: 100%; display: block"
            ref="gmap"
            @click="infoWindow.open=false"
          >
            <GmapMarker
              :key="index"
              v-for="(r, index) in restaurants"
              :position="r.position"
              :clickable="true"
              @click="setCenter(r)"
            />
            <gmap-info-window
              :position="infoWindow.position"
              :opened="infoWindow.open"
              @closeclick="infoWindow.open=false"
              :options="{
                pixelOffset: {
                  width: 0,
                  height: -35
                }
              }"
            >
              <div class="restaurant-card"
                @click="$router.push(`/restaurants/${infowindow.restaurant.id}`)"
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
                  <div class="description">{{ infoWindow.restaurant.description }}</div>
                  <div class="expense">${{ infoWindow.restaurant.average_consumption }} / 人</div>
                </div>
              </div>
            </gmap-info-window>
          </GmapMap>
        </div>
      </div>
      <div ref="footer">
        <Footer></Footer>
      </div>
    </div>
  </div>
</template>

<script>

import { Toast } from '@/utils/helpers'
import { mapState } from 'vuex'
import usersAPI from '@/apis/users'
import restaurantsAPI from '@/apis/restaurants'
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
export default {
  data () {
    return {
      restaurants: [],
      mapCenter: { lat: 25.0196471, lng: 121.5334885 },
      infoWindow: {
        position: { lat: 25.0196471, lng: 121.5334885 },
        open: false,
        restaurant: {}
      }
    }
  },
  components: {
    Footer,
    Navbar
  },
  created () {
  },
  mounted () {
    this.fetchRestaurants()
  },
  computed: {
    ...mapState(['currentUser', 'isAuthenticated'])
  },
  methods: {
    setCenter (restaurant) {
      this.mapCenter = restaurant.position
      this.openInfoWindow(restaurant)
    },
    async fetchRestaurants (filter) {
      try {
        const { data } = this.isAuthenticated ? await restaurantsAPI.getUsersRestaurants(this.numOfPage + 1, filter) : await restaurantsAPI.getRestaurants(this.numOfPage + 1, filter)
        this.restaurants = data.data
        this.restaurants.forEach(r => {
          r.position = { lat: r.coordinates[0], lng: r.coordinates[1] }
        })
        this.numOfPage += 1
      } catch (error) {
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
      this.infoWindow.position = restaurant.position
      this.infoWindow.restaurant = restaurant
      this.infoWindow.open = true
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
  height: 100%;
  overflow: scroll;
  position: relative;
  width: 100%;
  height: 100%;
  .restaurant-navbar {
    display: none;
    @media (min-width: 768px) {
      display: block;
    }
  }
  .map-searchbar-wrapper {
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
  .map-container {
    height: 100%;
    width: 100%;
    scroll-behavior: smooth;
    position: absolute;
    top: 60px;
    @media (min-width: 768px) {
      top: 0px;
    }
    .map-wrapper {
      height: 100%;
      margin: auto;
      display: flex;
      @media (min-width: 768px) {
        padding: 80px 0;
      }
      @media (min-width: 992px) {
        padding: 80px 0;
      }
      .restaurants-list {
        display: none;
        @media (min-width: 768px) {
          display: flex;
          flex: 0.5;
        }
      }
      .google-map {
        flex: 1;
        height: 100%;
        @media (min-width: 768px) {
          flex: 0.5;
        }
        .gm-style-iw {
          padding: 0;
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
