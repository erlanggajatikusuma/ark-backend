// CONNECT DATABASE

const connection = require('../config/db');

const history = {
    getHistories : () => {
        return new Promise((resolve, reject) => {
            const sql = ("SELECT * FROM history");
            connection.query(sql, (err, result) => {
                if(!err) {
                    resolve(result);
                } else {
                    reject(new Error(err));
                }
            })
        })
    },
    insertHistory : (data) => {
        return new Promise((resolve, reject) => {
            connection.query("INSERT INTO history SET ?", data, (err, result) => {
                if(!err) {
                    resolve(result);
                } else {
                    reject(new Error(err));
                }
            })
        })
    }
}

module.exports = history;