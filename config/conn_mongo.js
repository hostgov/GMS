const mongoose = require("mongoose")
const url = "mongodb+srv://hostgov:laizi8171@cluster0.hdoarat.mongodb.net/GMS"
mongoose.connect(url).then(
    () => {
        console.log("connect database successfully")
    },
    error => {
        console.log("connect failed " + error)
    }
).catch(error => {
    console.log("connect failed " + error)
})

