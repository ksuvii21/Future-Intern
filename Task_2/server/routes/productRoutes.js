const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const auth = require('../middleware/auth');
const sellerAuth = require('../middleware/sellerAuth');

// Routes
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.post('/:id/reviews', auth, productController.createProductReview);
router.post('/', auth, sellerAuth, productController.createProduct);
router.put('/:id', auth, sellerAuth, productController.updateProduct);
router.delete('/:id', auth, sellerAuth, productController.deleteProduct);

module.exports = router;
