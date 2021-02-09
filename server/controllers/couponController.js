const db = require('../models')
const sequelize = require('sequelize')
const Coupon = db.Coupon
const District = db.District
const Category = db.Category
const Restaurant = db.Restaurant

const couponController = {
  getCoupons: (req, res) => {
    let offset = 0
    const pageLimit = 24
    const filterCategory = {}
    const filterDistrict = {}
    if (req.query.page) {
      offset = (req.query.page - 1) * pageLimit
    }
    if (req.query.category) {
      filterCategory.name = req.query.category
    }
    if (req.query.district) {
      filterDistrict.name = req.query.district
    }
    return Promise.all([
      Category.findAll({ where: filterCategory }),
      District.findAll({ where: filterDistrict })
    ])
      .then(([categories, districts]) => {
        const filters = {}
        filters.CategoryId = categories.map(c => c.dataValues.id)
        filters.DistrictId = districts.map(d => d.dataValues.id)
        Coupon.findAll({
          include: [
            {
              model: Restaurant,
              where: filters,
              attributes: {
                include: [
                  [sequelize.literal('(SELECT name FROM restaurant_reservation.Categories WHERE Categories.id = Restaurant.CategoryId)'), 'CategoryName'],
                  [sequelize.literal('(SELECT name FROM restaurant_reservation.Districts WHERE Districts.id = Restaurant.DistrictId)'), 'DistrictName']
                ]
              }
            }
          ],
          raw: true,
          nest: true,
          offset: offset,
          limit: pageLimit
        })
          .then(coupons => {
            const data = coupons.map(coupon => ({
              ...coupon,
              description: coupon.description.substring(0, 50)
            }))
            return res.json({ data })
          })
      })
  },
  getCoupon: (req, res) => {
    return Coupon.findByPk(req.params.couponId, { include: [Restaurant] })
      .then(coupon => {
        return res.json(coupon)
      })
  }
}

module.exports = couponController
