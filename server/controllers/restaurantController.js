const db = require('../models')
const Restaurant = db.Restaurant
const Category = db.Category
const City = db.City
const District = db.District
const Coupon = db.Coupon
const Comment = db.Comment

const restaurantController = {
  getRestaurants: (req, res) => {
    let offset = 0
    const pageLimit = 24

    if (req.query.page) {
      offset = (req.query.page - 1) * pageLimit
    }

    Restaurant.findAll({
      raw: true,
      nest: true,
      include: [Category, City, District, Coupon],
      offset: offset,
      limit: pageLimit
    })
      .then(restaurants => {
        const data = restaurants.map(restaurant => {
          if (restaurant.description === null) {
            return restaurant
          } else {
            restaurant.description = restaurant.description.substring(0, 50)
            return restaurant
          }
        })
        return res.json({ data })
      })
  },
  getRestaurant: (req, res) => {
    Restaurant.findByPk(req.params.restaurantId, {
      include: [Category, City, District, Coupon, Comment]
    })
      .then(restaurant => {
        return res.json({ restaurant })
      })
  }
}

module.exports = restaurantController
