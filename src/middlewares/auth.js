const jwt = require('jsonwebtoken')
const helper = require('../response/res')

module.exports = {
    verifyAccess: (req, res, next) => {
        let token = req.headers.authorization
        token = token.split(" ")[1]

        jwt.verify(token, process.env.KEY_TOKEN, function(err, decoded) {
            if(err) return helper.response(res,{message: 'token expired'}, 403, null)
            
            next()
          });
    }
}