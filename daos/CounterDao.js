const counterModel = require("../models/counterModel")

const BaseDao = require("./BaseDao")

class CounterDao extends BaseDao{
    constructor() {
        super(counterModel);
    }
    getNewSeq(columnName) {
        return new Promise((resolve, reject) => {
            this.Model.findOneAndUpdate(
                {seqName: columnName},
                {$inc: {seq: 1}},
                {new: true},
                (err, result) => {
                    if (err) {
                        console.log('getNewSeq error --> ', err)
                        reject(err)
                    } else {
                        if (!result) {
                            reject('failed to get correct seq')
                        } else {
                            console.log('getNewSeq result --> ', result)
                            resolve(result.seq)
                        }
                    }
                }
            )
        })
    }
}

module.exports = CounterDao
