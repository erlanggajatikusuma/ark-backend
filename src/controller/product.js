// controller = req and res to develop, logic pengolahan data
// menampilkan fungsi callback endpoint di route
// fungi controller diambil dari model

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
    }
}

module.exports = products;