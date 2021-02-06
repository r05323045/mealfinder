import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import moment from 'moment'
import zh from './zh_TW.js'
import { ValidationObserver, ValidationProvider, localize, configure, extend } from 'vee-validate'
import * as rules from 'vee-validate/dist/rules'

Vue.config.productionTip = false

moment.locale('zh-tw', {
  months: '一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月'.split('_'),
  monthsShort: '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
  weekdays: '星期日_星期一_星期二_星期三_星期四_星期五_星期六'.split('_'),
  weekdaysShort: '週日_週一_週二_週三_週四_週五_週六'.split('_'),
  weekdaysMin: '日_一_二_三_四_五_六'.split('_'),
  longDateFormat: {
    LT: 'Ah點mm分',
    LTS: 'Ah點m分s秒',
    L: 'YYYY-MM-DD',
    LL: 'YYYY年MMMD日',
    LLL: 'YYYY年MMMD日Ah點mm分',
    LLLL: 'YYYY年MMMD日ddddAh點mm分',
    l: 'YYYY-MM-DD',
    ll: 'YYYY年MMMD日',
    lll: 'YYYY年MMMD日Ah點mm分',
    llll: 'YYYY年MMMD日ddddAh點mm分'
  },
  meridiemParse: /凌晨|早上|上午|中午|下午|晚上/,
  meridiemHour: function (h, meridiem) {
    let hour = h
    if (hour === 12) {
      hour = 0
    }
    if (meridiem === '凌晨' || meridiem === '早上' ||
      meridiem === '上午') {
      return hour
    } else if (meridiem === '下午' || meridiem === '晚上') {
      return hour + 12
    } else {
      return hour >= 11 ? hour : hour + 12
    }
  },
  meridiem: function (hour, minute, isLower) {
    const hm = hour * 100 + minute
    if (hm < 600) {
      return '凌晨'
    } else if (hm < 900) {
      return '早上'
    } else if (hm < 1130) {
      return '上午'
    } else if (hm < 1230) {
      return '中午'
    } else if (hm < 1800) {
      return '下午'
    } else {
      return '晚上'
    }
  },
  calendar: {
    sameDay: function () {
      return this.minutes() === 0 ? '[今天]Ah[點整]' : '[今天]LT'
    },
    nextDay: function () {
      return this.minutes() === 0 ? '[明天]Ah[點整]' : '[明天]LT'
    },
    lastDay: function () {
      return this.minutes() === 0 ? '[昨天]Ah[點整]' : '[昨天]LT'
    },
    nextWeek: function () {
      const startOfWeek = moment().startOf('week')
      const prefix = this.diff(startOfWeek, 'days') >= 7 ? '[下]' : '[本]'
      return this.minutes() === 0 ? prefix + 'dddA點整' : prefix + 'dddAh點mm'
    },
    lastWeek: function () {
      const startOfWeek = moment().startOf('week')
      const prefix = this.unix() < startOfWeek.unix() ? '[上]' : '[本]'
      return this.minutes() === 0 ? prefix + 'dddAh點整' : prefix + 'dddAh點mm'
    },
    sameElse: 'LL'
  },
  ordinalParse: /\d{1,2}(日|月|週)/,
  ordinal: function (number, period) {
    switch (period) {
      case 'd':
      case 'D':
      case 'DDD':
        return number + '日'
      case 'M':
        return number + '月'
      case 'w':
      case 'W':
        return number + '週'
      default:
        return number
    }
  },
  relativeTime: {
    future: '%s内',
    past: '%s前',
    s: '幾秒',
    m: '1 分鐘',
    mm: '%d 分鐘',
    h: '1 小時',
    hh: '%d 小時',
    d: '1 天',
    dd: '%d 天',
    M: '1 個月',
    MM: '%d 个月',
    y: '1 年',
    yy: '%d 年'
  },
  week: {
    dow: 1,
    doy: 4
  }
})

Vue.filter('pickDateFormate', function (date) {
  if (moment(date).format('M/DD') === moment().format('M/DD')) {
    return `${moment().format('M/DD')} ${moment().format('ddd')} (今日)`
  } else {
    return `${moment(date).format('M/DD')} ${moment(date).format('ddd')}`
  }
})

Object.keys(rules).forEach(rule => {
  extend(rule, rules[rule])
})

extend('password', {
  params: ['target'],
  validate (value, { target }) {
    return value === target
  },
  message: '密碼與密碼確認不相同'
})

configure({
  classes: {
    valid: 'is-valid',
    invalid: 'is-invalid'
  }
})
localize('tw', zh)

Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
