// CONNECT CONTROLLER
const express = require('express')
const controllerHistory = require('../controller/history')

const router3 = express.Router()

// route endpoints

router3
  .get('/', controllerHistory.getHistories)
  .get('/:id', controllerHistory.getHistoryById)
  .post('/', controllerHistory.insertHistory)
  .patch('/:id', controllerHistory.updateHistory)
  .delete('/:id', controllerHistory.deleteHistory)

module.exports = router3
