const Order = require('../models/Order');
const User = require('../models/User');
const Product = require('../models/Product');
const mongoose = require('mongoose');
const { Parser } = require('json2csv');

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

/**
 * @route   GET /api/admin/sales-report
 * @desc    Generate a CSV sales report
 * @access  Private (Admin)
 */
exports.generateSalesReport = async (req, res) => {
  try {
    const orders = await Order.find({}).populate('user', 'username email').lean();
    const fields = ['_id', 'user.username', 'user.email', 'totalAmount', 'status', 'createdAt'];
    const json2csvParser = new Parser({ fields });
    const csv = json2csvParser.parse(orders);

    res.header('Content-Type', 'text/csv');
    res.attachment('sales-report.csv');
    res.send(csv);
  } catch (error) {
    console.error('Generate sales report error:', error);
    res.status(500).json({ message: 'Server error generating report.' });
  }
};

/**
 * @route   GET /api/admin/customer-analytics
 * @desc    Get analytics about customers
 * @access  Private (Admin)
 */
exports.getCustomerAnalytics = async (req, res) => {
  try {
    const [customerData, userRegistrations] = await Promise.all([
      Order.aggregate([
        { $group: { _id: '$user', totalOrders: { $sum: 1 }, totalSpent: { $sum: '$totalAmount' } } },
        { $lookup: { from: 'users', localField: '_id', foreignField: '_id', as: 'userDetails' } },
        { $unwind: '$userDetails' },
        { $sort: { totalSpent: -1 } },
        { $project: { 'userDetails.password': 0 } }
      ]),
      User.aggregate([
        { $group: { _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }, count: { $sum: 1 } } },
        { $sort: { _id: 1 } }
      ])
    ]);

    res.json({ topCustomers: customerData, userRegistrations });
  } catch (error) {
    console.error('Get customer analytics error:', error);
    res.status(500).json({ message: 'Server error fetching customer analytics.' });
  }
};