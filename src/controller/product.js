// controller = req and res to develop, logic pengolahan data
// menampilkan fungsi callback endpoint di route
// fungi controller diambil dari model
// pemanggilan fungsi dari model

// connect to model
const productModel = require('../model/products')
const responder = require('../response/res')
const fs = require('fs')
// const redis = require('redis');
// const client = redis.createClient(process.env.REDIS_PORT);


const products = {
  getAllProduct: (req, res) => {
    const search = req.query.search
    const sort = req.query.sort
    const page = parseInt(req.query.page) || 1
    const limit = req.query.limit || 9

    if (search) {
      productModel.searchProductName(search)
            .then(result => {
                  const resultProduct = result
                  console.log(resultProduct)
                  return responder.response(res, resultProduct, res.statusCode, responder.status.found, null)
                })
    } else if (sort) {
      productModel.sortProduct(sort)
            .then(result => {
              const resultProduct = result
              console.log(resultProduct)
              return responder.response(res, resultProduct, res.statusCode, responder.status.found, null, req.pagination)
            })
    } else {
      productModel.getAllProduct(page, limit)
                  .then(result => {
                    const resultProducts = result
                    responder.response(res, resultProducts, 200, responder.status.found, null, req.pagination)
                  })
                  .catch(err => {
                    console.log(err)
                  })
    }
    // else {
    //   productModel.getAllProduct(page, limit)
    //               .then(result => {
    //                 const resultProducts = {
    //                   totalPage,
    //                   prevPage: page - 1,
    //                   currentPage: page,
    //                   nextPage: page + 1,
    //                   perPage: limit,
    //                   products: result
    //                 }
    //                 responder.response(res, resultProducts, 200, responder.status.found, null)
    //               })
    //               .catch(err => {
    //                 console.log(err)
    //               })
    // }
  },
  getProductById: (req, res) => {
    const id = req.params.id
    productModel.getProductById(id)
      .then((result) => {
        const resultProduct = result
        if (resultProduct.length === 0) {
          return responder.response(res, resultProduct, 404, 'Data not found')
        }
        client.setex('product', 60*60*6, JSON.stringify(resultProduct))
        responder.response(res, resultProduct, res.statusCode, responder.status.found)
      })
      .catch(err => {
        responder.response(res, [], err.statusCode, null, err)
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
      image: `http://localhost:3000/uploads/${req.file.filename}`
    }
    productModel.insertNewProduct(data)
      .then(result => {
        const insertedProduct = result
        console.log(result);
        responder.response(res, insertedProduct, res.statusCode, responder.status.insert)
      })
      .catch(err => {
        console.log(err)
      })
  },
  updateProduct: (req, res) => {
    console.log(req.file)
    const id = req.params.id
    const oldImage = req.file.path
    const { name, price, idCategory, idStatus } = req.body
      const data = {
        name,
        price,
        idCategory,
        idStatus,
        image: `http://localhost:3000/uploads/${req.file.filename}`
      }
    productModel.updateProduct(id, data)
      .then(result => {
        const updatedProduct = result
        console.log(result)
        if (updatedProduct.affectedRows === 0) {
          return responder.response(res, null, 404, 'Id Not Found')
        }
        responder.response(res, updatedProduct, res.statusCode, responder.status.update)
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
        const port = 'http://localhost:3000/'
        const deletePath = resultProduct.replace(port, '')
        fs.unlinkSync(deletePath, function(err){
          if(err) throw err
          console.log('file deleted successfully');
        });
      })
    productModel.deleteProduct(id)
      .then(result => {
        const deletedProduct = result
        // console.log(req.file)
        
        console.log(deletedProduct);
        if (deletedProduct.affectedRows === 0) {
          return responder.response(res, null, 404, 'Id Not Found')
        }
        responder.response(res, deletedProduct, res.statusCode, responder.status.delete)
      })
      .catch(err => {
        console.log(err)
      })
  }
}

module.exports = products
