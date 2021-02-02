const db = require('../models')
const coupon = require('../models/coupon')
const Coupon = db.Coupon
const Restaurant = db.Restaurant

const couponController = {
  getCoupons: (req, res) => {
    return Coupon.findAll({
      include: [Restaurant],
      raw: true,
      nest: true
    })
      .then(coupons => {
        return res.json(coupons)
      })
  },
  getCoupon: (req, res)=> {
    return Coupon.findByPk(req.params.couponId, {include: [Restaurant]})
    .then(coupon => {
      return res.json(coupon)
    })
  }
}

module.exports = couponController
