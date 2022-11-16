const OrderDao = require("../daos/OrderDao")
const orderDao = new OrderDao()


const counterService = require("./counterService")



getOneOrderByOrderNumber = (req, res, next) => {
    const order_number = req.params.order_number
    if (!order_number) {
        res.json({
            code: 1,
            msg: 'missing order Number'
        })
    }
    const condition = {order_number}
    getOneOrder(condition).then(data => {
        res.json({
            code: 0,
            msg: 'OK',
            data: data
        })
    }).catch(error => {
        res.json({
            code: 1,
            msg: 'error',
            data: error
        })
    })
}

getOneOrdersByProductCode = (req, res, next) => {
    const product_code = req.params.product_code
    if (!product_code) {
        res.json({
            code: 1,
            msg: 'missing product_code'
        })
    }
    const condition = {product_code}
    getAllOrders(condition).then(data => {
        res.json({
            code: 0,
            msg: 'OK',
            data: data
        })
    }).catch(error => {
        res.json({
            code: 1,
            msg: 'error',
            data: error
        })
    })
}

getOrdersByCustomerNumber = (req, res, next) => {
    const customer_number = req.params.customer_number
    if (!customer_number) {
        res.json({
            code: 1,
            msg: 'missing customer_Number'
        })
    }
    const condition = {customer_number}
    getAllOrders(condition).then(data => {
        res.json({
            code: 0,
            msg: 'OK',
            data: data
        })
    }).catch(error => {
        res.json({
            code: 1,
            msg: 'error',
            data: error
        })
    })
}

getAllOrdersByNothing = (req, res, next) => {
    getAllOrders().then(data => {
        res.json({
            code: 0,
            msg: 'OK',
            data: data
        })
    }).catch(error => {
        res.json({
            code: 1,
            msg: 'error',
            data: error
        })
    })
}

areAllFieldsValid = (req, res, next) => {
    const customer_number = req.body.customer_number
    const product_code = req.body.product_code
    const product_name = req.body.product_name
    const product_quantity = req.body.product_quantity
    const product_price = req.body.product_price
    const total_price = req.body.total_price
    const payment_mode = req.body.payment_mode
    if (!customer_number || !product_code || !product_name || !product_quantity || !product_price || !total_price || !payment_mode) {
        res.json({
            code: 2,
            msg: "not enough params",
            data: req.body
        })
    } else {
        req.order = {
            customer_number,
            product_code,
            product_name,
            product_quantity,
            product_price,
            total_price,
            payment_mode
        }
        next()
    }
}

getNewOrderSeq = (req, res, next) => {
    counterService.getNewSeqForField('order_number_seq').then(newOrder_number => {
        if (!newOrder_number) {
            res.json({
                code: 2,
                msg: 'failed to get new order number'
            })
        } else {
            req.order.order_number = newOrder_number
            next()
        }
    }).catch(error => {
        res.json({
            code: 2,
            msg: 'getNewSeq error',
            data: error
        })
    })
}

createOneNewOrder = (req, res, next) => {
    createOneOrder(req.order).then(
        result => {
            res.json({
                code: 0,
                msg: 'OK',
                data: result
            })
        }).catch(error => {
        res.json({
            code: 2,
            msg: 'createOneOrder error',
            data: error
        })
    })
}

updateOneOrderByOrderNumber = (req, res, next) => {
    const order_number = req.body.order_number
    if (!order_number) {
        res.json({
            code: 2,
            msg: 'missing order number',
        })
    }
    const condition = {order_number}
    const customer_number = req.body.customer_number
    const product_code = req.body.product_code
    const product_name = req.body.product_name
    const product_quantity = req.body.product_quantity
    const product_price = req.body.product_price
    const total_price = req.body.total_price
    const payment_mode = req.body.payment_mode

    const updater = {}
    if (customer_number) {
        updater.customer_number = customer_number
    }
    if (product_code) {
        updater.product_code = product_code
    }
    if (product_name) {
        updater.product_name = product_name
    }
    if (product_quantity) {
        updater.product_quantity = product_quantity
    }
    if (product_price) {
        updater.product_price = product_price
    }
    if (total_price) {
        updater.total_price = total_price
    }
    if (payment_mode) {
        updater.payment_mode = payment_mode
    }
    findOneOrderAndUpdate(condition, updater).then(() => {
        res.json({
            code: 0,
            msg: 'OK'
        })
    }).catch(error => {
        res.json({
            code: 2,
            msg: 'findOneOrderAndUpdate failed',
            data: error
        })

    })
}

deleteOneOrderByOrderNumber = (req, res, next) => {
    const order_number = req.body.order_number
    if (!order_number) {
        res.json({
            code: 2,
            msg: 'missing order number',
        })
    }
    const condition = {order_number}
    deleteOneOrder(condition).then(result => {
        res.json({
            code: 0,
            msg: 'OK',
            data: result
        })
    }).catch(error => {
        res.json({
            code: 1,
            msg: 'deleteOneOrder error',
            data: error
        })
    })
}


getAllOrders = async (condition, constraints) => {
    return await orderDao.findAll(condition, constraints)
}

getOneOrder = async (condition, constraints) => {
    return await orderDao.findOne(condition, constraints)
}


createOneOrder = async (order) =>
{
    return await orderDao.create(order)
}


deleteOneOrder = async (condition) =>
{
    return await orderDao.findOneAndRemove(condition)
}


saveOneOrder = async (order) =>
{
    return await orderDao.save(order)
}


updateOneOrder = async (condition, updater) =>
{
    return await orderDao.update(condition, updater)
}


findOneOrderAndUpdate = async (condition, updater) =>
{
    return await orderDao.findOneAndModify(condition, updater)
}


module.exports = {
    getOneOrderByOrderNumber,
    getOneOrdersByProductCode,
    getOrdersByCustomerNumber,
    getAllOrdersByNothing,
    areAllFieldsValid,
    getNewOrderSeq,
    createOneNewOrder,
    updateOneOrderByOrderNumber,
    deleteOneOrderByOrderNumber
}
