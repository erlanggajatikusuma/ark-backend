const bcrypt = require('bcryptjs');
const modelUser = require('../model/users')
const helper = require('../response/res')
const jwt = require('jsonwebtoken')

module.exports = {
    // register: (req, res) => {
    //     const {firstName, lastName, email, password} = req.body;
    //     const data = {
    //         firstName,
    //         lastName,
    //         email,
    //         password,
    //         roleId: 2
    //     }
    //     bcrypt.genSalt(10, function(err, salt) {
    //         bcrypt.hash(data.password, salt, function(err, hash) {
    //             data.password = hash;
    //             modelUser.register(data)
    //                 .then(result => {
    //                     const resultData = result;
    //                     helper.response(res, resultData, 201, helper.status.insert)
    //                 })
    //                 .catch(err => {
    //                     console.log(err)
    //                 })
    //         });
    //     });
    // },
    register: (req, res) => {
        const {firstName, lastName, email, password} = req.body;
        modelUser.emailExist(email)
            .then(result => {
                // console.log(result[0].emailRegistered)
                if(result[0].emailRegistered > 0) return helper.response(res,{message: 'email already registered'}, 409, null)
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
    },
    login: (req, res) => {
        const {email, password} = req.body;
        modelUser.getUserEmail(email)
            .then(result => {
                if(result.length < 1) return helper.response(res, {message: 'Email not Found !!!'}, 404, null)

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
    }
}