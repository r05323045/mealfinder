<template>
  <div class="card-page">
    <div class="purchase-card">
      <div class="card-content">
        <div class="item-wrapper" v-for="i in 5" :key="i">
          <div class="icon close"></div>
          <div class="name">ToTsuZen Steak 現切現煎以克計價濕式熟成牛排</div>
          <div class="price-wrapper">
            <div class="adjust-wrapper">
              <div class="icon-wrapper">
                <div class="icon minus"></div>
              </div>
              <div class="number">1</div>
              <div class="icon-wrapper">
                <div class="icon plus"></div>
              </div>
            </div>
            <div class="price">$399</div>
          </div>
          <div class="divider"></div>
        </div>
      </div>
      <div class="total-price-wrapper">
        <div class="text">總計</div>
        <div class="total-price">$1995</div>
      </div>
    </div>
    <div class="order-card">
      <div class="header">
        <div class="title">訂單摘要</div>
      </div>
      <div class="divider"></div>
      <div class="card-content">
        <div class="item-wrapper">
          <div class="text">商品總計</div>
          <div class="total-price">$1995</div>
        </div>
        <div class="item-wrapper">
          <div class="text">數量總計</div>
          <div class="total-price">5</div>
        </div>
        <div class="discount">使用優惠券</div>
        <div class="divider"></div>
        <div class="item-wrapper summary">
          <div class="text">結帳總金額</div>
          <div class="total-price">$1995</div>
        </div>
      </div>
      <div class="go-check">
        <div class="button-wrapper">
          <div class="button">前往結帳</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
    }
  },
  mounted () {
  },
  methods: {
  }
}
</script>

<style lang="scss">
$yellow: #F5DF4D;
$ultimategray: #939597;
$divider: #E6ECF0;
$red: rgb(255, 56, 92);
.card-page {
  .purchase-card {
    margin-bottom: 24px;
    border: 1px solid $divider;
    border-radius: 12px;
    box-shadow: rgba(0, 0, 0, 0.12) 0px 6px 16px;
    .card-content {
      .item-wrapper {
        position: relative;
        padding: 15px;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        .icon.close {
          position: absolute;
          right: 15px;
          top: 15px;
          width: 16px;
          height: 16px;
          mask: url(../assets/close.svg) no-repeat center;
          background: #222222;
          mask-size: cover;
        }
        .price-wrapper {
          margin-bottom: 24px;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          width: 100%;
          .adjust-wrapper {
            flex: 1;
            display: flex;
            flex-direction: row;
            align-items: center;
            .number {
              margin-right: 12px;
              color: #222222;
              font-weight: 700;
            }
            .icon-wrapper {
              width: 16px;
              height: 16px;
              border-radius: 100%;
              margin-right: 12px;
              mask-size: cover;
              background: #000000;
              display: flex;
              align-items: center;
              justify-content: center;
              .icon {
                width: 12px;
                height: 12px;
                background: #ffffff;
                mask-size: cover;
              }
              .icon.plus {
                mask: url(../assets/plus.svg) no-repeat center;
              }
              .icon.minus {
                mask: url(../assets/minus.svg) no-repeat center;
              }
            }
          }
          .price {
            font-size: 18px;
            font-weight: 600;
          }
        }
        .name {
          margin: 32px 0 24px 0;
          font-size: 16px;
          font-weight: 400;
          line-height: 1.5;
          text-align: left;
        }
      }
    }
    .divider {
      margin: 0 -15px;
      height: 1px;
      background: $divider;
    }
    .info {
      padding: 5px 15px;
      .item-wrapper {
        font-size: 12px;
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
    .total-price-wrapper {
      padding: 15px 15px 30px 15px;
      font-size: 18px;
      font-weight: 600;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
  }
  .order-card {
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
        font-size: 16px;
        color: #ffffff;
        font-weight: 600;
      }
    }
    .divider {
      height: 1px;
      background: $divider;
    }
    .card-content {
      padding: 16px;
      .item-wrapper {
        margin-bottom: 24px;
        font-size: 16px;
        font-weight: 600;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
      }
      .discount {
        margin: 12px 0;
        font-size: 14px;
        font-weight: 800;
        color: navy;
      }
      .divider {
        height: 1px;
        background: $divider;
        margin: 24px -16px;
      }
      .item-wrapper.summary {
        font-size: 20px;
        margin-bottom: 0;
      }
    }
    .go-check {
      padding: 12px 12px 36px 12px;
      .button-wrapper {
        border: 1px solid #666666;
        border-radius: 15px;
        background: #ffffff;
        padding: 12px 0;
        font-size: 16px;
        font-weight: 600;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        line-height: 1.5;
        .button {
          color: #222222;
        }
      }
    }
  }
}
</style>
