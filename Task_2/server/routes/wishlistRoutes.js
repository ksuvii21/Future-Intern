const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth');
const {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
  moveToCart
} = require('../controllers/wishlistController');

router.route('/').get(protect, getWishlist).post(protect, addToWishlist);
router.route('/:id').delete(protect, removeFromWishlist);
router.route('/move-to-cart').post(protect, moveToCart);

module.exports = router;