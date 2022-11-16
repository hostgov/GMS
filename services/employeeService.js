const EmployeeDao = require("../daos/EmployeeDao")
const employeeDao = new EmployeeDao()
const counterService = require("../services/counterService")
const bcrypt = require("../tools/bcrypt")

getOneEmployeeByUsername = (req, res, next) => {
    const condition = {username: req.params.username}
    getEmployeeByCondition(condition).then(data => {
        res.json({
            code: 0,
            msg: 'OK',
            data: data
        })
    }).catch(error => {
        res.json({
            code: 1,
            msg: "error",
            data: error
        })
    })
}

getOneEmployeeByEmpId = (req, res, next) => {
    const condition = {emp_id: req.params.emp_id}
    getEmployeeByCondition(condition).then(data => {
        res.json({
            code: 0,
            msg: 'OK',
            data: data
        })
    }).catch(error => {
        res.json({
            code: 1,
            msg: "error",
            data: error
        })
    })
}

getAllEmployeesByNothing = (req, res, next) => {
    getAllEmployees().then(data => {
        res.json({
            code: 0,
            msg: 'OK',
            data: data
        })
    }).catch(error => {
        res.json({
            code: 1,
            msg: "error",
            data: error
        })
    })
}

updateOneEmployeeByEmployeeId = (req, res, next) => {
    const emp_id = req.body.emp_id
    if (!emp_id) {
        res.json({
            code: 2,
            msg: 'missing employee id'
        })
    }

    let password = req.body.password
    if (!password) {
        res.json({
            code: 2,
            msg: 'nothing will be change'
        })
    }
    const updater = {}

    password = bcrypt.generatePassword(password)
    updater.password = password


    const condition = {
        emp_id
    }
    findOneEmployeeAndUpdate(condition, updater).then(result => {
        res.json({
            code: 0,
            msg: 'OK'
        })
    }).catch(error => {
        res.json({
            code: 2,
            msg: 'findOneEmployeeAndUpdate error',
            data: error
        })
    })
}

checkAllFieldsValid = (req, res, next) => {
    const {username, password} = req.body
    if (!username || !password) {
        res.json({
            code: 1,
            msg: "do not have enough information for the employee you want to create"
        })
    } else {
        next()
    }
}

hasUsernameBeenTaken = (req, res, next) => {
    const username = req.body.username
    const conditionUsername = {username}
    getOneEmployee(conditionUsername).then(data => {
        if (data) {
            res.json({
                code: 2,
                msg: 'username already exist'
            })
        } else {
            next()
        }
    }).catch(error => {
        res.json({
            code: 1,
            msg: 'getOneEmployee error',
            data: error
        })
    })
}

getNewEmployeeSeq = (req, res, next) => {
    counterService.getNewSeqForField('emp_id_seq').then(result => {
        req.mydata = result
        next()
    }).catch(error => {
        res.json({
            code: 1,
            msg: 'getNewSeq error',
            data: error
        })
    })
}

createNewEmployee = (req, res, next) => {
    const employee = {
        emp_id: req.mydata,
        username: req.body.username,
        password: bcrypt.generatePassword(req.body.password)
    }
    createOneEmployee(employee).then(result => {
        res.json({
            code: 0,
            msg: 'OK',
            data: result
        })
    }).catch(error => {
        res.json({
            code: 1,
            msg: 'createOneEmployee error',
            data: error
        })
    })
}

deleteOneEmployeeByEmployeeId = (req, res, next) => {
    const emp_id = req.body.emp_id
    if (!emp_id) {
        res.json({
            code: 2,
            msg: 'missing employee id'
        })
    }
    const condition = {
        emp_id
    }
    deleteEmployee(condition).then(() => {
        res.json({
            code: 0,
            msg: 'OK'
        })
    }).catch(error => {
        res.json({
            code: 1,
            msg: 'error',
            data: error
        })
    })
}


getAllEmployees = async (condition, constraints) => {
    try {
        return await employeeDao.findAll(condition, constraints)
    } catch (error) {
        console.log('getAllEmployees error')
        return error
    }
}
getOneEmployee = async (condition, constraints) => {
    try {
        return await employeeDao.findOne(condition, constraints)
    } catch (error) {
        console.log('getOneEmployee error')
        return error
    }
}
getOneEmployeeLean = async (condition, constraints) => {
    try {
        return await employeeDao.findOne(condition, constraints).lean()
    } catch (error) {
        console.log('getOneEmployee error')
        return error
    }
}
saveOneEmployee = async (employee) => {
    try {
        return await employeeDao.save(employee)
    } catch (error) {
        console.log('saveOneEmployee error')
        return error
    }
}
getEmployeeByCondition = async (condition) => {
    try {
        return await employeeDao.findAll(condition)
    } catch (error) {
        console.log('getEmployeeByCondition error')
        return error
    }
}
updateEmployeeByCondition = async (condition, updater) => {
    try {
        return await employeeDao.update(condition, updater)
    } catch (error) {
        console.log('updateEmployeeByCondition error')
        return error
    }
}
createOneEmployee = async (employee) => {
    try {
        return await employeeDao.create(employee)
    } catch (error) {
        console.log('createOneEmployee error')
        return error
    }
}
deleteEmployee = async (condition) => {
    try {
        return await employeeDao.remove(condition)
    } catch (error) {
        console.log('deleteEmployee error')
        return error
    }
}
findOneEmployeeAndUpdate = async (condition, updater) => {
    return await employeeDao.findOneAndModify(condition, updater)
}


module.exports = {
    getOneEmployeeByUsername,
    getOneEmployeeByEmpId,
    getAllEmployeesByNothing,
    updateOneEmployeeByEmployeeId,
    checkAllFieldsValid,
    hasUsernameBeenTaken,
    getNewEmployeeSeq,
    createNewEmployee,
    deleteOneEmployeeByEmployeeId
}
