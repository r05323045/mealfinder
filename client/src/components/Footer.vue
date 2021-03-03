<template>
  <div class="footer" :class="{ atMap: $route.path.includes('/map') }">
    <div class="logo"><span class="company-first-name">Meal</span><span class="company-last-name">Finder</span></div>
    <div class="wrapper">
      <div class="item">關於 Meal Finder</div>
      <div class="item">聯絡我們</div>
      <div class="item">關於我們</div>
    </div>
    <hr>
    <div class="social-policy">
      <div class="icon-wrapper">
        <div class="icon facebook"></div>
        <div class="icon twitter"></div>
        <div class="icon github"></div>
      </div>
      <div class="policy">
        <div class="item">隱私權</div>
        <div class="item">© 2021 Meal Finder. All Rights Reserved</div>
      </div>
    </div>
  </div>
</template>

<script>
</script>

<style lang="scss">
$ultimategray: #939597;
$divider: #E6ECF0;
$red: rgb(255, 56, 92);
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
    font-size: 24px;
    line-height: 24px;
    color: $red;
    font-weight: 800;
    text-align: left;
    height: 24px;
    margin-bottom: 48px;
    .company-last-name {
      color: #000000;
      margin-left: 4px;
    }
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
      .icon.twitter {
        mask: url(../assets/twitter.svg) no-repeat center;
        mask-size: cover;
      }
      .icon.github {
        mask: url(../assets/github.svg) no-repeat center;
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
