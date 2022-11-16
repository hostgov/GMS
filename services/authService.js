const jwt = require("jsonwebtoken")
const config = require("../config/auth.config")
const EmployeeService = require("./employeeService")
const employeeService = new EmployeeService()
const RoleService = require("./roleService")
const roleService = new RoleService()


//signIn
signIn = (req, res) => {
    employeeService.getOneEmployee({username: req.body.username}).then(user => {
        if (!user) {
            return res.json({
                code: 404,
                msg: 'User not found'
            })
        }
        const passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        )
        if (!passwordIsValid) {
            return res.json({
                code: 401,
                msg: 'invalid username and password combination',
                data: null
            })
        }
        const token = generateToken(user.emp_id)
        res.json({
            code: 0,
            msg: 'OK',
            data: {
                user: user,
                token: token
            }
        })
    }).catch(error => {
        res.json({
            code: 500,
            msg: "signIn error",
            data: error
        })
    })
}


//generate token

generateToken = function (userId) {
    return "GMS " + jwt.sign({id: userId}, config.secretKey, {
        expiresIn: 60 * 60 * 24,
    })
}

//verifyToken
verifyToken = function (req, res, next) {
    if (!req.headers.authorization) {
        return res.json({
            code: 403,
            msg: 'No token provided!'
        })
    }
    const token = req.headers.authorization.split(" ")[1]
    jwt.verify(token, config.secretKey, function (err, decoded) {
        if (err) {
            console.log("verify error", err)
            return res.json({
                code: "401",
                msg: "invalid token"
            })
        }
        console.log("verify decoded", decoded)
        req.userId = decoded.id
        next()
    })
}
//
getUserActionsByRoles = function (user) {
    const role = user.role
    const condition = {
        "role_name": {
            $in: {
                role
            }
        }
    }
    const constraints = {
        "_id": 0,
        "role_id": 0,
        "role_name": 0
    }
    roleService.getAllRoles(condition, constraints).then(result => {
        if (result !== null && result.length > 0) {

        }
    })
    let actionOfUserRoles = []

}

getUserRole = function (req, res, next) {

    if (!req.userId) {
        return res.json({
            code: 401,
            msg: 'can not find userId, please login'
        })
    }
    const userId = req.userId
    employeeService.getOneEmployeeLean({emp_id: userId}).then(
        user => {
            if (!user) {
                return res.json({
                    code: 401,
                    msg: 'can not find user by userId:' + userId
                })
            }
            if (!user.role) {
                return res.json({
                    code: 401,
                    msg: 'can not obtain user role'
                })
            } else if (user.role === "employee") {
                return res.json({
                    code: 402,
                    msg: 'Insufficient permissions for employee role'
                })
            } else if (user.role === "admin") {
                req.role = "admin"
                next()
            } else if (user.role === "storeManager") {
                req.role = "storeManager"
                next()
            } else if (user.role === "billingEmployee") {
                req.role = "billingEmployee"
                next()
            } else {
                return res.json({
                    code: 402,
                    msg: 'do not have the certain role'
                })
            }
        }
    )
}

module.exports = {
    signIn,
    generateToken,
    verifyToken
}
