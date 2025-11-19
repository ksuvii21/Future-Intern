const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  type: {
    type: String,
    required: true,
    enum: [
      'order_status',
      'price_drop',
      'back_in_stock',
      'review_approved',
      'review_rejected',
      'new_message',
      'system'
    ]
  },
  title: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  data: {
    // Additional data specific to notification type
    orderId: mongoose.Schema.Types.ObjectId,
    productId: mongoose.Schema.Types.ObjectId,
    oldPrice: Number,
    newPrice: Number,
    reviewId: mongoose.Schema.Types.ObjectId
  },
  read: {
    type: Boolean,
    default: false
  },
  emailSent: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Index for efficient queries
notificationSchema.index({ user: 1, createdAt: -1 });
notificationSchema.index({ read: 1, user: 1 });

module.exports = mongoose.model('Notification', notificationSchema);
