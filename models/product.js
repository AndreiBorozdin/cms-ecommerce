const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productsSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
       type: Number,
       required: true
    },
    category: {
        ref: 'categories',
        type: Schema.Types.ObjectId
    },
    imageSrc: {
        type: String,
        default: ''
    }
})

module.exports = mongoose.model('products', productsSchema)