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
    const isFavorited = false

    if (req.query.page) {
      offset = (req.query.page - 1) * pageLimit
    }
    Restaurant.findAndCountAll({
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
          [sequelize.literal('(SELECT COUNT(*) FROM Comments WHERE Comments.RestaurantId = Restaurant.id)'), 'CommentsCount']
        ]
      },
      offset: offset,
      limit: pageLimit
    }).then(restaurants => {
      const data = restaurants.rows.map(restaurant => ({
        ...restaurant,
        description: restaurant.description.substring(0, 50),
        isFavorited: isFavorited
      }))
      const count = restaurants.count
      return res.json({ data, count })
    })
  },
  getUsersRestaurants: (req, res) => {
    let offset = 0
    const pageLimit = 24

    if (req.query.page) {
      offset = (req.query.page - 1) * pageLimit
    }

    return Restaurant.findAndCountAll({
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
          [sequelize.literal('(SELECT COUNT(*) FROM Comments WHERE Comments.RestaurantId = Restaurant.id)'), 'CommentsCount']
        ]
      },
      offset: offset,
      limit: pageLimit
    }).then(restaurants => {
      const data = restaurants.rows.map(restaurant => ({
        ...restaurant.dataValues,
        description: restaurant.dataValues.description.substring(0, 50),
        isFavorited: restaurant.FavoritedUsers.map(d => d.id).includes(req.user.id)
      }))
      const count = restaurants.count
      return res.json({ data, count })
    })
  },
  getRestaurant: (req, res) => {
    return Restaurant.findByPk(req.params.restaurantId, {
      attributes: {
        include: [
          [sequelize.literal(`(SELECT COUNT(*) FROM Comments WHERE Comments.RestaurantId = ${req.params.restaurantId})`), 'CommentsCount']
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
              [sequelize.literal('(SELECT COUNT(*) FROM Likes WHERE Likes.CommentId = Comments.id)'), 'LikesCount'],
              [sequelize.literal('(SELECT name FROM Users WHERE Users.id = Comments.UserId)'), 'name'],
              [sequelize.literal('(SELECT avatar FROM Users WHERE Users.id = Comments.UserId)'), 'avatar']
            ]
          }
        }
      ]
    })
      .then(restaurant => {
        restaurant.dataValues.isFavorited = false
        return res.json(restaurant)
      })
  },
  getUsersRestaurant: (req, res) => {
    return Restaurant.findByPk(req.params.restaurantId, {
      attributes: {
        include: [
          [sequelize.literal(`(SELECT COUNT(*) FROM Comments WHERE Comments.RestaurantId = ${req.params.restaurantId})`), 'CommentsCount']
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
              [sequelize.literal('(SELECT COUNT(*) FROM Likes WHERE Likes.CommentId = Comments.id)'), 'LikesCount'],
              [sequelize.literal(`(SELECT COUNT(*) FROM Likes WHERE Likes.UserId = ${req.user.id})`), 'isLiked'],
              [sequelize.literal('(SELECT name FROM Users WHERE Users.id = Comments.UserId)'), 'name'],
              [sequelize.literal('(SELECT avatar FROM Users WHERE Users.id = Comments.UserId)'), 'avatar']
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
  },
  getNearByRestaurants: (req, res) => {
    let offset = 0
    const pageLimit = 24
    const isFavorited = false

    if (req.query.page) {
      offset = (req.query.page - 1) * pageLimit
    }
    const center = sequelize.literal(`ST_GeomFromText('POINT(${req.query.clat} ${req.query.clng})', 4326)`)
    Promise.all([
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
            [sequelize.literal('(SELECT COUNT(*) FROM Comments WHERE Comments.RestaurantId = Restaurant.id)'), 'CommentsCount'],
            [sequelize.fn('ST_Distance', sequelize.literal("ST_GeomFromText(CONCAT('POINT(',Restaurant.latitude, ' ', Restaurant.longitude,')'), 4326)"), center), 'distance']
          ]
        },
        having: [sequelize.where(sequelize.col('distance'), '<=', sequelize.fn('ST_Distance', sequelize.literal(`ST_GeomFromText('POINT(${req.query.blat} ${req.query.blng})', 4326)`), center))],
        // order: sequelize.literal('distance ASC'),
        offset: offset,
        limit: pageLimit
      }),
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
            [sequelize.literal('(SELECT COUNT(*) FROM Comments WHERE Comments.RestaurantId = Restaurant.id)'), 'CommentsCount'],
            [sequelize.fn('ST_Distance', sequelize.literal("ST_GeomFromText(CONCAT('POINT(',Restaurant.latitude, ' ', Restaurant.longitude,')'), 4326)"), center), 'distance']
          ]
        },
        having: [sequelize.where(sequelize.col('distance'), '<=', sequelize.fn('ST_Distance', sequelize.literal(`ST_GeomFromText('POINT(${req.query.blat} ${req.query.blng})', 4326)`), center))]
      })
    ]).then(([restaurants, allRestaurants]) => {
      const data = restaurants.map(restaurant => ({
        ...restaurant,
        description: restaurant.description.substring(0, 50),
        isFavorited: isFavorited
      }))
      const count = allRestaurants.length
      return res.json({ data, count })
    })
  },
  getUserNearByRestaurants: (req, res) => {
    let offset = 0
    const pageLimit = 24

    if (req.query.page) {
      offset = (req.query.page - 1) * pageLimit
    }
    const center = sequelize.literal(`ST_GeomFromText('POINT(${req.query.clat} ${req.query.clng})', 4326)`)
    Promise.all([
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
            [sequelize.literal('(SELECT COUNT(*) FROM Comments WHERE Comments.RestaurantId = Restaurant.id)'), 'CommentsCount'],
            [sequelize.fn('ST_Distance', sequelize.literal("ST_GeomFromText(CONCAT('POINT(',Restaurant.latitude, ' ', Restaurant.longitude,')'), 4326)"), center), 'distance']
          ]
        },
        having: [sequelize.where(sequelize.col('distance'), '<=', sequelize.fn('ST_Distance', sequelize.literal(`ST_GeomFromText('POINT(${req.query.blat} ${req.query.blng})', 4326)`), center))],
        // order: sequelize.literal('distance ASC'),
        offset: offset,
        limit: pageLimit
      }),
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
            [sequelize.literal('(SELECT COUNT(*) FROM Comments WHERE Comments.RestaurantId = Restaurant.id)'), 'CommentsCount'],
            [sequelize.fn('ST_Distance', sequelize.literal("ST_GeomFromText(CONCAT('POINT(',Restaurant.latitude, ' ', Restaurant.longitude,')'), 4326)"), center), 'distance']
          ]
        },
        having: [sequelize.where(sequelize.col('distance'), '<=', sequelize.fn('ST_Distance', sequelize.literal(`ST_GeomFromText('POINT(${req.query.blat} ${req.query.blng})', 4326)`), center))]
      })
    ]).then(([restaurants, allRestaurants]) => {
      const data = restaurants.map(restaurant => ({
        ...restaurant,
        description: restaurant.description.substring(0, 50),
        isFavorited: restaurant.FavoritedUsers.map(d => d.id).includes(req.user.id)
      }))
      const count = allRestaurants.length
      return res.json({ data, count })
    })
  },
  getAllPrices: (req, res) => {
    Restaurant.findAll({
      attributes: ['average_consumption'],
      order: sequelize.literal('average_consumption ASC')
    }).then(prices => {
      const data = prices.filter(p => p.average_consumption).map(p => (
        p.average_consumption
      ))
      return res.json({ data })
    })
  }
}

module.exports = restaurantController
