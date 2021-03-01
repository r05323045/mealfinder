<template>
  <div class="selector-container" v-show="showSelector">
    <div class="selector-wrapper">
      <div class="selector">
        <div class="item-wrapper" @click.stop="completeSelect()">
          <div class="item-icon near"></div>
          <div class="item">附近地點</div>
        </div>
        <div class="item-wrapper" v-for="district in districts" :key="district.id" @click.stop="completeSelect(district.name)">
          <div class="item-icon"></div>
          <div class="item">{{ district.name }}．台北市</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { Toast } from '@/utils/helpers'
import restaurantsAPI from '@/apis/restaurants'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      districts: []
    }
  },
  props: {
    showSelector: {
      type: Boolean
    }
  },
  computed: {
    ...mapState(['currentUser', 'isAuthenticated'])
  },
  created () {
    this.fetchDistricts()
  },
  methods: {
    async fetchDistricts () {
      try {
        const { data } = await restaurantsAPI.getDistricts()
        this.districts = data.districts
      } catch (error) {
        console.log(error)
        Toast.fire({
          icon: 'error',
          title: '目前無法取得地區，請稍候'
        })
      }
    },
    completeSelect (district) {
      let returnDistrict = ''
      if (district) {
        returnDistrict = district
      }
      this.$emit('selectDistrict', returnDistrict)
    }
  }
}
</script>

<style lang="scss" scoped>
$ultimategray: #939597;
$divider: #E6ECF0;
$red: rgb(255, 56, 92);
.selector-container {
  z-index: 999;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 6px 16px;
  position: absolute;
  top: 72px;
  width: 375px;
  height: 304px;
  background: #ffffff;
  border-radius: 32px;
  max-height: 304px;
  overflow: hidden;
  @media (min-width: 1200px) {
    height: 364px;
    max-height: 364px;
    width: 450px;
  }
  .selector-wrapper {
    position: relative;
    overflow: hidden;
    max-height: 240px;
    height: 240px;
    padding: 32px 0px;
    @media (min-width: 1200px) {
      max-height: 300px;
      height: 300px;
    }
    .selector {
      overflow: scroll;
      max-height: 240px;
      height: 240px;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      @media (min-width: 1200px) {
        max-height: 300px;
        height: 300px;
      }
      .item-wrapper {
        display: flex;
        flex-direction: row;
        align-items: center;
        cursor: pointer;
        width: calc(100% - 48px);
        padding: 12px 24px;
        flex: 1;
        &:hover {
          background: $divider;
        }
        .item-icon {
          margin: auto 0;
          margin-right: 24px;
          height: 36px;
          width: 36px;
          background: url(../assets/city-night.svg) no-repeat center / cover;
        }
        .item-icon.near{
          background: url(../assets/city-day.svg) no-repeat center / cover;
        }
        .item {
          font-size: 16px;
          font-weight: 400;
          text-align: left;
          line-height: 22px;
        }
      }
      .divider-wrapper {
        width: 100%;
        .divider {
          position: absolute;
          left: 0;
          right: 0;
          height: 1px;
          background: $divider;
        }
      }
    }
  }
}
</style>
