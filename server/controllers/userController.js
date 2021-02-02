const bcrypt = require('bcrypt')
const db = require('../models')
const User = db.User

//JWT
const jwt = require('jsonwebtoken')
const passportJWT = require('passport-jwt')
const ExtractJWT = passportJWT.ExtractJwt
const JwtStrategy = passportJWT.JwtStrategy

const userController = {
  signIn: (req, res) => {
    // 檢查email,password
    if (!req.body.email || !req.body.password) {
      return res.json({ status: 'error', message: "required fields didn't exist" })
    }
    // 檢查 user 是否存在與密碼是否正確
    const email = req.body.email
    const password = req.body.password

    User.findOne({ where: { email } })
      .then(user => {
        const { id, email, phone_number, location, CategoryId, gender, birthday, avatar, name } = user
        if (!user) return res.status(401).json({ status: 'error', message: 'EMAIL OR PASSWORD ERROR' })
        if (!bcrypt.compareSync(password, user.password))
          return res.status(401).json({ status: 'error', message: 'EMAIL OR PASSWORD ERROR' })

        var paylod = { id: user.id }
        var token = jwt.sign(paylod, 'thisissecret')
        return res.json({
          status: 'success',
          message: 'ok',
          token,
          user: {
            id, email, phone_number, location, CategoryId, gender, birthday, avatar, name
          }
        })
      })
  },
}

module.exports = userController
