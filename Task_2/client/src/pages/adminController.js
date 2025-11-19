const Order = require('../models/Order');
const User = require('../models/User');
const Product = require('../models/Product');
const mongoose = require('mongoose');

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

    const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

    const monthlySales = await Order.aggregate([
      { $match: { status: { $ne: 'cancelled' } } },
      { $group: { _id: { $month: '$createdAt' }, total: { $sum: '$totalAmount' } } },
      { $sort: { '_id': 1 } }
    ]);

    const salesByCategory = await Order.aggregate([
      { $match: { status: { $ne: 'cancelled' } } },
      { $unwind: '$products' },
      {
        $lookup: {
          from: 'products',
          localField: 'products.product',
          foreignField: '_id',
          as: 'productDetails'
        }
      },
      { $unwind: '$productDetails' },
      {
        $group: {
          _id: '$productDetails.category',
          totalRevenue: { $sum: { $multiply: ['$products.price', '$products.quantity'] } }
        }
      },
      { $sort: { totalRevenue: -1 } }
    ]);

    const productPerformance = await Order.aggregate([
      { $match: { status: { $ne: 'cancelled' } } },
      { $unwind: '$products' },
      {
        $group: {
          _id: '$products.product',
          totalRevenue: { $sum: { $multiply: ['$products.price', '$products.quantity'] } },
          unitsSold: { $sum: '$products.quantity' }
        }
      },
      {
        $lookup: {
          from: 'products',
          localField: '_id',
          foreignField: '_id',
          as: 'productInfo'
        }
      },
      { $unwind: '$productInfo' },
      { $sort: { totalRevenue: -1 } },
      { $limit: 10 },
      { $project: { name: '$productInfo.name', totalRevenue: 1, unitsSold: 1 } }
    ]);

    res.json({
      totalUsers,
      totalOrders,
      totalProducts,
      totalRevenue,
      avgOrderValue,
      monthlySales,
      salesByCategory,
      productPerformance,
    });
  } catch (error) {
    console.error('Get admin stats error:', error);
    res.status(500).json({ message: 'Server error fetching admin stats.' });
  }
};