const connection = require('../config/db');

module.exports = {
    register: (data) => {
        return new Promise((resolve, reject) => {
            const sql = 'INSERT INTO users SET ?'
            connection.query(sql, data, (err, result) => {
                if(!err) {
                    resolve(result);
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
    getUserEmail: (email) => {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM users WHERE email = ?'
            connection.query(sql, email, (err, result) => {
                if(!err) {
                    resolve(result);
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
    // checkEmail: (email) => {
    //     return new Promise((resolve, reject) => {
    //         const sql = 'SELECT * FROM users WHERE email = ?'
    //     })
    // }
    
} 