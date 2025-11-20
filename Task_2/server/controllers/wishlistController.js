const asyncHandler = require('express-async-handler'); // Ensure this imports the package, not a local file
const Wishlist = require('../models/Wishlist');
const Cart = require('../models/Cart'); // Assuming Cart model exists
const Product = require('../models/Product'); // Assuming Product model exists

// @desc    Get user wishlist
// @route   GET /api/wishlist
// @access  Private
const getWishlist = asyncHandler(async (req, res) => {
  const wishlist = await Wishlist.findOne({ user: req.user._id }).populate('items.product');
  if (wishlist) {
    res.json(wishlist);
  } else {
    res.json({ items: [] }); // Return empty array if no wishlist found
  }
});

// @desc    Add item to wishlist
// @route   POST /api/wishlist
// @access  Private
const addToWishlist = asyncHandler(async (req, res) => {
  const { productId } = req.body;

  let wishlist = await Wishlist.findOne({ user: req.user._id });

  if (!wishlist) {
    wishlist = new Wishlist({ user: req.user._id, items: [] });
  }

  const productExists = await Product.findById(productId);
  if (!productExists) {
    res.status(404);
    throw new Error('Product not found');
  }

  const itemExists = wishlist.items.find(
    (item) => item.product.toString() === productId
  );

  if (itemExists) {
    res.status(400);
    throw new Error('Product already in wishlist');
  } else {
    wishlist.items.push({ product: productId });
  }

  await wishlist.save();
  res.status(201).json(wishlist);
});

// @desc    Remove item from wishlist
// @route   DELETE /api/wishlist/:id
// @access  Private
const removeFromWishlist = asyncHandler(async (req, res) => {
  const { id } = req.params; // This 'id' is the productId

  let wishlist = await Wishlist.findOne({ user: req.user._id });

  if (!wishlist) {
    res.status(404);
    throw new Error('Wishlist not found');
  }

  wishlist.items = wishlist.items.filter(
    (item) => item.product.toString() !== id
  );

  await wishlist.save();
  res.json({ message: 'Item removed from wishlist' });
});

// @desc    Move item from wishlist to cart
// @route   POST /api/wishlist/move-to-cart
// @access  Private
const moveToCart = asyncHandler(async (req, res) => {
  const { productId, quantity, selectedColor, selectedSize } = req.body;

  // 1. Validate product existence
  const product = await Product.findById(productId);
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  // 2. Remove from wishlist
  let wishlist = await Wishlist.findOne({ user: req.user._id });
  if (wishlist) {
    wishlist.items = wishlist.items.filter(
      (item) => item.product.toString() !== productId
    );
    await wishlist.save();
  }

  // 3. Add to cart
  let cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    cart = new Cart({ user: req.user._id, items: [] });
  }

  const cartItemExists = cart.items.find(
    (item) => item.product.toString() === productId &&
               item.selectedColor === selectedColor &&
               item.selectedSize === selectedSize
  );

  if (cartItemExists) {
    cartItemExists.quantity += quantity;
  } else {
    cart.items.push({ product: productId, quantity, selectedColor, selectedSize });
  }

  await cart.save();

  res.json({ message: 'Item moved to cart successfully', cart, wishlist });
});

module.exports = {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
  moveToCart,
};