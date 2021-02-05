const sequelize = require('sequelize')
const db = require('../models')
const like = require('../models/like')
const Restaurant = db.Restaurant
const Category = db.Category
const City = db.City
const District = db.District
const Coupon = db.Coupon
const Comment = db.Comment
const Favorite = db.Favorite
const User = db.User
const Like = db.Like

const restaurantController = {
  getRestaurants: (req, res) => {
    let offset = 0
    const pageLimit = 24
    let isFavorited = false //沒登入狀態

    if (req.query.page) {
      offset = (req.query.page - 1) * pageLimit
    }
    Restaurant.findAll({
      raw: true,
      nest: true,
      include: [Category, City, District, Coupon],
      attributes: {
        include: [
          [sequelize.literal('(SELECT COUNT(*) FROM restaurant_reservation.Comments WHERE Comments.RestaurantId = Restaurant.id)'), 'CommentsCount']
        ]
      },
      offset: offset,
      limit: pageLimit
    }).then(restaurants => {
      const data = restaurants.map(restaurant => ({
        ...restaurant,
        description: restaurant.description.substring(0, 50),
        isFavorited: isFavorited
      }))
      return res.json({ data })
    })
  },
  getRestaurant: (req, res) => {
    return Promise.all([
      Restaurant.findByPk(req.params.restaurantId, {
        include: [Category, City, District, Coupon],
      }),
      Comment.findAndCountAll({
        where: { RestaurantId: req.params.restaurantId },
        include: [User],
        attributes: {
          include: [
            [sequelize.literal('(SELECT COUNT(*) FROM restaurant_reservation.Likes WHERE Likes.CommentId = Comment.id)'), 'LikesCount']
          ]
        }
      })
    ])
      .then(([restaurant, comments]) => {
        return res.json({ restaurant, comments })
      })
  }
}

module.exports = restaurantController
