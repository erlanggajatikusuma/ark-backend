const express = require('express');
// connect controller
const controller = require('../controller/product');

const router = express.Router();


// route endpoints
router
    .get('/', controller.getAllProduct)
    .get('/:id', controller.getProductById)
    .post('/', controller.insertNewProduct)
    .patch('/:id', controller.updateProduct)

module.exports = router;