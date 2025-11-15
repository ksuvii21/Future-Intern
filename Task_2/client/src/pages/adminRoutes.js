const express = require('express');
const router = express.Router();
const { getStats } = require('../controllers/adminController');
const auth = require('../middleware/auth');

// Middleware to check for admin role
const adminAuth = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied. Admin only.' });
  }
  next();
};

router.get('/stats', auth, adminAuth, getStats);

module.exports = router;