const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const auth = require('../middleware/auth');
const sellerAuth = require('../models/sellerAuth');
const multer = require('multer');

// Configure multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Routes
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.post('/:id/reviews', auth, productController.createProductReview);
router.post('/', auth, sellerAuth, upload.fields([{ name: 'image', maxCount: 1 }, { name: 'variantImages', maxCount: 10 }]), productController.createProduct);
router.put('/:id', auth, sellerAuth, upload.fields([{ name: 'image', maxCount: 1 }, { name: 'variantImages', maxCount: 10 }]), productController.updateProduct);
router.delete('/:id', auth, sellerAuth, productController.deleteProduct);

module.exports = router;
