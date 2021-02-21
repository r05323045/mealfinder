const nodemailer = require('nodemailer')
const db = require('../models')
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

  postCart: async (req, res) => {
    const [cart, created] = await Cart.findOrCreate({
      where: {
        id: req.session.cartId || 0,
      },
    })
    const [cartItem, itemCreated] = await CartItem.findOrCreate({
      where: {
        CartId: cart.id,
        CouponId: req.body.CouponId
      },
      default: {
        CartId: cart.id,
        CouponId: req.body.CouponId,
      }
    })
    return cartItem.update({
      quantity: (cartItem.quantity || 0) + 1,
    })
      .then((cartItem) => {
        req.session.cartId = cart.id
        return req.session.save(() => {
          return res.json({ status: 'success', message: 'add coupon to cart' })
        })
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
        let totalPrice = cart.items.length > 0 ? cart.items.map(d => d.price * d.CartItem.quantity).reduce((a, b) => a + b) : 0
        let totalQuantity = cart.items.length
        return res.json({ totalQuantity, totalPrice })
      })
  },

  postOrder: (req, res) => {
    const UserId = req.user.id
    const { totalPrice } = req.body
    return Cart.findByPk(req.session.cartId, { include: 'items' })
      .then(cart => {
        Order.create({
          UserId,
          total_amount: totalPrice
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
                return res.json({ status: 'success', message: 'post a order' })
              })

          })
      })
  },

}

module.exports = cartController