const mongoose = require('mongoose');

const CartItemSchema = mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Product',
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
  },
  selectedColor: {
    type: String,
    required: false,
  },
  selectedSize: {
    type: String,
    required: false,
  },
  addedAt: {
    type: Date,
    default: Date.now,
  },
});

const CartSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
    unique: true, // Each user has one cart
  },
  items: [CartItemSchema],
});

module.exports = mongoose.model('Cart', CartSchema);