const express = require('express');
const { addProduct, getProducts, deleteProduct, updateProduct, updateProductImage } = require('../controllers/productControllers');
const router=express.Router();
const { isAdminMiddleware } = require('../middlewares/isAdminMiddleware');

const multer = require('multer');

const storage = multer.diskStorage({
    // destination: function (req, file, cb) {
    //   cb(null, 'my-uploads')
    // },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + file.originalname
      cb(null, uniqueSuffix)
    }
  })
  const upload = multer({ storage: storage })

router.post('/addProduct',isAdminMiddleware ,upload.single('img'), addProduct);
router.get('/', getProducts)
router.delete('/:id', isAdminMiddleware, deleteProduct);
router.put('/:id', isAdminMiddleware, updateProduct);
router.put('/image/:id', isAdminMiddleware, upload.single('img'), updateProductImage);

module.exports = router