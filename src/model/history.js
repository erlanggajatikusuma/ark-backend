// CONNECT DATABASE

const connection = require('../config/db')

const history = {
  countHistory: () => {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT COUNT(*) AS totalItem FROM history'
      connection.query(sql, (err, result) => {
        if(!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })

    })
  },
  getHistories: (page, limit) => {
    return new Promise((resolve, reject) => {
      const sql = `SELECT id, cashier, invoice, DATE_FORMAT(date, "%e %M %Y") as date, orders, amount FROM history LIMIT ${limit} OFFSET ${(page - 1) * limit}`
      connection.query(sql, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  getHistoryById: (id) => {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT id, cashier, invoice, DATE_FORMAT(date, "%e %M %Y") as date, orders, amount FROM history WHERE id = ?'
      connection.query(sql, id, (err, result) => {
        if(!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  insertHistory: (data) => {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO history SET ?', data, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  updateHistory: (id, data) => {
    return new Promise((resolve, reject) => {
      const sql = ('UPDATE history SET ? WHERE id = ?')
      connection.query(sql, [data, id], (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  deleteHistory: (id) => {
    return new Promise((resolve, reject) => {
      const sql = ('DELETE FROM history WHERE id = ?')
      connection.query(sql, id, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  }
}

module.exports = history
