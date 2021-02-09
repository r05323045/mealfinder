const sequelize = require('sequelize')
const db = require('../models')
const Restaurant = db.Restaurant
const Category = db.Category
const City = db.City
const District = db.District
const Coupon = db.Coupon
const Comment = db.Comment
const User = db.User

const restaurantController = {
  getRestaurants: (req, res) => {
    let offset = 0
    const pageLimit = 24
    const isFavorited = false // 沒登入狀態

    if (req.query.page) {
      offset = (req.query.page - 1) * pageLimit
    }
    Restaurant.findAll({
      raw: true,
      nest: true,
      where: req.query.min && req.query.max ? { average_consumption: { [sequelize.Op.between]: [Number(req.query.min), Number(req.query.max)] } } : null,
      include: [
        { model: Category, where: req.query.category ? { name: req.query.category } : null },
        City,
        { model: District, where: req.query.district ? { name: req.query.district } : null },
        Coupon
      ],
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
  getUsersRestaurants: (req, res) => {
    let offset = 0
    const pageLimit = 24

    if (req.query.page) {
      offset = (req.query.page - 1) * pageLimit
    }

    return Restaurant.findAll({
      where: req.query.min && req.query.max ? { average_consumption: { [sequelize.Op.between]: [Number(req.query.min), Number(req.query.max)] } } : null,
      include: [
        { model: Category, where: req.query.category ? { name: req.query.category } : null },
        City,
        { model: District, where: req.query.district ? { name: req.query.district } : null },
        Coupon,
        { model: User, as: 'FavoritedUsers' }
      ],
      attributes: {
        include: [
          [sequelize.literal('(SELECT COUNT(*) FROM restaurant_reservation.Comments WHERE Comments.RestaurantId = Restaurant.id)'), 'CommentsCount']
        ]
      },
      offset: offset,
      limit: pageLimit
    }).then(restaurants => {
      const data = restaurants.map(restaurant => ({
        ...restaurant.dataValues,
        description: restaurant.dataValues.description.substring(0, 50),
        isFavorited: restaurant.FavoritedUsers.map(d => d.id).includes(req.user.id)
      }))
      return res.json({ data })
    })
  },
  getRestaurant: (req, res) => {
    return Restaurant.findByPk(req.params.restaurantId, {
      attributes: {
        include: [
          [sequelize.literal(`(SELECT COUNT(*) FROM restaurant_reservation.Comments WHERE Comments.RestaurantId = ${req.params.restaurantId})`), 'CommentsCount']
        ]
      },
      include: [
        Category,
        City,
        District,
        Coupon,
        { model: User, as: 'FavoritedUsers' },
        {
          model: Comment,
          attributes: {
            include: [
              [sequelize.literal('(SELECT COUNT(*) FROM restaurant_reservation.Likes WHERE Likes.CommentId = Comments.id)'), 'LikesCount'],
              [sequelize.literal('(SELECT name FROM restaurant_reservation.Users WHERE Users.id = Comments.UserId)'), 'name'],
              [sequelize.literal('(SELECT avatar FROM restaurant_reservation.Users WHERE Users.id = Comments.UserId)'), 'avatar']
            ]
          }
        }
      ]
    })
      .then(([restaurant, comments]) => {
        restaurant.dataValues.isFavorited = false
        return res.json({ restaurant, comments })
      })
  },
  getUsersRestaurant: (req, res) => {
    return Restaurant.findByPk(req.params.restaurantId, {
      attributes: {
        include: [
          [sequelize.literal(`(SELECT COUNT(*) FROM restaurant_reservation.Comments WHERE Comments.RestaurantId = ${req.params.restaurantId})`), 'CommentsCount']
        ]
      },
      include: [
        Category,
        City,
        District,
        Coupon,
        { model: User, as: 'FavoritedUsers' },
        {
          model: Comment,
          attributes: {
            include: [
              [sequelize.literal('(SELECT COUNT(*) FROM restaurant_reservation.Likes WHERE Likes.CommentId = Comments.id)'), 'LikesCount'],
              [sequelize.literal(`(SELECT COUNT(*) FROM restaurant_reservation.Likes WHERE Likes.UserId = ${req.user.id})`), 'isLiked'],
              [sequelize.literal('(SELECT name FROM restaurant_reservation.Users WHERE Users.id = Comments.UserId)'), 'name'],
              [sequelize.literal('(SELECT avatar FROM restaurant_reservation.Users WHERE Users.id = Comments.UserId)'), 'avatar']
            ]
          }
        }
      ]
    })
      .then(restaurant => {
        restaurant.dataValues.isFavorited = restaurant.FavoritedUsers.map(d => d.id).includes(req.user.id)
        return res.json(restaurant)
      })
  },
  getCategories: (req, res) => {
    Category.findAll().then(categories => {
      return res.json({ categories })
    })
  },
  getDistricts: (req, res) => {
    District.findAll({
      where: { CityId: 1 }
    }).then(districts => {
      return res.json({ districts })
    })
  }
}

module.exports = restaurantController
