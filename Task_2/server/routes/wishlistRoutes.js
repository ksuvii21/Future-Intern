const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware'); // Assuming this path is correct
const {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
  moveToCart, // Import the new function
} = require('../controllers/wishlistController');

router.route('/').get(protect, getWishlist).post(protect, addToWishlist);
router.route('/:id').delete(protect, removeFromWishlist);
router.route('/move-to-cart').post(protect, moveToCart); // Add the new route

module.exports = router;