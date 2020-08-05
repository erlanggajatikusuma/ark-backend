// controller = req and res to develop, logic pengolahan data
// menampilkan fungsi callback endpoint di route
// fungi controller diambil dari model
// pemanggilan fungsi

// connect to model
const productModel = require('../model/products');

const products = {
    getAllProduct : (req, res) => {
        productModel.getAllProduct()
        .then(result => {
            resultProduct = result;
            res.json(resultProduct);
        })
        .catch(err => {
            console.log(err);
        })
    },
    getProductById: (req, res) => {
        const id = req.params.id;
        productModel.getProductById(id)
        .then(result => {
            resultProduct = result;
            res.json(resultProduct);
        })
        .catch(err => {
            console.log(err);
        })
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
    }
}

module.exports = products;