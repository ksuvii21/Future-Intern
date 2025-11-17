const User = require('../models/User');

/**
 * @route   PUT /api/seller/become-seller
 * @desc    Upgrade a user's role to 'seller'
 * @access  Private (user)
 */
exports.becomeSeller = async (req, res) => {
  try {
    const userId = req.user.userId;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.role !== 'user') {
      return res.status(400).json({ message: `User role is already '${user.role}'` });
    }

    user.role = 'seller';
    await user.save();

    // Return the updated user object (excluding password)
    const updatedUser = await User.findById(userId).select('-password');

    res.json({ message: 'Congratulations! You are now a seller.', user: updatedUser });
  } catch (error) {
    console.error('Become seller error:', error);
    res.status(500).json({ message: 'Server error while upgrading role.' });
  }
};