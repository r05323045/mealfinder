<template>
  <div ref="restaurant" class="restaurant">
    <Navbar class="restaurant-navbar" v-show="scrollUp"></Navbar>
    <div class="restaurant-searchbar-wrapper">
      <div class="back-wrapper" @click="$router.go(-1)">
        <div class="icon back"></div>
      </div>
      <div class="searchbar">
        <input v-if="false" class="search-input">
        <div class="wrapper">
          <div class="text">返回</div>
        </div>
      </div>
      <div class="icon-container">
        <div class="share-wrapper">
          <div class="icon share"
            v-clipboard:copy="copyPath"
            v-clipboard:success="onCopy"
            v-clipboard:error="onError">
          </div>
        </div>
        <div class="favorite-wrapper">
          <div
            class="icon favorite"
            :class="{ isFavorited: restaurant.isFavorited }"
            @click.stop="restaurant.isFavorited ? deleteFavorite(Number(restaurant.id)) : addFavorite(Number(restaurant.id))"
          >
          </div>
        </div>
      </div>
    </div>
    <div class="info-container" ref="info-container">
      <div class="mobile-picture-wrapper" v-if="restaurant.picture">
        <div class="picture" :style="`background: url(${restaurant.picture}) no-repeat center / cover`"></div>
      </div>
      <div class="restaurant-info" ref="restaurant-info">
        <div class="picture-wrapper" v-if="restaurant.picture">
          <div class="picture" :style="`background: url(${restaurant.picture}) no-repeat center / cover`"></div>
        </div>
        <div class="title-wrapper">
          <div class="icon-container">
            <div class="share-wrapper">
              <div class="icon share"
                v-clipboard:copy="copyPath"
                v-clipboard:success="onCopy"
                v-clipboard:error="onError">
              </div>
            </div>
            <div class="favorite-wrapper">
              <div
                class="icon favorite"
                :class="{ isFavorited: restaurant.isFavorited }"
                @click.stop="restaurant.isFavorited ? deleteFavorite(Number(restaurant.id)) : addFavorite(Number(restaurant.id))"
              >
              </div>
            </div>
          </div>
          <h1 class="title">
            {{ restaurant.name }}
          </h1>
          <div class="info-wrapper">
            <div class="rating-wrapper">
              <div class="icon star"></div>
              <div class="rating" v-if="restaurant.rating">{{ restaurant.rating.padEnd(3, '.0') }}</div>
              <div class="rating-count">({{ restaurant.CommentsCount }})</div>
            </div>
            <div class="dot">·</div>
            <div class="district" v-if="restaurant.District">{{ restaurant.District.name }}</div>
          </div>
          <div class="address-wrapper" v-if="restaurant.District">
            台北市{{ `${restaurant.District.name}${restaurant.address}` }}
          </div>
          <div class="contact-wrapper">
            <div class="phone-wrapper">
              <img class="icon phone" src="../assets/phone.svg">
              <div class="phone">{{ restaurant.tel ? restaurant.tel : '尚未提供' }}</div>
            </div>
            <div class="map-wrapper" @click="scrollToMap">
              <img class="icon map" src="../assets/map.svg">
              <div class="map">查看地圖</div>
            </div>
          </div>
        </div>
        <div class="description-wrapper">
          <div class="divider"></div>
          <div class="title">餐廳簡介</div>
          <div class="description">
            {{ restaurant.description }}
          </div>
        </div>
        <div class="rule-wrapper">
          <div class="divider"></div>
          <div class="title">用餐守則</div>
          <ul class="description">
            <li>用餐時間從訂位時間起的90分鐘計算</li>
            <li>座位皆保留十分鐘，如無法按照預期的時間抵達，請致電告知更改時間</li>
            <li>若有須更改人數，請來電確認位子是否可以新增或調整</li>
            <li>用餐座位依餐廳現場安排，恕不指定座位</li>
            <li>網路訂位僅提供1~4位預訂，人數超過4位以上需來電訂位</li>
          </ul>
        </div>
        <div class="reservation-wrapper">
          <div class="divider"></div>
          <div class="number-wrapper">
            <div class="title">用餐人數</div>
            <div class="select-container">
              <div class="select-wrapper">
                <select class="select adult" v-model="adultNum">
                  <option value="0">請選擇用餐人數</option>
                  <option value="1">1位大人</option>
                  <option value="2">2位大人</option>
                  <option value="3">3位大人</option>
                  <option value="4">4位大人</option>
                </select>
              </div>
              <div class="select-wrapper children">
                <select class="select children" v-model="childNum">
                  <option value="0">0位小孩</option>
                  <option value="1">1位小孩</option>
                  <option value="2">2位小孩</option>
                  <option value="3">3位小孩</option>
                </select>
              </div>
            </div>
          </div>
          <div class="date-wrapper">
            <div class="title">用餐日期</div>
            <date-picker
              v-model="pickDate"
              type="date"
              :formatter="momentFormat"
              :placeholder="pickDate | pickDateFormat"
              :disabled-date="notOpen"
              :editable="false"
              :clearable="false"
            ></date-picker>
          </div>
          <div class="time-wrapper">
            <div class="title">用餐時段</div>
            <div class="explain">*灰色表示該時間已客滿或已過用餐時間，請點選其他可訂位日期</div>
            <div class="book-container">
              <div class="divider-wrapper" v-if="businessHoursObj[pickDateName] && businessHoursObj[pickDateName].noon.length > 0">
                <div class="text">中午</div>
                <div class="divider"></div>
              </div>
              <div class="button-wrapper" v-if="businessHoursObj[pickDateName]">
                <div class="button-row" v-for="i in Math.ceil(businessHoursObj[pickDateName].noon.length/3)" :key="`noon-wrapper-${i}`">
                  <button class="button" v-for="(el, idx) in businessHoursObj[pickDateName].noon.slice((i - 1) * 3, i * 3)" :key="`noon-${idx}`" :class="{ active: bookingTime === el, disabled: checkBookingIsLate(el) }" @click="bookingTime = el" :disabled="checkBookingIsLate(el)">
                    <span class="text">{{ el }}</span>
                  </button>
                </div>
              </div>
              <div class="divider-wrapper" v-if="businessHoursObj[pickDateName] && businessHoursObj[pickDateName].afternoon.length > 0">
                <div class="text">下午</div>
                <div class="divider"></div>
              </div>
              <div class="button-wrapper" v-if="businessHoursObj[pickDateName]">
                <div class="button-row" v-for="i in Math.ceil(businessHoursObj[pickDateName].afternoon.length/3)" :key="`afternoon-wrapper-${i}`">
                  <button class="button" v-for="(el, idx) in businessHoursObj[pickDateName].afternoon.slice((i - 1) * 3, i * 3)" :key="`afternoon-${idx}`" :class="{ active: bookingTime === el, disabled: checkBookingIsLate(el) }" @click="bookingTime = el" :disabled="checkBookingIsLate(el)">
                    <span class="text">{{ el }}</span>
                  </button>
                </div>
              </div>
              <div class="divider-wrapper" v-if="businessHoursObj[pickDateName] && businessHoursObj[pickDateName].night.length > 0">
                <div class="text">晚上</div>
                <div class="divider"></div>
              </div>
              <div class="button-wrapper" v-if="businessHoursObj[pickDateName]">
                <div class="button-row" v-for="i in Math.ceil(businessHoursObj[pickDateName].night.length/3)" :key="`night-wrapper-${i}`">
                  <button class="button" v-for="(el, idx) in businessHoursObj[pickDateName].night.slice((i - 1) * 3, i * 3)" :key="`night-${idx}`" :class="{ active: bookingTime === el, disabled: checkBookingIsLate(el) }" @click="bookingTime = el" :disabled="checkBookingIsLate(el)">
                    <span class="text">{{ el }}</span>
                  </button>
                </div>
              </div>
            </div>
            <div class="note">如有訂位以外的需求，請在下一步訂位資訊填寫</div>
          </div>
        </div>
        <div ref="information-wrapper" class="information-wrapper">
          <div class="divider"></div>
          <div class="title">餐廳資訊</div>
          <div class="info-and-map">
            <div class="map-wrapper" v-if="restaurant.google_map_url">
              <iframe :src="`${restaurant.google_map_url.split('&q=')[0].split('key=')[0]}key=AIzaSyCUFAw8OHDSgUFUvBetDdPGUJI8xMGLAGk&q=${restaurant.google_map_url.split('&q=')[1]}`" class="google-map"></iframe>
            </div>
            <div class="information-body">
              <div class="item-wrapper">
                <div class="top-wrapper">
                  <img class="icon map" src="../assets/map.svg">
                  <div class="title">地址</div>
                </div>
                <div class="content" v-if="restaurant.District">台北市{{ `${restaurant.District.name}${restaurant.address}` }}</div>
              </div>
              <div class="item-wrapper">
                <div class="top-wrapper">
                  <img class="icon phone" src="../assets/phone.svg">
                  <div class="title">電話</div>
                </div>
                <div class="content">{{ restaurant.tel ? restaurant.tel : '尚未提供' }}</div>
              </div>
              <div class="item-wrapper">
                <div class="top-wrapper">
                  <img class="icon time" src="../assets/clock.svg">
                  <div class="title">營業時間</div>
                </div>
                <div class="content business-hour" @click="showBusinessHour = !showBusinessHour">
                  {{ todayBusinessHours }}
                  <div class="show-more" :class="{ showing: showBusinessHour}"></div>
                </div>
                <div class="business-hour-wrapper" v-show="showBusinessHour">
                  <div class="content-wrapper">
                    <div class="content" v-for="(time, idx) in restaurant.business_hours" :key="`business_hours-${idx}`">{{ time }}</div>
                  </div>
                </div>
              </div>
              <div class="item-wrapper last">
                <div class="top-wrapper">
                  <img class="icon map" src="../assets/restaurant.svg">
                  <div class="title">餐廳類型</div>
                </div>
                <div class="content" v-if="restaurant.Category">{{ restaurant.Category.name }}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="menu-wrapper" v-if="false">
          <div class="divider"></div>
          <div class="title">菜單</div>
          <div class="img-wrapper">
            <div class="menu-img">
            </div>
          </div>
        </div>
        <div class="comment-wrapper" v-if="restaurant.CommentsCount > 0">
          <div class="divider"></div>
          <div class="text-wrapper">
            <div class="icon star"></div>
            <div class="text" v-if="restaurant.rating">{{ `${restaurant.rating.padEnd(3, '.0')}（${restaurant.CommentsCount}則評價）` }}</div>
          </div>
          <div v-if="restaurant.Comments">
            <div class="comment-container-deck" v-for="deckNum in Math.ceil(restaurant.CommentsCount/2)" :key="`comment-deck-${deckNum}`">
              <div class="comment-container"  v-for="(item, idx) in restaurant.Comments.slice((deckNum - 1) * 2, deckNum * 2)" :key="`comment-${idx}`" :class="{ 'last-comment-container': idx === 2 }">
                <div class="comment-user">
                  <div class="avatar"></div>
                  <div class="name-wrapper">
                    <div class="name">{{ item.name }}</div>
                    <div class="time">{{ item.createdAt| fromNow }}</div>
                  </div>
                </div>
                <div class="content">{{ item.content }}</div>
                <div class="like-wrapper">
                  <div class="icon like" :class="{ isAuthenticated: isAuthenticated, isLiked: item.isLiked }" @click="isAuthenticated ? item.isLiked ? disLikeComment(item.id) : likeComment(item.id) : ''"></div>
                  <div class="count">{{ item.LikesCount }}</div>
                </div>
              </div>
            </div>
          </div>
          <div class="load-more" v-if="restaurant.CommentsCount > 24">
            <div class="load-more-button">載入更多評論</div>
          </div>
        </div>
      </div>
      <div ref="footer">
        <Footer></Footer>
      </div>
    </div>
    <div class="booking-button-wrapper" v-show="restaurantInfoHeight >  scrollY + footerHeight">
      <div class="booking-info-wrapper">
        <div class="booking-info">{{ pickDate | pickDateFormat }}</div>
        <div class="booking-info">
          <span>{{ adultNum }}大</span>
          <span v-if="childNum > 0">{{ childNum }}小</span>
        </div>
        <div v-if="bookingTime" class="booking-info">{{ bookingTime }}</div>
      </div>
      <div class="divider"></div>
      <div v-if="isAuthenticated" class="booking-button" :class="{ invalid: !bookingTime || adultNum < 1}" :disabled="!bookingTime || adultNum < 1" @click="bookingTime && adultNum > 0 ? $router.push(`/booking?restaurant=${$route.params.id}&adult=${adultNum}&child=${childNum}&date=${new Date(pickDate).getTime()}&time=${bookingTime}`) : ''">
        <div class="text" v-if="bookingTime && adultNum > 0">下一步，填寫聯絡資訊</div>
        <div class="text" v-if="!bookingTime && adultNum > 0">選擇用餐時間</div>
        <div class="text" v-if="adultNum < 1">選擇用餐人數</div>
      </div>
      <div v-if="!isAuthenticated" class="booking-button invalid" @click="$router.push('/signin')">
        <div class="text">請先登入再進行訂位</div>
      </div>
    </div>
  </div>
</template>

<script>

import { Toast } from '@/utils/helpers'
import { mapState } from 'vuex'
import restaurantsAPI from '@/apis/restaurants'
import usersAPI from '@/apis/users'
import Navbar from '@/components/Navbar.vue'
import moment from 'moment'
import Footer from '@/components/Footer.vue'
import DatePicker from 'vue2-datepicker'
export default {
  data () {
    return {
      showModal: false,
      scrollY: 0,
      scrollUp: true,
      restaurantInfoHeight: 1,
      footerHeight: 0,
      today: `${moment().format('M/DD')} ${moment().format('ddd')} (今日)`,
      chooseDate: false,
      pickDate: Date.now(),
      pickDateName: moment(this.pickDate).format('dddd'),
      momentFormat: {
        stringify: (date) => {
          if (moment(date).format('M/DD') === moment().format('M/DD')) {
            return `${moment().format('M/DD')} ${moment().format('ddd')} (今日)`
          } else {
            return `${moment(date).format('M/DD')} ${moment(date).format('ddd')}`
          }
        }
      },
      scrollBarHeight: 0,
      adultNum: 2,
      childNum: 0,
      bookingTime: '',
      restaurant: {},
      todayBusinessHours: '',
      showBusinessHour: false,
      businessHoursObj: {},
      closeDate: []
    }
  },
  components: {
    DatePicker,
    Footer,
    Navbar
  },
  created () {
    this.fetchRestaurant(this.$route.params.id)
  },
  mounted () {
    this.$nextTick(() => {
      this.$refs.restaurant.addEventListener('scroll', this.onScroll, { passive: true })
    })
    this.footerHeight = this.$refs.footer.offsetHeight
    this.restaurantInfoHeight = this.$refs.restaurant.scrollHeight
    this.scrollBarHeight = this.$refs.restaurant.clientHeight
  },
  computed: {
    ...mapState(['currentUser', 'isAuthenticated']),
    copyPath () {
      return `${window.location}`
    }
  },
  watch: {
    pickDate () {
      this.pickDateName = moment(this.pickDate).format('dddd')
    }
  },
  methods: {
    onScroll (e) {
      this.scrollUp = this.scrollY > this.$refs.restaurant.scrollTop
      this.scrollY = this.$refs.restaurant.scrollTop
    },
    closeFilter () {
      this.showModal = false
    },
    selectDate () {
      this.chooseDate = !this.chooseDate
    },
    notOpen (date) {
      return date < new Date(new Date().setHours(0, 0, 0, 0)) || this.closeDate.includes(moment(date).format('dddd'))
    },
    scrollToMap () {
      this.$refs['information-wrapper'].scrollIntoView({
        behavior: 'auto',
        block: 'center',
        inline: 'center'
      })
    },
    async fetchRestaurant (id) {
      try {
        const { data } = this.isAuthenticated ? await restaurantsAPI.getUsersRestaurant(id) : await restaurantsAPI.getRestaurant(id)
        this.restaurant = data
        this.restaurant.business_hours = JSON.parse(this.restaurant.business_hours)
        this.findTodayBusinessHours()
        this.businessHoursProcessor()
        if (this.closeDate.includes(moment(this.pickDate).format('dddd'))) {
          const today = new Date()
          for (let i = 0; i < 6; i++) {
            this.pickDate = today.setDate(new Date().getDate() + i)
            if (!this.closeDate.includes(moment(this.pickDate).format('dddd'))) {
              break
            }
          }
          this.pickDateName = moment(this.pickDate).format('dddd')
        }
      } catch (error) {
        console.log(error)
        Toast.fire({
          icon: 'error',
          title: '目前無法取得餐廳，請稍候'
        })
      }
    },
    checkBookingIsLate (time) {
      const momentToday = moment(this.pickDate).format('YYYY/MM/DD')
      if (new Date(`${momentToday} ${time}`) < new Date(new Date(`${momentToday} 6:00`))) {
        const tomorrow = new Date(`${moment(this.pickDate).format('YYYY/MM/DD')} ${time}`)
        tomorrow.setDate(new Date(`${moment(this.pickDate).format('YYYY/MM/DD')} ${time}`).getDate() + 1)
        return new Date(`${moment(tomorrow).format('YYYY/MM/DD')} ${time}`) < new Date()
      }
      return new Date(`${momentToday} ${time}`) < new Date()
    },
    findTodayBusinessHours () {
      this.restaurant.business_hours.forEach((b, idx) => {
        if (b.slice(0, 3) === moment(new Date()).format('dddd')) {
          this.todayBusinessHours = this.restaurant.business_hours[idx]
        }
      })
    },
    businessHoursProcessor () {
      this.restaurant.business_hours.forEach(b => {
        this.businessHoursObj[b.slice(0, 3)] = { hours: [], start: '', end: '', noon: [], afternoon: [], night: [] }
        if (!b.includes('休息')) {
          let startAndEnd
          if (b.slice(4, b.length).includes(',')) {
            startAndEnd = b.slice(4, b.length).split(',')[0].trim().split('-')
            this.checkStartAndEnd(startAndEnd, b)
            this.pushOpenHours()
            startAndEnd = b.slice(4, b.length).split(',')[1].trim().split('-')
            this.checkStartAndEnd(startAndEnd, b)
            this.pushOpenHours()
          } else {
            startAndEnd = b.slice(4, b.length).split('-')
            this.checkStartAndEnd(startAndEnd, b)
            this.pushOpenHours()
          }
        } else {
          this.closeDate.push(b.slice(0, 3))
        }
      })
      this.dayOrNight('06:00', '13:30', 'noon')
      this.dayOrNight('14:00', '17:30', 'afternoon')
      this.dayOrNight('18:00', '23:30', 'night')
      this.dayOrNight('00:00', '05:30', 'night')
    },
    checkStartAndEnd (startAndEnd, dayName) {
      const halfHourArray = []
      for (let i = 0; i < 24; i++) {
        for (let j = 0; j < 2; j++) {
          halfHourArray.push(`${String(i).padStart(2, '0')}:${String(j * 30).padStart(2, '0')}`)
        }
      }
      for (let i = 0; i < 2; i++) {
        if (startAndEnd[i].slice(3, 5) !== '00' && startAndEnd[i].slice(3, 5) !== '30') {
          if (Number(startAndEnd[i].slice(3, 5)) > 30) {
            startAndEnd[i] = startAndEnd[i].slice(0, 3) + '30'
          } else {
            startAndEnd[i] = startAndEnd[i].slice(0, 3) + '00'
          }
        }
      }
      halfHourArray.forEach((time, idx) => {
        if (time === startAndEnd[0]) {
          this.businessHoursObj[dayName.slice(0, 3)].start = halfHourArray[idx]
        }
        if (time === startAndEnd[1]) {
          let lastBooking = idx - 2
          if (lastBooking < 0) {
            lastBooking = halfHourArray.length + lastBooking
          }
          this.businessHoursObj[dayName.slice(0, 3)].end = halfHourArray[lastBooking]
        }
      })
    },
    pushOpenHours () {
      const halfHourArray = []
      for (let i = 0; i < 24; i++) {
        for (let j = 0; j < 2; j++) {
          halfHourArray.push(`${String(i).padStart(2, '0')}:${String(j * 30).padStart(2, '0')}`)
        }
      }
      Object.keys(this.businessHoursObj).forEach(key => {
        halfHourArray.forEach((time, idx) => {
          if (new Date('1970/01/01 ' + this.businessHoursObj[key].start) > new Date('1970/01/01 ' + this.businessHoursObj[key].end)) {
            if (!this.businessHoursObj[key].hours.includes(time) && new Date('1970/01/01 ' + time) <= new Date('1970/01/01 ' + this.businessHoursObj[key].end)) {
              this.businessHoursObj[key].hours.push(time)
            }
            if (!this.businessHoursObj[key].hours.includes(time) && !(new Date('1970/01/01 ' + time) >= new Date('1970/01/01 ' + this.businessHoursObj[key].end) && new Date('1970/01/01 ' + time) <= new Date('1970/01/01 ' + this.businessHoursObj[key].start))) {
              this.businessHoursObj[key].hours.push(time)
            }
          } else {
            if (!this.businessHoursObj[key].hours.includes(time) && (new Date('1970/01/01 ' + time) >= new Date('1970/01/01 ' + this.businessHoursObj[key].start) && new Date('1970/01/01 ' + time) <= new Date('1970/01/01 ' + this.businessHoursObj[key].end))) {
              this.businessHoursObj[key].hours.push(time)
            }
          }
        })
      })
    },
    dayOrNight (begin, end, range) {
      Object.keys(this.businessHoursObj).forEach(key => {
        this.businessHoursObj[key].hours.forEach((time, idx) => {
          if (!this.businessHoursObj[key][range].includes(time) && (new Date('1970/01/01 ' + time) >= new Date('1970/01/01 ' + begin) && new Date('1970/01/01 ' + time) <= new Date('1970/01/01 ' + end))) {
            this.businessHoursObj[key][range].push(time)
          }
        })
      })
    },
    async likeComment (id) {
      try {
        const { data } = await usersAPI.likeComment(id)
        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        this.restaurant.Comments.forEach(c => {
          if (c.id === id) {
            c.isLiked = true
            c.LikesCount += 1
          }
        })
      } catch (error) {
        console.log(error)
        Toast.fire({
          icon: 'error',
          title: '目前無法按讚評論，請稍後'
        })
      }
    },
    async disLikeComment (id) {
      try {
        const { data } = await usersAPI.disLikeComment(id)
        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        this.restaurant.Comments.forEach(c => {
          if (c.id === id) {
            c.isLiked = false
            c.LikesCount -= 1
          }
        })
      } catch (error) {
        console.log(error)
        Toast.fire({
          icon: 'error',
          title: '目前無法取消按讚評論，請稍後'
        })
      }
    },
    async addFavorite (id) {
      try {
        const { data } = await usersAPI.addFavorite(id)
        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        this.restaurant.isFavorited = true
        Toast.fire({
          icon: 'success',
          title: '已加入我的收藏'
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
        this.restaurant.isFavorited = false
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
    onCopy: function (e) {
      Toast.fire({
        icon: 'success',
        title: '複製到剪貼簿'
      })
    },
    onError: function (e) {
      Toast.fire({
        icon: 'error',
        title: '目前無法複製，請稍候'
      })
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
@import '~vue2-datepicker/scss/index.scss';
.restaurant {
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
  .restaurant-searchbar-wrapper {
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
    .icon-container {
      display: flex;
      flex-direction: row;
      padding: 6px 24px 0 8px;
      .favorite-wrapper {
        width: 16px;
        height: 16px;
        display: flex;
        justify-content: center;
        align-items: center;
        .icon.favorite {
          margin: auto;
          height: 16px;
          width: 16px;
          background-color: #000000;
          mask: url(../assets/favorite.svg) no-repeat center;
        }
        .icon.favorite.isFavorited {
          background-color: $red;
          mask: url(../assets/red-heart.svg) no-repeat center;
        }
      }
      .share-wrapper {
        margin-right: 20px;
        width: 16px;
        height: 16px;
        display: flex;
        justify-content: center;
        align-items: center;
        .icon.share {
          margin: auto;
          height: 16px;
          width: 16px;
          background-color: #000000;
          mask: url(../assets/share.svg) no-repeat center;
        }
      }
    }
  }
  .info-container {
    height: 100%;
    width: 100%;
    scroll-behavior: smooth;
    position: absolute;
    top: 60px;
    @media (min-width: 768px) {
      top: 0px;
    }
    .mobile-picture-wrapper {
      width: 100%;
      padding-top: 66.7%;
      position: relative;
      @media (min-width: 768px) {
        display: none;
      }
      .picture {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: url(https://inline.imgix.net/branch/-LNTA3as3A6I5JWKglD6:inline-live-2a466--LNTA3bp4eBC0NuJ-TSc-48484d1f-999e-401f-94ae-b716e1d3abf5.jpg) no-repeat center;
        background-size: cover
      }
    }
    .restaurant-info {
      margin: 0 auto 40px;
      max-width: 1040px;
      padding: 0 24px;
      @media (min-width: 768px) {
        padding: 105px 40px 0;
      }
      @media (min-width: 992px) {
        padding: 105px 80px 0;
      }
      .picture-wrapper {
        display: none;
        @media (min-width: 768px) {
          display: block;
          padding-top: 50%;
          width: 100%;
          position: relative;
        }
        .picture {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url(https://inline.imgix.net/branch/-LNTA3as3A6I5JWKglD6:inline-live-2a466--LNTA3bp4eBC0NuJ-TSc-48484d1f-999e-401f-94ae-b716e1d3abf5.jpg) no-repeat center;
          background-size: cover;
          border-radius: 12px;
        }
      }
      .title-wrapper {
        padding: 32px 0px 24px 0px;
        position: relative;
        .icon-container {
          display: none;
          @media (min-width: 768px) {
            position: absolute;
            bottom: 24px;
            right: 0;
            display: flex;
            flex-direction: row;
          }
          .favorite-wrapper {
            cursor: pointer;
            width: 24px;
            height: 24px;
            display: flex;
            justify-content: center;
            align-items: center;
            .icon.favorite {
              margin: auto;
              height: 16px;
              width: 16px;
              background-color: #000000;
              mask: url(../assets/favorite.svg) no-repeat center;
            }
            .icon.favorite.isFavorited {
              background-color: $red;
              mask: url(../assets/red-heart.svg) no-repeat center;
            }
          }
          .share-wrapper {
            cursor: pointer;
            margin-right: 20px;
            width: 24px;
            height: 24px;
            display: flex;
            justify-content: center;
            align-items: center;
            .icon.share {
              margin: auto;
              height: 16px;
              width: 16px;
              background-color: #000000;
              mask: url(../assets/share.svg) no-repeat center;
            }
          }
        }
        .title {
          text-align: left;
          margin: 0;
        }
        .info-wrapper {
          padding-top: 12px;
          display: flex;
          flex-direction: row;
          margin-bottom: 12px;
          .rating-wrapper {
            display: flex;
            flex-direction: row;
            line-height: 18px;
            .icon {
              margin: auto 0;
              margin-right: 4px;
              background-color: $red;
              height: 14px;
              width: 14px;
              line-height: 18px;
            }
            .icon.star {
              mask: url(../assets/star.svg) no-repeat center;
            }
            .rating {
              font-size: 14px;
              font-weight: 600;
              margin-right: 4px;
              line-height: 18px;
            }
            .rating-count {
              font-size: 14px;
              font-weight: 400;
            }
          }
          .dot {
            color: #717171;
            font-weight: 400;
            margin: 0 8px;
            line-height: 18px;
          }
          .district {
            color: #717171;
            font-weight: 400;
            line-height: 18px;
          }
        }
        .address-wrapper {
          margin-bottom: 12px;
          text-align: left;
          font-weight: 400;
          line-height: 18px;
          font-size: 16px;
        }
        .contact-wrapper {
          display: flex;
          flex-direction: row;
          .phone-wrapper {
            display: flex;
            flex-direction: row;
            margin-right: 20px;
            .icon.phone {
              margin: auto 0;
              margin-right: 10px;
              height: 16px;
              width: 16px;
            }
            .phone {
              font-weight: 400;
              line-height: 1.5;
              font-size: 16px;
            }
          }
          .map-wrapper {
            cursor: pointer;
            display: flex;
            flex-direction: row;
            margin-right: 20px;
            .icon.map {
              margin: auto 0;
              margin-right: 10px;
              height: 16px;
              width: 16px;
            }
            .map {
              font-weight: 400;
              text-decoration: underline;
              line-height: 1.5;
              font-size: 16px;
            }
          }
        }
      }
      .description-wrapper {
        padding: 0px 0px 24px 0px;
        .divider {
          background: $divider;
          height: 1px;
        }
        .title {
          margin-top: 24px;
          margin-bottom: 24px;
          font-size: 22px;
          font-weight: 700;
          text-align: left;
          line-height: 22px;
        }
        .description {
          text-align: left;
          font-weight: 400;
          line-height: 1.5;
          font-size: 16px;
        }
      }
      .rule-wrapper {
        padding: 0px 0px 24px 0px;
        .divider {
          background: $divider;
          height: 1px;
        }
        .title {
          margin-top: 24px;
          margin-bottom: 24px;
          font-size: 22px;
          font-weight: 700;
          text-align: left;
          line-height: 22px;
        }
        .description {
          list-style-type: decimal;
          text-align: left;
          font-weight: 400;
          line-height: 1.5;
          font-size: 16px;
          padding-inline-start: 24px;
          li {
            word-wrap: break-word;
          }
        }
      }
      .reservation-wrapper {
        padding: 0px 0px 24px 0px;
        .divider {
          background: $divider;
          height: 1px;
        }
        .number-wrapper {
          margin-top: 24px;
          .title {
            margin-bottom: 24px;
            font-size: 18px;
            font-weight: 700;
            text-align: left;
            line-height: 18px;
          }
          .select-container {
            display: flex;
            .select-wrapper {
              padding: 0 4px;
              flex: 1;
              @media (min-width: 768px) {
                padding: 0 6px;
              }
              @media (min-width: 992px) {
                padding: 0 8px;
              }
              .select {
                cursor: pointer;
                width: 100%;
                padding: 0 1.4rem 0 0.8rem;
                appearance: none;
                border: 1px solid $ultimategray;
                line-height: 40px;
                border-radius: 8px;
                font-size: 16px;
                font-weight: 400;
                outline: none;
                background: transparent;
                background-image: url("../assets/down-arrow.svg");
                background-repeat: no-repeat;
                background-position: right 0.5em top 50%, 0px 0px;
                background-size: 12px;
              }
            }
          }
        }
        .date-wrapper {
          margin-top: 24px;
          .title {
            margin-bottom: 24px;
            font-size: 18px;
            font-weight: 700;
            text-align: left;
            line-height: 18px;
          }
          .mx-datepicker {
            width: 100%;
            .mx-input-wrapper {
              padding: 0 4px;
              flex: 1;
              @media (min-width: 768px) {
                padding: 0 8px;
              }
              @media (min-width: 992px) {
                padding: 0 8px;
              }
              .mx-input {
                cursor: pointer;
                height: 40px;
                padding: 0 1.4rem 0 0.8rem;
                appearance: none;
                text-align: left;
                appearance: none;
                border: 1px solid $ultimategray;
                line-height: 40px;
                border-radius: 8px;
                font-size: 16px;
                font-weight: 400;
                outline: none;
              }
              .mx-input::placeholder {
                color: #222222;
              }
              .mx-icon-calendar {
                right: 12px;
                @media (min-width: 768px) {
                  right: 14px;
                }
                @media (min-width: 992px) {
                  right: 16px;
                }
              }
            }
            svg {
              fill: #222222;
            }
          }
        }
        .time-wrapper {
          margin-top: 24px;
          .title {
            margin-bottom: 24px;
            font-size: 18px;
            font-weight: 700;
            text-align: left;
            line-height: 18px;
          }
          .explain {
            margin-bottom: 24px;
            font-size: 14px;
            font-weight: 400;
            text-align: left;
            line-height: 1.5;
          }
          .book-container {
            margin-bottom: 24px;
            .divider-wrapper {
              margin: 12px 0;
              display: flex;
              flex-direction: row;
              align-items: center;
              .text {
                color: $ultimategray;
                font-size: 14px;
                font-weight: 400;
                text-align: left;
                line-height: 1.5;
              }
              .divider {
                margin-left: 8px;
                height: 1px;
                background: $divider;
                flex-grow: 1
              }
            }
            .button-wrapper {
              text-align: left;
              display: flex;
              flex-direction: column;
              width: 100%;
              .button-row {
                flex: 1;
                display: flex;
                .button {
                  cursor: pointer;
                  margin: 0 4px 16px;
                  height: 44px;
                  padding: 8px 0;
                  appearance: none;
                  width: calc((100% - 24px) / 3);
                  border-radius: 8px;
                  border: 1px solid $ultimategray;
                  background: none;
                  .text {
                    font-weight: 400;
                    font-size: 16px;
                    line-height: 1.5;
                    width: 100%;
                    text-align: center;
                  }
                  &:hover {
                    background: #666;
                    .text {
                      color: #ffffff
                    }
                  }
                }
                .button.disabled {
                  color: #ffffff;
                  background: #919191;
                  cursor: not-allowed;
                }
                .button:focus {
                  outline: none;
                }
                .button.active {
                  background: #000000;
                  .text {
                    color: #ffffff
                  }
                }
              }
            }
          }
          .note {
            width: 100%;
            text-align: center;
            margin-bottom: 24px;
            font-size: 14px;
            font-weight: 600;
            line-height: 1.5;
          }
        }
      }
      .information-wrapper {
        padding: 0px 0px 24px 0px;
        .divider {
          background: $divider;
          height: 1px;
        }
        .title {
          margin-top: 24px;
          margin-bottom: 24px;
          font-size: 22px;
          font-weight: 700;
          text-align: left;
          line-height: 22px;
        }
        .info-and-map {
          display: flex;
          flex-direction: column;
          @media (min-width: 992px) {
            flex-direction: row;
          }
          .map-wrapper {
            flex: 1.5;
            margin-bottom: 24px;
            width: 100%;
            @media (min-width: 992px) {
              margin-bottom: 0;
            }
            .google-map {
              height: 100%;
              width: 100%;
              border: none;
              min-height: 233px;
            }
          }
          .information-body {
            flex: 1;
            @media (min-width: 992px) {
              margin-left: 32px;
            }
            .item-wrapper {
              border-bottom: 1px solid $divider;
              position: relative;
              .top-wrapper {
                display: flex;
                flex-direction: row;
                .title {
                  margin: 12px 0;
                  font-size: 16px;
                  font-weight: 600;
                  line-height: 1.5;
                }
                .icon {
                  fill: $ultimategray;
                  margin: auto 0;
                  margin-right: 10px;
                  height: 14px;
                  width: 14px;
                }
              }
              .content {
                text-align: left;
                margin-left: 24px;
                font-size: 16px;
                line-height: 1.5;
                margin-bottom: 12px;
                position: relative;
                .show-more {
                  cursor: pointer;
                  position: absolute;
                  right: 0;
                  top: 4px;
                  width: 16px;
                  height: 16px;
                  background-image: url("../assets/down-arrow.svg");
                  background-repeat: no-repeat;
                }
                .show-more.showing {
                  background-image: url("../assets/up-arrow.svg");
                  background-repeat: no-repeat;
                }
              }
              .content.business-hour {
                cursor: pointer;
              }
              .business-hour-wrapper {
                z-index: 3;
                box-shadow: rgba(0, 0, 0, 0.12) 0px 6px 16px;
                position: absolute;
                top: 100%;
                left: 0;
                width: 100%;
                background: #ffffff;
                border-radius: 15px;
                .content-wrapper {
                  margin: 12px 12px 0px;
                  display: flex;
                  flex-direction: column;
                  justify-content: flex-start;
                  align-items: center;
                  .content {
                    width: 100%;
                    flex: 1;
                    text-align: left;
                  }
                }
              }
            }
            .item-wrapper.last {
              border: none;
            }
          }
        }
      }
      .menu-wrapper {
        padding: 0px 0px 24px 0px;
        .divider {
          background: $divider;
          height: 1px;
        }
        .title {
          margin-top: 24px;
          margin-bottom: 24px;
          font-size: 22px;
          font-weight: 700;
          text-align: left;
          line-height: 22px;
        }
        .img-wrapper {
          margin-bottom: 24px;
          padding-top: 66.7%;
          position: relative;
          @media (min-width: 768px) {
            padding-top: 50%;
          }
          @media (min-width: 992px) {
            padding-top: 33.3%;
          }
          .menu-img {
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            right: 50%;
            background: url(https://inline.imgix.net/menus/-LNTA3as3A6I5JWKglD6:inline-live-2a466--LNTA3bp4eBC0NuJ-TSc-abf54248-3e5f-4faa-8367-5a6f171277f9_201912-01.jpg) no-repeat center;
            background-size: cover;
            @media (min-width: 768px) {
              right: 66.7%;
            }
            @media (min-width: 992px) {
              right: 75%;
            }
          }
        }
      }
      .comment-wrapper {
        padding: 0px 0px 24px 0px;
        .divider {
          background: $divider;
          height: 1px;
        }
        .text-wrapper {
          display: flex;
          flex-direction: row;
          .icon.star {
            margin: auto 0;
            margin-right: 8px;
            background-color: $red;
            height: 1rem;
            width: 1rem;
            line-height: 1rem;
            mask: url(../assets/star.svg) no-repeat center;
          }
          .text {
            margin-top: 24px;
            margin-bottom: 24px;
            font-size: 22px;
            font-weight: 700;
            text-align: left;
            line-height: 22px;
          }
        }
        .comment-container-deck {
          display: flex;
          flex-direction: column;
          @media (min-width: 768px) {
            flex-direction: row;
          }
          .comment-container {
            padding: 0px;
            flex: 1;
            margin-bottom: 40px;
            @media (min-width: 768px) {
              flex: 0.5;
              padding: 16px;
              margin-right: 16px;
              border: 1px solid $divider;
              border-radius: 32px;
            }

            @media (min-width: 992px) {
              padding: 24px;
              margin-right: 24px;
            }
            .comment-user {
              display: flex;
              flex-direction: row;
              margin-bottom: 12px;
              align-items: center;
              .avatar {
                height: 40px;
                width: 40px;
                border-radius: 50%;
                background: $ultimategray;
              }
              .name-wrapper {
                margin-left: 12px;
                text-align: left;
                .name {
                  font-size: 16px;
                  line-height: 20px;
                  font-weight: 600;
                }
                .time {
                  font-size: 14px;
                  line-height: 20px;
                  font-weight: 400;
                  color: $ultimategray;
                }
              }
            }
            .content {
              text-align: left;
              font-size: 16px;
              line-height: 24px;
              font-weight: 400;
              margin-bottom: 12px;
              min-height: 72px;
            }
            .like-wrapper {
              display: flex;
              flex-direction: row;
              line-height: 18px;
              .icon.like {
                margin: auto 0;
                margin-right: 8px;
                background-color: #222222;
                height: 14px;
                width: 14px;
                mask: url(../assets/black-heart.svg) no-repeat center;
              }
              .icon.like.isAuthenticated {
                cursor: pointer;
                &:hover {
                  background-color: $red;
                }
              }
              .icon.like.isAuthenticated.isLiked {
                cursor: pointer;
                background-color: $red;
                mask: url(../assets/isLiked.svg) no-repeat center;
                &:hover {
                  mask: url(../assets/black-heart.svg) no-repeat center;
                }
              }
              .count {
                font-size: 14px;
                font-weight: 400;
              }
            }
          }
          .comment-container.last-comment-container {
            @media (min-width: 768px) {
              margin-right: 0;
            }
          }
        }
        .load-more {
          width: 100%;
          margin: 40px 0;
          .load-more-button {
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
  .booking-button-wrapper {
    box-shadow: rgba(0, 0, 0, 0.12) 0px 6px 16px;
    border-top: 1px solid $divider;
    position: fixed;
    bottom: 0;
    width: calc(100vw - 48px);
    padding: 8px 24px;
    background: #ffffff;
    @media (min-width: 768px) {
      width: calc(100vw - 80px);
      padding: 12px 40px;
    }
    @media (min-width: 992px) {
      width: calc(100vw - 160px);
      padding: 16px 80px;
    }
    .booking-info-wrapper {
      margin: auto;
      max-width: 1040px;
      display: flex;
      flex-direction: row;
      .booking-info {
        margin-right: 8px;
        font-size: 14px;
        background: $divider;
        padding: 8px 12px;
        border-radius: 8px;
      }
    }
    .divider {
      max-width: 1040px;
      background: $divider;
      height: 1px;
      width: 100%;
      margin: 8px auto;
    }
    .booking-button {
      cursor: pointer;
      margin: auto;
      max-width: 1040px;
      height: 48px;
      width: calc(100vw - 48px);
      background: #000000;
      border-radius: 8px;
      display: flex;
      justify-content: center;
      align-items: center;
      @media (min-width: 768px) {
        width: calc(100vw - 80px);
      }
      @media (min-width: 992px) {
        width: calc(100vw - 160px);
      }
      .text {
        color: #ffffff;
        cursor: pointer;
        font-weight: 700;
        font-size: 16px;
        line-height: 20px;
      }
    }
    .booking-button.invalid {
      background: $ultimategray;
    }
  }
}
</style>
