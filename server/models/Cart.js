const mongoose = require("mongoose")

const CartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        reqiured: true
    },
    items: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            reqiured: true
        },
        quantity: {
            type: Number,
            reqiured: true,
            min: 1
        }
    }]
}, {timestamps: true})

module.exports = mongoose.model('Cart', CartSchema)