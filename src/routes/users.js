const express = require('express')
const { verifyAccess, isAdmin } = require('../middlewares/auth')
const {register, login, getAllUser, updateUser, deleteUser, getUserById} = require('../controller/users')

const router = express.Router()

// route endpoints
router
  .post('/register', register)
  .post('/login', login)
  .get('/',verifyAccess, isAdmin, getAllUser)
  .get('/:id',verifyAccess,isAdmin, getUserById)
  .patch('/:id', verifyAccess, isAdmin, updateUser)
  .delete('/:id', verifyAccess, isAdmin, deleteUser)

module.exports = router
