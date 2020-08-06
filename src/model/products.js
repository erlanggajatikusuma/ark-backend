// model = return data
// Berhubungan dengan database (query) CRUD;
// Membuat fungsi

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
    },
    insertNewProduct : (data) => {
        console.log(data);
        return new Promise((resolve, reject) => {
            connection.query("INSERT INTO product SET ?", data, (err, result) => {
                if(!err) {
                    resolve(result);
                } else {
                    reject(new Error(err));
                }
            })
        })
    },
    updateProduct : (id, data) => {
        return new Promise((resolve, reject) => {
            connection.query("UPDATE product SET ? WHERE id = ?", [data, id], (err, result) => {
                if(!err) {
                    resolve(result);
                } else {
                    reject(new Error(err));
                }
            } )
        })
    },
    deleteProduct : (id) => {
        return new Promise((resolve, reject) => {
            connection.query("DELETE FROM product WHERE id = ?", id, (err, result) => {
                if(!err) {
                    resolve(result);
                } else {
                    reject(new Error(err));
                }
            })
        })
    }
    // searchByName : (name) => {
    //     return new Promise((resolve, reject) => {
    //         connection.query("SELECT * FROM product WHERE name = ?", name, (err, result) => {
    //             if(!err) {
    //                 resolve(result);
    //             } else {
    //                 reject(new Error(err));
    //             }
    //         })
    //     })
    // }
}


module.exports = products;