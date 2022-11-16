const mongoose = require("mongoose")
const {Schema} = mongoose

const roleSchema = new Schema({
    role_id: {
        type: Number,
        required: true
    },
    role_name: {
        type: String,
        required: true
    },
    action: {
        type: Map,
        of: String,
        required: true,
        default: {
            "employee": "0000",
            "orders": "0000",
            "products": "0000"
        }
    }
})

const RoleModel = mongoose.model("roles", roleSchema)

module.exports = RoleModel
