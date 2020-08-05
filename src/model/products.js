// model = return data
// Berhubungan dengan database (query) CRUD;

// connect to database
const connection = require('../config/db');



const products = {
    getAllProduct : () => {
        return new Promise ((resolve, reject) => {
            connection.query("SELECT * FROM product", (err, result) => {
                if(!err) {
                    resolve(result);
                } else {
                    reject(new Error(err));
                }
            })
        })
    },
    getProductById : (id) => {
        return new  Promise((resolve, reject) => {
            connection.query("SELECT * FROM product WHERE id = ?", id, (err, result) => {
                if(!err) {
                    resolve(result);
                } else {
                    reject(new Error(err));
                }
            })
        })
    }
}


module.exports = products;