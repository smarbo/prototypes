const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required!"]
    },
    price: {
        type: Number,
        required: [true, "Price is required!"]
    },
    image: {
        type: String,
        required: false
    }
}, {
    timestamps: true
})

const Product = mongoose.model("Product", productSchema);

module.exports = Product;