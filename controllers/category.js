const errorHandler = require('../utils/errorHandler');
const Category = require('../models/category');
const Product = require('../models/product');

module.exports.getAllCategories = async function (req, res) {
    try {
       const categories = await Category.find({});
       res.status(200).json(categories);
    }catch (e) {
     errorHandler(res, e);
    }
}
module.exports.getAllCategoriesAdmin = async function (req, res) {
    try {
        const categories = await Category.find({admin: req.admin});
        res.status(200).json(categories);
    }catch (e) {
        errorHandler(res, e);
    }
}
module.exports.getById = async function (req, res) {
  try {
   const category = await Category.findById(req.params.id);
      res.status(200).json(category);
  }catch (e) {
      errorHandler(res, e);
  }
}
module.exports.createCategory = async function(req, res) {
    const category = new Category({
        name: req.body.name,
        imageSrc: req.file ? req.file.path : '',
    })

    try {
        await category.save()
        res.status(201).json(category)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.updateCategory = async function (req, res) {
    const updated = {
        name: req.body.name
    }
    if (req.file) {
        updated.imageSrc = req.file.path
    }
    try {
        const category = await Category.findOneAndUpdate({_id: req.params.id}, {$set: updated}, {new: true})
        res.status(200).json(category)
    }catch (e) {
        errorHandler(res, e);
    }
}
module.exports.deleteCategory = async function (req, res) {
    try {
        await Category.remove({_id: req.params.id})
        await Product.find({category: req.params.id})
        res.status(200).json({message: 'Удалено'})
    }catch (e) {
        errorHandler(res, e);
    }
}