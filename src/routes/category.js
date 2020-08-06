const express = require('express');

// connect controller
const controllerCategory = require('../controller/category');

const router2 = express.Router();


// route endpoints

router2
    .get('/', controllerCategory.getCategories)
    .post('/', controllerCategory.insertCategory)
    .patch('/:id', controllerCategory.updateCategory)

module.exports = router2;