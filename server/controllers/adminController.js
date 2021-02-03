const db = require('../models')
const User = db.User
const Category = db.Category
const Restaurant = db.Restaurant
const City = db.City
const District = db.District
const Coupon = db.Coupon
const PreferedCategory = db.PreferedCategory
const Order = db.Order
const Reservation = db.Reservation

const adminController = {
  getUsers: (req, res) => {
    User.findAll({
      raw: true,
      nest: true,
      include: [PreferedCategory]
    })
      .then(users => {
        return res.json({ users })
      })
  },
  getRestaurants: (req, res) => {
    let offset = 0
    const pageLimit = 24

    if (req.query.page) {
      offset = (req.query.page - 1) * pageLimit
    }

    Restaurant.findAll({
      raw: true,
      nest: true,
      include: [Category, City, District, Coupon],
      offset: offset,
      limit: pageLimit
    })
      .then(restaurants => {
        const data = restaurants.map(restaurant => {
          if (restaurant.description === null) {
            return restaurant
          } else {
            restaurant.description = restaurant.description.substring(0, 50)
            return restaurant
          }
        })
        return res.json({ data })
      })
  },
  getCategories: (req, res) => {
    Category.findAll({
      raw: true,
      nest: true,
    }).then(categories => {
      return res.json({ categories })
    })
  },
  addCategory: (req, res) => {
    Category.create({
      name: req.body.name,
      picture: req.body.picture
    }).then((category) => {
      return res.json({
        status: "success",
        message: ""
      })
    })
  },
  updateCategory: (req, res) => {
    Category.findByPk(req.params.categoryId)
      .then(category => {
        return category.update({
          name: req.body.name,
          picture: req.body.picture
        }).then((category) => {
          return res.json({
            status: "success",
            message: ""
          })
        })

      })
  },
  getOrders: (req, res) => {
    Order.findAll({
      raw: true,
      nest: true,
      include: [User]
    }).then(orders => {
      return res.json({ orders })
    })
  },
  getCoupons: (req, res) => {
    Coupon.findAll({
      raw: true,
      nest: true,
      include: [Restaurant]
    }).then(coupons => {
      return res.json({ coupons })
    })
  },
  updateCoupon: (req, res) => {
    Coupon.findByPk(req.params.couponId)
      .then(coupon => {
        coupon.update({
          // NO: req.body.NO, 編號產生後就不得更改
          RestaurantId: req.body.RestarantId,
          price: req.body.price,
          description: req.body.description
        })
          .then((coupon) => {
            return res.json({
              status: "success",
              message: ""
            })
          })
      })
  },
  getReservations: (req, res) => {
    Reservation.findAll({
      raw: true,
      nest: true,
      include: [User, Restaurant]
    }).then(reservations => {
      return res.json({ reservations })
    })
  }
}

module.exports = adminController
