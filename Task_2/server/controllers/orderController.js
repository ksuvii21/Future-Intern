const Order = require('../models/Order');
const Product = require('../models/Product');
const mongoose = require('mongoose');
const asyncHandler = require('./asyncHandler'); // Import asyncHandler
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { sendOrderConfirmationEmail, sendLowStockAlert } = require('./emailService');

const LOW_STOCK_THRESHOLD = 10;

// Create a new order
// The asyncHandler wrapper was missing here, which is crucial for error handling.
exports.createOrder = asyncHandler(async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { products, totalAmount, shippingAddress, paymentMethod, paymentDetails } = req.body;
    const userId = req.user.userId;

    // --- Optimization & Security ---
    // Fetch all products at once and calculate total amount on the backend
    const productIds = products.map(p => p.product);
    const dbProducts = await Product.find({ '_id': { $in: productIds } }).session(session);

    let calculatedTotal = 0;
    const productMap = new Map(dbProducts.map(p => [p._id.toString(), p]));

    for (const item of products) {
      const dbProduct = productMap.get(item.product);
      if (!dbProduct) {
        throw new Error(`Product with ID ${item.product} not found`);
      }
      if (dbProduct.stock < item.quantity) {
        throw new Error(`Insufficient stock for '${dbProduct.name}'. Only ${dbProduct.stock} left.`);
      }
      // Use the price from the database, not the client
      calculatedTotal += dbProduct.price * item.quantity;
    }

    // Optional: You can compare the client-side totalAmount with the server-calculated one
    // if (Math.abs(calculatedTotal - totalAmount) > 0.01) { // Using a small tolerance for floating point math
    //   throw new Error('Total amount mismatch. Please try again.');
    // }
    // --- End Optimization & Security ---

    // Create order with the server-calculated total
    const order = new Order({
      user: userId,
      products,
      totalAmount: calculatedTotal, // Use server-calculated total
      shippingAddress,
      paymentMethod,
      paymentDetails
    });

    const savedOrder = await order.save({ session });

    // Update product stock in bulk for better performance
    const bulkStockUpdates = products.map(item => ({
      updateOne: {
        filter: { _id: item.product },
        update: { $inc: { stock: -item.quantity } }
      }
    }));

    await Product.bulkWrite(bulkStockUpdates, { session });

    // Check for low stock on updated products
    const updatedDbProducts = await Product.find({ '_id': { $in: productIds } }).session(session);
    for (const product of updatedDbProducts) {
      if (product.stock > 0 && product.stock < LOW_STOCK_THRESHOLD) {
        // No need to await, let it run in the background
        sendLowStockAlert(product).catch(err => console.error("Failed to send low stock alert:", err));
      }
    }

    await session.commitTransaction();

    // Populate product details
    const populatedOrder = await Order.findById(savedOrder._id).populate('user', 'username email').populate('products.product');

    // Send order confirmation email
    try {
      await sendOrderConfirmationEmail(populatedOrder);
    } catch (emailError) {
      console.error("Failed to send confirmation email:", emailError);
      // Do not fail the whole request if email fails, just log it.
    }

    res.status(201).json({ message: 'Order created successfully', order: populatedOrder });
  } catch (error) {
    await session.abortTransaction();
    console.error('Create order error:', error);
    // Re-throw the error to be caught by asyncHandler and handled by the global error handler
    throw error;
  } finally {
    session.endSession();
  }
});

// Create a Stripe Payment Intent
exports.createPaymentIntent = asyncHandler(async (req, res) => {
    const { products } = req.body;

    if (!products || products.length === 0) {
      res.status(400);
      throw new Error('No products provided for payment.');
    }

    // --- Optimization ---
    // Fetch all products at once to calculate the total amount securely on the backend
    const productIds = products.map(p => p.product);
    const dbProducts = await Product.find({ '_id': { $in: productIds } });
    const productMap = new Map(dbProducts.map(p => [p._id.toString(), p]));

    let totalAmount = 0;
    for (const item of products) {
      const dbProduct = productMap.get(item.product);
      if (dbProduct) {
        totalAmount += dbProduct.price * item.quantity;
      }
    }

    // Add 8% tax to the total amount, consistent with the frontend calculation
    const finalAmount = totalAmount * 1.08;

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(finalAmount * 100), // Stripe expects amount in cents
      currency: 'inr', // Assuming INR, adjust if needed
      metadata: { userId: req.user.userId },
    });

    res.json({ clientSecret: paymentIntent.client_secret });
});

// Get user's orders
exports.getUserOrders = asyncHandler(async (req, res) => {
    const userId = req.user.userId;
    const orders = await Order.find({ user: userId })
      .populate('products.product')
      .sort({ createdAt: -1 });

    res.json(orders);
});

// Get all orders (admin only)
exports.getAllOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find()
      .populate('user', 'username')
      .populate('products.product')
      .sort({ createdAt: -1 });

    res.json(orders);
});

// Update order status (admin only)
exports.updateOrderStatus = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['ordered', 'processing', 'shipped', 'out for delivery', 'delivered', 'cancelled'];
    if (!validStatuses.includes(status)) {
      res.status(400);
      throw new Error('Invalid status provided.');
    }
    
    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    ).populate('user', 'username email').populate('products.product');

    if (!updatedOrder) {
      res.status(404);
      throw new Error('Order not found');
    }

    res.json({ message: 'Order status updated successfully', order: updatedOrder });
});

// Get single order by ID
exports.getOrderById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const userId = req.user.userId;
    const userRole = req.user.role;

    // Add a check for a valid ObjectId to prevent CastError
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400);
      throw new Error('Invalid Order ID format');
    }

    const order = await Order.findById(id)
      .populate('user', 'username email')
      .populate('products.product');

    if (!order) {
      res.status(404);
      throw new Error('Order not found');
    }

    // Check if user owns the order or is admin
    if (order.user._id.toString() !== userId && userRole !== 'admin') {
      res.status(403);
      throw new Error('Access denied');
    }

    res.json(order);
});

// Cancel an order (user)
exports.cancelOrder = asyncHandler(async (req, res) => {  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    const order = await Order.findById(id).session(session);

    if (!order) {
      res.status(404);
      throw new Error('Order not found');
    }

    // Ensure the user owns the order
    if (order.user.toString() !== userId) {
      res.status(403);
      throw new Error('Access denied');
    }

    // Only allow cancellation if the order is ordered
    if (order.status !== 'ordered') {
      res.status(400);
      throw new Error(`Cannot cancel order with status: ${order.status}`);
    }

    order.status = 'cancelled';
    await order.save({ session });

    // Replenish product stock
    for (const item of order.products) {
      await Product.findByIdAndUpdate(item.product, { $inc: { stock: item.quantity } }, { session });
    }

    await session.commitTransaction();
    res.json({ message: 'Order cancelled successfully', order });
  } catch (e) {
    await session.abortTransaction(); // Abort transaction on any error
    throw e; // Rethrow for the global error handler
  } finally {
    session.endSession();
  }
});
