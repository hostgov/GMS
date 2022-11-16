const express = require("express")
const router = express.Router()
const employeeService = require("../services/employeeService")



//get employee by username
router.get('/user/:username', employeeService.getOneEmployeeByUsername)
//get employee by employee id
router.get('/empId/:emp_id', employeeService.getOneEmployeeByEmpId)
//get all employees
router.get('/all', employeeService.getAllEmployeesByNothing)
//update one employee (put)
router.put('/update', employeeService.updateOneEmployeeByEmployeeId)
//create one new employee
router.post('/',
    employeeService.checkAllFieldsValid,
    employeeService.hasUsernameBeenTaken,
    employeeService.getNewEmployeeSeq,
    employeeService.createNewEmployee
)

//delete one employee by employee id
router.delete('/', employeeService.deleteOneEmployeeByEmployeeId)
//update one employee by employee id (patch)
router.patch('/', employeeService.updateOneEmployeeByEmployeeId)

module.exports = router
