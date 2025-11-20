const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');

// @desc    A sample user route
// @route   GET /api/users
// @access  Public
router.get('/', asyncHandler(async (req, res) => {
  // In a real app, you might fetch users from the database here.
  res.json({ message: 'User route is working. Add user fetching logic here.' });
}));

module.exports = router;