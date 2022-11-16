const express = require("express")
const router = express.Router()

const orderService = require("../services/orderService1")

// const authJwt = require("../tools/authJwt")

//get one order by order_number
router.get('/number/:order_number', orderService.getOneOrderByOrderNumber)

//get orders by product_code
router.get('/productCode/:product_code', orderService.getOneOrdersByProductCode)

//get orders by customer_number
router.get('/customer/:customer_number', orderService.getOrdersByCustomerNumber)

//get all orders
router.get('/all', orderService.getAllOrdersByNothing)

// create a new order
router.post('/create',
    orderService.areAllFieldsValid,
    orderService.getNewOrderSeq,
    orderService.createOneNewOrder
)

//update one order by order_number (put)
router.put('/update', orderService.updateOneOrderByOrderNumber)

// delete one order by order_number
router.delete('/delete', orderService.deleteOneOrderByOrderNumber)

// update one order by order number (patch)
router.patch('/update', orderService.updateOneOrderByOrderNumber)

module.exports = router
