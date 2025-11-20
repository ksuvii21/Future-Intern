import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Plus, Minus, X, CreditCard, Truck, Shield } from 'lucide-react';
import axios from 'axios';

const Cart = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem('token');
      
      if (!token) {
        // Handle guest cart from localStorage
        const localCart = JSON.parse(localStorage.getItem('cart') || '[]');
        // The component expects each item to have a `product` property.
        // The items in localStorage are the product objects themselves, with an added `quantity`.
        // We need to map them to the expected structure: { product: {...}, quantity: X }
        const formattedItems = localCart.map(item => ({
          product: item, // The item from localStorage is the product
          quantity: item.quantity,
          _id: item._id // Use product's _id as the item's key
        }));
        setCart({ items: formattedItems });
        setLoading(false);
        return;
      }
      
      // Fetch cart for logged-in user
      const response = await axios.get('/api/cart', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCart(response.data);
    } catch (error) {
      console.error('Error fetching cart:', error);
      setError('Failed to load cart');
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please log in to remove items from cart');
        return;
      }

      await axios.delete(`/api/cart/${itemId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      fetchCart(); // Refresh cart
      // Trigger cart count update
      window.dispatchEvent(new Event('storage'));
    } catch (error) {
      console.error('Error removing from cart:', error);
      alert('Failed to remove item from cart');
    }
  };

  const updateQuantity = async (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please log in to update cart');
        return;
      }

      await axios.put(`/api/cart/${itemId}`, {
        quantity: newQuantity
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      fetchCart(); // Refresh cart
    } catch (error) {
      console.error('Error updating cart:', error);
      alert('Failed to update cart');
    }
  };

  // Filter out items where the product might have been deleted
  const validCartItems = cart?.items?.filter(item => item.product) || [];

  const totalPrice = validCartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  const shipping = totalPrice > 4250 ? 0 : 849.15;
  const tax = totalPrice * 0.08;
  const finalTotal = totalPrice + shipping + tax;

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-[#0a0015] via-[#1a0a2e] to-[#0a0015]">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#ea698b]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0a0015] via-[#1a0a2e] to-[#0a0015] flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😔</div>
          <h2 className="text-2xl font-bold text-white mb-2">Error Loading Cart</h2>
          <p className="text-gray-400 mb-6">{error}</p>
          <Link to="/" className="bg-gradient-to-r from-[#ea698b] to-[#d55d92] text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-[#ea698b]/50 transition-all">
            Go Back Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <div className="inline-block px-4 py-2 bg-gradient-to-r from-[#ea698b]/20 to-[#822faf]/20 border border-[#ea698b]/30 rounded-full mb-6">
          <span className="text-[#ea698b] text-sm font-medium">🛒 Your Shopping Cart</span>
        </div>
        <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-6">
          <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
            Shopping
          </span>
          <br />
          <span className="bg-gradient-to-r from-[#ea698b] via-[#c05299] to-[#822faf] bg-clip-text text-transparent">
            Cart
          </span>
        </h1>
      </div>

      {validCartItems.length === 0 ? (
        <div className="text-center py-16">
          <ShoppingBag className="w-24 h-24 text-gray-600 mx-auto mb-6" />
          <h3 className="text-2xl font-bold text-white mb-4">Your cart is empty</h3>
          <p className="text-gray-400 mb-8">Add some beautiful items to your cart</p>
          <Link
            to="/"
            className="px-8 py-4 bg-gradient-to-r from-[#ea698b] to-[#d55d92] text-white font-semibold rounded-full hover:shadow-lg hover:shadow-[#ea698b]/50 transition-all duration-300"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {validCartItems.map(item => (
                <div
                  key={item._id}
                  className="bg-gradient-to-br from-[#1a0a2e] to-[#0a0015] border border-[#571089]/30 rounded-2xl p-6 hover:border-[#ea698b]/50 transition-all duration-300"
                >
                  <div className="flex items-center gap-6">
                    {item.product.imageUrl && (
                      <div className="relative">
                        <img
                          src={item.product.imageUrl || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiBmaWxsPSIjMWEwYTJlIi8+Cjx0ZXh0IHg9IjQwIiB5PSI0MCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjEwIiBmaWxsPSIjOWNhNGIxIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+Tm8gSW1hZ2U8L3RleHQ+Cjwvc3ZnPg=='}
                          alt={item.product.name}
                          className="w-24 h-24 object-cover rounded-xl"
                          onError={(e) => {
                            e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjMWEwYTJlIi8+Cjx0ZXh0IHg9IjUwIiB5PSI1MCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjEwIiBmaWxsPSIjOWNhNGIxIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+Tm8gSW1hZ2U8L3RleHQ+Cjwvc3ZnPg==';
                          }}
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-white mb-2">{item.product.name}</h3>
                      <p className="text-gray-400 mb-4">{item.product.category}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold bg-gradient-to-r from-[#ea698b] to-[#d55d92] bg-clip-text text-transparent">
                          ₹{item.product.price.toLocaleString('en-IN')}
                        </span>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center bg-white/5 border border-[#571089]/30 rounded-lg">
                            <button
                              onClick={() => updateQuantity(item._id, item.quantity - 1)}
                              className="p-2 text-gray-400 hover:text-white hover:bg-[#ea698b]/20 rounded-l-lg transition-all"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="px-4 py-2 text-white font-medium">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item._id, item.quantity + 1)}
                              className="p-2 text-gray-400 hover:text-white hover:bg-[#ea698b]/20 rounded-r-lg transition-all"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                          <button
                            onClick={() => removeFromCart(item._id)}
                            className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-lg transition-all"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-[#1a0a2e] to-[#571089]/20 border border-[#571089]/30 rounded-2xl p-6 sticky top-8">
              <h3 className="text-2xl font-bold text-white mb-6">Order Summary</h3>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-300">
                  <span>Subtotal ({validCartItems.length} items)</span>
                  <span>₹{totalPrice.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Shipping</span>
                  <span className={shipping === 0 ? 'text-green-400' : ''}>
                    {shipping === 0 ? 'FREE' : `₹${(shipping * 85).toLocaleString('en-IN')}`}
                  </span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Tax</span>
                  <span>₹{tax.toLocaleString('en-IN')}</span>
                </div>
                <div className="border-t border-[#571089]/30 pt-4">
                  <div className="flex justify-between text-xl font-bold">
                    <span className="text-white">Total</span>
                    <span className="bg-gradient-to-r from-[#ea698b] to-[#d55d92] bg-clip-text text-transparent">
                      ₹{finalTotal.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>

              <Link
                to="/checkout"
                className="w-full py-4 bg-gradient-to-r from-[#ea698b] to-[#d55d92] text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-[#ea698b]/50 transition-all duration-300 flex items-center justify-center gap-2 mb-4"
              >
                <CreditCard className="w-5 h-5" />
                Proceed to Checkout
              </Link>

              <div className="space-y-3 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-green-400" />
                  <span>Free shipping on orders over ₹4250</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-blue-400" />
                  <span>Secure checkout guaranteed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
