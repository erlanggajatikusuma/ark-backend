
// CONNECT TO MODEL
const categoryModel = require('../model/category')

const categories = {
  getCategories: (req, res) => {
    categoryModel.getCategories()
      .then(result => {
        // resultCategories = result;
        res.json(result)
      })
      .catch(err => {
        console.log(err)
      })
  },
  insertCategory: (req, res) => {
    const { id, category } = req.body
    const data = {
      id,
      category
    }
    categoryModel.insertCategory(data)
      .then(result => {
        const newCategory = result
        console.log(result)
        res.json(newCategory)
      })
      .catch(err => {
        console.log(err)
      })
  },
  updateCategory: (req, res) => {
    const idi = req.params.id
    const { id, category } = req.body
    const data = {
      id,
      category
    }
    categoryModel.updateCategory(idi, data)
      .then(result => {
        const updated = result
        console.log(result)
        res.json(updated)
      })
      .catch(err => {
        console.log(err)
      })
  },
  deleteCategory: (req, res) => {
    const id = req.params.id
    categoryModel.deleteCategory(id)
      .then(result => {
        const deleted = result
        res.json(deleted)
      })
      .catch(err => {
        console.log(err)
      })
  }
}

module.exports = categories
