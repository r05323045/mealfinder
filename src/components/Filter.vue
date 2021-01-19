<template>
  <div class="modal" :class="{show: showModal}">
    <div v-show="showModal">
      <div class="top-wrapper">
        <div class="close-wrapper" @click="closeModal">
          <div class="icon close"></div>
        </div>
        <div class="title">篩選條件</div>
        <div class="clear-wrapper">
          <div class="text">清除</div>
        </div>
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
          <div class="button">顯示結果</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    showModal: {
      type: Boolean
    }
  },
  methods: {
    closeModal () {
      this.$emit('closeModal')
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
  background: #ffffff;
  transition: 0.5s;
  transform: translateY(0);
  .top-wrapper {
    padding: 12px 16px 10px;
    background: #ffffff;
    height: 40px;
    width: calc(100vw - 32px);
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid $divider;
    .close-wrapper {
      padding-left: 10px;
      height: 48px;
      width: 48px;
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
      font-size: 16px;
      font-weight: 600;
    }
    .clear-wrapper {
      .text {
        font-size: 16px;
        font-weight: 600;
        line-height: 20px;
        text-decoration: underline;
      }
    }
  }
  .filter-container {
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

.modal {
  transform: translateY(100%);
}

</style>
