const express = require('express')
const {register, login} = require('../controller/users')

const router = express.Router()

// route endpoints
router
  .post('/register', register)
  .post('/login', login)

module.exports = router
