const bcrypt = require("bcrypt")



exports.generatePassword = (plantPassword) => bcrypt.hashSync(plantPassword, parseInt(bcrypt.genSalt(10)))

exports.comparePassword = (plantPassword, cryptPassword) => bcrypt.compareSync(plantPassword, cryptPassword)
