const express = require('express');
const router = express.Router();
const {
  getCart,
  addItemToCart,
  updateCartItem,
  removeItemFromCart
} = require('../controllers/cartController');
const auth = require('../middleware/auth');

// @route   GET /api/cart
// @desc    Get user's cart
router.get('/', auth, getCart);

// @route   POST /api/cart
// @desc    Add item to cart
router.post('/', auth, addItemToCart);

// @route   PUT /api/cart/:itemId
router.put('/:itemId', auth, updateCartItem);

// @route   DELETE /api/cart/:itemId
router.delete('/:itemId', auth, removeItemFromCart);

module.exports = router;