const express = require('express')
const router = express.Router()

const couponController = require('../controllers/couponController')
const adminController = require('../controllers/adminController')

//coupon
router.get('/coupons/:couponId', couponController.getCoupon)
router.get('/coupons', couponController.getCoupons)

//admin
router.get('/admin/users', adminController.getUsers)
router.get('/admin/restaurants', adminController.getRestaurants)
router.get('/admin/categories', adminController.getCategories)
router.post('/admin/category', adminController.addCategory)
router.get('/admin/orders', adminController.getOrders)

module.exports = router