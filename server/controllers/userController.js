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
        var token = jwt.sign(paylod, process.env.JWT_SECRET)
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

  signUp: (req, res) => {
    const { email, password, passwordConfirm, name } = req.body
    if (!email || !password || !passwordConfirm || !name) {
      return res.json({
        status: 'error',
        message: '所有欄位皆為必填',
        email,
        name
      })
    }
    if (password !== passwordConfirm) {
      return res.json({
        status: 'error',
        message: '兩次密碼輸入不同',
        email,
        name,
      })
    } else {
      User.findOne({ where: { email } })
        .then(user => {
          if (user) {
            return res.json({
              status: 'error',
              message: '此信箱已被使用，請直接登入使用',
              name, email, password, passwordConfirm
            })
          } else {
            User.create({
              name, email, password: bcrypt.hashSync(password, bcrypt.genSaltSync(10), null),
              avatar: 'https://cdn.pixabay.com/photo/2018/04/18/18/56/user-3331256__340.png'
            })
              .then(() => {
                return res.json({
                  status: 'success',
                  message: '帳號註冊成功！'
                })
              })
          }
        })
    }
  },

  getProfile: (req, res) => {
    User.findOne({ where: { id: req.params.id } })
      .then(user => {
        return res.json(user)
      })
  }
}

module.exports = userController
