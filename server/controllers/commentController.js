const sequelize = require('sequelize')
const db = require('../models')
const Comment = db.Comment
const Reservation = db.Reservation

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
  },
  addComment: (req, res) => {
    //確認使用者訂位紀錄，有訂位過才可留言
    Reservation.findOne({
      where: {
        UserId: req.user.id,
        RestaurantId: req.body.RestaurantId
      }
    }).then(reservation => {
      if (!reservation) {
        return res.json({ status: "error", message: "User hasn't been to the restuarant before" })
      } else {
        // console.log(reservation)
        //留言內容不可空白
        if (!req.body.content) {
          return res.json({ status: "error", message: "Comment can not be empty" })
        }

        //一次訂位紀錄僅能留一次評論，不可洗評論
        Comment.findOne({
          where: { ReservationId: ReservationId }
        }).then(comment => {
          if (comment) {
            return res.json({ status: "error", message: "Customer can only leave one comment for each reservation" })
          }
          Comment.create({
            content: req.body.content,
            rating: req.body.rating,
            RestaurantId: req.body.RestaurantId,
            UserId: req.user.id
          }).then(comment => {
            return res.json({ status: "success", message: "Comment was successfully created" })
          })
        })
      }
    })

  }
}

module.exports = commentController
