const express = require('express')
const router = express.Router()

const couponController = require('../controllers/couponController')

//coupon
router.get('/coupons', couponController.getCoupons)

module.exports = router