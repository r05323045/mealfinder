const express = require('express')
const router = express.Router()
const passport = require('../config/passport')

const multer = require('multer')
const upload = multer({ dest: 'temp/' })

// JWT
const jwt = require('jsonwebtoken')
const passportJWT = require('passport-jwt')
const ExtractJwt = passportJWT.ExtractJwt
const JwtStrategy = passportJWT.Strategy

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
const commentController = require('../controllers/commentController.js')
const reservationController = require('../controllers/reservationController')
const cartController = require('../controllers/cartController')

// login,logout,signup
router.post('/signin', userController.signIn)
router.post('/signup', userController.signUp)
router.get('/success', (req, res) => res.send('You have successfully logged in'))
router.get('/error', (req, res) => res.send('error logging in'))
router.get('/auth/facebook', passport.authenticate('facebook', { scope: ['public_profile', 'email'] }))
router.get('/auth/facebook/callback',
  passport.authenticate('facebook', {
    session: false
  }), (req, res) => {
    const paylod = { id: req.user.id }
    const token = jwt.sign(paylod, process.env.JWT_SECRET)
    req.user.password = undefined
    return res.redirect(`${process.env.BASE_URL}/#/_=_?UserId=${req.user.id}&token=${token}`)
  }
)
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }))
router.get('/auth/google/callback',
  passport.authenticate('google', {
    session: false
  }), (req, res) => {
    const paylod = { id: req.user.id }
    const token = jwt.sign(paylod, process.env.JWT_SECRET)
    req.user.password = undefined
    return res.redirect(`${process.env.BASE_URL}/#/_=_?UserId=${req.user.id}&token=${token}`)
  })

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

// userController_Order model
router.get('/user/:id/purchase', authenticated, userController.getPurchases)
router.get('/user/:id/purchase/:orderId/:itemId', authenticated, userController.getPurchase)

// cartController_Cart model
router.get('/user/cart', authenticated, cartController.getCart)
router.post('/user/cart', authenticated, cartController.postCart)
router.post('/user/cartItem/:id/add', authenticated, cartController.addCartItem)
router.post('/user/cartItem/:id/reduce', authenticated, cartController.reduceCartItem)
router.delete('/user/cart/:id', authenticated, cartController.deleteCartItem)
router.get('/user/order', authenticated, cartController.getOrders)
router.get('/user/order/:id', authenticated, cartController.getOrder)
router.post('/user/order', authenticated, cartController.postTradeInfo)
router.post('/spgateway/callback', cartController.spgatewayCallback)

// couponController_Coupon model
router.get('/coupons/:couponId', couponController.getCoupon)
router.get('/coupons', couponController.getCoupons)

// restaurantController_Restaurant model
router.get('/restaurants/:restaurantId', restaurantController.getRestaurant)
router.get('/restaurants', restaurantController.getRestaurants)
router.get('/nearby', restaurantController.getNearByRestaurants)
router.get('/user/restaurants/:restaurantId', authenticated, restaurantController.getUsersRestaurant)
router.get('/user/restaurants', authenticated, restaurantController.getUsersRestaurants)
router.get('/users/nearby', authenticated, restaurantController.getUserNearByRestaurants)
router.get('/prices', restaurantController.getAllPrices)

// reservationController_reservation model
router.post('/user/reservations', authenticated, reservationController.addReservation)
router.delete('/user/reservations/:reservationId', authenticated, reservationController.deleteReservation)
router.get('/user/reservations/:reservationId', authenticated, reservationController.getReservation)
router.get('/user/reservations', authenticated, reservationController.getReservations)

// commentController_Comment model
router.get('/comments/:restaurantId', commentController.getComments)
router.post('/comments', authenticated, commentController.addComment)
router.put('/comments/:commentId', authenticated, commentController.updateComment)
router.delete('/comments/:commentId', authenticated, commentController.deleteComment)

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
