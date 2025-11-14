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

  const categories = [
    'All',
    ...new Set(products.map(product => product.category)),
  ];

  const filteredProducts = products.filter(product => {
    if (selectedCategory === 'All') return true;
    return product.category.toLowerCase() === selectedCategory.toLowerCase();
  });

  const getCategoryTitle = cat => {
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

  const getCategoryDescription = cat => {
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
    <div className="min-h-screen bg-gradient-to-br from-[#0a0015] via-[#1a0a2e] to-[#0a0015]">
      {/* Hero Banner */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="inline-block px-4 py-2 bg-gradient-to-r from-[#ea698b]/20 to-[#822faf]/20 border border-[#ea698b]/30 rounded-full mb-6">
              <span className="text-[#ea698b] text-sm font-medium">✨ {getCategoryTitle(category)}</span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold leading-tight mb-6">
              <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
                {getCategoryTitle(category)}
              </span>
            </h1>
            <p className="text-xl text-gray-400 leading-relaxed max-w-3xl mx-auto mb-8">
              {getCategoryDescription(category)}
            </p>
            <nav className="text-sm text-gray-400">
              <Link to="/" className="hover:text-[#ea698b] transition-colors">
                Home
              </Link>{' '}
              / <span className="text-[#ea698b]">{getCategoryTitle(category)}</span>
            </nav>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-[#ea698b] to-[#d55d92] text-white shadow-lg shadow-[#ea698b]/30'
                    : 'bg-white/5 backdrop-blur-sm border border-[#571089]/30 text-gray-300 hover:bg-white/10 hover:border-[#ea698b]/50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">
                {selectedCategory === 'All' ? 'All Products' : selectedCategory}
              </h2>
              <p className="text-gray-400">{filteredProducts.length} exquisite items</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="group bg-gradient-to-br from-[#1a0a2e] to-[#0a0015] border border-[#571089]/30 rounded-2xl overflow-hidden hover:border-[#ea698b]/50 transition-all duration-300 hover:shadow-xl hover:shadow-[#ea698b]/20 hover:-translate-y-2"
              >
                <div className="relative overflow-hidden bg-gradient-to-br from-[#571089]/20 to-[#47126b]/20 aspect-square">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/400x400?text=No+Image';
                    }}
                  />
                  <button className="absolute top-4 right-4 p-2 bg-black/50 backdrop-blur-sm rounded-full text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-[#ea698b]">
                    <Heart className="w-5 h-5" />
                  </button>
                  <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                    <button className="w-full py-3 bg-gradient-to-r from-[#ea698b] to-[#d55d92] text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-[#ea698b]/50 transition-all">
                      Quick View
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-[#ea698b] font-medium px-3 py-1 bg-[#ea698b]/10 rounded-full">
                      {product.category}
                    </span>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-[#ea698b] text-[#ea698b]" />
                      <span className="text-sm text-gray-400">{product.rating}</span>
                      <span className="text-xs text-gray-500">({product.reviews})</span>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-[#ea698b] transition-colors">
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold bg-gradient-to-r from-[#ea698b] to-[#d55d92] bg-clip-text text-transparent">
                      ${product.price}
                    </span>
                    <button className="p-2 bg-gradient-to-r from-[#ea698b] to-[#d55d92] text-white rounded-lg hover:shadow-lg hover:shadow-[#ea698b]/50 transition-all">
                      <ShoppingBag className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Category Features */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">💎</div>
              <h3 className="text-xl font-semibold mb-2">Premium Quality</h3>
              <p className="text-gray-600">
                Only the finest materials and craftsmanship in every piece
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🎨</div>
              <h3 className="text-xl font-semibold mb-2">
                Designer Collection
              </h3>
              <p className="text-gray-600">
                Curated by fashion experts for the discerning woman
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">✨</div>
              <h3 className="text-xl font-semibold mb-2">Timeless Elegance</h3>
              <p className="text-gray-600">
                Pieces that transcend trends and become wardrobe staples
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-12 bg-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">
            Stay in Style
          </h2>
          <p className="text-gray-600 mb-6">
            Subscribe to get exclusive access to new arrivals and special offers
          </p>
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
