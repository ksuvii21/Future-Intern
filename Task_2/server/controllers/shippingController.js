const ShippingOption = require('../models/ShippingOption');
const asyncHandler = require('./asyncHandler');
const mongoose = require('mongoose');

// @desc    Create a new shipping option
// @route   POST /api/shipping
// @access  Private (Seller/Admin)
exports.createShippingOption = asyncHandler(async (req, res) => {
  const { name, cost, estimatedDelivery } = req.body;

  // Check if user is a seller or admin
  if (!['seller', 'admin'].includes(req.user.role)) {
    res.status(403);
    throw new Error('Access denied. Only sellers or admins can create shipping options.');
  }

  const shippingOption = new ShippingOption({
    name,
    cost,
    estimatedDelivery,
    user: req.user.userId, // Associate shipping option with the seller/admin
  });

  const createdShippingOption = await shippingOption.save();
  res.status(201).json(createdShippingOption);
});

// @desc    Get all shipping options for the authenticated seller
// @route   GET /api/shipping/seller
// @access  Private (Seller/Admin)
exports.getSellerShippingOptions = asyncHandler(async (req, res) => {
  // Check if user is a seller or admin
  if (!['seller', 'admin'].includes(req.user.role)) {
    res.status(403);
    throw new Error('Access denied. Only sellers or admins can view their shipping options.');
  }

  const shippingOptions = await ShippingOption.find({ user: req.user.userId }).sort({ createdAt: -1 });
  res.json(shippingOptions);
});

// @desc    Get all shipping options (Admin only)
// @route   GET /api/shipping/all
// @access  Private (Admin)
exports.getAllShippingOptions = asyncHandler(async (req, res) => {
  if (req.user.role !== 'admin') {
    res.status(403);
    throw new Error('Access denied. Admin only.');
  }
  const shippingOptions = await ShippingOption.find({}).populate('user', 'username email').sort({ createdAt: -1 });
  res.json(shippingOptions);
});

// @desc    Update a shipping option
// @route   PUT /api/shipping/:id
// @access  Private (Seller/Admin)
exports.updateShippingOption = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, cost, estimatedDelivery } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400);
    throw new Error('Invalid Shipping Option ID format');
  }

  const shippingOption = await ShippingOption.findById(id);

  if (!shippingOption) {
    res.status(404);
    throw new Error('Shipping option not found');
  }

  // Ensure only the owner or an admin can update
  if (shippingOption.user.toString() !== req.user.userId && req.user.role !== 'admin') {
    res.status(403);
    throw new Error('Access denied. You do not own this shipping option.');
  }

  shippingOption.name = name || shippingOption.name;
  shippingOption.cost = cost !== undefined ? cost : shippingOption.cost;
  shippingOption.estimatedDelivery = estimatedDelivery || shippingOption.estimatedDelivery;

  const updatedShippingOption = await shippingOption.save();
  res.json(updatedShippingOption);
});

// @desc    Delete a shipping option
// @route   DELETE /api/shipping/:id
// @access  Private (Seller/Admin)
exports.deleteShippingOption = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const shippingOption = await ShippingOption.findOneAndDelete({ _id: id, user: req.user.userId });

  if (!shippingOption) {
    res.status(404);
    throw new Error('Shipping option not found or you do not have permission to delete it');
  }

  res.json({ message: 'Shipping option removed' });
});