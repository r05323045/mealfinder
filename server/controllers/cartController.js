const db = require('../models')
const Cart = db.Cart
const CartItem = db.CartItem

const cartController = {
  getCart: (req, res) => {
    Cart.findOne({ include: 'items' })
      .then(cart => {
        let totalPrice = cart.items.length > 0 ? cart.items.map(d => d.price * d.CartItem.quantity).reduce((a, b) => a + b) : 0
        return res.json({ cart, totalPrice })
      })
  }
}

module.exports = cartController