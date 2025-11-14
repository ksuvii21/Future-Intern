import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ProductList from '../components/ProductList';
import axios from 'axios';

const CategoryPage = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(category);

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

  const categories = ['All', ...new Set(products.map(product => product.category))];

  const filteredProducts = products.filter(product => {
    if (selectedCategory === 'All') return true;
    return product.category.toLowerCase() === selectedCategory.toLowerCase();
  });

  const getCategoryTitle = (cat) => {
    switch (cat.toLowerCase()) {
      case 'dresses':
        return 'Elegant Dresses';
      case 'jewelry':
        return 'Exquisite Jewelry';
      case 'accessories':
        return 'Luxury Accessories';
      case 'collections':
        return 'Designer Collections';
      default:
        return 'All Categories';
    }
  };

  const getCategoryDescription = (cat) => {
    switch (cat.toLowerCase()) {
      case 'dresses':
        return 'Discover our collection of elegant dresses perfect for any occasion. From cocktail dresses to evening gowns, find your perfect look.';
      case 'jewelry':
        return 'Browse our exquisite jewelry collection featuring diamond studs, pearl necklaces, and gold bangles that add sparkle to any outfit.';
      case 'accessories':
        return 'Complete your look with our luxury accessories including designer handbags, crystal hair accessories, and embroidered clutches.';
      case 'collections':
        return 'Explore our curated designer collections featuring the latest trends in womens fashion and accessories.';
      default:
        return 'Browse our complete collection of elegant womens fashion, jewelry, and accessories.';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  return (
    <div className="category-page">
      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-pink-400 to-purple-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-4">{getCategoryTitle(category)}</h1>
            <p className="text-xl mb-6 max-w-3xl mx-auto">{getCategoryDescription(category)}</p>
            <nav className="text-sm">
              <Link to="/" className="hover:underline">Home</Link> / <span>{getCategoryTitle(category)}</span>
            </nav>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="bg-white py-6 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-2 rounded-full font-medium transition-colors ${
                  selectedCategory === cat
                    ? 'bg-pink-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              {selectedCategory === 'All' ? 'All Products' : selectedCategory}
            </h2>
            <span className="text-gray-600">{filteredProducts.length} items</span>
          </div>
          <ProductList products={filteredProducts} />
        </div>
      </section>

      {/* Category Features */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">💎</div>
              <h3 className="text-xl font-semibold mb-2">Premium Quality</h3>
              <p className="text-gray-600">Only the finest materials and craftsmanship in every piece</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🎨</div>
              <h3 className="text-xl font-semibold mb-2">Designer Collection</h3>
              <p className="text-gray-600">Curated by fashion experts for the discerning woman</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">✨</div>
              <h3 className="text-xl font-semibold mb-2">Timeless Elegance</h3>
              <p className="text-gray-600">Pieces that transcend trends and become wardrobe staples</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-12 bg-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">Stay in Style</h2>
          <p className="text-gray-600 mb-6">Subscribe to get exclusive access to new arrivals and special offers</p>
          <div className="max-w-md mx-auto flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-l-lg text-gray-900 focus:outline-none"
            />
            <button className="bg-pink-500 hover:bg-pink-600 px-6 py-3 rounded-r-lg font-semibold transition-colors text-white">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CategoryPage;
