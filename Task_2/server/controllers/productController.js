const Product = require('../models/Product');
const mongoose = require('mongoose');
const asyncHandler = require('./asyncHandler');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');

// Configure multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Get all products
exports.getAllProducts = asyncHandler(async (req, res) => {
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

    const review = {
      name: req.user.username, // Assuming username is on req.user from auth middleware
      rating: Number(rating),
      comment,
      user: req.user.userId,
    };

    product.reviews.push(review);

    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({ message: 'Review added successfully' });
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
              { folder: 'seller-products' },
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
              { folder: 'seller-products' },
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
