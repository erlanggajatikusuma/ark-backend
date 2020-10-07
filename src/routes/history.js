// CONNECT CONTROLLER
const express = require('express')
const controllerHistory = require('../controller/history')
const pagination = require('../middlewares/pagination')

const router3 = express.Router()

// route endpoints

router3
  .get('/', pagination.history, controllerHistory.getHistories)
  .get('/:id', controllerHistory.getHistoryById)
  .post('/', controllerHistory.insertHistory)
  .patch('/:id', controllerHistory.updateHistory)
  .delete('/:id', controllerHistory.deleteHistory)

module.exports = router3
