const express = require('express');
const products = require('./product');
const categories = require('./category');

const routers = express.Router();

routers
    .use('/product', products)
    .use('/category', categories)

module.exports = routers;
