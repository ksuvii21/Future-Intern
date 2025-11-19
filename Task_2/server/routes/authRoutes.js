const express = require('express');
const router = express.Router();
const {
  register,
  login,
  forgotPassword,
  resetPassword,
  updateProfile,
  getAllUsers,
  addAddress,
  deleteAddress,
  updateUserRole
} = require('../controllers/authController');
const auth = require('../middleware/auth');
const passport = require('passport');
const jwt = require('jsonwebtoken');

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post('/register', register);

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post('/login', login);

// @route   POST /api/auth/forgot-password
// @desc    Request password reset
// @access  Public
router.post('/forgot-password', forgotPassword);

// @route   POST /api/auth/reset-password
// @desc    Reset password with token
// @access  Public
router.post('/reset-password', resetPassword);

// @route   PUT /api/auth/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', auth, updateProfile);

// @route   POST /api/auth/address
// @desc    Add a new address for a user
// @access  Private
router.post('/address', auth, addAddress);

// @route   DELETE /api/auth/address/:id
// @desc    Delete a user's address
// @access  Private
router.delete('/address/:id', auth, deleteAddress);

const adminAuth = (req, res, next) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Access denied. Admin only.' });
  next();
};

// @route   GET /api/auth/users
// @desc    Get all users (admin only)
// @access  Private/Admin
router.get('/users', auth, adminAuth, getAllUsers);

// @route   PUT /api/auth/users/:id/role
// @desc    Update a user's role (admin only)
// @access  Private/Admin
router.put('/users/:id/role', auth, adminAuth, updateUserRole);

// @desc    Auth with Google
// @route   GET /api/auth/google
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// @desc    Google auth callback
// @route   GET /api/auth/google/callback
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
    // On successful authentication, Passport attaches the user to req.user.
    // We'll generate a JWT and send it back to a dedicated callback page on the frontend.
    const token = jwt.sign({ userId: req.user._id, role: req.user.role }, process.env.JWT_SECRET || 'your-secret-key', {
      expiresIn: '7d'
    });

    const user = {
      id: req.user._id,
      username: req.user.username,
      email: req.user.email,
      role: req.user.role,
      createdAt: req.user.createdAt
    };

    res.redirect(`${process.env.FRONTEND_URL}/oauth-callback?token=${token}&user=${encodeURIComponent(JSON.stringify(user))}`);
  }
);

module.exports = router;
