const Order = require('../models/Order');
const Product = require('../models/Product');
const mongoose = require('mongoose');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { sendOrderConfirmationEmail, sendLowStockAlert } = require('./emailService');

const LOW_STOCK_THRESHOLD = 10;


// Create a new order
exports.createOrder = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { products, totalAmount, shippingAddress, paymentMethod, paymentDetails } = req.body;
    const userId = req.user.userId;

    // Validate products and check stock
    for (const item of products) {
      const product = await Product.findById(item.product).session(session);
      if (!product) {
        return res.status(404).json({ message: `Product ${item.product} not found` });
      }
      if (product.stock < item.quantity) {
        await session.abortTransaction();
        session.endSession();
        return res.status(400).json({ message: `Insufficient stock for '${product.name}'. Only ${product.stock} left.` });
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

    res.status(201).json({
      message: 'Order created successfully',
      order: populatedOrder
    });
  } catch (error) {
    await session.abortTransaction();
    console.error('Create order error:', error);
    res.status(500).json({ message: 'Server error during order creation' });
  } finally {
    session.endSession();
  }
};

// Create a Stripe Payment Intent
exports.createPaymentIntent = async (req, res) => {
  try {
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

    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json({ message: 'Server error creating payment intent', error: error.message });
  }
};

// Get user's orders
exports.getUserOrders = async (req, res) => {
  try {
    const userId = req.user.userId;
    const orders = await Order.find({ user: userId })
      .populate('products.product')
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    console.error('Get user orders error:', error);
    res.status(500).json({ message: 'Server error retrieving orders' });
  }
};

// Get all orders (admin only)
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('user', 'username email')
      .populate('products.product')
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    console.error('Get all orders error:', error);
    res.status(500).json({ message: 'Server error retrieving orders' });
  }
};

// Update order status (admin only)
exports.updateOrderStatus = async (req, res) => {
  try {
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

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json({
      message: 'Order status updated successfully',
      order
    });
  } catch (error) {
    console.error('Update order status error:', error);
    res.status(500).json({ message: 'Server error updating order status' });
  }
};

// Get single order by ID
exports.getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;
    const userRole = req.user.role;

    // Add a check for a valid ObjectId to prevent CastError
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid Order ID format' });
    }

    const order = await Order.findById(id)
      .populate('user', 'username email')
      .populate('products.product');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Check if user owns the order or is admin
    if (order.user._id.toString() !== userId && userRole !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.json(order);
  } catch (error) {
    console.error('Get order by ID error:', error);
    res.status(500).json({ message: 'Server error retrieving order' });
  }
};

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
      session.endSession();
      return res.status(404).json({ message: 'Order not found' });
    }

    // Ensure the user owns the order
    if (order.user.toString() !== userId) {
      await session.abortTransaction();
      session.endSession();
      return res.status(403).json({ message: 'Access denied' });
    }

    // Only allow cancellation if the order is pending
    if (order.status !== 'pending') {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({ message: `Cannot cancel order with status: ${order.status}` });
    }

    order.status = 'cancelled';
    await order.save({ session });

    // Replenish product stock
    for (const item of order.products) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: { stock: item.quantity }
      }, { session });
    }

    await session.commitTransaction();
    res.json({ message: 'Order cancelled successfully', order });
  } catch (error) {
    await session.abortTransaction();
    console.error('Cancel order error:', error);
    res.status(500).json({ message: 'Server error cancelling order' });
  } finally {
    session.endSession();
  }
};
