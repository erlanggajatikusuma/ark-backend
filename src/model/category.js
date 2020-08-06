

// CONNECT DATABASE
const connection = require('../config/db');

const categories = {
    getCategories: () => {
        return new Promise((resolve, reject) => {
            connection.query("SELECT * FROM category", (err, result) => {
                if(!err) {
                    resolve(result);
                } else {
                    reject(new Error(err));
                }
            })
        })
    },
    insertCategory : (data) => {
        console.log(data);
        return new Promise((resolve, reject) => {
            connection.query("INSERT INTO category SET ?", data, (err, result) => {
                if(!err) {
                    resolve(result);
                } else {
                    reject(new Error(err));
                }
            })
        })
    },
    updateCategory : (id, data) => {
        console.log(data);
        return new Promise((resolve, reject) => {
            connection.query("UPDATE category SET ? WHERE id = ?", [data, id], (err, result) => {
                if(!err) {
                    resolve(result);
                } else {
                    reject(new Error(err));
                }
            })
        })
    }
}


module.exports = categories;