

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
    }
}


module.exports = categories;