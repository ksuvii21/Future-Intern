import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, TrendingUp } from 'lucide-react';
import axios from 'axios';

const PersonalizedRecommendations = ({ currentProduct }) => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        // Get user's browsing history and preferences
        const viewedItems = JSON.parse(localStorage.getItem('viewedItems') || '[]');
        const wishlistItems = JSON.parse(localStorage.getItem('wishlist') || '[]');

        // Get all products
        const response = await axios.get('http://localhost:5000/api/products');
        const allProducts = response.data.products;

        // Simple recommendation algorithm
        let recommended = [];

        // 1. Products from same category (excluding current product)
        const sameCategory = allProducts.filter(p =>
          p.category === currentProduct.category && p._id !== currentProduct._id
        );

        // 2. Products with similar price range (±20%)
        const priceRange = allProducts.filter(p =>
          p._id !== currentProduct._id &&
          p.price >= currentProduct.price * 0.8 &&
          p.price <= currentProduct.price * 1.2
        );

        // 3. Recently viewed items from different categories
        const recentlyViewed = viewedItems.filter(item =>
          item.category !== currentProduct.category
        ).slice(0, 2);

        // 4. Popular items (high rating)
        const popularItems = allProducts.filter(p =>
          p._id !== currentProduct._id &&
          p.rating >= 4.0
        ).sort((a, b) => b.rating - a.rating);

        // Combine recommendations with priority
        recommended = [
          ...sameCategory.slice(0, 2),
          ...priceRange.slice(0, 2),
          ...recentlyViewed.slice(0, 1),
          ...popularItems.slice(0, 2)
        ];

        // Remove duplicates and limit to 6 items
        const uniqueRecommendations = recommended.filter((item, index, self) =>
          index === self.findIndex(t => t._id === item._id)
        ).slice(0, 6);

        setRecommendations(uniqueRecommendations);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching recommendations:', error);
        setLoading(false);
      }
    };

    if (currentProduct) {
      fetchRecommendations();
    }
  }, [currentProduct]);

  if (loading || recommendations.length === 0) {
    return null;
  }

  return (
    <div className="mt-16">
      <div className="flex items-center gap-3 mb-8">
        <Sparkles className="w-7 h-7 text-[#ea698b]" />
        <h2 className="text-3xl font-bold text-white">Recommended for You</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {recommendations.map(product => (
          <div key={product._id} className="bg-gradient-to-br from-[#1a0a2e] to-[#0a0015] border border-[#571089]/30 rounded-2xl overflow-hidden hover:border-[#ea698b]/50 transition-all duration-300 transform hover:-translate-y-2">
            <div className="relative">
              <img
                src={(product.imageUrls && product.imageUrls[0]) || product.imageUrl || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDMwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjMWEwYTJlIi8+Cjx0ZXh0IHg9IjE1MCIgeT0iMTUwIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTIiIGZpbGw9IiM5Y2E0YjEiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5ObyBJbWFnZTwvdGV4dD4KPC9zdmc+'}
                alt={product.name}
                className="w-full h-48 object-cover"
                onError={(e) => {
                  e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDMwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjMWEwYTJlIi8+Cjx0ZXh0IHg9IjE1MCIgeT0iMTUwIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTIiIGZpbGw9IiM5Y2E0YjEiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5ObyBJbWFnZTwvdGV4dD4KPC9zdmc+';
                }}
              />
              {product.isNewArrival && (
                <div className="absolute top-3 left-3 bg-gradient-to-r from-[#ea698b] to-[#d55d92] text-white text-xs font-bold px-2 py-1 rounded-full">
                  NEW
                </div>
              )}
              {product.rating >= 4.5 && (
                <div className="absolute top-3 right-3 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  HOT
                </div>
              )}
            </div>
            <div className="p-4">
              <h3 className="text-white font-semibold mb-2 line-clamp-2">{product.name}</h3>
              <p className="text-gray-400 text-sm mb-3 line-clamp-2">{product.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold bg-gradient-to-r from-[#ea698b] to-[#d55d92] bg-clip-text text-transparent">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                <Link
                  to={`/product/${product._id}`}
                  className="px-4 py-2 bg-[#ea698b] text-white text-sm rounded-lg hover:bg-[#d55d92] transition-all"
                >
                  View
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PersonalizedRecommendations;
