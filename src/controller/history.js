// CONNECT TO MODEL
const historyModel = require('../model/history');

const history = {
    getHistories : (req, res) => {
        historyModel.getHistories()
            .then(result => {
                obtained = result;
                res.json(obtained);
            })
            .catch(err => {
                console.log(err);
            })
    },
    insertHistory : (req, res) => {
        const {id, income, orders} = req.body;
        const data = {
            id,
            income,
            orders
        }
        historyModel.insertHistory(data)
            .then(result => {
                inserted = result;
                console.log(result);
                res.json(inserted);
            })
            .catch(err => {
                console.log(err);
            })
    },
    updateHistory : (req, res) => {
        const idi = req.params.id;
        const {id, income, orders, day} = req.body;
        const data = {
            id,
            income,
            orders,
            day
        }
        historyModel.updateHistory(idi, data)
            .then(result => {
                updated = result;
                res.json(updated);
            })
            .catch(err => {
                console.log(err);
            })
    },
    deleteHistory : (req, res) => {
        const id = req.params.id;
        historyModel.deleteHistory(id)
            .then(result => {
                deleted = result;
                res.json(deleted);
            })
            .catch(err => {
                console.log(err);
            })
    }
}

module.exports = history;