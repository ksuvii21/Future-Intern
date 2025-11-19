const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  name: { type: String, required: true },
  rating: { type: Number, required: true },
  comment: { type: String, required: true },
  verified: { type: Boolean, default: false }, // For "Verified Purchase" badge
}, {
  timestamps: true,
});

const variantSchema = new mongoose.Schema({
  color: { type: String, required: true },
  imageUrl: { type: String, required: true },
  stock: { type: Number, default: 0 },
}, {
  _id: false, // Prevent automatic _id generation for subdocuments
});

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    default: 0,
  },
  imageUrl: {
    type: String,
  },
  isNewArrival: {
    type: Boolean,
    default: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  variants: [variantSchema], // New field for color variants
  reviews: [reviewSchema],
  rating: {
    type: Number,
    required: true,
    default: 0,
  },
  numReviews: {
    type: Number,
    required: true,
    default: 0,
  },
  priceHistory: [{
    price: { type: Number, required: true },
    date: { type: Date, default: Date.now }
  }],
  stockAlerts: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    alerted: { type: Boolean, default: false }
  }],
}, {
  timestamps: true,
});

module.exports = mongoose.model('Product', productSchema, 'products');
