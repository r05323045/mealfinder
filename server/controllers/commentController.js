const sequelize = require('sequelize')
const db = require('../models')
const Comment = db.Comment
const Reservation = db.Reservation
// const Restaurant = db.Restaurant

const commentController = {
  getComments: (req, res) => {
    Comment.findAll({
      where: { RestaurantId: req.params.restaurantId },
      attributes: {
        include: [
          [sequelize.literal('(SELECT COUNT(*) FROM restaurant_reservation.Comments WHERE Comments.RestaurantId = restaurantId)'), 'CommentsCount']
        ]
      }
    }).then(comments => {
      return res.json({ comments })
    })
  },
  addComment: (req, res) => {
    // 使用者有訂位過才可留言
    Reservation.findOne({
      where: {
        UserId: req.user.id,
        RestaurantId: req.params.restaurantId
      }
    }).then(reservation => {
      if (!reservation) {
        return res.json({ status: 'error', message: "User hasn't been to the restuarant before" })
      } else {
        // 留言內容不可空白
        if (!req.body.content) {
          return res.json({ status: 'error', message: 'Comment can not be empty' })
        }

        // 一次訂位紀錄僅能留一次評論，不可洗評論
        Comment.findOne({
          where: { ReservationId: reservation.id }
        }).then(comment => {
          if (comment) {
            return res.json({ status: 'error', message: 'Customer can only leave one comment for each reservation' })
          }
          Comment.create({
            content: req.body.content,
            rating: req.body.rating,
            RestaurantId: req.params.restaurantId,
            UserId: req.user.id,
            ReservationId: reservation.id
          }).then(comment => {
            // // 更新 Restaurant rating
            // Comment.findOne({
            //   where: { RestaurantId: req.params.restaurantId },
            //   attributes: {
            //     include: [
            //       [sequelize.literal(`(SELECT AVG(rating) as avg_rating FROM restaurant_reservation.Comments WHERE Comments.RestaurantId = ${req.params.restaurantId})`), 'avg_rating']
            //     ]
            //   }
            // }).then(comment => {
            //   Restaurant.findByPk(req.params.restaurantId)
            //     .then(restaurant => {
            //       restaurant.update({
            //         rating: Math.floor((comment.dataValues.avg_rating) * 10) / 10
            //       })
            //     }).then(restaurant => {
            //       return res.json({ status: 'success', message: 'Comment was successfully created' })
            //     })
            // })
            return res.json({ status: 'success', message: 'Comment was successfully created' })
          })
        })
      }
    })
  },
  updateComment: (req, res) => {
    Comment.findByPk(req.params.commentId)
      .then(comment => {
        comment.update({
          content: req.body.content,
          rating: req.body.rating,
          RestaurantId: req.body.RestaurantId,
          UserId: req.user.id,
          ReservationId: req.body.ReservationId
        }).then(comment => {
          // // update Restaurant average rating
          // Comment.findOne({
          //   where: { RestaurantId: req.body.RestaurantId },
          //   attributes: {
          //     include: [
          //       [sequelize.literal(`(SELECT AVG(rating) as avg_rating FROM restaurant_reservation.Comments WHERE Comments.RestaurantId = ${req.body.RestaurantId})`), 'avg_rating']
          //     ]
          //   }
          // }).then(comment => {
          //   console.log(comment)
          //   Restaurant.findByPk(req.body.RestaurantId)
          //     .then(restaurant => {
          //       restaurant.update({
          //         rating: Math.floor((comment.dataValues.avg_rating) * 10) / 10
          //       })
          //     }).then(restaurant => {
          //       return res.json({ status: 'success', message: 'Comment was successfully updated' })
          //     })
          // })
          return res.json({ status: 'success', message: 'Comment was successfully updated' })
        })
      })
  },
  deleteComment: (req, res) => {
    Comment.findByPk(req.params.commentId)
      .then(comment => {
        console.log(comment)
        const RestaurantId = comment.RestaurantId
        comment.destroy()
          .then(comment => {
            // // update Restaurant average raitng
            // Comment.findOne({
            //   where: { RestaurantId: RestaurantId },
            //   attributes: {
            //     include: [
            //       [sequelize.literal(`(SELECT AVG(rating) as avg_rating FROM restaurant_reservation.Comments WHERE Comments.RestaurantId = ${RestaurantId})`), 'avg_rating']
            //     ]
            //   }
            // }).then(comment => {
            //   console.log(comment)
            //   Restaurant.findByPk(RestaurantId)
            //     .then(restaurant => {
            //       restaurant.update({
            //         rating: Math.floor((comment.dataValues.avg_rating) * 10) / 10
            //       })
            //     }).then(restaurant => {
            //       return res.json({ status: 'success', message: 'Comment was successfully deleted' })
            //     })
            // })
            return res.json({ status: 'success', message: 'Comment was successfully deleted' })
          })
      })
  }
}

module.exports = commentController
