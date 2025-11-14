import React, { useState, useEffect } from 'react';
import ProductList from '../components/ProductList';
import axios from 'axios';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const categories = [
    'All',
    ...new Set(products.map(product => product.category)),
  ];

  const filteredProducts = products.filter(product => {
    const matchesCategory =
      selectedCategory === 'All' || product.category === selectedCategory;
    return matchesCategory;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-indigo-2 to-indigo">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blush"></div>
      </div>
    );
  }

  return (
    <div className="home bg-gradient-to-br from-indigo-2 to-indigo min-h-screen">
      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-indigo to-grape-3 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up">
              <h1 className="text-6xl font-extrabold mb-6 leading-tight">
                Deals of the <span className="text-blush">Day</span>
              </h1>
              <p className="text-xl mb-8 opacity-90 leading-relaxed">
                Up to 70% off on selected items. Limited time offer! Don't miss
                out on these amazing deals.
              </p>
              <button className="bg-blush text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-thulian-pink hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                Shop Now →
              </button>
            </div>
            <div className="text-center animate-bounce-slow">
              <div className="text-9xl filter drop-shadow-2xl">🛍️</div>
              <div className="mt-4 text-2xl font-semibold opacity-80">
                Shop Smart, Save Big!
              </div>
            </div>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute top-10 right-10 w-20 h-20 bg-white bg-opacity-10 rounded-full animate-pulse"></div>
        <div className="absolute bottom-10 left-10 w-16 h-16 bg-blush bg-opacity-30 rounded-full animate-ping"></div>
      </section>

      {/* Category Filter */}
      <section className="bg-gray-900 py-6 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-blush text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-12 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-white">
              {selectedCategory === 'All' ? 'All Products' : selectedCategory}
            </h2>
            <span className="text-gray-400">
              {filteredProducts.length} items
            </span>
          </div>
          <ProductList products={filteredProducts} />
        </div>
      </section>

      {/* Promotional Banners */}
      <section className="py-12 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-r from-grape to-grape-2 text-white p-8 rounded-lg text-center border border-gray-700">
              <div className="text-4xl mb-4">🚚</div>
              <h3 className="text-xl font-semibold mb-2">Free Delivery</h3>
              <p className="text-gray-300">On orders over $50</p>
            </div>
            <div className="bg-gradient-to-r from-mulberry to-purpureus text-white p-8 rounded-lg text-center border border-gray-700">
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="text-xl font-semibold mb-2">Secure Payment</h3>
              <p className="text-gray-300">100% secure checkout</p>
            </div>
            <div className="bg-gradient-to-r from-indigo to-indigo-2 text-white p-8 rounded-lg text-center border border-gray-700">
              <div className="text-4xl mb-4">↩️</div>
              <h3 className="text-xl font-semibold mb-2">Easy Returns</h3>
              <p className="text-gray-300">30-day return policy</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-12 bg-gradient-to-r from-indigo to-indigo-2 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-gray-300 mb-6">
            Subscribe to get special offers and updates
          </p>
          <div className="max-w-md mx-auto flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-l-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blush"
            />
            <button className="bg-blush hover:bg-thulian-pink px-6 py-3 rounded-r-lg font-semibold transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;