const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const auth = require('../middleware/auth');
const sellerAuth = require('../models/sellerAuth');
const multer = require('multer');

// Configure multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Admin auth middleware
const adminAuth = (req, res, next) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Access denied. Admin only.' });
  next();
};

// Routes
router.get('/', productController.getAllProducts);
router.get('/suggestions', productController.getProductSuggestions); // Add this before /:id
router.get('/:id', productController.getProductById);
router.post('/:id/reviews', auth, upload.array('images', 5), productController.createProductReview);
router.put('/:productId/reviews/:reviewId/moderate', auth, adminAuth, productController.moderateReview);
router.post('/:productId/reviews/:reviewId/vote', auth, productController.voteReview);
router.get('/reviews/pending', auth, adminAuth, productController.getPendingReviews);
router.post('/:id/stock-alert', auth, productController.subscribeStockAlert);
router.delete('/:id/stock-alert', auth, productController.unsubscribeStockAlert);
router.post('/', auth, sellerAuth, upload.fields([{ name: 'image', maxCount: 1 }, { name: 'variantImages', maxCount: 10 }]), productController.createProduct);
router.put('/:id', auth, sellerAuth, productController.updateProduct);
router.delete('/:id', auth, sellerAuth, productController.deleteProduct);

// Admin routes for product management
router.post('/admin', auth, adminAuth, upload.fields([{ name: 'image', maxCount: 1 }, { name: 'variantImages', maxCount: 10 }]), productController.createProduct);
router.put('/admin/:id', auth, adminAuth, upload.fields([{ name: 'image', maxCount: 1 }, { name: 'variantImages', maxCount: 10 }]), productController.updateProduct);
router.delete('/admin/:id', auth, adminAuth, productController.deleteProduct);

// Bulk operations
router.post('/bulk-delete', auth, adminAuth, productController.bulkDeleteProducts);
router.post('/bulk-update', auth, adminAuth, productController.bulkUpdateProducts);

module.exports = router;
