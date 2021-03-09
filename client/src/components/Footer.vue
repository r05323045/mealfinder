<template>
  <div class="footer" :class="{ atMap: $route.path.includes('/map') }">
    <div class="logo" @click="$router.push('/').catch(() => {})">
      <span class="company-first-name">Meal</span><span class="company-last-name">Finder</span></div>
    <div class="wrapper">
      <div class="item"><a href="#/about">關於 MealFinder</a></div>
      <div class="item"><a class="mailtoui" href="mailto:mealfinder2021@gmail.com">聯絡我們</a></div>
      <div class="item"><a href="https://github.com/r05323045/mealfinder">技術文件</a></div>
    </div>
    <hr>
    <div class="social-policy">
      <div class="icon-wrapper">
        <a href="https://www.facebook.com/"><div class="icon facebook"></div></a>
        <a href="https://twitter.com/"><div class="icon twitter"></div></a>
        <a href="https://github.com/r05323045/mealfinder"><div class="icon github"></div></a>
      </div>
      <div class="policy">
        <div class="item"><a href="https://policies.google.com/privacy">隱私權</a></div>
        <div class="item">© 2021 MealFinder. All Rights Reserved</div>
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
  text-align: left;
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
    cursor: pointer;
    display: inline-block;
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
      a {
        color: #222222;
        text-decoration: none;
        &:hover {
          text-decoration: underline;
        }
      }
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
        cursor: pointer;
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
      a {
        cursor: pointer;
        color: #222222;
        text-decoration: none;
        &:hover {
          text-decoration: underline;
        }
      }
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
