const productModel = require('../model/products')
const helper = require('../response/res')
const fs = require('fs')
// const redis = require('redis');
// const client = redis.createClient(process.env.REDIS_PORT);

const products = {
  getAllProduct: (req, res) => {
    const search = req.query.search
    const sort = req.query.sort
    const page = parseInt(req.query.page) || 1
    const limit = req.query.limit || 9

    // IMPORTANT
    if (search) {
      productModel.searchProductName(search)
            .then(result => {
                  const resultProduct = result
                  console.log(resultProduct)
                  return helper.response(res, resultProduct, res.statusCode, helper.status.found, null)
                })
    } else if (sort) {
      productModel.sortProduct(sort)
            .then(result => {
              const resultProduct = result
              console.log(resultProduct)
              return helper.response(res, resultProduct, res.statusCode, helper.status.found, null, req.pagination)
            })
    } else {
      productModel.getAllProduct(page, limit)
                  .then(result => {
                    const resultProducts = result
                    helper.response(res, resultProducts, 200, helper.status.found, null, req.pagination)
                  })
                  .catch(err => {
                    console.log(err)
                  })
    }
  },
  getProductById: (req, res) => {
    const id = req.params.id
    productModel.getProductById(id)
      .then((result) => {
        const resultProduct = result
        if (resultProduct.length === 0) {
          return helper.response(res, resultProduct, 404, 'Data not found')
        }
        // client.setex('product', 60*60*6, JSON.stringify(resultProduct))
        helper.response(res, resultProduct, res.statusCode, helper.status.found)
      })
      .catch(err => {
        console.log(err)
      })
  },
  insertNewProduct: (req, res) => {
    console.log(req.file)
    const { name, price, idCategory, idStatus } = req.body
    const data = {
      name,
      price,
      idCategory,
      idStatus,
      image: `${process.env.BASE_URL}/uploads/${req.file.filename}`
    }
    productModel.insertNewProduct(data)
      .then(result => {
        const insertedProduct = result
        console.log(result);
        helper.response(res, insertedProduct, res.statusCode, helper.status.insert)
      })
      .catch(err => {
        console.log(err)
      })
  },
  updateProduct: (req, res) => {
    console.log(req.file)
    const id = req.params.id
    const { name, price, idCategory, idStatus } = req.body
      const data = {
        name,
        price,
        idCategory,
        idStatus
      }
    if(req.file) {
      productModel.getProductById(id)
        .then(result => {
          const updated = result[0].image;
          console.log(updated)
          const replacePath = updated.replace(`${process.env.BASE_URL}/`, '');
          fs.unlinkSync(replacePath)
        })
      data.image = `${process.env.BASE_URL}/${req.file.path}`
    }
    productModel.updateProduct(id, data)
      .then(result => {
        const updatedProduct = result
        console.log(result)
        if (updatedProduct.affectedRows === 0) {
          return helper.response(res, null, 404, 'Id Not Found')
        }
        helper.response(res, updatedProduct, res.statusCode, helper.status.update)
      })
      .catch(err => {
        console.log(err)
      })
  },
  deleteProduct: (req, res) => {
    const id = req.params.id
    productModel.getProductById(id)
      .then(result => {
        const resultProduct = result[0].image
        console.log(resultProduct)
        // Delete file system
        const deletePath = resultProduct.replace(`${process.env.BASE_URL}/`, '')
        fs.unlinkSync(deletePath, function(err){
          if(err) throw err
          console.log('file deleted successfully');
        });
      })
    productModel.deleteProduct(id)
      .then(result => {
        const deletedProduct = result
        console.log(deletedProduct);
        if (deletedProduct.affectedRows === 0) {
          return helper.response(res, null, 404, 'Id Not Found')
        }
        helper.response(res, deletedProduct, res.statusCode, helper.status.delete)
      })
      .catch(err => {
        console.log(err)
      })
  }
}

module.exports = products
