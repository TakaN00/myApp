const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username: {
        type: String, 
        required: true,
    },
    email : {
        type: String, 
        required: true,
        unique: true,
    },
    password : {
        type: String, 
        required: true,
    },
    role : {
        type: String, 
        enum:['admin','customer'],
        default:'customer',
    },
    subdate : {
        type: String, 
    },
})

module.exports = mongoose.model('user', userSchema)