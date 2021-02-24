const crypto = require('crypto')
const nodemailer = require('nodemailer')
const db = require('../models')
const helpers = require('../helpers')
const Cart = db.Cart
const CartItem = db.CartItem
const OrderItem = db.orderItem
const Order = db.Order

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: '',
    pass: '',
  },
});

const cartController = {
  getCart: (req, res) => {
    Cart.findByPk(req.session.cartId, { include: 'items' })
      .then(cart => {
        cart = cart || { items: [] }
        let totalPrice = cart.items.length > 0 ? cart.items.map(d => d.price * d.CartItem.quantity).reduce((a, b) => a + b) : 0
        return res.json({ cart, totalPrice })
      })
  },

  postCart: (req, res) => {
    CartItem.create({
      CouponId: req.body.CouponId,
      UserId: req.user.id,
      quantity: req.body.quantity
    })
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
    CartItem.findByPk(req.params.id).then(cartItem => {
      cartItem.destroy()
        .then(() => {
          return res.json({ status: 'success', message: 'delete item in cart' })
        })
    })
  },

  getOrder: (req, res) => {
    Cart.findByPk(req.session.cartId, { include: 'items' })
      .then(cart => {
        cart = cart || { items: [] }
        let totalQuantity = 0
        let totalPrice = cart.items.length > 0 ? cart.items.map(d => d.price * d.CartItem.quantity).reduce((a, b) => a + b) : 0
        cart.items.map(data => {
          let qty = Number(data.dataValues.CartItem.quantity)
          totalQuantity += qty
        })
        return res.json({ totalQuantity, totalPrice })
      })
  },

  postOrder: (req, res) => {
    const UserId = req.user.id
    const { totalPrice, address, phone, name, email } = req.body
    return Cart.findByPk(req.session.cartId, { include: 'items' })
      .then(cart => {
        Order.create({
          UserId,
          total_amount: totalPrice,
          phone,
          address,
          name,
          email,
        })
          .then((order) => {
            const orderitems = cart.items.map(data => {
              let uniqueId = Math.floor(Math.random() * 1000000000000) + 1
              const { id, price, CartItem: { quantity } } = data.dataValues
              OrderItem.create({
                OrderId: order.id,
                CouponId: id,
                purchased_price: price,
                quantity,
                uniqueId,
                isUsed: 0,
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