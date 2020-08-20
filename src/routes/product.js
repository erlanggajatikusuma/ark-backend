const express = require('express')
// connect controller
const controller = require('../controller/product')
const auth = require('../middlewares/auth')

const router = express.Router()

// route endpoints
router
  .get('/', auth.verifyAccess, controller.getAllProduct)
  .get('/:id', controller.getProductById)
  .post('/',auth.verifyAccess, controller.insertNewProduct)
  .patch('/:id',auth.verifyAccess, controller.updateProduct)
  .delete('/:id',auth.verifyAccess, controller.deleteProduct)

module.exports = router
