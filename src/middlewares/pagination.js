const productModel = require('../model/products')
const historyModel = require('../model/history')
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
            currentPage: page,
            prevPage: page > 1 ? `http://localhost:${process.env.PORT}/api/v1/product?page=${page-1}${req.query.limit?'&limit='+limit:''}`: null,
            nextPage:  page <  totalPage ?`http://localhost:${process.env.PORT}/api/v1/product?page=${page+1}${req.query.limit?'&limit='+limit:''}`:null
        }
        req.pagination = pagination
        next();
    },
    history: async (req, res, next) => {
        parseInt
        const page = parseInt(req.query.page) || 1;
        const limit = req.query.limit || 9;
        const resultHistory = await historyModel.countHistory();
        const totalData = resultHistory[0].totalItem;
        const totalPage = Math.ceil(totalData/limit);
        const pagination = {
            totalData,
            totalPage,
            perPage: limit,
            currentPage: page,
            prevPage: page > 1 ? `${process.env.BASE_URL}/api/v1/history?page=${page-1}${req.query.limit?'&limit='+limit:''}`: null,
            nextPage: page < totalPage ? `${process.env.BASE_URL}/api/v1/history?page=${page-1}${req.query.limit?'&limit='+limit:''}`: null,
        }
        req.pagination = pagination
        next();
    }
}