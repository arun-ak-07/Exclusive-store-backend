const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
    items: [
        {
            productId: {type: mongoose.Schema.Types.ObjectId, ref:'Product'},
            name: String,
            image: String,
            price: String,
            quantity: Number
        }
    ]
})

const Cart = mongoose.model('Cart', cartSchema)

module.exports = Cart
