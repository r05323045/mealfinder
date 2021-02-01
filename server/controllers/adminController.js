const sequelize = require('sequelize')
const db = require('../models')
const User = db.User
const Category = db.Category

const adminController = {
  getUsers: (req, res) => {
    User.findAll({ 
      raw: true, 
      nest: true,
    })
      .then(users => {
        return res.json({ users })
      })
  }
}

module.exports = adminController
