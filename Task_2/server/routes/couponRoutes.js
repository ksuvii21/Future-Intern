const express = require('express');
const router = express.Router();
const couponController = require('../controllers/couponController');
const auth = require('../middleware/auth');
const sellerAuth = require('../models/sellerAuth'); // Custom middleware for seller/admin

// @route   POST /api/coupons
// @desc    Create a new coupon
// @access  Private (Seller/Admin)
router.post('/', auth, sellerAuth, couponController.createCoupon);

// @route   GET /api/coupons/seller
// @desc    Get all coupons for the authenticated seller
// @access  Private (Seller/Admin)
router.get('/seller', auth, sellerAuth, couponController.getSellerCoupons);

// @route   PUT /api/coupons/:id
// @desc    Update a coupon
// @access  Private (Seller/Admin)
router.put('/:id', auth, sellerAuth, couponController.updateCoupon);

// @route   DELETE /api/coupons/:id
// @desc    Delete a coupon
// @access  Private (Seller/Admin)
router.delete('/:id', auth, sellerAuth, couponController.deleteCoupon);

module.exports = router;