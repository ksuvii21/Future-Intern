import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Share2, Eye, Star, ShoppingBag, X } from 'lucide-react';

const WishlistPage = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [sharedItems, setSharedItems] = useState([]);
  const [viewedItems, setViewedItems] = useState([]);
  const [activeTab, setActiveTab] = useState('collection');

  const loadItemsFromStorage = () => {
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      setWishlistItems(JSON.parse(savedWishlist));
    }
    const savedViewed = localStorage.getItem('viewedItems');
    if (savedViewed) {
      setViewedItems(JSON.parse(savedViewed));
    }
  };

  useEffect(() => {
    loadItemsFromStorage();

    // Listen for storage changes to update the UI in real-time
    window.addEventListener('storage', loadItemsFromStorage);

    // Mock data for shared items
    setSharedItems([]); // Clearing mock data for now

    return () => {
      window.removeEventListener('storage', loadItemsFromStorage);
    };
  }, []);

  const removeFromWishlist = (productId) => {
    const updatedWishlist = wishlistItems.filter(item => item._id !== productId);
    setWishlistItems(updatedWishlist);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
  };

  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItem = cart.find(item => item._id === product._id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('storage'));
  };

  const renderProductCard = (product, showRemove = false, showSharedInfo = false) => (
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
            e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjMWEwYTJlIi8+Cjx0ZXh0IHg9IjIwMCIgeT0iMjAwIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM5Y2E0YjEiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5ObyBJbWFnZTwvdGV4dD4KPC9zdmc+';
          }}
        />
        {showRemove && (
          <button
            onClick={() => removeFromWishlist(product._id)}
            className="absolute top-4 right-4 p-2 bg-red-500/80 backdrop-blur-sm rounded-full text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-red-600"
          >
            <X className="w-4 h-4" />
          </button>
        )}
        <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
          <button
            onClick={() => addToCart(product)}
            className="w-full py-3 bg-gradient-to-r from-[#ea698b] to-[#d55d92] text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-[#ea698b]/50 transition-all"
          >
            Add to Cart
          </button>
        </div>
      </div>
      <div className="p-6">
        {showSharedInfo && (
          <div className="flex items-center gap-2 mb-3">
            <Share2 className="w-4 h-4 text-[#ea698b]" />
            <span className="text-xs text-[#ea698b] font-medium">
              Shared by {product.sharedBy} • {product.sharedDate}
            </span>
          </div>
        )}
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-[#ea698b] font-medium px-3 py-1 bg-[#ea698b]/10 rounded-full">
            {product.category}
          </span>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-[#ea698b] text-[#ea698b]" />
            <span className="text-sm text-gray-400">{product.rating || 4.5}</span>
            <span className="text-xs text-gray-500">({product.numReviews || 0})</span>
          </div>
        </div>
        <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-[#ea698b] transition-colors">
          {product.name}
        </h3>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold bg-gradient-to-r from-[#ea698b] to-[#d55d92] bg-clip-text text-transparent">
            ₹{product.price}
          </span>
          <button className="p-2 bg-gradient-to-r from-[#ea698b] to-[#d55d92] text-white rounded-lg hover:shadow-lg hover:shadow-[#ea698b]/50 transition-all">
            <ShoppingBag className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0015] via-[#1a0a2e] to-[#0a0015]">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-block px-4 py-2 bg-gradient-to-r from-[#ea698b]/20 to-[#822faf]/20 border border-[#ea698b]/30 rounded-full mb-6">
            <span className="text-[#ea698b] text-sm font-medium">❤️ Your Wishlist</span>
          </div>
          <h1 className="text-5xl lg:text-7xl font-bold leading-tight mb-6">
            <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
              Curated
            </span>
            <br />
            <span className="bg-gradient-to-r from-[#ea698b] via-[#c05299] to-[#822faf] bg-clip-text text-transparent">
              Collection
            </span>
          </h1>
          <p className="text-xl text-gray-400 leading-relaxed max-w-3xl mx-auto">
            Your personal collection of favorite items, shared recommendations, and recently viewed products.
          </p>
        </div>
      </section>

      {/* Tabs */}
      <section className="px-4 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center gap-3 mb-8">
            <button
              onClick={() => setActiveTab('collection')}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 flex items-center gap-2 ${
                activeTab === 'collection'
                  ? 'bg-gradient-to-r from-[#ea698b] to-[#d55d92] text-white shadow-lg shadow-[#ea698b]/30'
                  : 'bg-white/5 backdrop-blur-sm border border-[#571089]/30 text-gray-300 hover:bg-white/10 hover:border-[#ea698b]/50'
              }`}
            >
              <Heart className="w-4 h-4" />
              Your Collection ({wishlistItems.length})
            </button>
            <button
              onClick={() => setActiveTab('shared')}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 flex items-center gap-2 ${
                activeTab === 'shared'
                  ? 'bg-gradient-to-r from-[#ea698b] to-[#d55d92] text-white shadow-lg shadow-[#ea698b]/30'
                  : 'bg-white/5 backdrop-blur-sm border border-[#571089]/30 text-gray-300 hover:bg-white/10 hover:border-[#ea698b]/50'
              }`}
            >
              <Share2 className="w-4 h-4" />
              Shared ({sharedItems.length})
            </button>
            <button
              onClick={() => setActiveTab('viewed')}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 flex items-center gap-2 ${
                activeTab === 'viewed'
                  ? 'bg-gradient-to-r from-[#ea698b] to-[#d55d92] text-white shadow-lg shadow-[#ea698b]/30'
                  : 'bg-white/5 backdrop-blur-sm border border-[#571089]/30 text-gray-300 hover:bg-white/10 hover:border-[#ea698b]/50'
              }`}
            >
              <Eye className="w-4 h-4" />
              Viewed ({viewedItems.length})
            </button>
          </div>

          {/* Content */}
          <div className="min-h-[400px]">
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
                    {wishlistItems.map(product => renderProductCard(product, true))}
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
