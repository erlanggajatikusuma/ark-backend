// Caller
// Dont forget to open xampp
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// Connect route
const productRoute = require('./src/routes/product')




// use module

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Route
app.use('/product', productRoute);



const port = 3000;
app.listen(port, () => {console.log(`server is running on ${port}`)});