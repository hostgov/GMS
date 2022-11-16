// const a = "1001"
// const b = "0111"
// const arra = a.split("")
// const arrb = b.split("")
// let res = []
// for (let i = 0; i < arra.length; i++) {
//     res.push(arra[i] | arrb[i])
// }

// let actions = [{"a": "1011","b":"0111","c":"0000"},{"a": "0011","b":"0011","c":"1000"}]
const actions = [
    {"action": {"a": "1011","b":"0111","c":"0000"}},
    {"action": {"a": "0011","b":"0011","c":"1001"}},
    {"action": {"a": "0111","b":"0011","c":"1001","d":"1101"}}
]

// const m = {"a": "1011","b":"0111","c":"0000"}
// const n = {"a": "0011","b":"0011","c":"1001"}
// const obj = [m, n]
let res = {}
for(let j = 0; j < actions.length; j++) {
    const obj = actions[j].action
    for (let key in obj) {
        if (res.hasOwnProperty(key)) {
            let old = res[key]
            const val = obj[key].split("")
            let nVal = []
            for (let i = 0; i < old.length; i++) {
                nVal.push((old[i] | val[i]))
            }
            res[key] = nVal
        } else {
            res[key] = obj[key].split("").map(c => {
                return parseInt(c)
            })
        }
    }
}
console.log(res)


// const res = Object.getOwnPropertyNames(m)
// const res = Object.keys(m)
// console.log(res)



