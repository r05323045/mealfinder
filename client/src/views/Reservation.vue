<template>
  <div class="reservation-page">
    <Navbar></Navbar>
    <div class="reservation-container">
      <div class="main-title">在 {{ reservation.updatedAt | bookingDateFormat }} 的訂位紀錄</div>
      <div class="info-and-comment">
        <div class="information-container">
          <div class="information-body">
            <div class="item-wrapper">
              <div class="top-wrapper">
                <img class="icon restaurant" src="../assets/restaurant.svg">
                <div class="title">餐廳名稱</div>
              </div>
              <div class="content">{{ reservation.Restaurant_name }}</div>
            </div>
            <div class="item-wrapper">
              <div class="top-wrapper">
                <img class="icon clock" src="../assets/clock.svg">
                <div class="title">用餐時間</div>
              </div>
              <div class="content" v-if="reservation.date && reservation.time">
                {{ new Date(new Date(reservation.date.slice(0, 10)).toDateString()) | bookingDateFormat }}
                {{ reservation.time.slice(0, 5) }}
                <span class="complete" v-if="new Date(new Date(reservation.date.slice(0, 10)).toDateString()) < Date.now()">已完成</span>
              </div>
            </div>
            <div class="item-wrapper">
              <div class="top-wrapper">
                <img class="icon profile" src="../assets/profile.svg">
                <div class="title">訂位人數</div>
              </div>
              <div class="content">{{ reservation.partySize_adult }}大<span v-if="reservation.partySize_kids > 0">小</span></div>
            </div>
            <div class="item-wrapper">
              <div class="top-wrapper">
                <img class="icon profile" src="../assets/profile.svg">
                <div class="title">訂位人姓名</div>
              </div>
              <div class="content">
                <span class="name">{{ reservation.UserName }}</span>
                <span class="gender">{{ genderTW }}</span>
              </div>
            </div>
            <div class="item-wrapper">
              <div class="top-wrapper">
                <img class="icon email" src="../assets/email.svg">
                <div class="title">訂位人Email</div>
              </div>
              <div class="content">{{ reservation.email }}</div>
            </div>
            <div class="item-wrapper">
              <div class="top-wrapper">
                <img class="icon phone" src="../assets/phone.svg">
                <div class="title">訂位人手機</div>
              </div>
              <div class="content">{{ reservation.phone }}</div>
            </div>
            <div class="item-wrapper">
              <div class="top-wrapper">
                <img class="icon map" src="../assets/map.svg">
                <div class="title">用餐目的</div>
              </div>
              <div class="content">{{ reservation.purpose }}</div>
            </div>
            <div class="item-wrapper last">
              <div class="top-wrapper">
                <img class="icon restaurant" src="../assets/restaurant.svg">
                <div class="title">其他備註</div>
              </div>
              <div class="content">{{ reservation.note ? reservatio.note : '無' }}</div>
            </div>
          </div>
        </div>
        <div class="comment-card-wrapper">
          <div class="comment-card" v-if="!comments.map(c => c.UserId).includes(currentUser.id)">
            <form>
              <validation-observer ref="formvalidation" v-slot="{ invalid }">
                <div class="header">
                  <div class="title">填寫評論</div>
                </div>
                <div class="divider"></div>
                <div class="card-content">
                  <div class="user-info-wrapper">
                    <div class="avatar" :style="`background: url(${currentUser.avatar}) no-repeat center / cover`"></div>
                    <div class="user-info">
                      <div class="name">{{ currentUser.name }}</div>
                      <div class="time">{{ new Date() | normalDate }}</div>
                    </div>
                  </div>
                  <div class="rating-container">
                    <div class="star-wrapper">
                      <div class="star" v-for="i in 5" :key="`star-${i}`" @click="rating(i)" :class="{ rated: i <= rated }"></div>
                    </div>
                    <div class="text">點擊評分</div>
                    <span v-if="rated < 1 && firstClickSubmit" class="invalid-text">評分為必填</span>
                  </div>
                  <validation-provider v-slot="{ errors, classes }" rules="required|max:140">
                    <div class="text-container">
                      <textarea type="text" id="comment-text" v-model="commentText" class="all-input text-area" placeholder="填寫你最真實的感受" :class="firstClickSubmit ? classes : ''"></textarea>
                      <div class="note-count">({{ commentText.length }}/140)</div>
                      <span v-if="firstClickSubmit && commentText.length === 0" class="invalid-text comment-text">評論為必填</span>
                      <span v-if="firstClickSubmit && errors[0]" class="invalid-text comment-text">{{ errors[0].replace('comment-text ', '評論') }}</span>
                    </div>
                  </validation-provider>
                </div>
                <div class="write-comment" v-if="reservation.date">
                  <button
                    type="submit"
                    class="button-wrapper"
                    v-if="new Date(new Date(reservation.date.slice(0, 10)).toDateString()) < Date.now()"
                    @click.prevent="submitComment(invalid || rated < 1)"
                  >
                    <div class="button">填寫評論</div>
                  </button>
                  <button type="submit" class="button-wrapper disabled" v-if="new Date(new Date(reservation.date.slice(0, 10)).toDateString()) >= Date.now()" :disabled="invalid">
                    <div class="button">尚未用餐</div>
                  </button>
                </div>
              </validation-observer>
            </form>
          </div>
          <div class="comment-card" v-if="comments.map(c => c.UserId).includes(currentUser.id)">
            <form>
              <validation-observer ref="formvalidation" v-slot="{ invalid }">
                <div class="header">
                  <div class="title">
                    <span>在 {{ new Date(new Date(comment.updatedAt.slice(0, 10)).toDateString()) | normalDateWithoutYear }} 的評論</span>
                    <span class="delete" @click="deleteComment">刪除</span>
                  </div>
                </div>
                <div class="divider"></div>
                <div class="card-content">
                  <div class="user-info-wrapper">
                    <div class="avatar" :style="`background: url(${currentUser.avatar}) no-repeat center / cover`"></div>
                    <div class="user-info">
                      <div class="name">{{ currentUser.name }}</div>
                      <div class="time">{{ new Date(new Date(comment.updatedAt.slice(0, 10)).toDateString()) | normalDate }}</div>
                    </div>
                  </div>
                  <div class="rating-container">
                    <div class="star-wrapper">
                      <div class="star" v-for="i in 5" :key="`star-${i}`" @click="rating(i)" :class="{ rated: i <= rated }"></div>
                    </div>
                    <div class="text">點擊評分</div>
                    <span v-if="rated < 1 && firstClickSubmit" class="invalid-text">評分為必填</span>
                  </div>
                  <validation-provider v-slot="{ errors, classes }" rules="required|max:140">
                    <div class="text-container">
                      <textarea type="text" id="comment-text" v-model="commentText" class="all-input text-area" placeholder="填寫你最真實的感受" :class="classes"></textarea>
                      <div class="note-count">({{ commentText.length }}/140)</div>
                      <span v-if="firstClickSubmit && commentText.length === 0" class="invalid-text comment-text">評論為必填</span>
                      <span v-if="firstClickSubmit && errors[0]" class="invalid-text comment-text">{{ errors[0].replace('comment-text ', '評論') }}</span>
                    </div>
                  </validation-provider>
                </div>
                <div class="write-comment" v-if="reservation.date">
                  <button
                    type="submit"
                    class="button-wrapper"
                    @click.prevent="changeComment(invalid || rated < 1)"
                  >
                    <div class="button">變更評論</div>
                  </button>
                </div>
              </validation-observer>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div ref="footer">
      <Footer></Footer>
    </div>
  </div>
</template>

<script>

import { Toast } from '@/utils/helpers'
import { mapState } from 'vuex'
import reservationsAPI from '@/apis/reservations'
import commentsAPI from '@/apis/comments'
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'

export default {
  data () {
    return {
      tabFuture: true,
      rated: -1,
      commentText: '',
      reservation: {},
      genderTW: '先生',
      firstClickSubmit: false,
      comments: [],
      comment: {}
    }
  },
  components: {
    Navbar,
    Footer
  },
  created () {
    this.fetchReservation(this.$route.params.id)
  },
  mounted () {
  },
  computed: {
    ...mapState(['currentUser', 'isAuthenticated'])
  },
  methods: {
    rating (num) {
      this.rated = num
    },
    async fetchReservation (id) {
      const loader = this.$loading.show({
        isFullPage: true,
        opacity: 1
      })
      try {
        const { data } = await reservationsAPI.getReservation(id)
        this.reservation = data.reservation
        switch (this.reservation.gender) {
          case 'female':
            this.genderTW = '小姐'
            break
          case 'male':
            this.genderTW = '先生'
            break
          case 'other':
            this.genderTW = ''
            break
        }
        const commentData = await commentsAPI.getComments(this.reservation.RestaurantId)
        this.comments = commentData.data.comments
        if (this.comments.map(c => c.UserId).includes(this.currentUser.id)) {
          this.comment = this.comments.filter(c => c.UserId === this.currentUser.id)[0]
          this.rated = this.comment.rating
          this.commentText = this.comment.content
        } else {
          this.rated = -1
          this.commentText = ''
          this.firstClickSubmit = false
        }
        loader.hide()
      } catch (error) {
        loader.hide()
        console.log(error)
        Toast.fire({
          icon: 'error',
          title: '目前無法取得餐廳，請稍候'
        })
      }
    },
    async addComment () {
      try {
        const formData = {
          content: this.commentText,
          rating: this.rated,
          RestaurantId: this.reservation.RestaurantId
        }
        const { data } = await commentsAPI.addComment(formData)
        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        this.fetchReservation(this.$route.params.id)
        Toast.fire({
          icon: 'success',
          title: '評論成功'
        })
      } catch (error) {
        console.log(error)
        Toast.fire({
          icon: 'error',
          title: '目前無法訂評論'
        })
      }
    },
    async updateComment () {
      try {
        const formData = {
          content: this.commentText,
          rating: this.rated,
          RestaurantId: this.reservation.RestaurantId
        }
        const { data } = await commentsAPI.updateComment(this.comment.id, formData)
        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        this.fetchReservation(this.$route.params.id)
        Toast.fire({
          icon: 'success',
          title: '變更評論成功'
        })
      } catch (error) {
        console.log(error)
        Toast.fire({
          icon: 'error',
          title: '目前無法變更'
        })
      }
    },
    async deleteComment () {
      try {
        const { data } = await commentsAPI.deleteComment(this.comment.id)
        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        this.fetchReservation(this.$route.params.id)
        Toast.fire({
          icon: 'success',
          title: '刪除評論成功'
        })
      } catch (error) {
        console.log(error)
        Toast.fire({
          icon: 'error',
          title: '目前無法刪除'
        })
      }
    },
    submitComment (invalid) {
      if (!this.firstClickSubmit) {
        this.firstClickSubmit = true
      }
      if (!invalid) {
        this.addComment()
      }
    },
    changeComment (invalid) {
      if (!invalid) {
        this.updateComment()
      }
      this.fetchReservation(this.$route.params.id)
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
.reservation-page {
  height: 100vh;
  overflow: scroll;
  .reservation-container {
    margin: auto;
    max-width: 1040px;
    padding: 36px 24px 60px 24px;
    text-align: left;
    position: relative;
    @media (min-width: 768px) {
      margin-top: 81px;
      padding: 36px 40px 60px;
    }
    @media (min-width: 992px) {
      padding: 36px 80px 60px;
    }
    .main-title {
      font-size: 24px;
      font-weight: 800;
      line-height: 1.5;
      margin-bottom: 24px;
      @media (min-width: 992px) {
        font-size: 26px;
      }
      @media (min-width: 992px) {
        font-size: 32px;
      }
    }
    .info-and-comment {
      width: 100%;
      display: flex;
      flex-direction: column;
      @media (min-width: 992px) {
        flex-direction: row;
      }
      .information-container {
        flex: 2;
        margin-bottom: 24px;
        border: 1px solid $divider;
        box-shadow: rgba(0, 0, 0, 0.12) 0px 6px 16px;
        border-radius: 8px;
        padding: 12px 24px;
        @media (min-width: 992px) {
          margin-right: 36px;
        }
        .information-body {
          .item-wrapper {
            margin-bottom: 12px;
            .top-wrapper {
              display: flex;
              flex-direction: row;
              .title {
                margin: 12px 0;
                font-size: 14px;
                font-weight: 600;
                line-height: 1.5;
                @media (min-width: 768px) {
                  font-size: 16px;
                }
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
              margin-left: 24px;
              margin-bottom: 12px;
              font-weight: 400;
              text-align: left;
              font-size: 12px;
              line-height: 1.5;
              position: relative;
              display: flex;
              flex-direction: row;
              @media (min-width: 768px) {
                font-size: 14px;
              }
              .name {
                margin-right: 8px;
              }
              .complete {
                padding: 4px 12px;
                border-radius: 15px;
                position: absolute;
                right: 0;
                color: #ffffff;
                background: #000000;
              }
            }
          }
        }
      }
      .comment-card-wrapper {
        flex: 1;
        .comment-card {
          margin-bottom: 24px;
          border: 1px solid $divider;
          border-radius: 12px;
          box-shadow: rgba(0, 0, 0, 0.12) 0px 6px 16px;
          .header {
            border-top-left-radius: 12px;
            border-top-right-radius: 12px;
            padding: 15px;
            background: #000000;
            .title {
              display:flex;
              justify-content: space-between;
              font-size: 14px;
              color: #ffffff;
              font-weight: 600;
              .delete {
                text-decoration: underline;
                cursor: pointer;
              }
            }
          }
          .divider {
            height: 1px;
            background: $divider;
          }
          .card-content {
            padding: 16px;
            .user-info-wrapper {
              display: flex;
              flex-direction: row;
              .avatar {
                width: 48px;
                height: 48px;
                background: $ultimategray;
                border-radius: 50%;
                margin-right: 12px;
              }
              .user-info {
                display: flex;
                flex-direction: column;
                font-size: 14px;
                font-weight: 400;
                justify-content: center;
                .name {
                  margin-bottom: 8px;
                }
              }
            }
            .rating-container {
              width: 100%;
              position: relative;
              margin: 12px 0;
              .star-wrapper {
                width: 50%;
                max-width: 120px;
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                .star {
                  cursor: pointer;
                  width: 20px;
                  height: 20px;
                  mask: url(../assets/empty-star.svg) no-repeat center;
                  mask-size: cover;
                  background: #666;
                }
                .star.rated {
                  width: 20px;
                  height: 20px;
                  mask: url(../assets/google-star.svg) no-repeat center;
                  mask-size: cover;
                  background: #FFCE44;
                }
              }
              .text {
                position: absolute;
                top: 0;
                right: 0;
                font-size: 14px;
                font-weight: 400;
              }
            }
            .text-container {
              position: relative;
              .text-area {
                outline: none;
                font-size: 16px;
                line-height: 1.5;
                font-weight: 400;
                padding: 8px 12px;
                border: 1px solid $ultimategray;
                border-radius: 8px;
                width: calc(100% - 24px);
                min-height: 100px;
                &::placeholder {
                  font-size: 16px;
                }
              }
              .note-count {
                position: absolute;
                right: 0;
                top: 100%;
                font-size: 12px;
                line-height: 1.5;
                color: #666;
                font-weight: 400;
                text-align: right;
              }
            }
            .all-input.is-invalid {
              border: 1px solid $darkred;
            }
            .invalid-text {
              font-size: 12px;
              line-height: 1.5;
              color: $darkred;
            }
            .invalid-text.comment-text {
              position: absolute;
              top: 100%;
              left: 0;
            }
          }
          .write-comment {
            padding: 24px 12px 24px 12px;
            .button-wrapper {
              appearance: none;
              width: 100%;
              cursor: pointer;
              border: 1px solid #666666;
              border-radius: 15px;
              background: #ffffff;
              padding: 12px 0;
              font-size: 14px;
              font-weight: 600;
              display: flex;
              flex-direction: row;
              align-items: center;
              justify-content: center;
              line-height: 1.5;
              &:focus {
                outline: none;
              }
              &:hover {
                background: #222222;
                .button {
                  color: #ffffff;
                }
              }
              .button {
                color: #222222;
              }
            }
            .button-wrapper.disabled {
              cursor: default;
              background: #666666;
              .button {
                color: #ffffff;
              }
              &:hover {
                background: #666666;
              }
            }
          }
        }
      }
    }
  }
}
</style>
