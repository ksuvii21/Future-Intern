import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const addToCart = (e) => {
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
    <div className="product-card bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-48 object-cover"
          />
        ) : (
          <div className="w-full h-48 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
            <span className="text-4xl">📦</span>
          </div>
        )}
        <div className="absolute top-2 right-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            product.stock > 10 ? 'bg-green-100 text-green-800' :
            product.stock > 0 ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            {product.stock > 10 ? 'In Stock' :
             product.stock > 0 ? 'Low Stock' : 'Out of Stock'}
          </span>
        </div>
      </div>
      <div className="p-6">
        <div className="mb-2">
          <span className="inline-block bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full font-medium">
            {product.category}
          </span>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
        <p className="text-gray-600 mb-4 line-clamp-3">{product.description}</p>
        <div className="flex justify-between items-center mb-4">
          <span className="text-3xl font-bold text-orange-600">${product.price}</span>
          <span className="text-sm text-gray-500">Stock: {product.stock}</span>
        </div>
        <div className="flex space-x-3">
          <Link
            to={`/product/${product._id}`}
            className="flex-1 bg-gray-100 text-gray-800 py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors text-center font-medium"
          >
            View Details
          </Link>
          <button
            onClick={addToCart}
            disabled={product.stock === 0}
            className={`flex-1 py-3 px-4 rounded-lg transition-colors font-medium ${
              product.stock === 0
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-orange-500 text-white hover:bg-orange-600'
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
