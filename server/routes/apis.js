const express = require('express')
const router = express.Router()

const couponController = require('../controllers/couponController')
const adminController = require('../controllers/adminController')
const userController = require('../controllers/userController')

//login,logout,signup
router.post('/signin', userController.signIn)
router.post('/signup', userController.signUp)

//coupon
router.get('/coupons/:couponId', couponController.getCoupon)
router.get('/coupons', couponController.getCoupons)

//admin
router.get('/admin/users', adminController.getUsers)
router.get('/admin/restaurants', adminController.getRestaurants)
router.get('/admin/categories', adminController.getCategories)
router.post('/admin/category', adminController.addCategory)
router.put('/admin/categories/:categoryId', adminController.updateCategory)
router.get('/admin/orders', adminController.getOrders)
router.get('/admin/coupons', adminController.getCoupons)
router.put('/admin/coupons/:couponId', adminController.updateCoupon)
router.get('/admin/reservations', adminController.getReservations)

module.exports = router