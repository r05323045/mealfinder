<template>
  <div class="not-found">
    <div class="main-title">Oops...</div>
    <div class="not-found-container">
      <div class="title">404 Page Not Found</div>
      <div class="illustration-wrapper">
        <div class="cover">
        </div>
      </div>
    </div>
    <div ref="footer">
      <Footer></Footer>
    </div>
  </div>
</template>

<script>

import Footer from '@/components/Footer.vue'

export default {
  components: {
    Footer
  },
  mounted () {
  }
}
</script>

<style lang="scss">
$yellow: #F5DF4D;
$ultimategray: #939597;
$divider: #E6ECF0;
$red: rgb(255, 56, 92);
.not-found {
  .main-title {
    text-align: left;
    padding: 36px 36px 0px;
    font-size: 24px;
    font-weight: 800;
    line-height: 1.5;
  }
  .not-found-container {
    padding: 36px;
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
    .illustration-wrapper {
      width: 100%;
      padding-top: 66.7%;
      position: relative;
      background: url(../assets/eatNow.svg) no-repeat center;
      background-size: cover;
      .cover {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
}
</style>
