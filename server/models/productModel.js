const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    title: {
        type: String, 
        required: true,
    },
    desc : {
        type: String, 
        required: true,
    },
    img : {
        type: String, 
        required: true,
    },
    category : {
        type: String,  
        required: true,
    },
    subcategory : {
        type: String, 
    },
    size : {
        type: String, 
    },
    price : {
        type: Number, 
        required: true,
    },
    discount : {
        type: Number,
        default: 0,
    },
    onStock : {
        type: Boolean,
        default: true, 
    },
    featured : {
        type: Boolean,
        default: false, 
    }
})

module.exports = mongoose.model('product', productSchema)