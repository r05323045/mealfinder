const express = require('express')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(methodOverride('_method'))

require('./routes')(app)

app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})

module.exports = app