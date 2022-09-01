const express = require('express');
const { newOrder, getOrders, getOrderDetails, getAllOrders, deleteOrder, updateOrder } = require('../controllers/orderControllers');
const router=express.Router();
const { authMiddleware } = require('../middlewares/authMiddleware');
const { isAdminMiddleware } = require('../middlewares/isAdminMiddleware');


router.post('/', authMiddleware, newOrder)
router.get('/orderlist', authMiddleware, getOrders)
router.get('/orderdetails/:id', authMiddleware, getOrderDetails)
router.get('/allorders',isAdminMiddleware, getAllOrders)
router.delete('/:id', isAdminMiddleware, deleteOrder)
router.put('/:id', isAdminMiddleware, updateOrder)


module.exports = router