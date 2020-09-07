const productModel = require('../model/products')
module.exports = {
    products: async (req, res, next) => {
        parseInt
        const page = parseInt(req.query.page) || 1;
        const limit = req.query.limit || 9;
        const resultProducts = await productModel.countProduct()
        const totalData = resultProducts[0].totalItem
        const totalPage = Math.ceil(totalData/limit)
        const pagination = {
            totalData,
            totalPage,
            perPage: limit,
            currentPage: page
        }
        req.pagination = pagination
        next();
    }
}