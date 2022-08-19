const passport = require('passport')
const db = require('../models')
const User = db.User
const bcrypt = require('bcrypt')

const jwt = require('jsonwebtoken')
const passportJWT = require('passport-jwt')
const ExtractJwt = passportJWT.ExtractJwt
const JwtStrategy = passportJWT.Strategy
const FacebookStrategy = require('passport-facebook').Strategy
const GoogleStrategy = require('passport-google-oauth20').Strategy

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

// Login with Facebook
passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: process.env.FACEBOOK_CALLBACK,
  profileFields: ['id', 'displayName', 'email', 'photos', 'gender']
}, (accessToken, refreshToken, profile, done) => {
  User.findOne({ where: { email: profile._json.email } })
    .then(user => {
      console.log(profile._json.picture.data)
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
          gender: profile.gender || undefined,
          birthday: null,
          avatar: profile._json.picture.data.url,
          DistrictId: undefined
        }))
        .then(user => done(null, user))
        .catch(err => done(err, false))
    })
}))

// login with Google
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL
}, (accessToken, refreshToken, profile, done) => {
  console.log(profile)
  // return done(null, profile)
  const { name, picture, email } = profile._json
  User.findOne({ where: { email } })
    .then(user => {
      if (user) return done(null, user)
      const randomPassword = Math.random().toString(36).slice(-8)
      bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(randomPassword, salt))
        .then(hash => User.create({
          name,
          email,
          password: hash,
          phone_number: null,
          location: '台北市',
          gender: profile.gender || null,
          birthday: null,
          avatar: picture || null,
          DistrictId: null
        }))
        .then(user => done(null, user))
        .catch(err => done(err, false))
    })
}
))

module.exports = passport
