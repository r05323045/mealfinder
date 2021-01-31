<template>
  <div class="modal" v-show="showModal" :class="{ show: showModal, innerShow: modalContentShow }">
    <div class="modal-content" v-show="showModal" :class="{show: modalContentShow }">
      <div v-show="modalContentShow">
        <div class="top-wrapper">
          <div class="close-wrapper" @click="closeModal">
            <div class="icon close"></div>
          </div>
          <div class="title">偏好的餐廳類型</div>
        </div>
        <div class="filter-container">
          <div class="category">
            <div class="title">餐廳類型</div>
            <div class="item-group">
              <label class="item" v-for="i in 8" :key="i">
                <div class="text-wrapper">
                  <div class="text">日式料理</div>
                </div>
                <div class="input-container" :for="`checkbox-${i}`">
                  <div class="input-wrapper">
                    <input class="input" type="checkbox" :id="`checkbox-${i}`">
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
          <div class="filter-button">
            <div class="button">完成</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      modalContentShow: false
    }
  },
  props: {
    showModal: {
      type: Boolean
    }
  },
  watch: {
    showModal () {
      setTimeout(() => {
        this.modalContentShow = this.showModal
      }, 100)
    }
  },
  methods: {
    closeModal () {
      this.$emit('closeAddModal')
    }
  }
}
</script>

<style lang="scss" scoped>
$ultimategray: #939597;
$divider: #E6ECF0;
.modal.show {
  opacity: 50%;
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
  background: #666;
  transform: translateY(0);
  transition: 0.1s;
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
    }
  }
  .filter-container {
    background: #ffffff;
    height: calc(100vh - 168px);
    width: calc(100vw - 48px);
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
.modal{
  transform: translateY(100%);
}
.modal-content {
  transform: translateY(100%);
}
</style>
