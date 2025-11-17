const User = require('../models/User');
const asyncHandler = require('./asyncHandler');

/**
 * @route   PUT /api/seller/become-seller
 * @desc    Upgrade a user's role to 'seller'
 * @access  Private (user)
 */
exports.becomeSeller = asyncHandler(async (req, res) => {
  const userId = req.user.userId;

  const user = await User.findById(userId);

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  if (user.role !== 'user') {
    res.status(400);
    throw new Error(`User role is already '${user.role}'`);
  }

  user.role = 'seller';
  await user.save();

  // Return the updated user object (excluding password)
  const updatedUser = await User.findById(userId).select('-password');

  res.json({ message: 'Congratulations! You are now a seller.', user: updatedUser });
});