const sequelize = require('sequelize')
const db = require('../models')
const Comment = db.Comment

const commentController = {
  getComments: (req, res) => {
    Comment.findAll({
      where: { RestaurantId: req.params.restaurantId },
      attributes: {
        include: [
          [sequelize.literal('(SELECT COUNT(*) FROM restaurant_reservation.Comments WHERE Comments.RestaurantId = restaurantId)'), 'CommentsCount']
        ]
      },
    }).then(comments => {
      return res.json({ comments })
    })
  }
}

module.exports = commentController
