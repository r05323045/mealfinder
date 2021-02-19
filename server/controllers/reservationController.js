const db = require('../models')
const Reservation = db.Reservation
// const mailManager = require('../mailManager')

const reservationController = {
  addReservation: (req, res) => {
    // const { date, time, partySize_adult, partySize_kids, note, purpose } = req.body
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
  }
}

module.exports = reservationController
