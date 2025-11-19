const express = require('express');
const router = express.Router();
const shippingController = require('../controllers/shippingController');
const auth = require('../middleware/auth');
const sellerAuth = require('../models/sellerAuth'); // Custom middleware for seller/admin

// @route   POST /api/shipping
// @desc    Create a new shipping option
// @access  Private (Seller/Admin)
router.post('/', auth, sellerAuth, shippingController.createShippingOption);

// @route   GET /api/shipping/seller
// @desc    Get all shipping options for the authenticated seller
// @access  Private (Seller/Admin)
router.get('/seller', auth, sellerAuth, shippingController.getSellerShippingOptions);

// @route   PUT /api/shipping/:id
// @desc    Update a shipping option
// @access  Private (Seller/Admin)
router.put('/:id', auth, sellerAuth, shippingController.updateShippingOption);

// @route   DELETE /api/shipping/:id
// @desc    Delete a shipping option
// @access  Private (Seller/Admin)
router.delete('/:id', auth, sellerAuth, shippingController.deleteShippingOption);

module.exports = router;