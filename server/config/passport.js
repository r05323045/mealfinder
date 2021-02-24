const passport = require('passport')
const db = require('../models')
const User = db.User
const bcrypt = require('bcrypt')

const jwt = require('jsonwebtoken')
const passportJWT = require('passport-jwt')
const ExtractJwt = passportJWT.ExtractJwt
const JwtStrategy = passportJWT.Strategy
const FacebookStrategy = require('passport-facebook').Strategy

let jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
jwtOptions.secretOrKey = process.env.JWT_SECRET

let strategy = new JwtStrategy(jwtOptions, function (jwt_payload, next) {
  User.findByPk(jwt_payload.id, {

  })
    .then(user => {
      if (!user) return next(null, false)
      return next(null, user)
    })
})

passport.use(strategy)

passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: 'http://localhost:3000/api/auth/facebook/callback',
  profileFields: ['id', 'displayName', 'email', 'gender']
}, (accessToken, refreshToken, profile, done) => {
  // console.log(profile)
  User.findOne({ where: { email: profile._json.email } })
    .then(user => {
      if (user) return done(null, user)
      const randomPassword = Math.random().toString(36).slice(-8)
      bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(randomPassword, salt))
        .then(hash => User.create({
          name: profile.displayName,
          email: profile._json.email,
          password: hash,
          phone_number: null,
          location: '台北市',
          gender: profile.gender || 'N/A',
          birthday: null,
          avatar: null,
          DistrictId: 1
        }))
        .then(user => done(null, user))
        .catch(err => done(err, false))
    })
}))

module.exports = passport
