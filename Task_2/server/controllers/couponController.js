const Coupon = require('../models/Coupon');
const asyncHandler = require('./asyncHandler');
const mongoose = require('mongoose');

// @desc    Create a new coupon
// @route   POST /api/coupons
// @access  Private (Seller/Admin)
exports.createCoupon = asyncHandler(async (req, res) => {
  const { code, discountType, value, expiryDate } = req.body;

  // Check if user is a seller or admin
  if (!['seller', 'admin'].includes(req.user.role)) {
    res.status(403);
    throw new Error('Access denied. Only sellers or admins can create coupons.');
  }

  const couponExists = await Coupon.findOne({ code });
  if (couponExists) {
    res.status(400);
    throw new Error('Coupon with this code already exists');
  }

  const coupon = new Coupon({
    code,
    discountType,
    value,
    expiryDate: expiryDate || null, // Allow null for no expiry
    user: req.user.userId, // Associate coupon with the seller/admin who created it
  });

  const createdCoupon = await coupon.save();
  res.status(201).json(createdCoupon);
});

// @desc    Get all coupons for the authenticated seller
// @route   GET /api/coupons/seller
// @access  Private (Seller/Admin)
exports.getSellerCoupons = asyncHandler(async (req, res) => {
  // Check if user is a seller or admin
  if (!['seller', 'admin'].includes(req.user.role)) {
    res.status(403);
    throw new Error('Access denied. Only sellers or admins can view their coupons.');
  }

  const coupons = await Coupon.find({ user: req.user.userId }).sort({ createdAt: -1 });
  res.json(coupons);
});

// @desc    Get all coupons (Admin only)
// @route   GET /api/coupons/all
// @access  Private (Admin)
exports.getAllCoupons = asyncHandler(async (req, res) => {
  if (req.user.role !== 'admin') {
    res.status(403);
    throw new Error('Access denied. Admin only.');
  }
  const coupons = await Coupon.find({}).populate('user', 'username email').sort({ createdAt: -1 });
  res.json(coupons);
});

// @desc    Update a coupon
// @route   PUT /api/coupons/:id
// @access  Private (Seller/Admin)
exports.updateCoupon = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { code, discountType, value, expiryDate } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400);
    throw new Error('Invalid Coupon ID format');
  }

  const coupon = await Coupon.findById(id);

  if (!coupon) {
    res.status(404);
    throw new Error('Coupon not found');
  }

  // Ensure only the owner or an admin can update
  if (coupon.user.toString() !== req.user.userId && req.user.role !== 'admin') {
    res.status(403);
    throw new Error('Access denied. You do not own this coupon.');
  }

  coupon.code = code || coupon.code;
  coupon.discountType = discountType || coupon.discountType;
  coupon.value = value !== undefined ? value : coupon.value;
  coupon.expiryDate = expiryDate !== undefined ? expiryDate : coupon.expiryDate;

  const updatedCoupon = await coupon.save();
  res.json(updatedCoupon);
});

// @desc    Delete a coupon
// @route   DELETE /api/coupons/:id
// @access  Private (Seller/Admin)
exports.deleteCoupon = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const coupon = await Coupon.findOneAndDelete({ _id: id, user: req.user.userId });

  if (!coupon) {
    res.status(404);
    throw new Error('Coupon not found or you do not have permission to delete it');
  }

  res.json({ message: 'Coupon removed' });
});