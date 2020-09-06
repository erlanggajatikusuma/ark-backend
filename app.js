// Dont forget to open xampp

require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')

// Connect ROUTER
const routers = require('./src/routes/routers')

// use module

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())
app.use(morgan('dev'))

// USE ROUTER
app.use('/api/v1', routers)

// Error handling middleware  (PR)
// Work
// app.use((req, res, next) => {
//   const error = new Error('Not Found!')
//   error.status = 404
//   next(error)
// })

app.use((error, req, res, next) => {
  res.status(error.status || 500)
  res.json({
    error: {
      message: error.message
    }
  })
})

// Static
app.use('/uploads', express.static('./uploads'))

// const port = 3000
app.listen(process.env.PORT, () => { console.log(`server is running`) })
