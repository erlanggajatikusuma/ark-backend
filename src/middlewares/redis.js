const redis = require('redis')
const client = redis.createClient(process.env.REDIS_PORT)
const helper = require('../response/res')

module.exports = {
    cache: (req, res, next) => {
        client.get('allproducts', (err, data) => {
            if(err) throw err
            const dataArr = JSON.parse(data)
            if(data !== null) {
                helper.response(res, dataArr, 200, helper.status.found, dataArr[0])
            } else {
                next()
            }
        })
    },
    cacheProductId: (req, res, next) => {
        client.get('product', (err, data) => {
            if(err) throw err
            if(data !== null) {
                helper.response(res, JSON.parse(data), 200, 'OK', null)
            } else {
                next()
            }
        })
    },
    clearCache: (req, res, next) => {
        client.del('allproducts')
        next()
    }
}