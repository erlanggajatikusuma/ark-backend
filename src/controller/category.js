
// CONNECT TO MODEL
const categoryModel = require('../model/category');


const categories = {
    getCategories : (req, res) => {
        categoryModel.getCategories()
        .then(result => {
            // resultCategories = result;
            res.json(result);
        })
        .catch(err => {
            console.log(err);
        })
    }
}

module.exports = categories;