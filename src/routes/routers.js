const express = require('express')
const products = require('./product')
const categories = require('./category')
const histories = require('./history')

const routers = express.Router()

routers
  .use('/product', products)
  .use('/category', categories)
  .use('/history', histories)

module.exports = routers
