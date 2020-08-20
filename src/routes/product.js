const express = require('express')
const router = express.Router()
// connect controller
const controller = require('../controller/product')
const auth = require('../middlewares/auth')
const multer = require('../middlewares/multer')


// route endpoints
router
  .get('/', auth.verifyAccess, controller.getAllProduct)
  .get('/:id', controller.getProductById)
  .post('/',auth.verifyAccess, multer.upload.single('image'), controller.insertNewProduct)
  .patch('/:id',auth.verifyAccess, controller.updateProduct)
  .delete('/:id',auth.verifyAccess, controller.deleteProduct)

module.exports = router
