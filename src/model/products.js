// model = return data
// Berhubungan dengan database (query) CRUD;
// Membuat fungsi

// connect to database
const connection = require('../config/db')

const products = {
  countProduct: () => {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT COUNT(*) AS totalItem FROM product'
      connection.query(sql, (err, result) => {
        if(!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })

    })
  },
  getAllProduct: (page, limit) => {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM product LIMIT ${limit} OFFSET ${(page - 1) * limit}`
      const sql2 = `SELECT product.*, category.category FROM product INNER JOIN category on product.idCategory LIMIT ${limit} OFFSET ${(page - 1) * limit}`
      connection.query(sql2, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  getProductById: (id) => {
    return new Promise((resolve, reject) => {
      const sql2 = 'SELECT product.*, category.category FROM product INNER JOIN category ON product.idCategory = category.id WHERE product.id = ?'
      connection.query(sql2, id, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  insertNewProduct: (data) => {
    console.log(data)
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO product SET ?', data, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  updateProduct: (id, data) => {
    return new Promise((resolve, reject) => {
      connection.query('UPDATE product SET ? WHERE id = ?', [data, id], (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  deleteProduct: (id) => {
    return new Promise((resolve, reject) => {
      connection.query('DELETE FROM product WHERE id = ?', id, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  searchProductName: (name) => {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM product WHERE name LIKE ?'
      const sql2 = 'SELECT product.*, category.category FROM product INNER JOIN category on product.idCategory WHERE name LIKE ?'
      connection.query(sql2, `%${name}%`, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  sortProduct: (sort) => {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM product ORDER BY ?? ASC'
      // const sql2 = 'SELECT product.*, category.category FROM product INNER JOIN category on product.idCategory ORDER BY ?? ASC'
      connection.query(sql, sort, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  }
}

module.exports = products
