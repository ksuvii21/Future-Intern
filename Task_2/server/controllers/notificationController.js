const Notification = require('../models/Notification');
const asyncHandler = require('./asyncHandler');

// @desc    Get user notifications
// @route   GET /api/notifications
// @access  Private
exports.getUserNotifications = asyncHandler(async (req, res) => {
  const { page = 1, limit = 20, unreadOnly = false } = req.query;

  const query = { user: req.user.userId };
  if (unreadOnly === 'true') {
    query.read = false;
  }

  const notifications = await Notification.find(query)
    .sort({ createdAt: -1 })
    .limit(limit * 1)
    .skip((page - 1) * limit);

  const total = await Notification.countDocuments(query);

  res.json({
    notifications,
    totalPages: Math.ceil(total / limit),
    currentPage: Number(page),
    total
  });
});

// @desc    Mark notification as read
// @route   PUT /api/notifications/:id/read
// @access  Private
exports.markAsRead = asyncHandler(async (req, res) => {
  const notification = await Notification.findOne({
    _id: req.params.id,
    user: req.user.userId
  });

  if (!notification) {
    res.status(404);
    throw new Error('Notification not found');
  }

  notification.read = true;
  await notification.save();

  res.json({ message: 'Notification marked as read' });
});

// @desc    Mark all notifications as read
// @route   PUT /api/notifications/read-all
// @access  Private
exports.markAllAsRead = asyncHandler(async (req, res) => {
  await Notification.updateMany(
    { user: req.user.userId, read: false },
    { read: true }
  );

  res.json({ message: 'All notifications marked as read' });
});

// @desc    Delete notification
// @route   DELETE /api/notifications/:id
// @access  Private
exports.deleteNotification = asyncHandler(async (req, res) => {
  const notification = await Notification.findOneAndDelete({
    _id: req.params.id,
    user: req.user.userId
  });

  if (!notification) {
    res.status(404);
    throw new Error('Notification not found');
  }

  res.json({ message: 'Notification deleted' });
});

// @desc    Get notification count
// @route   GET /api/notifications/count
// @access  Private
exports.getNotificationCount = asyncHandler(async (req, res) => {
  const unreadCount = await Notification.countDocuments({
    user: req.user.userId,
    read: false
  });

  const totalCount = await Notification.countDocuments({
    user: req.user.userId
  });

  res.json({
    unread: unreadCount,
    total: totalCount
  });
});

// @desc    Create notification (internal use)
// @access  Private/Internal
exports.createNotification = asyncHandler(async (userId, type, title, message, data = {}) => {
  const notification = await Notification.create({
    user: userId,
    type,
    title,
    message,
    data
  });

  return notification;
});

// @desc    Send price drop notifications
// @access  Private/Internal
exports.sendPriceDropNotifications = asyncHandler(async (productId, oldPrice, newPrice) => {
  // This would be called when product price is updated
  // For now, we'll implement a basic version
  // In a real app, you'd track users who viewed the product or have it in wishlist

  const Product = require('../models/Product');
  const product = await Product.findById(productId);

  if (!product) return;

  // For demo purposes, we'll create a notification for all users
  // In real app, you'd have a separate collection for price watchers
  const User = require('../models/User');
  const users = await User.find({});

  const notifications = users.map(user =>
    Notification.create({
      user: user._id,
      type: 'price_drop',
      title: 'Price Drop Alert!',
      message: `${product.name} is now ₹${newPrice} (was ₹${oldPrice})`,
      data: {
        productId: product._id,
        oldPrice,
        newPrice
      }
    })
  );

  await Promise.all(notifications);
});

// @desc    Send back in stock notifications
// @access  Private/Internal
exports.sendBackInStockNotifications = asyncHandler(async (productId) => {
  const Product = require('../models/Product');
  const product = await Product.findById(productId).populate('stockAlerts.user');

  if (!product) return;

  const notifications = product.stockAlerts
    .filter(alert => !alert.alerted)
    .map(alert => {
      alert.alerted = true; // Mark as alerted
      return Notification.create({
        user: alert.user._id,
        type: 'back_in_stock',
        title: 'Back in Stock!',
        message: `${product.name} is now back in stock. Don't miss out!`,
        data: {
          productId: product._id
        }
      });
    });

  await Promise.all(notifications);
  await product.save();
});
