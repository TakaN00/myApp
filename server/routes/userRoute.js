const express = require('express');
const { register, login, getUserInfo, getUserList, deleteUser } = require('../controllers/userControllers');
const router=express.Router();
const { body } = require('express-validator');
const { authMiddleware } = require('../middlewares/authMiddleware');
const { isAdminMiddleware } = require('../middlewares/isAdminMiddleware');

router.post('/login', login)
router.post('/register', body('email', 'please enter a valid email.').isEmail(), body('password','password must be at least 8 characters').isLength(8), register)
router.get('/',authMiddleware, getUserInfo)
router.get('/userlist', isAdminMiddleware, getUserList)
router.delete('/:id', isAdminMiddleware, deleteUser)

module.exports = router