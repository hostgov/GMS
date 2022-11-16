const roleModel = require("../models/roleModel")

const BaseDao = require("./BaseDao")

class RoleDao extends BaseDao{
    constructor() {
        super(roleModel);
    }


}

module.exports = RoleDao
