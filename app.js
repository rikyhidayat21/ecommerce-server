if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express')
const cors = require('cors')
const router = require('./routes')
const errHandler = require('./middlewares/errHandler')

const app = express()

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors())

app.use(router)
app.use(errHandler)

module.exports = app

