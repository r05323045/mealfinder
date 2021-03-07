const sequelize = require('sequelize')
const db = require('../models')
const nodemailer = require('nodemailer')
const moment = require('moment')

const Reservation = db.Reservation

const reservationController = {
  getReservations: (req, res) => {
    Reservation.findAll({
      where: { UserId: req.user.id },
      attributes: {
        include: [
          [sequelize.literal('(SELECT name FROM Restaurants WHERE Restaurants.id = Reservation.RestaurantId)'), 'Restaurant_name'],
          [sequelize.literal('(SELECT picture FROM Restaurants WHERE Restaurants.id = Reservation.RestaurantId)'), 'Restaurant_picture']
        ]
      },
      raw: true,
      nest: true
    }).then(reservations => {
      return res.json({ reservations })
    })
  },
  getReservation: (req, res) => {
    Reservation.findByPk(req.params.reservationId, {
      attributes: {
        include: [
          [sequelize.literal('(SELECT name FROM Restaurants WHERE Restaurants.id = Reservation.RestaurantId)'), 'Restaurant_name'],
          [sequelize.literal('(SELECT name FROM Users WHERE Users.id = Reservation.UserId)'), 'User_name'],
          [sequelize.literal('(SELECT email FROM Users WHERE Users.id = Reservation.UserId)'), 'User_email'],
          [sequelize.literal('(SELECT phone_number FROM Users WHERE Users.id = Reservation.UserId)'), 'User_phone_number']
        ]
      }
    }).then(reservation => {
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
      UserName: req.body.name,
      gender: req.body.gender,
      phone: req.body.phone,
      email: req.body.email,
      RestaurantId: req.body.RestaurantId,
      note: req.body.note,
      purpose: req.body.purpose
    }).then(reservation => {
      Reservation.findByPk(reservation.id, {
        raw: true,
        nest: true,
        attributes: {
          include: [
            [sequelize.literal('(SELECT name FROM Restaurants WHERE Restaurants.id = Reservation.RestaurantId)'), 'Restaurant_name'],
            [sequelize.literal('(SELECT name FROM Users WHERE Users.id = Reservation.UserId)'), 'User_name'],
            [sequelize.literal('(SELECT email FROM Users WHERE Users.id = Reservation.UserId)'), 'User_email']
          ]
        }
      }).then(reservation => {
        // Step 1: 驗證
        const transporter = nodemailer.createTransport({
          host: 'smtp.gmail.com',
          port: 465,
          secure: true,
          auth: {
            type: 'OAuth2',
            user: process.env.GMAIL_ACCOUNT,
            clientId: process.env.OAUTH_CLIENT_ID,
            clientSecret: process.env.OAUTH_CLIENT_SECRET,
            refreshToken: process.env.OAUTH_REFRESH_TOKEN,
            accessToken: process.env.OAUTH_ACCESS_TOKEN
          }
        })

        // Step 2: 撰寫信件內容
        const emailData = {
          User_name: reservation.User_name,
          User_email: reservation.User_email,
          Restaurant_name: reservation.Restaurant_name,
          date: moment(reservation.date).locale('zh-tw').format('MMMDo[(]dddd[)]'),
          time: reservation.time.slice(0, 5),
          partySize_adult: reservation.partySize_adult,
          partySize_kids: reservation.partySize_kids
        }

        const emailInfo = `
        <body>
          <div style="margin: auto; background-color:#F8F9FA;padding:10px">
            <div style="width: 60%; min-width: 280px; margin: auto; background-color:#FFFFFF; padding: 15px; border-radius:5px;text-align: center;">
              <div style="margin-top: 8px; font-size: 22px; font-weight: 700;">${emailData.User_name} 您好</div>
              <div style="margin-top: 16px; font-size: 22px; font-weight: 700;">已為您安排</div>
              <div style="margin-top: 16px; font-size: 36px; font-weight: 700;">${emailData.Restaurant_name}</div>
              <div style="margin: 16px 0; font-size: 22px; font-weight: 700;">的訂位</div>
              <div style="width: 60%; min-width: 250px; border-color:#B5B5B5;padding:12px; margin: auto;">
              <div style="border:1px #dddddd solid;padding:15px">
                <p style="font-weight:500;letter-spacing:4px;font-size:16px;margin-buttom:5px">${emailData.date}</p>
                <p style="font-weight:600;letter-spacing:5px;font-size:50px;margin-top:5px;margin:0px">${emailData.time}</p>
                <p style="font-weight:500;letter-spacing:7px;font-size:20px;">${emailData.partySize_adult + emailData.partySize_kids}位</p>
              </div>
              </div>
            </div>
          </div>
        </body>
          `

        const mailOptions = {
          from: process.env.GMAIL_ACCOUNT,
          to: emailData.User_email,
          subject: `您在 ${reservation.Restaurant_name} 預定${moment(reservation.date).locale('zh-tw').format('MM[/]DD[(]dddd[)]')} ${reservation.time.slice(0, 5)} ${reservation.partySize_adult + reservation.partySize_kids}人。`,
          html: emailInfo,
          auth: {
            user: process.env.GMAIL_ACCOUNT,
            refreshToken: process.env.OAUTH_REFRESH_TOKEN,
            accessToken: process.env.OAUTH_ACCESS_TOKEN
          }
        }

        // Step 3: 寄出信件
        transporter.sendMail(mailOptions, function (err, response) {
          if (err) {
            console.log('The API returned an error: ' + err)
          } else {
            console.log('send mail success', response)
          }
        })
        return res.json({ status: 'success', message: 'reservation has been succesfully confirmed' })
      })
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
