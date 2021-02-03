const express = require('express')
const router = express.Router()
const passport = require('../config/passport')

//驗證觸發不了config strategy
const authenticated = (req, res, next) => {
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
const adminController = require('../controllers/adminController')
const userController = require('../controllers/userController')

//login,logout,signup
router.post('/signin', userController.signIn)
router.post('/signup', userController.signUp)


//userController_UserModel
router.get('/user/:id/profile', authenticated, userController.getProfile)

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