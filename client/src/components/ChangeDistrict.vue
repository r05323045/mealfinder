<template>
  <div class="modal" v-show="showModal" :class="{ show: showModal, innerShow: modalContentShow }">
    <div class="modal-background" @click="closeModal"></div>
    <div class="modal-content" v-show="showModal" :class="{show: modalContentShow }">
      <div class="modal-container" v-show="modalContentShow">
        <div class="top-wrapper">
          <div class="close-wrapper" @click="closeModal">
            <div class="icon close"></div>
          </div>
          <div class="title">
            選擇用餐地區
            <div class="clear-all" @click="tempFilter = []">清除全部</div>
          </div>
        </div>
        <div class="filter-container">
          <div class="category">
            <div class="title">台北市</div>
            <div class="item-group">
              <label class="item" v-for="(item, idx) in districts" :key="idx">
                <div class="text-wrapper">
                  <div class="text">{{ item.name }}</div>
                </div>
                <div class="input-container" :for="`checkbox-${idx}`">
                  <div class="input-wrapper">
                    <input class="input" name="district" type="checkbox" :id="`checkbox-${idx}`"  @click="addToFilter(item.name)" :checked="tempFilter.includes(item.name)">
                    <span>
                      <span class="icon check"></span>
                    </span>
                  </div>
                </div>
              </label>
            </div>
          </div>
        </div>
        <div class="filter-button-wrapper">
          <div class="filter-button" @click="completeChanging">
            <div class="button">完成</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { Toast } from '@/utils/helpers'
import restaurantsAPI from '@/apis/restaurants'
export default {
  data () {
    return {
      modalContentShow: false,
      districts: [],
      tempFilter: []
    }
  },
  props: {
    showModal: {
      type: Boolean
    },
    districtsFilter: {
      type: Array
    },
    restrict: {
      type: Boolean,
      default: false
    },
    defaultDistrict: {
      type: String,
      default: ''
    }
  },
  created () {
    this.fetchDistricts()
    if (this.districtsFilter) {
      this.tempFilter = [this.districtsFilter]
    }
    if (this.defaultDistrict) {
      this.tempFilter = [this.defaultDistrict]
    }
  },
  watch: {
    showModal () {
      setTimeout(() => {
        this.modalContentShow = this.showModal
      }, 100)
      if (this.districtsFilter) {
        this.tempFilter = this.districtsFilter
      }
    },
    districtsFilter () {
      if (this.defaultDistrict) {
        this.tempFilter = this.districtsFilter
      }
    },
    defaultDistrict () {
      this.tempFilter = [this.defaultDistrict]
    }
  },
  methods: {
    closeModal () {
      this.$emit('closeChangeModal')
    },
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
    addToFilter (district) {
      if (!this.restrict) {
        if (this.tempFilter.includes(district)) {
          this.tempFilter.splice(this.tempFilter.indexOf(district), 1)
        } else {
          this.tempFilter = [...this.tempFilter, district]
        }
      } else {
        if (this.tempFilter.includes(district)) {
          this.tempFilter.splice(this.tempFilter.indexOf(district), 1)
        } else {
          this.tempFilter = [district]
        }
      }
    },
    completeChanging () {
      if (this.restrict && this.tempFilter.length > 0) {
        this.districts.forEach(d => {
          if (d.name === this.tempFilter[0]) {
            this.$emit('closeChangeModal', true, this.tempFilter, d.id)
          }
        })
      } else if (this.restrict && this.tempFilter.length === 0) {
        this.$emit('closeChangeModal', true, this.tempFilter)
      } else {
        this.$emit('closeChangeModal', true, this.tempFilter)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
$ultimategray: #939597;
$divider: #E6ECF0;
.modal {
  overflow: hidden;
  z-index: 999;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  transform: translateY(100%);
  .modal-background {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    background: #666;
    opacity: 0.5;
  }
  .modal-content {
    height: 100%;
    width: 100%;
    margin: auto;
    max-width: 600px;
    transform: translateY(100%);
    .modal-container {
      width: 100%;
      height: 100%;
      .top-wrapper {
        border-top-left-radius: 15px;
        border-top-right-radius: 15px;
        margin-top: 8px;
        padding: 12px 16px 10px;
        background: #ffffff;
        height: 32px;
        width: calc(100% - 32px);
        position: relative;
        border-bottom: 1px solid $divider;
        .close-wrapper {
          z-index: 1;
          cursor: pointer;
          position: absolute;
          left: 10;
          height: 32px;
          width: 32px;
          display: flex;
          justify-content: center;
          align-items: center;
          .icon.close {
            cursor: pointer;
            height: 16px;
            width: 16px;
            background-color: #222222;
            mask: url(../assets/close.svg) no-repeat center;
          }
        }
        .title {
          line-height: 32px;
          flex: 1;
          font-size: 16px;
          font-weight: 600;
          position: relative;
          .clear-all {
            cursor: pointer;
            position: absolute;
            top: 0;
            right: 10px;
            line-height: 32px;
            font-size: 16px;
            font-weight: 600;
            text-decoration: underline;
          }
        }
      }
      .filter-container {
        overflow-y: scroll;
        background: #ffffff;
        height: calc(100% - 168px);
        width: calc(100% - 48px);
        padding: 12px 24px;
        .category {
          padding: 8px 0 24px 0;
          .title {
            text-align: left;
            line-height: 22px;
            padding: 16px 0;
            font-size: 18px;
            font-weight: 600;
          }
          .item-group {
            .item {
              padding: 12px 4px;
              display: flex;
              flex-direction: row;
              justify-content: space-between;
              .text-wrapper {
                font-size: 16px;
                font-weight: 400;
              }
              .input-container {
                height: 24px;
                width: 24px;
                .input-wrapper {
                  width: 100%;
                  height: 100%;
                  cursor: pointer;
                  input[type=checkbox] {
                    display: none;
                  }
                  input[type=checkbox]+span {
                    border-radius: 4px;
                    display: inline-block;
                    border: 1px solid #000000;
                    user-select: none;
                  }
                  span {
                    width: 100%;
                    height: 100%;
                  }
                  input[type=checkbox]:checked+span {
                    background-color:#000000;
                    position: relative;
                    .icon.check {
                      position: absolute;
                      top: 4px;
                      left: 4px;
                      width: 16px;
                      height: 16px;
                      mask: url(../assets/check.svg) no-repeat center;
                      background: #ffffff;
                    }
                  }
                }
              }
            }
          }
        }
      }
      .filter-button-wrapper {
        border-top: 1px solid $divider;
        position: fixed;
        bottom: 0;
        width: calc(100% - 48px);
        height: 48px;
        padding: 16px 24px;
        background: #ffffff;
        .filter-button {
          cursor: pointer;
          height: 100%;
          width: calc(100%);
          background: #222222;
          border-radius: 8px;
          display: flex;
          justify-content: center;
          align-items: center;
          .button {
            cursor: pointer;
            font-weight: 700;
            font-size: 16px;
            color: #ffffff;
            line-height: 20px;
          }
        }
      }
    }
  }
  .modal-content.show {
    transform: translateY(0);
    transition: 0.5s;
  }
}
.modal.innerShow {
  transition: 0.3;
  opacity: 100%;
}
.modal.show {
  transform: translateY(0);
  transition: 0.1s;
}
</style>
