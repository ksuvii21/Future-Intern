const User = require('../models/User');
const jwt = require('jsonwebtoken');
const asyncHandler = require('./asyncHandler');

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
const register = asyncHandler(async (req, res) => {
  const { username, email, password, role } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { username }]
    });

    if (existingUser) {
      res.status(400);
      throw new Error(existingUser.email === email ? 'Email already registered' : 'Username already taken');
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
});

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      res.status(401);
      throw new Error('Invalid email or password');
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      res.status(401);
      throw new Error('Invalid email or password');
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
});

// @desc    Forgot password - Send reset email
// @route   POST /api/auth/forgot-password
// @access  Public
const forgotPassword = asyncHandler(async (req, res) => {
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
});

// @desc    Reset password
// @route   POST /api/auth/reset-password
// @access  Public
const resetPassword = asyncHandler(async (req, res) => {
  const { token, newPassword } = req.body;

    // Verify token and reset password
    // This would be implemented with proper token verification

    res.json({
      message: 'Password reset successfully'
    });
});

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
const updateProfile = asyncHandler(async (req, res) => {
  const userId = req.user.userId;
    const { username, email, currentPassword, newPassword } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }

    // Update username and email if provided
    if (username) user.username = username;
    if (email) user.email = email;

    // Update password if requested
    if (newPassword) {
      if (!currentPassword) {
        res.status(400);
        throw new Error('Current password is required to change password');
      }

      const isPasswordValid = await user.comparePassword(currentPassword);
      if (!isPasswordValid) {
        res.status(401);
        throw new Error('Invalid current password');
      }

      user.password = newPassword;
    }

    const updatedUser = await user.save();

    res.json({
      message: 'Profile updated successfully',
      user: await User.findById(userId).select('-password')
    });
});

// @desc    Get all users (admin only)
// @route   GET /api/auth/users
// @access  Private/Admin
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.json(users);
});

const addAddress = asyncHandler(async (req, res) => {
  const userId = req.user.userId;
  const { name, phone, address, city, state, zipCode, isDefault } = req.body;

  const user = await User.findById(userId);
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  const newAddress = { name, phone, address, city, state, zipCode, isDefault };

  // If setting a new default, unset the old one
  if (isDefault) {
    user.addresses.forEach(addr => addr.isDefault = false);
  }

  user.addresses.push(newAddress);
  await user.save();

  res.status(201).json({ message: 'Address added successfully', user: await User.findById(userId).select('-password') });
});

const deleteAddress = asyncHandler(async (req, res) => {
  const userId = req.user.userId;
  const addressId = req.params.id;

  const user = await User.findById(userId);
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  // Find and remove the address
  user.addresses = user.addresses.filter(addr => addr._id.toString() !== addressId);
  await user.save();

  res.json({ message: 'Address deleted successfully', user: await User.findById(userId).select('-password') });
});

const updateUserRole = asyncHandler(async (req, res) => {
  const { role } = req.body;
  const userId = req.params.id;

  const allowedRoles = ['user', 'seller', 'admin'];
  if (!allowedRoles.includes(role)) {
    res.status(400);
    throw new Error('Invalid role specified.');
  }

  const user = await User.findById(userId);
  if (!user) {
    res.status(404);
    throw new Error('User not found.');
  }

  user.role = role;
  await user.save();

  res.json({ message: 'User role updated successfully.', user: await User.findById(userId).select('-password') });
});

module.exports = {
  register,
  login,
  forgotPassword,
  resetPassword,
  updateProfile,
  addAddress,
  deleteAddress,
  updateUserRole,
  getAllUsers
};
