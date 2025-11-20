import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const addToCart = e => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItem = cart.find(item => item._id === product._id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    // Show a brief success message
    const button = e.target;
    const originalText = button.textContent;
    button.textContent = 'Added!';
    button.classList.add('bg-green-600', 'hover:bg-green-700');
    button.classList.remove('bg-orange-500', 'hover:bg-orange-600');
    setTimeout(() => {
      button.textContent = originalText;
      button.classList.remove('bg-green-600', 'hover:bg-green-700');
      button.classList.add('bg-orange-500', 'hover:bg-orange-600');
    }, 1000);
  };

  // Get the main image (first variant or default image)
  const mainImage = product.variants && product.variants.length > 0 ? product.variants[0].imageUrl : product.imageUrl;

  return (
    <div className="product-card bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-lg transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 border border-gray-100">
      <div className="relative group">
        {mainImage ? (
          <img
            src={mainImage}
            alt={product.name}
            className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
            onError={(e) => { // Fallback to local SVG if image fails to load
              e.target.onerror = null; // Prevent infinite loop if fallback also fails
              e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjMWEwYTJlIi8+Cjx0ZXh0IHg9IjIwMCIgeT0iMTUwIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjAiIGZpbGw9IiM5Y2E0YjEiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5ObyBJbWFnZTwvdGV4dD4KPC9zdmc+';
            }}
          />
        ) : (
          <div className="w-full h-56 bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center">
            <span className="text-6xl">📦</span>
          </div>
        )}
        <div className="absolute top-3 right-3">
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold shadow-md ${
              product.stock > 10
                ? 'bg-green-500 text-white'
                : product.stock > 0
                  ? 'bg-yellow-500 text-white'
                  : 'bg-red-500 text-white'
            }`}
          >
            {product.stock > 10
              ? '✓ In Stock'
              : product.stock > 0
                ? '⚠ Low Stock'
                : '✗ Out of Stock'}
          </span>
        </div>
        <div className="absolute top-3 left-3">
          <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-medium">
            {product.category}
          </span>
        </div>
        {/* Color variants indicator */}
        {product.variants && product.variants.length > 1 && (
          <div className="absolute bottom-3 left-3 flex gap-1">
            {product.variants.slice(0, 3).map((variant, index) => (
              <div
                key={index}
                className="w-3 h-3 rounded-full border border-white shadow-sm"
                style={{ backgroundColor: variant.color.toLowerCase() }}
                title={variant.color}
              ></div>
            ))}
            {product.variants.length > 3 && (
              <div className="w-3 h-3 rounded-full bg-gray-400 border border-white shadow-sm flex items-center justify-center text-xs text-white font-bold">
                +
              </div>
            )}
          </div>
        )}
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 hover:text-orange-600 transition-colors">
          {product.name}
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-3 text-sm leading-relaxed">
          {product.description}
        </p>
        <div className="flex justify-between items-center mb-5">
          <span className="text-3xl font-extrabold text-orange-600">
            ₹{product.price.toLocaleString('en-IN')}
          </span>
          <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
            Stock: {product.stock}
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
            onClick={addToCart}
            disabled={product.stock === 0}
            className={`flex-1 py-3 px-4 rounded-xl transition-all duration-300 font-semibold shadow-md hover:shadow-md ${
              product.stock === 0
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 transform hover:scale-105'
            }`}
          >
            {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
