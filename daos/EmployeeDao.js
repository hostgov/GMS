const employeeModel = require("../models/employeeModel")

const BaseDao = require("./BaseDao")

class EmployeeDao extends BaseDao{
    constructor() {
        super(employeeModel);
    }
}

module.exports = EmployeeDao
