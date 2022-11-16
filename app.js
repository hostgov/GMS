require("./config/conn_mongo")
const bodyParser = require("body-parser")

const express = require("express")
const router = require("./routes/index")
const app = express()
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

const port = 9030

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'content-type,token,id');
    res.header("Access-Control-Request-Headers", "content-Type, Authorization");
    res.header('Access-Control-Allow-Credentials','true');
    next();
})

app.use('/', router)
app.listen(port, (err) => {
    if (!err) {
        console.log('server operating on port : ' + port)
    }
})


