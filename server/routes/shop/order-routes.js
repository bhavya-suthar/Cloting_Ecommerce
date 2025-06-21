const express = require("express");

const {createOrder,capturePayment,getAllOrderByUser,getOrderDetails} =require('../../controllers/shop/order-controller')

const router = express.Router()

router.post('/create',createOrder)
router.post('/capture',capturePayment)
router.post('/list/:userId',getAllOrderByUser)
router.post('/details/:id',getOrderDetails)

module.exports = router