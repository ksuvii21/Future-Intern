const Order = require('../models/Order');
const Product = require('../models/Product');

// Create a new order
exports.createOrder = async (req, res) => {
  try {
    const { products, totalAmount, shippingAddress, paymentMethod, paymentDetails } = req.body;
    const userId = req.user.userId;

    // Validate products and check stock
    for (const item of products) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.status(404).json({ message: `Product ${item.product} not found` });
      }
      if (product.stock < item.quantity) {
        return res.status(400).json({ message: `Insufficient stock for ${product.name}` });
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

    const savedOrder = await order.save();

    // Update product stock
    for (const item of products) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: { stock: -item.quantity }
      });
    }

    // Populate product details
    await savedOrder.populate('products.product');

    res.status(201).json({
      message: 'Order created successfully',
      order: savedOrder
    });
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({ message: 'Server error during order creation' });
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
