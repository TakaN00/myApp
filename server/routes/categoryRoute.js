const express = require('express');
const router=express.Router();
const { isAdminMiddleware } = require('../middlewares/isAdminMiddleware');

const multer = require('multer');
const { addCategory, getCategories, deleteCategory, updateCategory, updateCategoryImage } = require('../controllers/categoryControllers');

const storage = multer.diskStorage({
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + file.originalname
      cb(null, uniqueSuffix)
    }
  })
const upload = multer({ storage: storage })

router.post('/addCategory',isAdminMiddleware ,upload.single('img'), addCategory);
router.get('/', getCategories)
router.delete('/:id', isAdminMiddleware, deleteCategory);
router.put('/:id', isAdminMiddleware, updateCategory);
router.put('/image/:id', isAdminMiddleware, upload.single('img'), updateCategoryImage);


module.exports = router