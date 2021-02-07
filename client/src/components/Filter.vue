<template>
  <div class="modal" v-show="showModal" :class="{ show: showModal, innerShow: modalContentShow }">
    <div class="modal-background" @click="closeModal"></div>
    <div class="modal-content" v-show="showModal" :class="{ show: modalContentShow }">
      <div v-show="modalContentShow">
        <div class="top-wrapper">
          <div class="close-wrapper" @click="closeModal">
            <div class="icon close"></div>
          </div>
          <div class="title">篩選條件</div>
          <div class="clear-wrapper">
            <div class="text" @click="clearAll">清除</div>
          </div>
        </div>
        <div class="filter-container">
          <div class="district">
            <div class="title">用餐地區</div>
            <div class="item-group">
              <label class="item" v-for="(item, idx) in districts" :key="`district-${idx}`">
                <div class="text-wrapper">
                  <div class="text">{{ item.name }}</div>
                </div>
                <div class="input-container" :for="`checkbox-district-${idx}`">
                  <div class="input-wrapper">
                    <input
                      class="input"
                      type="checkbox"
                      :id="`checkbox-district-${idx}`"
                      @click="addToFilter(item.name, 'district')"
                      :checked="tempDistrictsFilter.includes(item.name)"
                    >
                    <span>
                      <span class="icon check"></span>
                    </span>
                  </div>
                </div>
              </label>
            </div>
          </div>
          <div class="category">
            <div class="title">餐廳類型</div>
            <div class="item-group">
              <label class="item" v-for="(item, idx) in categories" :key="`category-${idx}`">
                <div class="text-wrapper">
                  <div class="text">{{ item.name }}</div>
                </div>
                <div class="input-container" :for="`checkbox-category-${idx}`">
                  <div class="input-wrapper">
                    <input
                      class="input"
                      type="checkbox"
                      :id="`checkbox-category-${idx}`"
                      @click="addToFilter(item.name, 'category')"
                      :checked="tempCategoriesFilter.includes(item.name)"
                    >
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
          <div class="filter-button"  @click="completeEditing">
            <div class="button">顯示結果</div>
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
      categories: [],
      tempCategoriesFilter: [],
      tempDistrictsFilter: []
    }
  },
  props: {
    showModal: {
      type: Boolean
    },
    categoriesFilter: {
      type: Array
    },
    districtsFilter: {
      type: Array
    }
  },
  created () {
    return Promise.all([
      this.fetchCategories(),
      this.fetchDistricts()
    ])
      .then(() => {})
  },
  watch: {
    showModal () {
      setTimeout(() => {
        this.modalContentShow = this.showModal
      }, 100)
    },
    categoriesFilter () {
      this.tempCategoriesFilter = this.categoriesFilter
    },
    districtsFilter () {
      this.tempDistrictsFilter = this.districtsFilter
    }
  },
  methods: {
    closeModal () {
      this.$emit('closeModal')
    },
    async fetchDistricts () {
      try {
        const { data } = await restaurantsAPI.getDistricts()
        this.districts = data.districts
      } catch (error) {
        console.log(error)
        Toast.fire({
          icon: 'error',
          title: '目前無法取得類別，請稍候'
        })
      }
    },
    async fetchCategories () {
      try {
        const { data } = await restaurantsAPI.getCategories()
        this.categories = data.categories
      } catch (error) {
        console.log(error)
        Toast.fire({
          icon: 'error',
          title: '目前無法取得類別，請稍候'
        })
      }
    },
    addToFilter (item, type) {
      switch (type) {
        case 'district':
          if (this.tempDistrictsFilter.includes(item)) {
            this.tempDistrictsFilter.splice(this.tempDistrictsFilter.indexOf(item), 1)
          } else {
            this.tempDistrictsFilter = [...this.tempDistrictsFilter, item]
          }
          break
        case 'category':
          if (this.tempCategoriesFilter.includes(item)) {
            this.tempCategoriesFilter.splice(this.tempCategoriesFilter.indexOf(item), 1)
          } else {
            this.tempCategoriesFilter = [...this.tempCategoriesFilter, item]
          }
          break
      }
    },
    completeEditing () {
      this.$emit('closeModal', true, this.tempCategoriesFilter, this.tempDistrictsFilter)
    },
    clearAll () {
      this.tempCategoriesFilter = []
      this.tempDistrictsFilter = []
    }
  }
}
</script>

<style lang="scss" scoped>
$ultimategray: #939597;
$divider: #E6ECF0;
.modal.show {
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
  transition: 0.1s;
  transform: translateY(0);
}
.modal-background {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background: #666;
  opacity: 0.5;
}
.modal-content.show {
  height: 100%;
  transform: translateY(0);
  transition: 0.5s;
  .top-wrapper {
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    margin-top: 8px;
    padding: 12px 16px 10px;
    background: #ffffff;
    height: 32px;
    width: calc(100vw - 32px);
    position: relative;
    border-bottom: 1px solid $divider;
    .close-wrapper {
      position: absolute;
      left: 10;
      height: 32px;
      width: 32px;
      display: flex;
      justify-content: center;
      align-items: center;
      .icon.close {
        line-height: 32px;
        height: 16px;
        width: 16px;
        background-color: #222222;
        mask: url(../assets/close.svg) no-repeat center;
      }
    }
    .title {
      line-height: 32px;
      font-size: 16px;
      font-weight: 600;
    }
    .clear-wrapper {
      position: absolute;
      top: 12px;
      right: 26px;
      height: 32px;
      display: flex;
      justify-content: center;
      align-items: center;
      .text {
        font-size: 16px;
        font-weight: 600;
        line-height: 20px;
        text-decoration: underline;
      }
    }
  }
  .filter-container {
    overflow-y: scroll;
    background: #ffffff;
    height: calc(100vh - 168px);
    width: calc(100vw - 48px);
    padding: 12px 24px;
    .category,
    .district {
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
    width: calc(100vw - 48px);
    height: 48px;
    padding: 16px 24px;
    background: #ffffff;
    .filter-button {
      height: 100%;
      width: calc(100vw - 48px);
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
.modal.innerShow {
  transition: 0.3;
  opacity: 100%;
}
.modal {
  transform: translateY(100%);
}
.modal-content {
  transform: translateY(100%);
}

</style>
