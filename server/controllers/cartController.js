const crypto = require('crypto')
const nodemailer = require('nodemailer')
const db = require('../models')
const helpers = require('../helpers')
const sequelize = require('sequelize')
const Coupon = db.Coupon
const CartItem = db.CartItem
const OrderItem = db.orderItem
const Order = db.Order

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: '',
    pass: ''
  }
})

const cartController = {
  getCart: (req, res) => {
    CartItem.findAll({
      raw: true,
      nest: true,
      where: { UserId: req.user.id },
      include: [
        {
          model: Coupon,
          attributes: {
            include: [
              [sequelize.literal('(SELECT picture FROM Restaurants WHERE Restaurants.id = Coupon.RestaurantId)'), 'picture']
            ]
          }
        }
      ]
    })
      .then(cartItem => {
        const data = cartItem.map(item => ({
          ...item,
          subTotalPrice: Number(item.quantity) * Number(item.Coupon.price)
        }))
        return res.json({ data })
      })
  },

  postCart: async (req, res) => {
    const [cartItem] = await CartItem.findOrCreate({
      where: { CouponId: req.body.CouponId, UserId: req.user.id }
    })
    return cartItem.update(
      {
        UserId: req.user.id,
        quantity: Number((cartItem.quantity || 0)) + Number(req.body.quantity)
      }
    )
      .then((cartItem) => {
        return res.json({ status: 'success', message: 'add coupon to cart' })
      })
  },

  addCartItem: (req, res) => {
    CartItem.findByPk(req.body.id).then(cartItem => {
      cartItem.update({
        quantity: cartItem.quantity + 1
      })
        .then((cartItem) => {
          return res.json({ status: 'success', message: 'update the item of quantity(add) in cart' })
        })
    })
  },

  reduceCartItem: (req, res) => {
    CartItem.findByPk(req.body.id).then(cartItem => {
      cartItem.update({
        quantity: cartItem.quantity - 1 >= 1 ? cartItem.quantity - 1 : 1
      })
        .then((cartItem) => {
          return res.json({ status: 'success', message: 'update the item of quantity(reduce) in cart' })
        })
    })
  },

  deleteCartItem: (req, res) => {
    CartItem.findByPk(req.params.id).then(cartItem => {
      cartItem.destroy()
        .then(() => {
          return res.json({ status: 'success', message: 'delete item in cart' })
        })
    })
  },

  getOrders: (req, res) => {
    Order.findAll({
      raw: true,
      nest: true,
      where: { UserId: req.user.id, payment_status: '1' },
      order: sequelize.literal('createdAt DESC')
    })
      .then(orders => {
        const orderPromise = orders.map(o => {
          return OrderItem.findAll({
            raw: true,
            nest: true,
            where: { OrderId: o.id },
            include: [
              {
                model: Coupon,
                attributes: {
                  include: [
                    [sequelize.literal('(SELECT picture FROM Restaurants WHERE Restaurants.id = Coupon.RestaurantId)'), 'picture']
                  ]
                }
              }
            ]
          })
            .then((orderItems) => {
              o.OrderItem = orderItems
            })
        })
        return Promise.all(orderPromise)
          .then(() => {
            return res.json({ orders })
          })
      })
  },

  getOrder: (req, res) => {
    Order.findByPk(req.params.id)
      .then(order => {
        return OrderItem.findAll({
          raw: true,
          nest: true,
          where: { OrderId: order.id },
          include: [
            {
              model: Coupon,
              attributes: {
                include: [
                  [sequelize.literal('(SELECT picture FROM Restaurants WHERE Restaurants.id = Coupon.RestaurantId)'), 'picture']
                ]
              }
            }
          ]
        })
          .then((orderItems) => {
            order.dataValues.OrderItem = orderItems
            return res.json({ order })
          })
      })
  },
  postTradeInfo: (req, res) => {
    const UserId = req.user.id
    const { totalPrice, address, phone, name, email } = req.body
    const tradeInfo = helpers.getTradeInfo(totalPrice, 'coupons', email)
    CartItem.findAll({
      raw: true,
      nest: true,
      where: { UserId: req.user.id },
      include: [
        {
          model: Coupon,
          attributes: {
            include: [
              [sequelize.literal('(SELECT picture FROM Restaurants WHERE Restaurants.id = Coupon.RestaurantId)'), 'picture']
            ]
          }
        }
      ]
    })
      .then(cart => {
        return Order.create({
          UserId,
          total_amount: totalPrice,
          phone,
          address,
          name,
          email,
          sn: String(tradeInfo.MerchantOrderNo)
        })
          .then((order) => {
            const orderitems = cart.map(data => {
              const uniqueId = Math.floor(Math.random() * 1000000000000) + 1
              const id = data.Coupon.id
              const price = Number(data.Coupon.price)
              const quantity = data.quantity
              return OrderItem.create({
                OrderId: order.id,
                CouponId: id,
                purchased_price: price,
                quantity,
                uniqueId,
                isUsed: 0
              })
            })
            // var mailOptions = {
            //   from: '',
            //   to: '',
            //   subject: `${order.id} 訂單成立`,
            //   text: `${order.id} 訂單成立`,
            // };
            // transporter.sendMail(mailOptions, function (error, info) {
            //   if (error) {
            //     console.log(error);
            //   } else {
            //     console.log('Email sent: ' + info.response);
            //   }
            // });
            return Promise.all(orderitems)
              .then(() => {
                return res.json({ status: 'success', message: 'post a tradeinfo success', tradeInfo: tradeInfo })
              })
          })
      })
  },
  getPaymentInfo: (req, res) => {
    const MerchantOrderNo = req.params.no
    return Order.findAll({
      where: {
        sn: MerchantOrderNo
      },
      include: [OrderItem]
    })
      .then((order) => {
        const data = order[0]
        return res.json({ data })
      })
  },

  newebpayCallback: (req, res) => {
    console.log('===== newebpayCallback =====')
    console.log(req.method)
    console.log(req.query)
    console.log(req.body)
    console.log('==========')

    const data = JSON.parse(helpers.create_mpg_aes_decrypt(req.body.TradeInfo))
    console.log('===== newebpayCallback: create_mpg_aes_decrypt、data =====')
    console.log(data)
    return Order.findAll({
      where: {
        sn: data.Result.MerchantOrderNo
      }
    })
      .then((orders) => {
        orders[0].update({
          payment_status: 1
        })
          .then(order => {
            CartItem.destroy({
              where: { UserId: order.UserId }
            })
              .then(() => {
                return res.redirect(`${process.env.BASE_URL}/users/checkout/success?sn=${data.Result.MerchantOrderNo}`)
              })
          })
      })
  }
}

module.exports = cartController
