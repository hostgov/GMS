const mongoose = require("mongoose")
const {Schema} = mongoose

const productSchema = new Schema({
    product_code: {
        type: Number,
        required: true
    },
    product_name: {
        type: String,
        trim: true,
        required: true
    },
    product_quantity: {
        type: Number,
        required: true
    },
    product_price: {
        type: Number,
        required: true
    }
})
const ProductModel = mongoose.model("Products", productSchema)

module.exports = ProductModel
