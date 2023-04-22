<template>
  <div class="profile-page" :class="{modalShow: showAddModal || showChangeModal}">
    <Navbar></Navbar>
    <div class="page-container">
      <form class="form" ref="form" enctype="multipart/form-data">
        <div class="left-side">
          <div class="profile-card">
            <div class="avatar-container">
              <div class="avatar-wrapper">
                <div class="avatar">
                  <div class="picture" :style="`background: url(${user.avatar}) no-repeat center / cover`"></div>
                  <div class="text" @click="$refs['avatarFile-desktop'].click()">更新大頭照
                    <input v-show="false" ref="avatarFile-desktop" name="avatar" accept="image/*" @change="avatarChange" type="file">
                  </div>
                </div>
              </div>
            </div>
            <div class="divider"></div>
            <div class="info">
              <div class="title">
                完成度 {{ profileProgress }}%
              </div>
              <div class="progress-bar">
                <div class="inner" :style="`width: ${profileProgress}%`"></div>
              </div>
              <div class="item-wrapper">
                <img v-if="user.gender" class="icon" src="../assets/bold-check.svg">
                <div v-if="!user.gender" class="icon"></div>
                <div class="text">
                  <span v-if="user.gender">已</span>
                  <span v-if="!user.gender">尚未</span>填寫性別
                </div>
              </div>
              <div class="item-wrapper">
                <img v-if="user.preferedCategory && user.preferedCategory.length > 0" class="icon" src="../assets/bold-check.svg">
                <div v-if="user.preferedCategory && !user.preferedCategory.length > 0" class="icon"></div>
                <div class="text">
                  <span v-if="user.preferedCategory && user.preferedCategory.length > 0">已</span>
                  <span v-if="user.preferedCategory && !user.preferedCategory.length > 0">尚未</span>填寫偏好餐廳類型
                </div>
              </div>
              <div class="item-wrapper">
                <img v-if="user.DistrictName" class="icon" src="../assets/bold-check.svg">
                <div v-if="!user.DistrictName" class="icon"></div>
                <div class="text">
                  <span v-if="user.DistrictName">已</span>
                  <span v-if="!user.DistrictName">尚未</span>填寫經常用餐地區
                </div>
              </div>
              <div class="item-wrapper">
                <img v-if="user.phone_number" class="icon" src="../assets/bold-check.svg">
                <div v-if="!user.phone_number" class="icon"></div>
                <div class="text">
                  <span v-if="user.phone_number">已</span>
                  <span v-if="!user.phone_number">尚未</span>填寫手機
                </div>
              </div>
              <div class="item-wrapper" v-if="user.avatar">
                <img v-if="this.user.avatar !== 'https://i.imgur.com/oOfxL8T.png'" class="icon" src="../assets/bold-check.svg">
                <div v-if="this.user.avatar === 'https://i.imgur.com/oOfxL8T.png'" class="icon"></div>
                <div class="text">
                  <span v-if="this.user.avatar !== 'https://i.imgur.com/oOfxL8T.png'">已</span>
                  <span v-if="this.user.avatar === 'https://i.imgur.com/oOfxL8T.png'">尚未</span>上傳大頭照
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="right-side">
          <div class="basic-info-container">
            <div class="avatar-wrapper">
              <div class="avatar" :style="`background: url(${user.avatar}) no-repeat center / cover`"></div>
              <div class="text" @click="$refs['avatarFile-mobile'].click()">
                更新大頭照
                <input v-show="false" ref="avatarFile-mobile" name="avatar" accept="image/*" @change="avatarChange" type="file">
              </div>
            </div>
            <div class="title">嗨！我是 {{ user.name }}</div>
            <div class="join">加入時間 {{ user.createdAt | fromNow }}</div>
          </div>
          <div class="information-container">
            <div class="title">
              個人資料
              <div class="edit" v-if="!editing" @click="startEditing">編輯</div>
              <div class="edit" v-if="editing" @click="cancelEditing">取消編輯</div>
            </div>
            <div class="information-body" :class="{ editing: editing }">

              <validation-observer ref="formvalidation" v-slot="{ invalid }">
                <validation-provider v-slot="{ errors, classes }" rules="required">
                  <div class="item-wrapper">
                    <div class="top-wrapper">
                      <img class="icon profile" src="../assets/profile.svg">
                      <div class="title">我的姓名</div>
                    </div>
                      <input class="content" name="name" v-model="tempName" type="text" :class="classes">
                      <span v-if="errors[0]" class="invalid-text">{{ errors[0].replace('name ', '名稱') }}</span>
                  </div>
                </validation-provider>
                <div class="item-wrapper item-gender">
                  <div class="top-wrapper">
                    <img class="icon lgbt" src="../assets/lgbt.svg">
                    <div class="title">我的性別</div>
                  </div>
                  <div class="gender">
                    <span class="inner-wrapper">
                      <label for="gender-female" class="item">
                        <span class="radio-input">
                          <input name="gender" id="gender-female" role="radio" value="female" type="radio" v-model="tempGender" checked :disabled="!editing">
                          <span class="radio-control"></span>
                        </span>
                        <span class="text">小姐</span>
                      </label>
                    </span>
                    <span class="inner-wrapper">
                      <label for="gender-male" class="item">
                        <span class="radio-input">
                          <input name="gender" id="gender-male" role="radio" value="male" type="radio" v-model="tempGender" :disabled="!editing">
                          <span class="radio-control"></span>
                        </span>
                        <span class="text">先生</span>
                      </label>
                    </span>
                    <span class="inner-wrapper">
                      <label for="gender-other" class="item">
                        <span class="radio-input">
                          <input name="gender" id="gender-other" role="radio" value="other" type="radio" v-model="tempGender" :disabled="!editing">
                          <span class="radio-control"></span>
                        </span>
                        <span class="text">其他</span>
                      </label>
                    </span>
                  </div>
                </div>
                 <validation-provider v-slot="{ errors, classes }" rules="required|email">
                  <div class="item-wrapper">
                    <div class="top-wrapper">
                      <img class="icon email" src="../assets/email.svg">
                      <div class="title">我的Email</div>
                    </div>
                    <input class="content" name="email" type="email" v-model="tempEmail" :class="classes">
                    <span v-if="errors[0]" class="invalid-text">{{ errors[0].replace('email ', '名稱') }}</span>
                  </div>
                </validation-provider>
                <validation-provider v-slot="{ errors, classes }" rules="numeric">
                  <div class="item-wrapper">
                    <div class="top-wrapper">
                      <img class="icon phone" src="../assets/phone.svg">
                      <div class="title">我的手機</div>
                    </div>
                    <input class="content" name="phoneNumber" type="text" :placeholder="tempPhoneNumber ? '' : '無'" v-model="tempPhoneNumber" :class="classes">
                    <span v-if="errors[0]" class="invalid-text">{{ errors[0].replace('phoneNumber ', '手機號碼') }}</span>
                  </div>
                </validation-provider>
                <div class="item-wrapper">
                  <div class="top-wrapper">
                    <img class="icon map" src="../assets/map.svg">
                    <div class="title">經常用餐地區</div>
                  </div>
                  <input v-show="false" name="DistrictId" type="number" v-model="tempDistrictId">
                  <div class="content" v-if="tempDistrictName">{{ tempDistrictName }}</div>
                  <div class="content" v-if="!tempDistrictName">無</div>
                  <div class="add" v-if="editing">
                    <span class="text" @click="showChangeModal = !showChangeModal">變更</span>
                  </div>
                </div>
                <div class="item-wrapper last">
                  <div class="top-wrapper">
                    <img class="icon" src="../assets/restaurant.svg">
                    <div class="title">偏好的餐廳類型</div>
                  </div>
                  <div class="content" v-if="tempCategory.length > 0">{{ tempCategory.join('、') }}</div>
                  <div class="content" v-if="tempCategory.length === 0">無</div>
                  <div class="add" v-if="editing">
                    <span class="text" @click="showAddModal = !showAddModal">新增更多</span>
                  </div>
                </div>
                <div class="button-wrapper" v-if="editing">
                  <div class="cancel" @click="cancelEditing">取消</div>
                  <button class="save" @click="putProfile" :disabled="invalid">儲存</button>
                </div>
              </validation-observer>
            </div>
          </div>
        </div>
      </form>
    </div>
    <div class="more-container">
      <div class="title">專屬你的推薦餐廳</div>
      <div class="illustration-wrapper">
        <div class="cover">
          <div class="button" @click="$router.push('/map')">現在就去看看</div>
        </div>
      </div>
    </div>
    <div ref="footer">
      <Footer></Footer>
    </div>
    <AddCategory v-if="renderComponent" :showModal="showAddModal" @closeAddModal="completeAdding" :defaultCategories="user.preferedCategory"></AddCategory>
    <ChangeDistrict v-if="renderComponent" :showModal="showChangeModal" @closeChangeModal="completeChanging" :restrict="true" :defaultDistrict="user.DistrictName"></ChangeDistrict>
  </div>
</template>

<script>

import { Toast } from '@/utils/helpers'
import { mapState } from 'vuex'
import usersAPI from '@/apis/users'
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import AddCategory from '@/components/AddCategory.vue'
import ChangeDistrict from '@/components/ChangeDistrict.vue'

export default {
  data () {
    return {
      editing: false,
      showAddModal: false,
      showChangeModal: false,
      user: {},
      tempName: '',
      tempGender: '',
      tempEmail: '',
      tempPhoneNumber: '',
      tempDistrictId: '',
      tempDistrictName: '',
      tempCategory: [],
      renderComponent: true
    }
  },
  components: {
    Navbar,
    Footer,
    AddCategory,
    ChangeDistrict
  },
  computed: {
    ...mapState(['currentUser', 'isAuthenticated']),
    profileProgress () {
      let progress = 50
      if (this.user.preferedCategory && this.user.preferedCategory.length > 0) {
        progress += 10
      }
      if (this.user.gender) {
        progress += 10
      }
      if (this.user.DistrictName) {
        progress += 10
      }
      if (this.user.phone_number) {
        progress += 10
      }
      if (this.user.avatar && this.user.avatar !== 'https://i.imgur.com/oOfxL8T.png') {
        progress += 10
      }
      return progress
    }
  },
  created () {
    this.fetchProfile(this.currentUser.id)
  },
  mounted () {
  },
  methods: {
    completeAdding (isAdding, filter) {
      this.showAddModal = false
      if (isAdding) {
        this.tempCategory = filter
      }
    },
    completeChanging (isChanging, filter, id) {
      this.showChangeModal = false
      if (isChanging && id) {
        this.tempDistrictId = id
        this.tempDistrictName = filter[0]
      } else if (isChanging && !id) {
        this.tempDistrictId = null
        this.tempDistrictName = null
      }
    },
    async fetchProfile (id) {
      const loader = this.$loading.show({
        isFullPage: true,
        opacity: 1
      })
      try {
        const { data } = await usersAPI.getProfile(id)
        this.user = data
        this.tempName = this.user.name
        this.tempGender = this.user.gender
        this.tempEmail = this.user.email
        this.tempPhoneNumber = this.user.phone_number
        this.tempDistrictId = this.user.DistrictId
        this.tempDistrictName = this.user.DistrictName
        this.tempCategory = this.user.preferedCategory
        loader.hide()
      } catch (error) {
        loader.hide()
        console.log(error)
        Toast.fire({
          icon: 'error',
          title: '目前無法取得使用者，請稍候'
        })
      }
    },
    async putProfile () {
      try {
        this.editing = false
        const form = this.$refs.form
        const formData = new FormData(form)
        Promise.all([usersAPI.putPreferedCategory(this.currentUser.id, this.tempCategory), usersAPI.putProfile(this.currentUser.id, formData)])
          .then(([preferedCategoryData, data]) => {
            if (preferedCategoryData.data.status !== 'success') {
              throw new Error(preferedCategoryData.message)
            }
            if (data.data.status !== 'success') {
              throw new Error(data.message)
            }
          })
          .catch(err => {
            console.log(err)
          })
        Toast.fire({
          icon: 'success',
          title: '更新成功！'
        })
        this.user.name = this.tempName
        this.user.gender = this.tempGender
        this.user.email = this.tempEmail
        this.user.phone_number = this.tempPhoneNumber
        this.user.DistrictId = this.tempDistrictId
        this.user.DistrictName = this.tempDistrictName
        this.user.preferedCategory = this.tempCategory
        await this.$store.dispatch('fetchCurrentUser')
      } catch (error) {
        console.log(error)
        Toast.fire({
          icon: 'error',
          title: '目前無法更新使用者，請稍候'
        })
      }
    },
    startEditing () {
      this.editing = true
    },
    cancelEditing () {
      this.editing = false
      this.tempName = this.user.name
      this.tempGender = this.user.gender
      this.tempEmail = this.user.email
      this.tempPhoneNumber = this.user.phone_number
      this.tempDistrictId = this.user.DistrictId
      this.tempDistrictName = this.user.DistrictName
      this.tempCategory = this.user.preferedCategory
      this.forceRerender()
    },
    forceRerender () {
      this.renderComponent = false
      this.$nextTick(() => {
        this.renderComponent = true
      })
    },
    async avatarChange () {
      try {
        if (this.$refs['avatarFile-mobile'].files[0]) {
          this.user.avatar = window.URL.createObjectURL(this.$refs['avatarFile-mobile'].files[0])
        } else if (this.$refs['avatarFile-desktop'].files[0]) {
          this.user.avatar = window.URL.createObjectURL(this.$refs['avatarFile-desktop'].files[0])
        }
        const form = this.$refs.form
        const formData = new FormData(form)
        const { data } = await usersAPI.putProfile(this.currentUser.id, formData)
        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        Toast.fire({
          icon: 'success',
          title: '更新成功！'
        })
        await this.$store.dispatch('fetchCurrentUser')
      } catch (error) {
        console.log(error)
        Toast.fire({
          icon: 'error',
          title: '目前無法更新使用者，請稍候'
        })
      }
    }
  }
}
</script>

<style lang="scss">
$yellow: #F5DF4D;
$ultimategray: #939597;
$divider: #E6ECF0;
$red: rgb(255, 56, 92);
$darkred: #c13515;
.profile-page {
  overflow-y: scroll;
  overflow-x: hidden;
  .page-container {
    padding: 0 24px;
    margin: auto;
    max-width: 1040px;
    @media (min-width: 768px) {
      margin-top: 100px;
      padding: 0 40px;
    }
    @media (min-width: 992px) {
      padding: 0 80px;
    }
    .form {
      @media (min-width: 992px) {
        display: flex;
        flex-direction: row;
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
              display: flex;
              flex-direction: column;
              align-items: flex-start;
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
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box !important;
                -webkit-line-clamp: 1 !important;
                -webkit-box-orient: vertical !important;
                &:focus {
                  outline: none;
                }
                &::placeholder {
                  color: #222222;
                }
              }
              .content.is-invalid {
                border: 1px solid $darkred;
              }
              .invalid-text {
                width: 100%;
                text-align: left;
                font-size: 12px;
                line-height: 1.5;
                color: $darkred;
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
                    cursor: pointer;
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
                      width: 0.62em;
                      height: 0.6em;
                      box-shadow: inset 0.6em 0.62em currentColor;
                      border-radius: 50%;
                      transition: 180ms transform ease-in-out;
                      transform: scale(0);
                    }
                    .radio-control {
                      width: 1.05rem;
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
              input.content.is-invalid {
                border: 1px solid $darkred;
                &:focus {
                  box-shadow: 0 0 0.15em 0.1em $darkred;
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
  }
  .more-container {
    padding: 24px;
    margin: auto;
    max-width: 1040px;
    @media (min-width: 768px) {
      padding: 32px 40px;
    }
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
      @media (min-width: 768px) {
        font-size: 24px;
        line-height: 1.5;
      }
    }
    .illustration-wrapper {
      width: 100%;
      padding-top: 66.7%;
      position: relative;
      background: url(../assets/female-chatting.svg) no-repeat center;
      background-size: cover;
      @media (min-width: 768px) {
        padding-top: 33.3%;
        background: url(../assets/people-eating-food.svg) no-repeat center;
        background-size: cover;
      }
      @media (min-width: 992px) {
        padding-top: 25%;
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
