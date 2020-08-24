const jwt = require('jsonwebtoken')
const helper = require('../response/res')

module.exports = {
    verifyAccess: (req, res, next) => {
        let token = req.headers.authorization
        token = token.split(" ")[1]

        jwt.verify(token, process.env.KEY_TOKEN, function(err, decoded) {
            if(err) return helper.response(res,{message: 'token invalid'}, 403, null)
            req.userId = decoded.id
            req.roleId = decoded.roleId
            next()
          });
    },
    isAdmin: (req, res, next) => {
        if(req.roleId === 1) {
            next()
            return
        }
        return helper.response(res,[], 403, 'Only admin can access')
    }
}