const productModel = require("../models/productModel")

const BaseDao = require("./BaseDao")

class ProductDao extends BaseDao{
    constructor() {
        super(productModel);
    }
}

module.exports = ProductDao
