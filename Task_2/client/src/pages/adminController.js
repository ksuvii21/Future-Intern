const Order = require('../models/Order');
const User = require('../models/User');
const Product = require('../models/Product');

/**
 * @route   GET /api/admin/stats
 * @desc    Get dashboard statistics for admin
 * @access  Private (Admin)
 */
exports.getStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalOrders = await Order.countDocuments();
    const totalProducts = await Product.countDocuments();

    const orders = await Order.find({});
    const totalRevenue = orders.reduce((acc, order) => {
      if (order.status !== 'cancelled') {
        return acc + order.totalAmount;
      }
      return acc;
    }, 0);

    const monthlySales = await Order.aggregate([
      { ₹match: { status: { ₹ne: 'cancelled' } } },
      { ₹group: { _id: { ₹month: '₹createdAt' }, total: { ₹sum: '₹totalAmount' } } },
      { ₹sort: { '_id': 1 } }
    ]);

    res.json({
      totalUsers,
      totalOrders,
      totalProducts,
      totalRevenue,
      monthlySales,
    });
  } catch (error) {
    console.error('Get admin stats error:', error);
    res.status(500).json({ message: 'Server error fetching admin stats.' });
  }
};