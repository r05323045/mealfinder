const express = require('express')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const bcrypt = require('bcryptjs')

const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(methodOverride('_method'))


app.get('/', (req, res) => {
  res.send('This is restaurant reservation project built with Express')
})

app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})