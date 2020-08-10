// controller = req and res to develop, logic pengolahan data
// menampilkan fungsi callback endpoint di route
// fungi controller diambil dari model
// pemanggilan fungsi dari model

// connect to model
const productModel = require('../model/products');
const responder = require('../response/res');

const products = {
    getAllProduct : (req, res) => {
        const search = req.query.search;
        const sort = req.query.sort;
        const page = req.query.page;
        const limit = req.query.limit;
        
        let result;
            if(search) {
                result = productModel.searchProductName(search);
            } else if(sort) {
                result = productModel.sortProduct(sort);
            } else {
                result = productModel.getAllProduct(page, limit);
            };
        result
            .then(result => {
                resultProduct = result;
                res.json(resultProduct);
            })
            .catch(err => {
                console.log(err);
            })
    },
    // getProductById: (req, res) => {
    //     const id = req.params.id;
    //     productModel.getProductById(id)
    //     .then(result => {
    //         resultProduct = result;
    //         // responder.response(res, resultProduct, 200, null)
    //         res.json(resultProduct)
    //     })
    //     .catch(err => {
    //             err.message;
    //     })
    // },
    getProductById: (req, res, next) => {
        const id = req.params.id;
        productModel.getProductById(id)
        .then((result) => {
                resultProduct = result;
                res.json(resultProduct)
        })
        .catch(next)
    },
    insertNewProduct : (req, res) => {
        const {name, price, idCategory, idStatus, image} = req.body;
        const data = {
            name,
            price,
            idCategory,
            idStatus,
            image
        }
        productModel.insertNewProduct(data)
        .then(result => {
            const resultNewProduct = result;
            console.log(result);
            res.json(resultNewProduct);
        })
        .catch(err => {
            console.log(err);
        })
    },
    updateProduct : (req, res) => {
        const id = req.params.id;
        const {name, price, idCategory, idStatus, image} = req.body;
        const data = {
            name,
            price,
            idCategory,
            idStatus,
            image
        }
        productModel.updateProduct(id, data)
        .then(result => {
            const updateProduct = result;
            console.log(result);
            res.json(updateProduct);
        })
        .catch(err => {
            console.log(err);
        })
    },
    deleteProduct : (req, res) => {
        const id = req.params.id;
        productModel.deleteProduct(id)
        .then(result => {
            deletedProduct = result;
            res.json(deletedProduct);
        })
        .catch(err => {
            console.log(err);
        })
    }
}



module.exports = products