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

  return (
    <div className="product-card bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 border border-gray-100">
      <div className="relative group">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
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
            ${product.price}
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
            className={`flex-1 py-3 px-4 rounded-xl transition-all duration-300 font-semibold shadow-md hover:shadow-lg ${
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
