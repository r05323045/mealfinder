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
    Restaurant.findAll({
      raw: true,
      nest: true,
      include: [Category, City, District, Coupon]
    })
    .then(restaurants => {
      return res.json({restaurants})
    })
  }
}

module.exports = adminController
