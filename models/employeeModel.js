const mongoose = require("mongoose")
const {Schema} = mongoose

const employeeSchema = new Schema({
    emp_id: {
        type: Number,
        required: true
    },
    username: {
        type: String,
        trim: true,
        required: true
    },
    password: {
        type: String,
        trim: true,
        required: true
    },
    role: {
        type: [String],
        default: ["employee"]
    }
})

const EmployeeModel = mongoose.model("Employees", employeeSchema)

module.exports = EmployeeModel
