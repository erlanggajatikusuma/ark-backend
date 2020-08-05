const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'arkcafe'
})

connection.connect( (err) => {
    if(err) throw err;
    console.log('===== Mysql Connected =====');
})

module.exports = connection;