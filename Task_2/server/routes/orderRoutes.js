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

const adminAuth = (req, res, next) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Access denied. Admin only.' });
  next();
};

// @route   POST /api/orders/create-payment-intent
// @desc    Create a stripe payment intent
// @access  Private
router.post('/create-payment-intent', auth, createPaymentIntent);

// @route   POST /api/orders/create
// @desc    Create a new order
// @access  Private
router.post('/create', auth, createOrder);

// @route   GET /api/orders
// @desc    Get user's orders
// @access  Private
router.get('/', auth, getUserOrders);

// @route   GET /api/orders/all
// @desc    Get all orders (admin only)
// @access  Private/Admin
router.get('/all', auth, adminAuth, getAllOrders);

// @route   GET /api/orders/:id
// @desc    Get single order by ID
// @access  Private (user or admin)
router.get('/:id', auth, getOrderById);

// @route   PUT /api/orders/:id/cancel
// @desc    Cancel an order by user
// @access  Private
router.put('/:id/cancel', auth, cancelOrder);

// @route   PUT /api/orders/:id/status
// @desc    Update order status (admin only)
// @access  Private/Admin
router.put('/:id/status', auth, adminAuth, updateOrderStatus);

module.exports = router;
