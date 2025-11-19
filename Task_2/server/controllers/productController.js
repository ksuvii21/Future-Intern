const Product = require('../models/Product');
const mongoose = require('mongoose');
const Order = require('../models/Order');
const asyncHandler = require('./asyncHandler');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const NodeCache = require('node-cache');

// Initialize cache with a 2-minute TTL for product lists
const productCache = new NodeCache({ stdTTL: 120 });

// Configure multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Get all products
exports.getAllProducts = asyncHandler(async (req, res) => {
  const cacheKey = `products_${JSON.stringify(req.query)}`;
  if (productCache.has(cacheKey)) {
    return res.json(productCache.get(cacheKey));
  }

  const { search, category, minPrice, maxPrice, sortBy, sortOrder, page = 1, limit = 12 } = req.query;

    let query = {};

    // Search functionality (name and description)
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    // Category filtering
    const lowerCaseCategory = category?.toLowerCase();
    if (lowerCaseCategory && lowerCaseCategory !== 'all' && lowerCaseCategory !== 'all-categories') {
      if (lowerCaseCategory === 'new-arrivals') {
        query.isNewArrival = true;
      } else if (lowerCaseCategory !== 'collections') {
        // 'collections' will show all products by not adding a category filter
        query.category = { $regex: `^${category}$`, $options: 'i' };
      }
    }

    // Price range filtering
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    let sort = {};
    if (sortBy) {
      sort[sortBy] = sortOrder === 'desc' ? -1 : 1;
    } else {
      // Default sort
      sort.createdAt = -1;
    }

    const products = await Product.find(query)
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate('user', 'username'); // Optional: populate user info

    const count = await Product.countDocuments(query);

    const topProduct = await Product.findOne().sort({ price: -1 }); // More efficient than find().limit(1)
    const maxProductPrice = topProduct ? topProduct.price : 1000;

    const responseData = { products, maxProductPrice, totalPages: Math.ceil(count / limit), currentPage: Number(page) };
    productCache.set(cacheKey, responseData);

    res.json({
      products,
      maxProductPrice,
      totalPages: Math.ceil(count / limit),
      currentPage: Number(page),
    });
});

// @desc    Get product suggestions for search
// @route   GET /api/products/suggestions
// @access  Public
exports.getProductSuggestions = asyncHandler(async (req, res) => {
  const { q } = req.query;

  if (!q) {
    return res.json([]);
  }

  const suggestions = await Product.find({
    name: { $regex: q, $options: 'i' }
  })
  .limit(7) // Limit to 7 suggestions
  .select('name imageUrl _id'); // Select only necessary fields

  res.json(suggestions);
});

// Get single product
exports.getProductById = asyncHandler(async (req, res) => {
  // Add a check for a valid ObjectId to prevent CastError
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400);
    throw new Error('Invalid Product ID format');
  }

    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(404);
      throw new Error('Product not found');
    }
    res.json(product);
});

// Get products by seller
exports.getProductsBySeller = asyncHandler(async (req, res) => {
  const products = await Product.find({ user: req.user.userId });
  res.json(products);
});

// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Private
exports.createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);

    if (!product) {
    res.status(404);
    throw new Error('Product not found');
    }

    // Check if the user has already reviewed this product
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user.userId.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error('You have already reviewed this product');
    }

    // Check if the user has purchased this product
    const hasPurchased = await Order.findOne({
      user: req.user.userId,
      'products.product': req.params.id,
      status: 'delivered' // Only count delivered orders as a valid purchase
    });

    // Handle review images upload
    let reviewImages = [];

    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        try {
          const result = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
              { 
                folder: 'review-images',
                transformation: [{ width: 300, height: 300, crop: "limit", quality: "auto" }]
              },
              (error, result) => {
                if (error) reject(error);
                else resolve(result);
              }
            );
            stream.end(file.buffer);
          });
          reviewImages.push(result.secure_url);
        } catch (error) {
          console.error('Error uploading review image:', error);
        }
      }
    }

    const review = {
      name: req.user.username,
      rating: Number(rating),
      comment,
      user: req.user.userId,
      images: reviewImages,
      moderated: false,
      approved: null, // Pending moderation
      helpful: {
        upvotes: [],
        downvotes: []
      },      
      verified: !!hasPurchased // Set to true if a purchase is found, otherwise false
    };

    product.reviews.push(review);

    // Don't update rating until review is approved
    await product.save();
    res.status(201).json({ message: 'Review submitted successfully! It will be visible after moderation.' });
});

// Create product
exports.createProduct = asyncHandler(async (req, res) => {
  // Ensure the user creating the product is a seller or admin
  if (!['seller', 'admin'].includes(req.user.role)) {
    res.status(403);
    throw new Error('Access denied. Only sellers can create products.');
  }

    let imageUrl;
    let variants = [];

    if (req.user.role === 'admin') {
      imageUrl = req.body.imageUrl;

      // Handle variants for admin
      if (req.body.variants && Array.isArray(req.body.variants)) {
        variants = req.body.variants.map(variant => ({
          color: variant.color,
          imageUrl: variant.imageUrl.includes('drive.google.com')
            ? `https://drive.google.com/uc?export=view&id=${variant.imageUrl.match(/\/file\/d\/([a-zA-Z0-9_-]+)/)?.[1] || variant.imageUrl}`
            : variant.imageUrl,
          stock: variant.stock || 0
        }));
      }
    } else if (req.user.role === 'seller') {
      // Sellers upload images to Cloudinary
      if (req.file) {
        try {
          const result = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
              { 
                folder: 'seller-products',
                transformation: [{ width: 800, height: 800, crop: "limit", quality: "auto" }]
              },
              (error, result) => {
                if (error) reject(error);
                else resolve(result);
              }
            );
            stream.end(req.file.buffer);
          });
          imageUrl = result.secure_url;
        } catch (error) {
          res.status(500);
          throw new Error('Image upload failed: ' + error.message);
        }
      } else {
        res.status(400);
        throw new Error('Image file is required for seller products.');
      }

      // Handle variants for seller (if they provide multiple files)
      if (req.files && req.files.length > 1) {
        const variantColors = req.body.variantColors ? JSON.parse(req.body.variantColors) : [];
        for (let i = 1; i < req.files.length; i++) {
          const result = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
              { 
                folder: 'seller-products',
                transformation: [{ width: 800, height: 800, crop: "limit", quality: "auto" }]
              },
              (error, result) => {
                if (error) reject(error);
                else resolve(result);
              }
            );
            stream.end(req.files[i].buffer);
          });
          variants.push({
            color: variantColors[i-1] || `Variant ${i}`,
            imageUrl: result.secure_url,
            stock: req.body[`variantStock${i}`] || 0
          });
        }
      }
    }

    const { name, price, description, category, stock } = req.body;
    const product = new Product({
      name,
      price,
      description,
      category,
      stock,
      imageUrl,
      variants,
      user: req.user.userId, // Associate product with the creator
    });

    const newProduct = await product.save();

    res.status(201).json(newProduct);
});

// Update product
exports.updateProduct = asyncHandler(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400);
    throw new Error('Invalid Product ID format');
  }

  const productToUpdate = await Product.findById(req.params.id);

  if (!productToUpdate) {
    res.status(404);
    throw new Error('Product not found');
  }

  // Ensure only the owner of the product or an admin can update it
  if (productToUpdate.user.toString() !== req.user.userId && req.user.role !== 'admin') {
    res.status(403);
    throw new Error('Access denied. You do not own this product.');
  }
  // Explicitly define updatable fields to prevent mass assignment
  const { name, price, description, category, stock, imageUrl, variants } = req.body;
  const updatedFields = {
    name, price, description, category, stock, imageUrl, variants,
  };
  const product = await Product.findByIdAndUpdate(req.params.id, updatedFields, { new: true, runValidators: true });

  res.json(product);
});

// Delete product
exports.deleteProduct = asyncHandler(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400);
    throw new Error('Invalid Product ID format');
  }

  const productToDelete = await Product.findById(req.params.id);

  if (!productToDelete) {
    res.status(404);
    throw new Error('Product not found');
  }

  // Ensure only the owner of the product or an admin can delete it
  if (productToDelete.user.toString() !== req.user.userId && req.user.role !== 'admin') {
    res.status(403);
    throw new Error('Access denied. You do not own this product.');
  }
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: 'Product deleted' });
});

// @desc    Moderate review (approve/reject)
// @route   PUT /api/products/:productId/reviews/:reviewId/moderate
// @access  Private/Admin
exports.moderateReview = asyncHandler(async (req, res) => {
  const { approved } = req.body; // true for approve, false for reject

  const product = await Product.findById(req.params.productId);
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  const review = product.reviews.id(req.params.reviewId);
  if (!review) {
    res.status(404);
    throw new Error('Review not found');
  }

  review.moderated = true;
  review.approved = approved;

  // Recalculate rating if approved
  if (approved) {
    const approvedReviews = product.reviews.filter(r => r.approved === true);
    product.numReviews = approvedReviews.length;
    product.rating = approvedReviews.length > 0
      ? approvedReviews.reduce((acc, item) => item.rating + acc, 0) / approvedReviews.length
      : 0;
  }

  await product.save();

  // Create notification for user
  const Notification = require('../models/Notification');
  await Notification.create({
    user: review.user,
    type: approved ? 'review_approved' : 'review_rejected',
    title: approved ? 'Review Approved' : 'Review Rejected',
    message: approved
      ? `Your review for "${product.name}" has been approved and is now visible.`
      : `Your review for "${product.name}" has been rejected. Please ensure reviews follow our guidelines.`,
    data: {
      productId: product._id,
      reviewId: review._id
    }
  });

  res.json({ message: `Review ${approved ? 'approved' : 'rejected'} successfully` });
});

// @desc    Vote on review helpfulness
// @route   POST /api/products/:productId/reviews/:reviewId/vote
// @access  Private
exports.voteReview = asyncHandler(async (req, res) => {
  const { vote } = req.body; // 'up' or 'down'

  const product = await Product.findById(req.params.productId);
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  const review = product.reviews.id(req.params.reviewId);
  if (!review) {
    res.status(404);
    throw new Error('Review not found');
  }

  // Remove existing votes from this user
  review.helpful.upvotes = review.helpful.upvotes.filter(id => id.toString() !== req.user.userId);
  review.helpful.downvotes = review.helpful.downvotes.filter(id => id.toString() !== req.user.userId);

  // Add new vote
  if (vote === 'up') {
    review.helpful.upvotes.push(req.user.userId);
  } else if (vote === 'down') {
    review.helpful.downvotes.push(req.user.userId);
  }

  await product.save();
  res.json({ message: 'Vote recorded successfully' });
});

// @desc    Get pending reviews for moderation
// @route   GET /api/products/reviews/pending
// @access  Private/Admin
exports.getPendingReviews = asyncHandler(async (req, res) => {
  const products = await Product.find({
    'reviews.approved': null,
    'reviews.moderated': false
  }).populate('reviews.user', 'username email');

  const pendingReviews = [];
  products.forEach(product => {
    product.reviews.forEach(review => {
      if (review.approved === null && !review.moderated) {
        pendingReviews.push({
          _id: review._id,
          productId: product._id,
          productName: product.name,
          user: review.user,
          rating: review.rating,
          comment: review.comment,
          images: review.images,
          createdAt: review.createdAt
        });
      }
    });
  });

  res.json(pendingReviews);
});

// @desc    Subscribe to stock alerts
// @route   POST /api/products/:id/stock-alert
// @access  Private
exports.subscribeStockAlert = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  // Check if user is already subscribed
  const existingAlert = product.stockAlerts.find(
    alert => alert.user.toString() === req.user.userId
  );

  if (existingAlert) {
    res.status(400);
    throw new Error('Already subscribed to stock alerts for this product');
  }

  product.stockAlerts.push({
    user: req.user.userId,
    alerted: false
  });

  await product.save();
  res.json({ message: 'Stock alert subscription added' });
});

// @desc    Unsubscribe from stock alerts
// @route   DELETE /api/products/:id/stock-alert
// @access  Private
exports.unsubscribeStockAlert = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  product.stockAlerts = product.stockAlerts.filter(
    alert => alert.user.toString() !== req.user.userId
  );

  await product.save();
  res.json({ message: 'Stock alert subscription removed' });
});

// @desc    Bulk delete products
// @route   POST /api/products/bulk-delete
// @access  Private/Admin
exports.bulkDeleteProducts = asyncHandler(async (req, res) => {
  const { productIds } = req.body;

  if (!productIds || !Array.isArray(productIds) || productIds.length === 0) {
    res.status(400);
    throw new Error('Product IDs are required');
  }

  await Product.deleteMany({ _id: { $in: productIds } });

  res.json({ message: 'Products deleted successfully' });
});

// @desc    Bulk update products
// @route   POST /api/products/bulk-update
// @access  Private/Admin
exports.bulkUpdateProducts = asyncHandler(async (req, res) => {
  const { productIds, update } = req.body;

  if (!productIds || !Array.isArray(productIds) || productIds.length === 0 || !update) {
    res.status(400);
    throw new Error('Product IDs and update data are required');
  }

  await Product.updateMany({ _id: { $in: productIds } }, { $set: update });

  res.json({ message: 'Products updated successfully' });
});
