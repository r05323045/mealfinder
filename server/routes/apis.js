const express = require('express')
const router = express.Router()
const passport = require('../config/passport')

const authenticated = (req, res, next) => {
  console.log('apis start')
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err) {
      console.log(err)
    }
    if (!user) {
      return res
        .status(401)
        .json({ status: 'error', message: 'No auth token' })
    }
    req.user = user
    return next()
  })(req, res, next)
}


const couponController = require('../controllers/couponController')
const userController = require('../controllers/userController')

//login,logout,signup
router.post('/signin', userController.signIn)
router.post('/signup', userController.signUp)

//userController_UserModel
router.get('/user/:id/profile', authenticated, userController.getProfile)

//coupon
router.get('/coupons/:couponId', couponController.getCoupon)
router.get('/coupons', couponController.getCoupons)

module.exports = router