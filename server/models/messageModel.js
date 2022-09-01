const mongoose = require('mongoose')

const messageSchema = mongoose.Schema({
    name: {
        type: String, 
        required: true,
    },
    email : {
        type: String, 
        required: true,
    },
    subject : {
        type: String, 
        required: true,
    },
    message : {
        type: String, 
        required: true,
    },
    date : {
        type: String, 
        required: true,
    },
    consulted : {
        type: Boolean,
        default: false, 
    },
    important : {
        type: Boolean,
        default: false, 
    }
})

module.exports = mongoose.model('message', messageSchema)