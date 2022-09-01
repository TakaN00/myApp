const mongoose = require('mongoose')

const categorySchema = mongoose.Schema({
    title: {
        type: String, 
        required: true,
    },
    img : {
        type: String, 
        required: true,
    },
    featured : {
        type: Boolean,
        default: false, 
    }
})

module.exports = mongoose.model('category', categorySchema)