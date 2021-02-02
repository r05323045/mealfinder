const express = require('express')
const router = express.Router()

const couponController = require('../controllers/couponController')
const userController = require('../controllers/userController')

//login,logout,signup
router.post('/signin', userController.signIn)
router.post('/signup', userController.signUp)

//coupon
router.get('/coupons/:couponId', couponController.getCoupon)
router.get('/coupons', couponController.getCoupons)

module.exports = router