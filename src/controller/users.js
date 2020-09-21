const bcrypt = require('bcryptjs');
const modelUser = require('../model/users')
const helper = require('../response/res')
const jwt = require('jsonwebtoken')

module.exports = {
    register: (req, res) => {
        const {firstName, lastName, email, password} = req.body;    
        const checkEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
        if (!checkEmail) {
            return helper.response(res, [], 400, ['Invalid Email'])
        } else if (password.length < 6) {
            return helper.response(res, [], 400, ['Password min 6 characters'] )
        } else {
            modelUser.emailExist(email)
                .then(result => {
                    if(result[0].emailRegistered > 0) return helper.response(res, [], 409, ['email already registered'])
                    const data = {
                        firstName,
                        lastName,
                        email,
                        password,
                        roleId: 2
                    }
                    bcrypt.genSalt(10, function(err, salt) {
                        bcrypt.hash(data.password, salt, function(err, hash) {
                            data.password = hash;
                            modelUser.register(data)
                                .then(result => {
                                    const resultData = result;
                                    helper.response(res, resultData, 201, helper.status.insert)
                                })
                                .catch(err => {
                                    console.log(err)
                                })
                        });
                    });
                })
                .catch(err => {
                    console.log(err)
                })
        }
    },
    login: (req, res) => {
        const {email, password} = req.body;
        modelUser.getUserEmail(email)
            .then(result => {
                if(result.length < 1) return helper.response(res, {message: 'User does not exist !!!'}, 404, null)

                const user = result[0]
                console.log(user)
                const hash = user.password
                bcrypt.compare(password, hash)
                    .then((output) => {
                        if(!output) return helper.response(res, {message: 'Wrong Password !!!'}, 401, 'wrong password')
                        
                        // JWT
                        const payload = {
                            id : user.id,
                            email: user.email,
                            roleId: user.roleId
                        }
                        jwt.sign(payload, process.env.KEY_TOKEN, { expiresIn: '1h' }, (err, token) => {
                            user.token = token
                            
                            delete user.password
                            delete user.createdAt
                            delete user.updatedAt
                            helper.response(res, user, 200, null)
                        });
                    });
            })
            .catch(err => {
                console.log(err)
            })
    },
    getAllUser: (req, res) => {
        modelUser.getAllUser()
            .then(result => {
                console.log(result)
                return helper.response(res, result, res.statusCode, helper.status.found)
            })
            .catch(err => {
                console.log(err)
            })
    },
    updateUser: (req, res) => {
        const id = req.params.id
        const { firstName, lastName, roleId, email } = req.body
        const data = {
            firstName,
            lastName,
            roleId,
            email
        }
        modelUser.updateUser(id, data)
            .then(result => {
                console.log(result)
                if (result.affectedRows === 0) {
                return helper.response(res, null, 404, 'Id Not Found')
            }
            helper.response(res, result, res.statusCode, helper.status.update)
            })
            .catch(err => {
                console.log(err)
            })
    },
    deleteUser: (req, res) => {
        const id = req.params.id;
        modelUser.deleteUser(id)
            .then(result => {
                console.log(result)
                if (result.affectedRows === 0) {
                    return helper.response(res, null, 404, 'Id Not Found')
                }
                helper.response(res, result, res.statusCode, helper.status.delete)
            })
    },
    getUserById: (req, res) => {
        const id = req.params.id;
        modelUser.getUserById(id)
            .then(result => {
                console.log(result)
                const byId = result
                if (byId.length === 0) {
                    return helper.response(res, byId, 404, 'User not Found')
                }
                helper.response(res, byId, res.statusCode, helper.status.found)
            })
    }
}