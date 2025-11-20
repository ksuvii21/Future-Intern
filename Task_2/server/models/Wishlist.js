const mongoose = require('mongoose');

const WishlistItemSchema = mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Product',
  },
  addedAt: {
    type: Date,
    default: Date.now,
  },
});

const WishlistSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
    unique: true, // Each user has one wishlist
  },
  items: [WishlistItemSchema],
});

module.exports = mongoose.model('Wishlist', WishlistSchema);