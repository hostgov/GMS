const express = require("express")
const router = express.Router()


router.get('/', function(req, res, next) {
    res.send('welcome');
});

router.use('/auth', require("./authRoute"))

router.use('/api', require("./apiRoute"))


module.exports = router
