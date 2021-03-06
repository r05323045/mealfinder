const express = require('express')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const flash = require('connect-flash')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const path = require('path')

const app = express()
const port = process.env.PORT || 3000

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const passport = require('./config/passport')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(methodOverride('_method'))
app.use(cookieParser())
app.use(session({
  secret: 'restaurant_reservation',
  name: 'restaurant_reservation',
  cookie: { secure: false },
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())
app.use('/upload', express.static(path.join(__dirname, '/upload')))

app.use((req, res, next) => {
  res.locals.success_message = req.flash('success_message')
  res.locals.error_message = req.flash('error_message')
  res.locals.user = req.user
  next()
})

app.use(cors({
  origin: [
    'http://localhost:8080',
    'https://mealradar.herokuapp.com'
  ],
  credentials: true,
  exposedHeaders: ['set-cookie']
}))

require('./routes')(app)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/public/')))
  app.get(/.*/, (req, res) => res.sendFile(path.join(__dirname, '/public/index.html')))
}


app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})


module.exports = app
