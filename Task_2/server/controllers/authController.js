const User = require('../models/User');
const jwt = require('jsonwebtoken');

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
const register = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({
      ₹or: [{ email }, { username }]
    });

    if (existingUser) {
      return res.status(400).json({
        message: existingUser.email === email ? 'Email already registered' : 'Username already taken'
      });
    }

    // Ensure role is either 'user' or 'seller' for security
    const allowedRoles = ['user', 'seller'];
    const userRole = allowedRoles.includes(role) ? role : 'user';

    // Create user
    const user = await User.create({
      username,
      email,
      password,
      role: userRole
    });

    // Generate token
    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET || 'your-secret-key', {
      expiresIn: '7d'
    });

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      message: 'Server error during registration'
    });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: 'Invalid email or password'
      });
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        message: 'Invalid email or password'
      });
    }

    // Generate token
    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET || 'your-secret-key', {
      expiresIn: '7d'
    });

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      message: 'Server error during login'
    });
  }
};

// @desc    Forgot password - Send reset email
// @route   POST /api/auth/forgot-password
// @access  Public
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      // Don't reveal if email exists or not for security
      return res.json({
        message: 'If an account with that email exists, a password reset link has been sent.'
      });
    }

    // In a real application, you would:
    // 1. Generate a reset token
    // 2. Save it to the user model with expiration
    // 3. Send an email with the reset link
    // For now, we'll just return a success message

    res.json({
      message: 'If an account with that email exists, a password reset link has been sent.'
    });
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({
      message: 'Server error'
    });
  }
};

// @desc    Reset password
// @route   POST /api/auth/reset-password
// @access  Public
const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    // Verify token and reset password
    // This would be implemented with proper token verification

    res.json({
      message: 'Password reset successfully'
    });
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({
      message: 'Server error'
    });
  }
};

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
const updateProfile = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { username, email, currentPassword, newPassword } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update username and email if provided
    if (username) user.username = username;
    if (email) user.email = email;

    // Update password if requested
    if (newPassword) {
      if (!currentPassword) {
        return res.status(400).json({ message: 'Current password is required to change password' });
      }

      const isPasswordValid = await user.comparePassword(currentPassword);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid current password' });
      }

      user.password = newPassword;
    }

    const updatedUser = await user.save();

    res.json({
      message: 'Profile updated successfully',
      user: await User.findById(userId).select('-password')
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error updating profile' });
  }
};

// @desc    Get all users (admin only)
// @route   GET /api/auth/users
// @access  Private/Admin
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    console.error('Get all users error:', error);
    res.status(500).json({ message: 'Server error retrieving users' });
  }
};

module.exports = {
  register,
  login,
  forgotPassword, // This structure was incorrect
  resetPassword,  // I am correcting it to include all functions
  updateProfile,

  // @desc    Add a new address for a user
  // @route   POST /api/auth/address
  // @access  Private
  addAddress: async (req, res) => {
    try {
      const userId = req.user.userId;
      const { name, phone, address, city, state, zipCode, isDefault } = req.body;

      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const newAddress = { name, phone, address, city, state, zipCode, isDefault };

      // If setting a new default, unset the old one
      if (isDefault) {
        user.addresses.forEach(addr => addr.isDefault = false);
      }

      user.addresses.push(newAddress);
      await user.save();

      res.status(201).json({ message: 'Address added successfully', user: await User.findById(userId).select('-password') });
    } catch (error) {
      console.error('Add address error:', error);
      res.status(500).json({ message: 'Server error adding address' });
    }
  },

  // @desc    Delete a user's address
  // @route   DELETE /api/auth/address/:id
  // @access  Private
  deleteAddress: async (req, res) => {
    try {
      const userId = req.user.userId;
      const addressId = req.params.id;

      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Find and remove the address
      user.addresses = user.addresses.filter(addr => addr._id.toString() !== addressId);
      await user.save();

      res.json({ message: 'Address deleted successfully', user: await User.findById(userId).select('-password') });
    } catch (error) {
      console.error('Delete address error:', error);
      res.status(500).json({ message: 'Server error deleting address' });
    }
  },

  // @desc    Update user role (admin only)
  // @route   PUT /api/auth/users/:id/role
  // @access  Private/Admin
  updateUserRole: async (req, res) => {
    try {
      const { role } = req.body;
      const userId = req.params.id;

      const allowedRoles = ['user', 'seller', 'admin'];
      if (!allowedRoles.includes(role)) {
        return res.status(400).json({ message: 'Invalid role specified.' });
      }

      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }

      user.role = role;
      await user.save();

      res.json({ message: 'User role updated successfully.', user: await User.findById(userId).select('-password') });
    } catch (error) {
      console.error('Update user role error:', error);
      res.status(500).json({ message: 'Server error updating user role.' });
    }
  },
  getAllUsers // Adding the missing export here
};
