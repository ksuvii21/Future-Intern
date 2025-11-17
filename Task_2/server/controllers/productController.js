const Product = require('../models/Product');
const mongoose = require('mongoose');

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
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
    if (category && category.toLowerCase() !== 'all' && category.toLowerCase() !== 'all categories') {
      query.category = { $regex: `^${category}$`, $options: 'i' };
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
      .skip((page - 1) * limit);

    const count = await Product.countDocuments(query);

    const topProduct = await Product.find().sort({ price: -1 }).limit(1);
    const maxProductPrice = topProduct.length > 0 ? topProduct[0].price : 1000;

    res.json({
      products,
      maxProductPrice,
      totalPages: Math.ceil(count / limit),
      currentPage: Number(page),
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error retrieving products', error: error.message });
  }
};

// Get single product
exports.getProductById = async (req, res) => {
  try {
    // Add a check for a valid ObjectId to prevent CastError
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid Product ID format' });
    }

    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Private
exports.createProductReview = async (req, res) => {
  const { rating, comment } = req.body;

  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check if the user has already reviewed this product
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user.userId.toString()
    );

    if (alreadyReviewed) {
      return res.status(400).json({ message: 'You have already reviewed this product' });
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
  } catch (error) {
    console.error('Create review error:', error);
    res.status(500).json({ message: 'Server error while adding review' });
  }
};

// Create product
exports.createProduct = async (req, res) => {
  try {
    // Ensure the user creating the product is a seller or admin
    if (!['seller', 'admin'].includes(req.user.role)) {
      return res.status(403).json({ message: 'Access denied. Only sellers can create products.' });
    }

    const { name, price, description, category, stock, imageUrl } = req.body;
    const product = new Product({
      name,
      price,
      description,
      category,
      stock,
      imageUrl,
      user: req.user.userId, // Associate product with the seller
    });

    const newProduct = await product.save();

    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update product
exports.updateProduct = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid Product ID format' });
    }

    const productToUpdate = await Product.findById(req.params.id);

    if (!productToUpdate) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Ensure only the owner of the product or an admin can update it
    if (productToUpdate.user.toString() !== req.user.userId && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. You do not own this product.' });
    }
    // Explicitly define updatable fields to prevent mass assignment
    const { name, price, description, category, stock, imageUrl } = req.body;
    const updatedFields = {
      name,
      price,
      description,
      category,
      stock,
      imageUrl,
    };
    const product = await Product.findByIdAndUpdate(req.params.id, updatedFields, { new: true, runValidators: true });

    res.json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete product
exports.deleteProduct = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid Product ID format' });
    }

    const productToDelete = await Product.findById(req.params.id);

    if (!productToDelete) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Ensure only the owner of the product or an admin can delete it
    if (productToDelete.user.toString() !== req.user.userId && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. You do not own this product.' });
    }
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
