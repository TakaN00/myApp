const express = require('express');
const { newMessage, getMessages, deleteMessage, updateMessage } = require('../controllers/messageControllers');
const router=express.Router();
const { isAdminMiddleware } = require('../middlewares/isAdminMiddleware');


router.post('/', newMessage);
router.get('/', isAdminMiddleware, getMessages);
router.delete('/:id', isAdminMiddleware, deleteMessage);
router.put('/:id', isAdminMiddleware, updateMessage);


module.exports = router