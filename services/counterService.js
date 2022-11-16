const CounterDao = require("../daos/CounterDao")
const counterDao = new CounterDao()


getNewSeqForField = async (columnName) => {
    return await counterDao.getNewSeq(columnName)
}

module.exports = {
    getNewSeqForField
}
