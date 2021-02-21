<template>
  <div class="footer" :class="{ atMap: $route.path.includes('/map') }">
    <div class="logo">OUR LOGO</div>
    <div class="wrapper">
      <div class="item">關於我們</div>
      <div class="item">關於我們</div>
      <div class="item">關於我們</div>
    </div>
    <hr>
    <div class="social-policy">
      <div class="icon-wrapper">
        <div class="icon facebook"></div>
        <div class="icon facebook"></div>
        <div class="icon facebook"></div>
      </div>
      <div class="policy">
        <div class="item">隱私權</div>
        <div class="item">© 2020 OUR NAME. All Rights Reserved</div>
      </div>
    </div>
  </div>
</template>

<script>
</script>

<style lang="scss">
$ultimategray: #939597;
$divider: #E6ECF0;
.footer {
  padding: 54px 16px 80px 16px;
  background: rgb(247, 247, 247);
  @media (min-width: 768px) {
    padding: 54px 40px 80px;
  }
  @media (min-width: 992px) {
    padding: 54px 80px 80px;
  }
  @media (min-width: 1600px) {
    max-width: 1440px;
    margin: auto;
    padding: 54px calc((100vw - 1440px)/2) 80px;
    width: 100%;
  }
  .logo {
    text-align: left;
    height: 24px;
    margin-bottom: 48px;
    font-weight: 700;
  }
  .wrapper {
    text-align: left;
    margin-bottom: 64px;
    .item {
      font-weight: 500;
      line-height: 24px;
      font-size: 16px;
      margin-bottom: 16px;
    }
  }
  hr {
    margin: 40px 0;
  }
  .social-policy {
    .icon-wrapper {
      margin-bottom: 40px;
      display: flex;
      flex-direction: row;
      .icon {
        margin: auto 0;
        margin-right: 24px;
        background-color: #000000;
        height: 16px;
        width: 16px;
      }
      .icon.facebook {
        mask: url(../assets/facebook.svg) no-repeat center;
        mask-size: cover;
      }
    }
    .policy {
      text-align: left;
      margin-bottom: 40px;
      .item {
        font-weight: 500;
        line-height: 18px;
        font-size: 14px;
        margin-bottom: 16px;
      }
    }
  }
}
.footer.atMap {
  max-width: none;
  padding: 54px 24px 80px;
}

</style>
