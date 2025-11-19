const Wishlist = require('../models/Wishlist');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const asyncHandler = require('./asyncHandler');

/**
 * @desc    Get user's wishlist
 * @route   GET /api/wishlist
 * @access  Private
 */
exports.getWishlist = asyncHandler(async (req, res) => {
  const wishlist = await Wishlist.findOne({ user: req.user.userId }).populate('items.product');
  if (!wishlist) {
    // If no wishlist, create one
    const newWishlist = await Wishlist.create({ user: req.user.userId, items: [] });
    return res.json(newWishlist);
  }
  res.json(wishlist);
});

/**
 * @desc    Add item to wishlist
 * @route   POST /api/wishlist
 * @access  Private
 */
exports.addToWishlist = asyncHandler(async (req, res) => {
  const { productId } = req.body;
  const userId = req.user.userId;

  const product = await Product.findById(productId);
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  let wishlist = await Wishlist.findOne({ user: userId });

  if (!wishlist) {
    wishlist = new Wishlist({ user: userId, items: [] });
  }

  const existingItemIndex = wishlist.items.findIndex(
    item => item.product.toString() === productId
  );

  if (existingItemIndex > -1) {
    // Item already in wishlist
    return res.status(400).json({ message: 'Product already in wishlist' });
  } else {
    // Add new item
    wishlist.items.push({ product: productId });
  }

  await wishlist.save();
  const populatedWishlist = await Wishlist.findById(wishlist._id).populate('items.product');
  res.status(200).json(populatedWishlist);
});

/**
 * @desc    Remove item from wishlist
 * @route   DELETE /api/wishlist/:productId
 * @access  Private
 */
exports.removeFromWishlist = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const userId = req.user.userId;

  const wishlist = await Wishlist.findOneAndUpdate(
    { user: userId },
    { $pull: { items: { product: productId } } },
    { new: true }
  ).populate('items.product');

  if (!wishlist) {
    res.status(404);
    throw new Error('Wishlist not found');
  }

  res.json(wishlist);
});
s
/**
 * @desc    Move item from wishlist to cart
 * @route   POST /api/wishlist/move-to-cart
 * @access  Private
 */
exports.moveToCart = asyncHandler(async (req, res) => {
  const { productId, quantity = 1, selectedColor, selectedSize } = req.body;
  const userId = req.user.userId;

  // Check if product exists
  const product = await Product.findById(productId);
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  // Remove from wishlist
  const wishlist = await Wishlist.findOneAndUpdate(
    { user: userId },
    { $pull: { items: { product: productId } } },
    { new: true }
  ).populate('items.product');

  if (!wishlist) {
    res.status(404);
    throw new Error('Wishlist not found');
  }

  // Add to cart
  let cart = await Cart.findOne({ user: userId });
  if (!cart) {
    cart = new Cart({ user: userId, items: [] });
  }

  const existingItemIndex = cart.items.findIndex(
    item => item.product.toString() === productId && item.selectedColor === selectedColor && item.selectedSize === selectedSize
  );

  if (existingItemIndex > -1) {
    // Update quantity if item already exists in cart
    cart.items[existingItemIndex].quantity += quantity;
  } else {
    // Add new item to cart
    cart.items.push({ product: productId, quantity, selectedColor, selectedSize });
  }

  await cart.save();

  res.json(wishlist);
});
