const mongoose = require("mongoose")
const {Schema} = mongoose

const orderSchema = new Schema({
    order_number: {
        type: Number,
        required: true
    },
    order_date: Date,
    customer_number: {
        type: Number,
        required: true,
        default: new Date()
    },
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
    },
    total_price: Number,
    payment_mode: {
        type: String,
        trim: true,
        default: "Cash"
    }
})
const OrderModel = mongoose.model("Order", orderSchema)

module.exports = OrderModel
