// CONNECT TO MODEL
const historyModel = require('../model/history')
const helper = require('../response/res')

const history = {
  getHistories: (req, res) => {
    historyModel.getHistories()
      .then(result => {
        const output = result
        helper.response(res, output, res.statusCode, helper.status.found )
      })
      .catch(err => {
        console.log(err)
      })
  },
  insertHistory: (req, res) => {
    const { cashier, invoice, orders, amount } = req.body
    const data = {
      cashier,
      invoice,
      orders,
      amount
    }
    historyModel.insertHistory(data)
      .then(result => {
        const inserted = result
        helper.response(res, inserted, res.statusCode, helper.status.insert)
        console.log(result)
      })
      .catch(err => {
        console.log(err)
      })
  },
  updateHistory: (req, res) => {
    const id = req.params.id
    const { cashier, invoice, orders, amount } = req.body
    const data = {
      cashier,
      invoice,
      orders,
      amount
    }
    historyModel.updateHistory(id, data)
      .then(result => {
        const updated = result
        console.log(updated)
        if (updated.affectedRows === 0) {
          helper.response(res, null, 404, 'Id Not Found')
        }
        helper.response(res, updated, res.statusCode, helper.status.update)
      })
      .catch(err => {
        console.log(err)
      })
  },
  deleteHistory: (req, res) => {
    const id = req.params.id
    historyModel.deleteHistory(id)
      .then(result => {
        const deleted = result
        console.log(deleted)
        if (deleted.affectedRows === 0) {
          helper.response(res, null, 404, 'Id Not Found')
        }
        helper.response(res, deleted, res.statusCode, helper.status.delete)
      })
      .catch(err => {
        console.log(err)
      })
  }
}

module.exports = history
