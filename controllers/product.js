const Product = require('../models/product')
const errorHandler = require('../utils/errorHandler');

module.exports.getAllAdminProducts = async function(req, res) {
    try {
        const products = await Product.find({category: req.params.category, admin: req.admin})
        res.status(200).json(products)
    } catch (e) {
        errorHandler(res, e)
    }
}
module.exports.getAllProducts = async function(req, res) {
    try {
        const products = await Product.find({category: req.params.category})
        res.status(200).json(products)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.create = async function(req, res) {
    try {
        const product = await new Product({
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            admin: req.admin
        }).save()
        res.status(201).json(product)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.update = async function(req, res) {
    try {
        const product = await Product.findOneAndUpdate({_id: req.params.id}, {$set: req.body}, {new: true})
        res.status(200).json(product)
    } catch (e) {
        errorHandler(res, e)
    }
}
module.exports.delete = async function(req, res) {
    try {
        await Product.remove({_id: req.params.id})
        res.status(200).json({message: 'Продукт удален'})
    } catch (e) {
        errorHandler(res, e)
    }
}

