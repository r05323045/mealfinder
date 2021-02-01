<template>
  <div class="profile-page" :class="{modalShow: showAddModal || showChangeModal}">
    <Navbar></Navbar>
    <div class="page-container">
      <div class="left-side">
        <div class="profile-card">
          <div class="avatar-container">
            <div class="avatar-wrapper">
              <div class="avatar">
                <div class="picture"></div>
                <div class="text">更新大頭照</div>
              </div>
            </div>
          </div>
          <div class="divider"></div>
          <div class="info">
            <div class="title">
              完成度 90%
            </div>
            <div class="progress-bar">
              <div class="inner"></div>
            </div>
            <div class="item-wrapper">
              <img class="icon" src="../assets/bold-check.svg">
              <div class="text">已填寫偏好餐廳類型</div>
            </div>
            <div class="item-wrapper">
              <img class="icon" src="../assets/bold-check.svg">
              <div class="text">已填寫經常用餐地區</div>
            </div>
            <div class="item-wrapper">
              <img class="icon" src="../assets/bold-check.svg">
              <div class="text">已填寫手機</div>
            </div>
            <div class="item-wrapper">
              <img class="icon" style="height: 0">
              <div class="text">尚未認證手機</div>
            </div>
          </div>
        </div>
      </div>
      <div class="right-side">
        <div class="basic-info-container">
          <div class="avatar-wrapper">
            <div class="avatar"></div>
            <div class="text">更新大頭照</div>
          </div>
          <div class="title">嗨！我是 Jim Lin</div>
          <div class="join">加入時間 2019</div>
        </div>
        <div class="information-container">
          <div class="title">
            個人資料
            <div class="edit" @click="editing = !editing"><span v-if="editing">取消</span>編輯</div>
          </div>
          <div class="information-body" :class="{ editing: editing }">
            <div class="item-wrapper">
              <div class="top-wrapper">
                <img class="icon profile" src="../assets/profile.svg">
                <div class="title">我的姓名</div>
              </div>
              <input class="content" value="XXX" type="text">
            </div>
            <div class="item-wrapper item-gender">
              <div class="top-wrapper">
                <img class="icon lgbt" src="../assets/lgbt.svg">
                <div class="title">我的性別</div>
              </div>
              <div class="gender">
                <span class="inner-wrapper">
                  <label for="gender-female" class="item">
                    <span class="radio-input">
                      <input name="gender" id="gender-female" role="radio" value="1" type="radio" checked :disabled="!editing">
                      <span class="radio-control"></span>
                    </span>
                    <span class="text">小姐</span>
                  </label>
                </span>
                <span class="inner-wrapper">
                  <label for="gender-male" class="item">
                    <span class="radio-input">
                      <input name="gender" id="gender-male" role="radio" value="1" type="radio" :disabled="!editing">
                      <span class="radio-control"></span>
                    </span>
                    <span class="text">先生</span>
                  </label>
                </span>
                <span class="inner-wrapper">
                  <label for="gender-other" class="item">
                    <span class="radio-input">
                      <input name="gender" id="gender-other" role="radio" value="1" type="radio" :disabled="!editing">
                      <span class="radio-control"></span>
                    </span>
                    <span class="text">其他</span>
                  </label>
                </span>
              </div>
            </div>
            <div class="item-wrapper">
              <div class="top-wrapper">
                <img class="icon email" src="../assets/email.svg">
                <div class="title">我的Email</div>
              </div>
              <input class="content" value="user1@example.com" type="email">
            </div>
            <div class="item-wrapper">
              <div class="top-wrapper">
                <img class="icon phone" src="../assets/phone.svg">
                <div class="title">我的手機</div>
              </div>
              <input class="content" value="09000000000" type="number">
            </div>
            <div class="item-wrapper">
              <div class="top-wrapper">
                <img class="icon map" src="../assets/map.svg">
                <div class="title">經常用餐地區</div>
              </div>
              <div class="content">大安區</div>
              <div class="add" v-if="editing">
                <span class="text" @click="showChangeModal = !showChangeModal">變更</span>
              </div>
            </div>
            <div class="item-wrapper last">
              <div class="top-wrapper">
                <img class="icon" src="../assets/restaurant.svg">
                <div class="title">偏好的餐廳類型</div>
              </div>
              <div class="content">日式料理、餐酒館</div>
              <div class="add" v-if="editing">
                <span class="text" @click="showAddModal = !showAddModal">新增更多</span>
              </div>
            </div>
            <div class="button-wrapper" v-if="editing">
              <div class="cancel" @click="editing = false">取消</div>
              <div class="save" @click="editing = false">儲存</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="more-container">
      <div class="title">專屬你的推薦餐廳</div>
      <div class="illustration-wrapper">
        <div class="cover">
          <div class="button" @click="$router.push('/restaurants')">現在就去看看</div>
        </div>
      </div>
    </div>
    <div ref="footer">
      <Footer></Footer>
    </div>
    <AddCategory :showModal="showAddModal" @closeAddModal="completeAdding"></AddCategory>
    <ChangeDistrict :showModal="showChangeModal" @closeChangeModal="completeChanging"></ChangeDistrict>
  </div>
</template>

<script>

import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import AddCategory from '@/components/AddCategory.vue'
import ChangeDistrict from '@/components/ChangeDistrict.vue'

export default {
  data () {
    return {
      editing: false,
      showAddModal: false,
      showChangeModal: false
    }
  },
  components: {
    Navbar,
    Footer,
    AddCategory,
    ChangeDistrict
  },
  mounted () {
  },
  methods: {
    onScroll (e) {
    },
    completeAdding () {
      this.showAddModal = false
    },
    completeChanging () {
      this.showChangeModal = false
    }
  }
}
</script>

<style lang="scss">
$yellow: #F5DF4D;
$ultimategray: #939597;
$divider: #E6ECF0;
$red: rgb(255, 56, 92);
.profile-page {
  height: 100vh;
  overflow-y: scroll;
  overflow-x: hidden;
  .page-container {
    margin: auto;
    max-width: 1040px;
    @media (min-width: 992px) {
      display: flex;
      flex-direction: row;
      padding: 0 80px;
    }
    .left-side {
      display: none;
      @media (min-width: 992px) {
        display: block;
        flex: 1;
        padding: 64px 40px 36px 0;
      }
      .profile-card {
        margin-bottom: 20px;
        border: 1px solid $divider;
        border-radius: 30px;
        .avatar-container {
          width: 100%;
          padding-top: 50%;
          position: relative;
          .avatar-wrapper {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            .avatar {
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              .picture {
                height: 90px;
                width: 90px;
                border-radius: 100%;
                background: $ultimategray;
              }
              .text {
                cursor: pointer;
                text-decoration: underline;
                margin-top: 12px;
                font-size: 14px;
                font-weight: 600;
                width: 100%;
              }
            }
          }
        }
        .divider {
          height: 1px;
          background: $divider;
        }
        .info {
          padding: 24px;
          .title {
            text-align: left;
            font-size: 16px;
            font-weight: 600;
            padding: 8px 0;
          }
          .progress-bar {
            margin: 8px 0;
            width: 66.7%;
            height: 12px;
            background: #ffffff;
            border: 2px solid #222222;
            border-radius: 30px;
            padding: 2px;
            .inner {
              background: #222222;
              width: 90%;
              height: 100%;
              border-top-left-radius: 30px;
              border-bottom-left-radius: 30px;
            }
          }
          .item-wrapper {
            font-size: 16px;
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
    }
    .right-side {
      flex: 2;
      padding: 0 24px;
      .basic-info-container {
        margin: 36px 0px;
        text-align: left;
        position: relative;
        .avatar-wrapper {
          position: absolute;
          top: 0;
          right: 0;
          margin-bottom: 24px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          @media (min-width: 992px) {
            display: none;
          }
          .avatar {
            height: 64px;
            width: 64px;
            border-radius: 100%;
            background: $ultimategray;
          }
          .text {
            text-decoration: underline;
            margin-top: 12px;
            font-size: 14px;
            font-weight: 600;
            width: 100%;
          }
        }
        .title {
          font-size: 24px;
          font-weight: 800;
          line-height: 1.5;
        }
        .join {
          font-size: 14px;
          margin-top: 8px;
          font-weight: 400;
          color: #666;
        }
      }
      .information-container {
        padding: 12px 0px;
        .title {
          position: relative;
          margin-top: 24px;
          margin-bottom: 24px;
          font-size: 22px;
          font-weight: 700;
          text-align: left;
          line-height: 22px;
          .edit {
            cursor: pointer;
            text-decoration: underline;
            position: absolute;
            font-size: 14px;
            font-weight: 600;
            top: 0;
            right: 0;
          }
        }
        .information-body {
          .item-wrapper {
            margin-bottom: 12px;
            border-bottom: 1px solid $divider;
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
              font-family: "Open Sans";
              color: #222222;
              width: 100%;
              border: none;
              appearance: none;
              text-align: left;
              margin-left: 24px;
              font-size: 16px;
              font-weight: 350;
              line-height: 1.5;
              margin-bottom: 12px;
              &:focus {
                outline: none;
              }
            }
            .gender {
              margin: 12px 0 12px;
              display: flex;
              flex-direction: row;
              .inner-wrapper {
                .item {
                  display: flex;
                  flex-direction: row;
                }
                margin-right: 12px;
                *:before,
                *:after {
                  box-sizing: border-box;
                }
                line-height: 1.5;
                transition: 180ms all ease-in-out;
                opacity: 0.8;
                .radio-input {
                  height: 1.5rem;
                  width: 1.5rem;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  input {
                    margin: 0;
                    opacity: 0;
                    width: 0;
                    height: 0;
                    &:focus + .radio-control {
                      box-shadow: 0 0 0 0.05rem #fff, 0 0 0.15em 0.1em currentColor;
                    }
                  }
                  input:focus {
                    outline: none;
                  }
                  .radio-control {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                  }
                  input + .radio-control::before {
                    content: "";
                    display: block;
                    width: 0.6em;
                    height: 0.6em;
                    box-shadow: inset 0.6em 0.6em currentColor;
                    border-radius: 50%;
                    transition: 180ms transform ease-in-out;
                    transform: scale(0);
                  }
                  .radio-control {
                    width: 1rem;
                    height: 1rem;
                    border-radius: 50%;
                    border: 0.1em solid #666;
                  }
                  input:checked + .radio-control::before {
                    background: $red;
                    transform: scale(1);
                  }
                }
                .text {
                  color: #222222;
                  line-height: 1.5;
                  transition: 180ms all ease-in-out;
                  padding: 0 12px;
                  font-size: 14px;
                  font-weight: 600;
                }
              }
            }
          }
          .item-wrapper.last {
            border: none;
          }
          .item-wrapper.item-gender {
            border: none;
          }
        }
        .information-body.editing {
          .item-wrapper {
            border: none;
            .content {
              margin-left: 0;
            }
            input.content {
              border-radius: 8px;
              border: 1px solid $ultimategray;
              margin: 0;
              padding: 8px;
              width: calc(100% - 16px);
              &:focus {
                box-shadow: 0 0 0.15em 0.1em currentColor;
              }
            }
            .add {
              width: auto;
              text-align: left;
              .text {
                cursor: pointer;
                text-decoration: underline;
                font-size: 14px;
                font-weight: 600;
              }
            }
          }
          .button-wrapper {
            display: flex;
            justify-content: flex-end;
            .cancel {
              cursor: pointer;
              padding: 8px 24px;
              border-radius: 8px;
              text-decoration: underline;
              margin-right: 8px;
            }
            .save {
              cursor: pointer;
              background: #000000;
              padding: 8px 24px;
              border-radius: 8px;
              color: #ffffff;
            }
          }
        }
      }
    }
  }
  .more-container {
    padding: 24px;
    margin: auto;
    max-width: 1040px;
    @media (min-width: 992px) {
      padding: 40px 80px;
    }
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
      @media (min-width: 992px) {
        font-size: 24px;
        line-height: 1.5;
      }
    }
    .illustration-wrapper {
      width: 100%;
      padding-top: 66.7%;
      position: relative;
      background: url(../assets/eatNow.svg) no-repeat center;
      background-size: cover;
      @media (min-width: 992px) {
        padding-top: 25%;
        background: url(../assets/people-eating-food.svg) no-repeat center;
        background-size: cover;
      }
      .cover {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        .button {
          padding: 12px 36px;
          border-radius: 30px;
          background: #000000;
          color: #ffffff;
          cursor: pointer;
          font-weight: 700;
          font-size: 16px;
          line-height: 20px;
        }
      }
    }
  }
}
.profile-page.modalShow {
  overflow: hidden;
}
</style>
