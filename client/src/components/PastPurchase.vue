<template>
  <div class="past-purchase">
    <div class="purchase-card" v-for="i in 3" :key="i">
      <div class="header">
        <div class="title">在2021/01/01的購買</div>
        <div class="text">看詳細</div>
      </div>
      <div class="card-content">
        <div class="item-wrapper" v-for="i in 5" :key="i">
          <div class="count-wrapper">
            <div class="image-container">
              <div class="image-wrapper">
                <div class="image"></div>
              </div>
            </div>
            <div class="name">ToTsuZen Steak 現切現煎以克計價濕式熟成牛排</div>
            <div class="count">
              <div class="text">x1</div>
            </div>
          </div>
          <div class="divider"></div>
        </div>
      </div>
      <div class="total-price-wrapper">
        <div class="text">總計</div>
        <div class="total-price">$1995</div>
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
.past-purchase {
  .purchase-card {
    margin-bottom: 24px;
    border: 1px solid $divider;
    border-radius: 12px;
    box-shadow: rgba(0, 0, 0, 0.12) 0px 6px 16px;
    .header {
      border-top-left-radius: 12px;
      border-top-right-radius: 12px;
      padding: 15px;
      background: #000000;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 16px;
      color: #ffffff;
      font-weight: 600;
      .title {
        font-size: 16px;
        @media (min-width: 992px) {
          font-size: 18px;
        }
      }
      .text {
        text-decoration: underline;
        font-size: 14px;
        @media (min-width: 992px) {
          font-size: 16px;
        }
      }
    }
    .card-content {
      .item-wrapper {
        position: relative;
        padding: 15px;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        .count-wrapper {
          display: flex;
          flex-direction: row;
          .image-container {
            display: none;
            @media (min-width: 992px) {
              display: block;
              flex: 1;
              margin-right: 24px;
            }
            .image-wrapper {
              width: 100%;
              padding-top: 100%;
              position: relative;
              .image {
                border-radius: 8px;
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: url(https://inline.imgix.net/branch/-LNTA3as3A6I5JWKglD6:inline-live-2a466--LNTA3bp4eBC0NuJ-TSc-48484d1f-999e-401f-94ae-b716e1d3abf5.jpg) no-repeat center;
                background-size: cover;
              }
            }
          }
          .name {
            flex: 7;
            margin: 12px 24px 12px 0;
            font-size: 16px;
            font-weight: 400;
            line-height: 1.5;
            text-align: left;
            @media (min-width: 992px) {
              font-size: 18px;
            }
          }
          .count {
            line-height: 1.5;
            margin: 12px 0;
            font-size: 16px;
            font-weight: 600;
            display: flex;
            justify-content: center;
            align-items: center;
            @media (min-width: 992px) {
              font-size: 22px;
            }
          }
        }
      }
    }
    .divider {
      position: absolute;
      bottom: 0;
      right: -15px;
      left: -15px;
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
      padding: 15px;
      font-size: 16px;
      font-weight: 600;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      @media (min-width: 992px) {
        font-size: 22px;
      }
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
