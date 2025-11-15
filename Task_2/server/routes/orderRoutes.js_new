const express = require('express');
const router = express.Router();
const {
  createOrder,
  getUserOrders,
  getAllOrders,
  updateOrderStatus,
  getOrderById,
  cancelOrder,
  createPaymentIntent
} = require('../controllers/orderController');
const auth = require('../middleware/auth');

// @route   POST /api/orders/create-payment-intent
// @desc    Create a stripe payment intent
// @access  Private
router.post('/create-payment-intent', auth, createPaymentIntent);

// @route   POST /api/orders/create
// @desc    Create a new order
// @access  Private
router.post('/create', auth, createOrder);
router.get('/all', auth, (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied. Admin only.' });
  }
  next();
}, getAllOrders);

// @route   GET /api/orders
// @desc    Get user's orders
// @access  Private
router.get('/', auth, getUserOrders);

// @route   GET /api/orders/:id
// @desc    Get single order by ID
// @access  Private (user or admin)
router.get('/:id', auth, getOrderById);

// @route   PUT /api/orders/:id/cancel
// @desc    Cancel an order by user
// @access  Private
router.put('/:id/cancel', auth, cancelOrder);

// @route   GET /api/orders/all
// @desc    Get all orders (admin only)
// @access  Private/Admin

// @route   PUT /api/orders/:id/status
// @desc    Update order status (admin only)
// @access  Private/Admin
router.put('/:id/status', auth, (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied. Admin only.' });
  }
  next();
}, updateOrderStatus);

module.exports = router;
