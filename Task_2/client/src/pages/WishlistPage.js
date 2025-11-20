import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Share2, Eye, Star, ShoppingBag, X, Loader } from 'lucide-react';
import axios from 'axios';

const WishlistPage = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [sharedItems, setSharedItems] = useState([]);
  const [viewedItems, setViewedItems] = useState([]);
  const [activeTab, setActiveTab] = useState('collection');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadWishlist = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Please login to view your wishlist');
        setLoading(false);
        return;
      }

      const response = await axios.get('http://localhost:5000/api/wishlist', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setWishlistItems(response.data.items || []);
    } catch (err) {
      console.error('Error loading wishlist:', err);
      setError('Failed to load wishlist');
    } finally {
      setLoading(false);
    }
  };

  const loadItemsFromStorage = () => {
    const savedViewed = localStorage.getItem('viewedItems');
    if (savedViewed) {
      setViewedItems(JSON.parse(savedViewed));
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    loadWishlist();
    loadItemsFromStorage();

    // Mock data for shared items
    setSharedItems([]); // Clearing mock data for now

    // Listen for storage changes to update the UI in real-time
    window.addEventListener('storage', loadItemsFromStorage);

    return () => {
      window.removeEventListener('storage', loadItemsFromStorage);
    };
  }, []);

  const removeFromWishlist = async (productId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete(`/api/wishlist/${productId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setWishlistItems(response.data.items || []);
    } catch (err) {
      console.error('Error removing from wishlist:', err);
      setError('Failed to remove item from wishlist');
    }
  };

  const addToCart = async (product) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please login to add items to cart');
        return;
      }

      await axios.post('http://localhost:5000/api/cart', {
        productId: product._id,
        quantity: 1,
        selectedColor: product.selectedColor || '',
        selectedSize: product.selectedSize || 'M'
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert('Item added to cart!');
    } catch (err) {
      console.error('Error adding to cart:', err);
      if (err.response?.status === 401) {
        alert('Please log in to add items to cart.');
      } else {
        alert('Failed to add item to cart');
      }
    }
  };

  const moveToCart = async (product) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please login to move items to cart');
        return;
      }

      await axios.post('http://localhost:5000/api/wishlist/move-to-cart', {
        productId: product._id,
        quantity: 1,
        selectedColor: product.selectedColor || '',
        selectedSize: product.selectedSize || 'M'
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      // Remove from local wishlist state
      setWishlistItems(prev => prev.filter(item => item.product._id !== product._id));
      alert('Item moved to cart!');
    } catch (err) {
      console.error('Error moving to cart:', err);
      if (err.response?.status === 401) {
        alert('Please log in to move items to cart.');
      } else {
        alert('Failed to move item to cart');
      }
    }
  };

  const renderProductCard = (item, showRemove = false, showSharedInfo = false) => {
    const product = item.product || item; // Handle both populated and non-populated data
    return (
      <div
        key={product._id || product.id}
        className="group bg-gradient-to-br from-[#1a0a2e] to-[#0a0015] border border-[#571089]/30 rounded-2xl overflow-hidden hover:border-[#ea698b]/50 transition-all duration-300 hover:shadow-xl hover:shadow-[#ea698b]/20 hover:-translate-y-2"
      >
        <div className="relative overflow-hidden bg-gradient-to-br from-[#571089]/20 to-[#47126b]/20 aspect-square">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjZWNlZmYxIi8+Cjx0ZXh0IHg9IjUwIiB5PSI1MCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjEyIiBmaWxsPSIjY2FkNmU0IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+Tm8gSW1hZ2U8L3RleHQ+Cjwvc3ZnPg==';
            }}
          />
          {showRemove && (
            <button
              onClick={() => removeFromWishlist(product._id)}
              className="absolute top-3 right-3 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        <div className="p-6">
          <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 hover:text-[#ea698b] transition-colors">
            {product.name}
          </h3>
          <p className="text-gray-400 mb-4 line-clamp-3 text-sm leading-relaxed">
            {product.description}
          </p>
          <div className="flex justify-between items-center mb-5">
            <span className="text-3xl font-extrabold text-[#ea698b]">
              ₹{product.price?.toLocaleString('en-IN') || 'N/A'}
            </span>
            <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
              Stock: {product.stock || 0}
            </span>
          </div>
          <div className="flex space-x-3">
            <Link
              to={`/product/${product._id}`}
              className="flex-1 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 py-3 px-4 rounded-xl hover:from-gray-200 hover:to-gray-300 transition-all duration-300 text-center font-semibold shadow-md hover:shadow-lg"
            >
              View Details
            </Link>
            <button
              onClick={() => showRemove ? moveToCart(product) : addToCart(product)}
              disabled={product.stock === 0}
              className={`flex-1 py-3 px-4 rounded-xl transition-all duration-300 font-semibold shadow-md hover:shadow-lg ${
                product.stock === 0
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-[#ea698b] to-[#d55d92] text-white hover:shadow-lg hover:shadow-[#ea698b]/50'
              }`}
            >
              {product.stock === 0 ? 'Out of Stock' : (showRemove ? 'Move to Cart' : 'Add to Cart')}
            </button>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0a0015] to-[#1a0a2e] flex items-center justify-center">
        <Loader className="w-8 h-8 animate-spin text-[#ea698b]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0a0015] to-[#1a0a2e] flex items-center justify-center">
        <div className="text-center">
          <Heart className="w-24 h-24 text-gray-600 mx-auto mb-6" />
          <h3 className="text-2xl font-bold text-white mb-4">{error}</h3>
          <Link
            to="/login"
            className="px-8 py-4 bg-gradient-to-r from-[#ea698b] to-[#d55d92] text-white font-semibold rounded-full hover:shadow-lg hover:shadow-[#ea698b]/50 transition-all duration-300"
          >
            Login to Continue
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0015] to-[#1a0a2e]">
      <section className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-[#ea698b] to-[#d55d92] bg-clip-text text-transparent mb-4">
              My Wishlist
            </h1>
            <p className="text-xl text-gray-400">
              Your curated collection of favorite items
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex justify-center mb-8">
            <div className="bg-[#1a0a2e]/50 backdrop-blur-sm border border-[#571089]/30 rounded-2xl p-2 flex space-x-2">
              <button
                onClick={() => setActiveTab('collection')}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  activeTab === 'collection'
                    ? 'bg-gradient-to-r from-[#ea698b] to-[#d55d92] text-white shadow-lg'
                    : 'text-gray-400 hover:text-white hover:bg-[#571089]/20'
                }`}
              >
                <Heart className="w-4 h-4 inline mr-2" />
                Your Collection ({wishlistItems.length})
              </button>
              <button
                onClick={() => setActiveTab('shared')}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  activeTab === 'shared'
                    ? 'bg-gradient-to-r from-[#ea698b] to-[#d55d92] text-white shadow-lg'
                    : 'text-gray-400 hover:text-white hover:bg-[#571089]/20'
                }`}
              >
                <Share2 className="w-4 h-4 inline mr-2" />
                Shared
              </button>
              <button
                onClick={() => setActiveTab('viewed')}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  activeTab === 'viewed'
                    ? 'bg-gradient-to-r from-[#ea698b] to-[#d55d92] text-white shadow-lg'
                    : 'text-gray-400 hover:text-white hover:bg-[#571089]/20'
                }`}
              >
                <Eye className="w-4 h-4 inline mr-2" />
                Recently Viewed
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="tab-content">
            {activeTab === 'collection' && (
              <div>
                {wishlistItems.length === 0 ? (
                  <div className="text-center py-16">
                    <Heart className="w-24 h-24 text-gray-600 mx-auto mb-6" />
                    <h3 className="text-2xl font-bold text-white mb-4">Your wishlist is empty</h3>
                    <p className="text-gray-400 mb-8">Start adding items you love to your collection</p>
                    <Link
                      to="/"
                      className="px-8 py-4 bg-gradient-to-r from-[#ea698b] to-[#d55d92] text-white font-semibold rounded-full hover:shadow-lg hover:shadow-[#ea698b]/50 transition-all duration-300"
                    >
                      Explore Products
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {wishlistItems.map(item => renderProductCard(item, true))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'shared' && (
              <div>
                {sharedItems.length === 0 ? (
                  <div className="text-center py-16">
                    <Share2 className="w-24 h-24 text-gray-600 mx-auto mb-6" />
                    <h3 className="text-2xl font-bold text-white mb-4">No shared items yet</h3>
                    <p className="text-gray-400 mb-8">Items shared with you will appear here</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {sharedItems.map(product => renderProductCard(product, false, true))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'viewed' && (
              <div>
                {viewedItems.length === 0 ? (
                  <div className="text-center py-16">
                    <Eye className="w-24 h-24 text-gray-600 mx-auto mb-6" />
                    <h3 className="text-2xl font-bold text-white mb-4">No recently viewed items</h3>
                    <p className="text-gray-400 mb-8">Items you've viewed recently will appear here</p>
                    <Link
                      to="/"
                      className="px-8 py-4 bg-gradient-to-r from-[#ea698b] to-[#d55d92] text-white font-semibold rounded-full hover:shadow-lg hover:shadow-[#ea698b]/50 transition-all duration-300"
                    >
                      Browse Products
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {viewedItems.slice(0, 6).map(product => renderProductCard(product, false))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default WishlistPage;
