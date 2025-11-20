import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Clock } from 'lucide-react';

const RecentlyViewedProducts = ({ currentProductId }) => {
  const [recentlyViewed, setRecentlyViewed] = useState([]);

  useEffect(() => {
    const viewedItems = JSON.parse(localStorage.getItem('viewedItems') || '[]');
    // Filter out the current product and limit to 4 items
    const filtered = viewedItems.filter(item => item._id !== currentProductId).slice(0, 4);
    setRecentlyViewed(filtered);
  }, [currentProductId]);

  if (recentlyViewed.length === 0) {
    return null;
  }

  return (
    <div className="mb-16">
      <div className="flex items-center gap-3 mb-8">
        <Clock className="w-7 h-7 text-[#ea698b]" />
        <h2 className="text-3xl font-bold text-white">Recently Viewed</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {recentlyViewed.map(product => (
          <div key={product._id} className="bg-gradient-to-br from-[#1a0a2e] to-[#0a0015] border border-[#571089]/30 rounded-2xl overflow-hidden hover:border-[#ea698b]/50 transition-all duration-300 transform hover:-translate-y-2">
            <div className="relative">
              <img
                src={(product.imageUrls && product.imageUrls[0]) || product.imageUrl || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDMwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjMWEwYTJlIi8+Cjx0ZXh0IHg9IjE1MCIgeT0iMTUwIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaXJmIiBmb250LXNpemU9IjEyIiBmaWxsPSIjOWNhNGIxIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+Tm8gSW1hZ2U8L3RleHQ+Cjwvc3ZnPg=='}
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

export default RecentlyViewedProducts;
