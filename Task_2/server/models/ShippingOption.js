const mongoose = require('mongoose');

const shippingOptionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  cost: {
    type: Number,
    required: true,
    min: 0,
  },
  estimatedDelivery: {
    type: String,
    required: true,
    trim: true,
  },
  user: { // The seller who created the shipping option
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('ShippingOption', shippingOptionSchema);