const express = require('express')
const router = express.Router()
const controller = require('../controller/product')
const auth = require('../middlewares/auth')
const multer = require('../middlewares/multer')
const pagination = require('../middlewares/pagination')
// const cors = require('cors')


// route endpoints
router
  // .get('/', auth.verifyAccess, pagination.products, controller.getAllProduct)
  .get('/', pagination.products, controller.getAllProduct)
  .get('/:id', auth.verifyAccess, controller.getProductById)
  // .post('/',auth.verifyAccess, auth.isAdmin, multer.upload.single('image'), controller.insertNewProduct)
  .post('/',auth.verifyAccess, auth.isAdmin, multer.uploadFile, controller.insertNewProduct)
  // .patch('/:id',auth.verifyAccess, auth.isAdmin, multer.upload.single('image'), controller.updateProduct)
  .patch('/:id',auth.verifyAccess, auth.isAdmin, multer.uploadFile, controller.updateProduct)
  .delete('/:id',auth.verifyAccess, auth.isAdmin, controller.deleteProduct)

module.exports = router
