// CONNECT DATABASE

const connection = require('../config/db')

const history = {
  getHistories: () => {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM history'
      const sql2 = 'SELECT id, cashier, invoice, DATE_FORMAT(date, "%e %M %Y") as date, orders, amount FROM history'
      connection.query(sql2, (err, result) => {
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
      const sql = 'SELECT * FROM history WHERE id = ?'
      const sql2 = 'SELECT id, cashier, invoice, DATE_FORMAT(date, "%e %M %Y") as date, orders, amount FROM history WHERE id = ?'
      connection.query(sql2, id, (err, result) => {
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
