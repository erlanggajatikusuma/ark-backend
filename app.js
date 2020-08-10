// Dont forget to open xampp

require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')

// Connect ROUTER
// const productRoute = require('./src/routes/product')
// const categoryRoute = require('./src/routes/category')
const routers = require('./src/routes/routers')

// use module

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())
app.use(morgan('dev'))

// USE ROUTER
// app.use('/product', productRoute);
// app.use('/category', categoryRoute);
app.use('/api/v1', routers)

// Error handling middleware
// Work
app.use((req, res, next) => {
  const error = new Error('Not Found!')
  error.status = 404
  next(error)
})

app.use((error, req, res, next) => {
  res.status(error.status || 500)
  res.json({
    error: {
      message: error.message
    }
  })
})

const port = 3000
app.listen(port, () => { console.log(`server is running on ${port}`) })
