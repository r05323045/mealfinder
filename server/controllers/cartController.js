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
              [sequelize.literal('(SELECT picture FROM restaurant_reservation.Restaurants WHERE Restaurants.id = Coupon.RestaurantId)'), 'picture']
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
    const { CouponId, quantity } = req.body
    const UserId = req.user.id
    const [cartItem] = await CartItem.findOrCreate({
      where: { CouponId, UserId },
      defauts: {
        CouponId,
        UserId,
        quantity
      }
    })
    return cartItem.update(
      {
        UserId,
        quantity: Number((cartItem.quantity || 0)) + Number(quantity)
      }
    )
      .then((cartItem) => {
        return res.json({ status: 'success', message: 'add coupon to cart' })
      })
  },

  addCartItem: (req, res) => {
    CartItem.findByPk(req.params.id).then(cartItem => {
      cartItem.update({
        quantity: cartItem.quantity + 1
      })
        .then((cartItem) => {
          return res.json({ status: 'success', message: 'update the item of quantity(add) in cart' })
        })
    })
  },

  reduceCartItem: (req, res) => {
    CartItem.findByPk(req.params.id).then(cartItem => {
      cartItem.update({
        quantity: cartItem.quantity - 1 >= 1 ? cartItem.quantity - 1 : 1
      })
        .then((cartItem) => {
          return res.json({ status: 'success', message: 'update the item of quantity(reduce) in cart' })
        })
    })
  },

  deleteCartItem: (req, res) => {
    const UserId = req.user.id
    const CouponId = req.params.id
    CartItem.findOne({ where: { UserId, CouponId } }).then(cartItem => {
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
      where: { UserId: req.user.id },
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
                    [sequelize.literal('(SELECT picture FROM restaurant_reservation.Restaurants WHERE Restaurants.id = Coupon.RestaurantId)'), 'picture']
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
                  [sequelize.literal('(SELECT picture FROM restaurant_reservation.Restaurants WHERE Restaurants.id = Coupon.RestaurantId)'), 'picture']
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

  postOrder: (req, res) => {
    const UserId = req.user.id
    const { totalPrice, address, phone, name, email } = req.body
    CartItem.findAll({
      raw: true,
      nest: true,
      where: { UserId: req.user.id },
      include: [
        {
          model: Coupon,
          attributes: {
            include: [
              [sequelize.literal('(SELECT picture FROM restaurant_reservation.Restaurants WHERE Restaurants.id = Coupon.RestaurantId)'), 'picture']
            ]
          }
        }
      ]
    })
      .then(cart => {
        Promise.all([
          CartItem.destroy({
            where: { UserId: req.user.id }
          }),
          Order.create({
            UserId,
            total_amount: totalPrice,
            phone,
            address,
            name,
            email
          })
        ])
          .then(([itemInCart, order]) => {
            const orderitems = cart.map(data => {
              const { NO } = data.Coupon
              const uniqueId = helpers.getRandom(NO)
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
            const tradeInfo = helpers.getTradeInfo(totalPrice, 'coupons', email)
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
                return res.json({ status: 'success', message: 'post a order', tradeInfo })
              })
          })
      })
  },

  spgatewayCallback: (req, res) => {
    console.log('===== spgatewayCallback =====')
    console.log(req.method)
    console.log(req.query)
    console.log(req.body)
    console.log('==========')

    const data = JSON.parse(helpers.create_mpg_aes_decrypt(req.body.TradeInfo))

    console.log('===== spgatewayCallback: create_mpg_aes_decrypt、data =====')
    console.log(data)
    return res.json({ status: 'success', message: 'payment success' })
  }

}

module.exports = cartController
