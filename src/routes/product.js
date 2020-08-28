const express = require('express')
const router = express.Router()
// connect controller
const controller = require('../controller/product')
const auth = require('../middlewares/auth')
const multer = require('../middlewares/multer')
// const {cache, clearCache, cacheProductId} = require('../middlewares/redis')


// // route endpoints
router
  .get('/', auth.verifyAccess, controller.getAllProduct)
  .get('/:id',auth.verifyAccess, controller.getProductById)
  .post('/',auth.verifyAccess, auth.isAdmin, multer.upload.single('image'), controller.insertNewProduct)
  .patch('/:id',auth.verifyAccess, auth.isAdmin, multer.upload.single('image'), controller.updateProduct)
  .delete('/:id',auth.verifyAccess, auth.isAdmin, controller.deleteProduct)

  // router
  // .get('/', controller.getAllProduct)
  // .get('/:id',controller.getProductById)
  // .post('/', multer.upload.single('image'), controller.insertNewProduct)
  // .patch('/:id', multer.upload.single('image'), controller.updateProduct)
  // .delete('/:id', controller.deleteProduct)


module.exports = router
