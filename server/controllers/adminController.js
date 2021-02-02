const sequelize = require('sequelize')
const db = require('../models')
const coupon = require('../models/coupon')
const User = db.User
const Category = db.Category
const Restaurant = db.Restaurant
const City = db.City
const District = db.District
const Coupon = db.Coupon

const adminController = {
  getUsers: (req, res) => {
    User.findAll({
      raw: true,
      nest: true,
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
        return res.json({
          restaurants: restaurants
        })
      })
  }
}

module.exports = adminController
