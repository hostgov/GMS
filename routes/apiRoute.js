const express = require("express")
const router = express.Router()
const authJwt = require("../tools/authJwt")

// router.use(authJwt.verifyToken,authJwt.getUserRole)

router.get('/', (req, res) => {res.send('good api')})

router.use('/employee', require("./employeeRoute"))
router.use('/order', require("./orderRoute"))
router.use('/product', require("./productRoute"))

module.exports = router
