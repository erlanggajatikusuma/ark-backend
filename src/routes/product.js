const express = require('express')
const router = express.Router()
// connect controller
const controller = require('../controller/product')
const auth = require('../middlewares/auth')
const multer = require('../middlewares/multer')
const {cache, clearCache, cacheProductId} = require('../middlewares/redis')


// route endpoints
router
  .get('/', auth.verifyAccess, cache, controller.getAllProduct)
  .get('/:id',cacheProductId, controller.getProductById)
  .post('/',auth.verifyAccess, auth.isAdmin, clearCache, multer.upload.single('image'), controller.insertNewProduct)
  .patch('/:id',auth.verifyAccess, auth.isAdmin, clearCache, multer.upload.single('image'), controller.updateProduct)
  .delete('/:id',auth.verifyAccess, auth.isAdmin, controller.deleteProduct)

module.exports = router
