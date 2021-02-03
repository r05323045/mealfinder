const sequelize = require('sequelize')
const db = require('../models')
const coupon = require('../models/coupon')
const User = db.User
const Category = db.Category
const Restaurant = db.Restaurant
const City = db.City
const District = db.District
const Coupon = db.Coupon
const PreferedCategory = db.PreferedCategory

const adminController = {
  getUsers: (req, res) => {
    User.findAll({
      raw: true,
      nest: true,
      include: [PreferedCategory]
    })
      .then(users => {
        return res.json({ users })
      })
  },
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
  getCategories: (req, res) => {
    Category.findAll({
      raw: true,
      nest: true,
    }).then(categories => {
      return res.json({categories})
    })
  }
}

module.exports = adminController
