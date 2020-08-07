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
    }
}

module.exports = history;