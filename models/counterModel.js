const mongoose = require("mongoose")
const {Schema} = mongoose

const counterSchema = new Schema({
    seqName: {
        type: String,
        unique: true,
        required: true
    },
    seq: {
        type: Number
    }
})

const CounterModel = mongoose.model("Counters", counterSchema)

module.exports = CounterModel
