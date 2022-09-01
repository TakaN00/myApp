const mongoose = require('mongoose')

const cartSchema = mongoose.Schema({
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'user', 
        required: true,
    },
    products: [
        {
            productId: {
                type : mongoose.Types.ObjectId,
                ref: 'product',
                required: true,
            },
            quantity: {
                type : Number,
                default : 1,
            }
        },
    ]
})

module.exports = mongoose.model('cart', cartSchema)