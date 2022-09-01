const express = require('express');
const { addWishlist, getWishlist, removeWishlist, deleteWishlist } = require('../controllers/wishlistControllers');
const router=express.Router();
const { authMiddleware } = require('../middlewares/authMiddleware');


router.get('/', authMiddleware, getWishlist)
router.put('/addtowishlist', authMiddleware, addWishlist)
router.put('/removefromwishlist', authMiddleware, removeWishlist)
router.put('/deletewishlist', authMiddleware, deleteWishlist)

module.exports = router