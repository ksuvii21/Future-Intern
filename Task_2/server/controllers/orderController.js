const Order = require('../models/Order');
const Product = require('../models/Product');
const mongoose = require('mongoose');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const asyncHandler = require('./asyncHandler');
const { sendOrderConfirmationEmail, sendLowStockAlert } = require('./emailService');

const LOW_STOCK_THRESHOLD = 10;

// Create a new order
exports.createOrder = asyncHandler(async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { products, totalAmount, shippingAddress, paymentMethod, paymentDetails } = req.body;
    const userId = req.user.userId;

    // Validate products and check stock
    for (const item of products) {
      const product = await Product.findById(item.product).session(session);
      if (!product) {
        res.status(404);
        throw new Error(`Product ${item.product} not found`);
      }
      if (product.stock < item.quantity) {
        await session.abortTransaction();
        session.endSession();
        res.status(400);
        throw new Error(`Insufficient stock for '${product.name}'. Only ${product.stock} left.`);
      }
    }

    // Create order
    const order = new Order({
      user: userId,
      products,
      totalAmount,
      shippingAddress,
      paymentMethod,
      paymentDetails
    });

    const savedOrder = await order.save({ session });

    // Update product stock
    for (const item of products) {
      const updatedProduct = await Product.findByIdAndUpdate(item.product, {
        $inc: { stock: -item.quantity }
      }, { new: true, session });

      // Check for low stock
      if (updatedProduct.stock < LOW_STOCK_THRESHOLD) {
        sendLowStockAlert(updatedProduct);
      }
    }

    await session.commitTransaction();

    // Populate product details
    const populatedOrder = await Order.findById(savedOrder._id).populate('products.product');

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
};

// Create a Stripe Payment Intent
exports.createPaymentIntent = asyncHandler(async (req, res) => {
    const { products } = req.body;

    if (!products || products.length === 0) {
      return res.status(400).json({ message: 'No products provided' });
    }

    let totalAmount = 0;
    for (const item of products) {
      const product = await Product.findById(item.product);
      if (product) {
        totalAmount += product.price * item.quantity;
      }
    }

    const totalWithTax = totalAmount + totalAmount * 0.08;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(totalWithTax * 100), // Amount in cents
      currency: 'usd',
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
  } catch (error) {
    throw error; // Let asyncHandler handle it
  }
});

// Get all orders (admin only)
exports.getAllOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find()
      .populate('user', 'username email')
      .populate('products.product')
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    throw error; // Let asyncHandler handle it
  }
});

// Update order status (admin only)
exports.updateOrderStatus = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }
    
    const order = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    ).populate('user', 'username email').populate('products.product');

    if (!order) { // Set status before throwing
      res.status(404);
      throw new Error('Order not found');
    }

    res.json({ message: 'Order status updated successfully', order });
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
exports.cancelOrder = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    const order = await Order.findById(id).session(session);

    if (!order) {
      await session.abortTransaction();
      res.status(404);
      throw new Error('Order not found');
    }

    // Ensure the user owns the order
    if (order.user.toString() !== userId) {
      await session.abortTransaction();
      res.status(403);
      throw new Error('Access denied');
    }

    // Only allow cancellation if the order is pending
    if (order.status !== 'pending') {
      await session.abortTransaction();
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
    await session.abortTransaction();
    throw e; // Rethrow for the global error handler
  } finally {
    session.endSession();
  }
});
