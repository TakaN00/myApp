const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
    serial: {
        type: String
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'user', 
        required: true,
    },
    products: [{
        productId : {},
        quantity: Number,
    }],
    amount: {
        type: Number,
        required: true,
    },
    gouvernorat: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        default: 'pending',
    },
},
    {timestamp: true}
)

module.exports = mongoose.model('order', orderSchema)