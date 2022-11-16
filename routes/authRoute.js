const express = require("express")
const router = express.Router()
const authService = require("../services/authService")

router.post('/signin',authService.signIn)


module.exports = router

