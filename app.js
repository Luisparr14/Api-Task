var express = require('express')
// var path=require('path')
var bodyParser = require('body-parser')
var logger = require('morgan')
var cors=require('cors')
require('dotenv').config()

const routes = require('./routes/index')
const app = express()

const corsOptions = {
  origin: '*'
}
// config

//middlewares
app.use(logger('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors(corsOptions))
app.use('/api/v1', routes)

app.get('/', (req, res) => {
  res.send('funcionando')
})

module.exports = app