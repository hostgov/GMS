const orderModel = require("../models/orderModel")

const BaseDao = require("./BaseDao")

class OrderDao extends BaseDao{
    constructor() {
        super(orderModel);
    }


}

module.exports = OrderDao
