const Cart = require('../models/Cart');
const Product = require('../models/Product');
const asyncHandler = require('./asyncHandler');

/**
 * @desc    Get user's cart
 * @route   GET /api/cart
 * @access  Private
 */
exports.getCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ user: req.user.userId }).populate('items.product');
  if (!cart) {
    // If no cart, create one
    const newCart = await Cart.create({ user: req.user.userId, items: [] });
    return res.json(newCart);
  }
  res.json(cart);
});

/**
 * @desc    Add item to cart or update quantity
 * @route   POST /api/cart
 * @access  Private
 */
exports.addItemToCart = asyncHandler(async (req, res) => {
  const { productId, quantity, selectedColor, selectedSize } = req.body;
  const userId = req.user.userId;

  const product = await Product.findById(productId);
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  let cart = await Cart.findOne({ user: userId });

  if (!cart) {
    cart = new Cart({ user: userId, items: [] });
  }

  const existingItemIndex = cart.items.findIndex(
    item => item.product.toString() === productId && item.selectedColor === selectedColor && item.selectedSize === selectedSize
  );

  if (existingItemIndex > -1) {
    // Update quantity
    cart.items[existingItemIndex].quantity += quantity;
  } else {
    // Add new item
    cart.items.push({ product: productId, quantity, selectedColor, selectedSize });
  }

  await cart.save();
  const populatedCart = await Cart.findById(cart._id).populate('items.product');
  res.status(200).json(populatedCart);
});

/**
 * @desc    Update item quantity in cart
 * @route   PUT /api/cart/:itemId
 * @access  Private
 */
exports.updateCartItem = asyncHandler(async (req, res) => {
  const { itemId } = req.params;
  const { quantity } = req.body;
  const userId = req.user.userId;

  if (quantity <= 0) {
    // If quantity is 0 or less, remove the item
    const cart = await Cart.findOneAndUpdate(
      { user: userId },
      { $pull: { items: { _id: itemId } } },
      { new: true }
    ).populate('items.product');
    return res.json(cart);
  }

  const cart = await Cart.findOneAndUpdate(
    { user: userId, 'items._id': itemId },
    { $set: { 'items.$.quantity': quantity } },
    { new: true }
  ).populate('items.product');

  if (!cart) {
    res.status(404);
    throw new Error('Cart or item not found');
  }

  res.json(cart);
});

/**
 * @desc    Remove item from cart
 * @route   DELETE /api/cart/:itemId
 * @access  Private
 */
exports.removeItemFromCart = asyncHandler(async (req, res) => {
  const { itemId } = req.params;
  const userId = req.user.userId;

  const cart = await Cart.findOneAndUpdate(
    { user: userId },
    { $pull: { items: { _id: itemId } } },
    { new: true }
  ).populate('items.product');

  if (!cart) {
    res.status(404);
    throw new Error('Cart not found');
  }

  res.json(cart);
});