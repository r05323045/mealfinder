const sequelize = require('sequelize')
const db = require('../models')
const Reservation = db.Reservation
// const mailManager = require('../mailManager')

const reservationController = {
  getReservations: (req, res) => {
    Reservation.findAll({
      where: { UserId: req.user.id },
      attributes: {
        include: [
          [sequelize.literal('(SELECT name FROM restaurant_reservation.Restaurants WHERE Restaurants.id = Reservation.RestaurantId)'), 'Restaurant_name'],
          [sequelize.literal('(SELECT picture FROM restaurant_reservation.Restaurants WHERE Restaurants.id = Reservation.RestaurantId)'), 'Restaurant_picture']
        ]
      },
      raw: true,
      nest: true
    }).then(reservations => {
      console.log(reservations)
      return res.json({ reservations })
    })
  },
  getReservation: (req, res) => {
    Reservation.findByPk(req.params.reservationId, {
      attributes: {
        include: [
          [sequelize.literal('(SELECT name FROM restaurant_reservation.Restaurants WHERE Restaurants.id = Reservation.RestaurantId)'), 'Restaurant_name'],
          [sequelize.literal('(SELECT name FROM restaurant_reservation.Users WHERE Users.id = Reservation.UserId)'), 'User_name'],
          [sequelize.literal('(SELECT email FROM restaurant_reservation.Users WHERE Users.id = Reservation.UserId)'), 'User_email'],
          [sequelize.literal('(SELECT phone_number FROM restaurant_reservation.Users WHERE Users.id = Reservation.UserId)'), 'User_phone_number']
        ]
      }
    }).then(reservation => {
      console.log(reservation)
      return res.json({ reservation })
    })
  },
  addReservation: (req, res) => {
    Reservation.create({
      date: req.body.date,
      time: req.body.time,
      partySize_adult: req.body.partySize_adult,
      partySize_kids: req.body.partySize_kids,
      UserId: req.user.id,
      RestaurantId: req.params.restaurantId,
      note: req.body.note,
      purpose: req.body.purpose
    }).then(reservation => {
      return res.json({ status: 'success', message: 'reservation has been succesfully confirmed' })
    })
  },
  deleteReservation: (req, res) => {
    Reservation.findByPk(req.params.reservationId)
      .then(reservation => {
        const today = new Date()
        const reservationDate = new Date(reservation.date)
        // 驗證使用者身份是否為訂位者
        if (reservation.UserId !== req.user.id) {
          return res.json({ status: 'error', message: "You cannot cancel other's reservation." })
        }
        // 欲取消的訂位時間點不能在過去
        if (today > reservationDate) {
          return res.json({ status: 'error', message: 'Reservation in the past cannot be cancelled!' })
        }
        // 取消訂位
        reservation.destroy()
          .then(reservation => {
            return res.json({ status: 'success', message: 'Reservation has been successfully cancelled' })
          })
      })
  }
}

module.exports = reservationController
