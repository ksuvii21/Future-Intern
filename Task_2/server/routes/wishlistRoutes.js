const express = require('express');
const router = express.Router();
const {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
  moveToCart
} = require('../controllers/wishlistController');
const auth = require('../middleware/auth');

// @route   GET /api/wishlist
// @desc    Get user's wishlist
router.get('/', auth, getWishlist);

// @route   POST /api/wishlist
// @desc    Add item to wishlist
router.post('/', auth, addToWishlist);

// @route   DELETE /api/wishlist/:productId
// @desc    Remove item from wishlist
router.delete('/:productId', auth, removeFromWishlist);

// @route   POST /api/wishlist/move-to-cart
// @desc    Move item from wishlist to cart
router.post('/move-to-cart', auth, moveToCart);

module.exports = router;
