const express = require('express')
const router = express.Router()
const passport = require('../config/passport')

const multer = require('multer')
const upload = multer({ dest: 'temp/' })

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
const restaurantController = require('../controllers/restaurantController')

// login,logout,signup
router.post('/signin', userController.signIn)
router.post('/signup', userController.signUp)

// userController_UserModel
router.get('/user/:id/profile', authenticated, userController.getProfile)
router.put('/user/:id/profile', authenticated, upload.single('avatar'), userController.putProfile)
router.get('/get_current_user', authenticated, userController.getCurrentUser)

// userController_UserModel
router.get('/user/:id/profile', authenticated, userController.getProfile)
router.put('/user/:id/profile', authenticated, upload.single('avatar'), userController.putProfile)
router.get('/get_current_user', authenticated, userController.getCurrentUser)

// userController_PreferedCategory model
router.put('/user/:id/preferedcategory', authenticated, userController.putPreferedCategory)

// userController_Favorite model
router.get('/user/favorite', authenticated, userController.getFavorites)
router.post('/user/favorite', authenticated, userController.addFavorite)
router.delete('/user/favorite/:restaurantId', authenticated, userController.deleteFavorite)

// userController_Like model
router.post('/like', authenticated, userController.likeComment)
router.delete('/like/:commentId', authenticated, userController.disLikeComment)

// couponController_Coupon model
router.get('/coupons/:couponId', couponController.getCoupon)
router.get('/coupons', couponController.getCoupons)

// restaurantController_Restaurant model
router.get('/restaurants/:restaurantId', restaurantController.getRestaurant)
router.get('/restaurants', restaurantController.getRestaurants)
router.get('/nearby', restaurantController.getNearByRestaurants)
router.get('/users/restaurants/:restaurantId', authenticated, restaurantController.getUsersRestaurant)
router.get('/users/restaurants', authenticated, restaurantController.getUsersRestaurants)
router.get('users/nearby', authenticated, restaurantController.getUserNearByRestaurants)

// restaurantController_Category model
router.get('/categories', restaurantController.getCategories)

// restaurantController_District model
router.get('/districts', restaurantController.getDistricts)

// adminController
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
