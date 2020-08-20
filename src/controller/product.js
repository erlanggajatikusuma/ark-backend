// controller = req and res to develop, logic pengolahan data
// menampilkan fungsi callback endpoint di route
// fungi controller diambil dari model
// pemanggilan fungsi dari model

// connect to model
const productModel = require('../model/products')
const responder = require('../response/res')

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
                  return responder.response(res, resultProduct, res.statusCode, responder.status.found, null)
                })
    } else if (sort) {
      productModel.sortProduct(sort)
            .then(result => {
              const resultProduct = result
              return responder.response(res, resultProduct, res.statusCode, responder.status.found, null)
            })
    } else {
      productModel.getAllProduct(page, limit)
                  .then(result => {
                    const resultProducts = {
                      prevPage: page - 1,
                      currentPage: page,
                      nextPage: page + 1,
                      perPage: limit,
                      products: result
                    }
                    responder.response(res, resultProducts, 200, responder.status.found, null)
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
          return responder.response(res, resultProduct, 404, 'Data not found')
        }
        responder.response(res, resultProduct, res.statusCode, responder.status.found)
      })
      .catch(err => {
        responder.response(res, [], err.statusCode, null, err)
      })
  },
  insertNewProduct: (req, res) => {
    const { name, price, idCategory, idStatus, image } = req.body
    const data = {
      name,
      price,
      idCategory,
      idStatus,
      image
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
    const id = req.params.id
    const { name, price, idCategory, idStatus, image } = req.body
    const data = {
      name,
      price,
      idCategory,
      idStatus,
      image
    }
    productModel.updateProduct(id, data)
      .then(result => {
        const updatedProduct = result
        console.log(result)
        if (updatedProduct.insertId === 0) {
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
    productModel.deleteProduct(id)
      .then(result => {
        const deletedProduct = result
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
