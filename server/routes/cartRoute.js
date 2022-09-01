const express = require('express');
const { addCart, getCart, removeCart, deleteCart } = require('../controllers/cartControllers');
const router=express.Router();
const { authMiddleware } = require('../middlewares/authMiddleware');


router.get('/', authMiddleware, getCart)
router.put('/addtocart', authMiddleware, addCart)
router.put('/removefromcart', authMiddleware, removeCart)
router.put('/deletecart', authMiddleware, deleteCart)

module.exports = router