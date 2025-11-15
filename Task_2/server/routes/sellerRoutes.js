const express = require('express');
const router = express.Router();
const { becomeSeller } = require('../controllers/sellerController');
const auth = require('../middleware/auth');

// @route   PUT /api/seller/become-seller
// @desc    Upgrade user role to seller
// @access  Private
router.put('/become-seller', auth, becomeSeller);

module.exports = router;