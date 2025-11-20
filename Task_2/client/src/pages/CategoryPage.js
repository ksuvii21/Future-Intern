import React, { useState, useEffect } from 'react';
import { useParams, Link, useSearchParams, useNavigate } from 'react-router-dom';
import { Star, Heart, ShoppingBag } from 'lucide-react';
import axios from 'axios';

const CategoryPage = () => {
  const { category } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [allCategories, setAllCategories] = useState([]);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [priceRange, setPriceRange] = useState(1000);
  const navigate = useNavigate();

  // Filters state derived from URL search params
  const selectedCategory = category ? category.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'All';
  const sortBy = searchParams.get('sortBy') || 'name';
  const sortOrder = searchParams.get('sortOrder') || 'asc';
  const searchQuery = searchParams.get('search') || '';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [category, searchParams]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (searchQuery) params.append('search', searchQuery);
        if (selectedCategory && selectedCategory.toLowerCase() === 'new arrivals') {
          params.append('isNewArrival', 'true');
        } else if (selectedCategory && selectedCategory.toLowerCase() !== 'all categories' && selectedCategory.toLowerCase() !== 'all') {
          params.append('category', selectedCategory);
        }

        if (priceRange < maxPrice) params.append('maxPrice', priceRange);
        params.append('sortBy', sortBy);
        params.append('sortOrder', sortOrder);
  
        const response = await axios.get(`/api/products?${params.toString()}`);
        // Ensure products is always an array, even if the response is unexpected
        setProducts(response.data.products || []);
        if (response.data.maxProductPrice > maxPrice) {
          setMaxPrice(response.data.maxProductPrice);
          setPriceRange(response.data.maxProductPrice);
        }
        // Fetch all unique categories for the filter bar
        if (allCategories.length === 0) {
          const allProdsResponse = await axios.get('http://localhost:5000/api/products');
          const productList = allProdsResponse.data.products || [];
          setAllCategories(['All Categories', ...new Set(productList.map(p => p.category))]);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [selectedCategory, sortBy, sortOrder, priceRange, searchQuery, maxPrice, allCategories.length]);
  
  const handleFilterChange = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set(key, value);
    setSearchParams(newParams);
  };

  const handleBuyNow = (product) => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItem = cart.find(item => item._id === product._id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      // Add with default size/color, assuming 'M' and 'Black' are safe defaults
      cart.push({ ...product, quantity: 1, selectedSize: 'M', selectedColor: 'Black' });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('storage'));
    navigate('/checkout');
  };
  
  const getCategoryTitle = cat => {
    switch (cat.toLowerCase()) {
      case 'dresses':
        return 'Elegant Dresses';
      case 'jewelry':
        return 'Exquisite Jewelry';
      case 'accessories':
        return 'Chic Accessories';
      case 'collections':
        return 'Curated Collections';
      case 'new arrivals':
        return 'New Arrivals';
      case 'all categories':
        return 'All Products';
      case 'all':
        return 'All Categories';
      default:
        return 'All Categories';
    }
  };

  const getCategoryDescription = cat => {
    switch (cat.toLowerCase()) {
      case 'dresses':
        return 'Explore a stunning collection of dresses for every occasion, from casual daywear to breathtaking evening gowns.';
      case 'jewelry':
        return 'Adorn yourself with our exquisite jewelry collection, featuring timeless pieces and modern designs.';
      case 'accessories':
        return 'Complete your look with our range of chic accessories, including handbags, scarves, and more.';
      case 'collections':
        return 'Discover our specially curated collections, bringing together the best of style and elegance.';
      case 'new arrivals':
        return 'Discover the latest additions to our collection. Fresh styles, innovative designs, and timeless pieces that define modern elegance.';
      case 'all categories':
        return 'Browse our complete collection of elegant womens fashion, jewelry, and accessories.';
      case 'all':
        return 'Browse our complete collection of elegant womens fashion, jewelry, and accessories.';
      default:
        return 'Browse our complete collection of elegant womens fashion, jewelry, and accessories.';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0015] via-[#1a0a2e] to-[#0a0015]">
      {/* Hero Banner */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="text-center">
            <div className="inline-block px-4 py-2 bg-gradient-to-r from-[#ea698b]/20 to-[#822faf]/20 border border-[#ea698b]/30 rounded-full mb-6">
              <span className="text-[#ea698b] text-sm font-medium">✨ {searchQuery ? 'Search Results' : getCategoryTitle(category)}</span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold leading-tight mb-6">
              <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
                {searchQuery ? `Results for "${searchQuery}"` : getCategoryTitle(category)}
              </span>
            </h1>
            <p className="text-xl text-gray-400 leading-relaxed max-w-3xl mx-auto mb-8">
              {getCategoryDescription(category)}
            </p>
            <nav className="text-sm text-gray-400">
              <Link to="/" className="hover:text-[#ea698b] transition-colors">
                Home
              </Link> 
              / <span className="text-[#ea698b]">{getCategoryTitle(category)}</span>
            </nav>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {allCategories.map(cat => (
              <Link
                key={cat}
                to={cat.toLowerCase() === 'all categories' ? '/category/all' : `/category/${cat.toLowerCase().replace(/ /g, '-')}`}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 block ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-[#ea698b] to-[#d55d92] text-white shadow-lg shadow-[#ea698b]/30'
                    : 'bg-white/5 backdrop-blur-sm border border-[#571089]/30 text-gray-300 hover:bg-white/10 hover:border-[#ea698b]/50'
                }`}
              >
                {cat}
              </Link>
            ))}
          </div>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8 p-6 bg-white/5 border border-[#571089]/30 rounded-2xl">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">
                {selectedCategory === 'All' ? 'All Products' : getCategoryTitle(selectedCategory)}
              </h2>
              <p className="text-gray-400">{products.length} exquisite items found</p>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full md:w-auto">
              <div className="w-full sm:w-auto">
                <label className="text-gray-300 text-sm mb-2 block">Price up to: <span className="font-bold text-[#ea698b]">₹{priceRange.toLocaleString('en-IN')}</span></label>
                <input
                  type="range"
                  min="0"
                  max={maxPrice}
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#ea698b]"
                />
              </div>
              <div className="flex items-center gap-2">
                <label className="text-gray-300 text-sm">Sort by:</label>
                <select
                  value={sortBy}
                  onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                  className="px-4 py-2 bg-white/5 border border-[#571089]/30 rounded-lg text-white focus:outline-none focus:border-[#ea698b] transition-all"
                >
                  <option value="name">Name</option>
                  <option value="price">Price</option>
                  <option value="rating">Rating</option>
                  <option value="createdAt">Newest</option>
                </select>
              </div>
              <button
                onClick={() => handleFilterChange('sortOrder', sortOrder === 'asc' ? 'desc' : 'asc')}
                className="px-4 py-2 bg-white/5 border border-[#571089]/30 rounded-lg text-white hover:bg-white/10 hover:border-[#ea698b]/50 transition-all"
              >
                {sortOrder === 'asc' ? '↑' : '↓'}
              </button>
            </div>
          </div>
          {/* Collection View */}
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ea698b]"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
              <div
                key={product._id}
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
                  {product.isNewArrival && (
                    <div className="absolute top-4 left-4 bg-gradient-to-r from-[#ea698b] to-[#d55d92] text-white text-xs font-bold px-3 py-1 rounded-full">
                      NEW
                    </div>
                  )}
                  <button
                    onClick={async (e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      const token = localStorage.getItem('token');
                      if (!token) {
                        alert('Please log in to add items to your wishlist.');
                        return;
                      }

                      try {
                        await axios.post('http://localhost:5000/api/wishlist', {
                          productId: product._id
                        }, {
                          headers: { Authorization: `Bearer ${token}` }
                        });
                        alert('Added to wishlist!');
                      } catch (error) {
                        console.error('Error adding to wishlist:', error);
                        if (error.response?.status === 400) {
                          alert('Already in wishlist!');
                        } else {
                          alert('Failed to add to wishlist.');
                        }
                      }
                    }}
                    className="absolute top-4 right-4 p-2 bg-black/50 backdrop-blur-sm rounded-full text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-[#ea698b]"
                  >
                    <Heart className="w-5 h-5" />
                  </button>
                  <div className="absolute bottom-4 left-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                    <Link
                      to={`/product/${product._id}`}
                      className="flex-1 py-3 bg-white/20 backdrop-blur-sm text-white font-semibold rounded-lg hover:bg-white/30 transition-all text-center"
                    >
                      Quick View
                    </Link>
                    <button
                      onClick={() => handleBuyNow(product)}
                      disabled={product.stock === 0}
                      className="flex-1 py-3 bg-gradient-to-r from-[#ea698b] to-[#d55d92] text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-[#ea698b]/50 transition-all text-center disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Buy Now
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
                      <span className="text-xs text-gray-500">({product.numReviews})</span>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-[#ea698b] transition-colors">
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold bg-gradient-to-r from-[#ea698b] to-[#d55d92] bg-clip-text text-transparent">
                      ₹{product.price.toLocaleString('en-IN')}
                    </span>
                    <button
                    onClick={async (e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      const cart = JSON.parse(localStorage.getItem('cart') || '[]') || [];
                      const existingItem = cart.find(item => item._id === product._id);

                      if (existingItem) {
                        existingItem.quantity = (existingItem.quantity || 1) + 1;
                      } else {
                        // Use the correct structure: { product, quantity, ... }
                        cart.push({ product: product, quantity: 1, selectedSize: 'M', selectedColor: product.variants?.[0]?.color || 'Default' });
                      }

                      localStorage.setItem('cart', JSON.stringify(cart));
                      window.dispatchEvent(new Event('storage'));
                      alert('Added to cart!');
                    }}
                    className="p-2 bg-gradient-to-r from-[#ea698b] to-[#d55d92] text-white rounded-lg hover:shadow-lg hover:shadow-[#ea698b]/50 transition-all"
                  >
                    <ShoppingBag className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Category Features */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-[#ea698b]/10 to-[#d55d92]/10 border border-[#ea698b]/30 rounded-2xl p-8 text-center hover:border-[#ea698b]/50 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-[#ea698b] to-[#d55d92] rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Premium Quality</h3>
              <p className="text-gray-400">Only the finest materials and craftsmanship in every piece</p>
            </div>
            <div className="bg-gradient-to-br from-[#c05299]/10 to-[#ac46a1]/10 border border-[#c05299]/30 rounded-2xl p-8 text-center hover:border-[#c05299]/50 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-[#c05299] to-[#ac46a1] rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Designer Collection</h3>
              <p className="text-gray-400">Curated by fashion experts for the discerning woman</p>
            </div>
            <div className="bg-gradient-to-br from-[#822faf]/10 to-[#6d23b6]/10 border border-[#822faf]/30 rounded-2xl p-8 text-center hover:border-[#822faf]/50 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-[#822faf] to-[#6d23b6] rounded-2xl flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Timeless Elegance</h3>
              <p className="text-gray-400">Pieces that transcend trends and become wardrobe staples</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-br from-[#1a0a2e] to-[#571089]/20 border border-[#571089]/30 rounded-3xl p-12">
            <h2 className="text-4xl font-bold text-white mb-4">Stay In Style</h2>
            <p className="text-gray-400 mb-8 text-lg">
              Subscribe to receive exclusive offers, new arrivals, and style inspiration
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-6 py-4 bg-white/5 border border-[#571089]/30 rounded-full text-white placeholder-gray-400 focus:outline-none focus:border-[#ea698b] transition-all"
              />
              <button className="px-8 py-4 bg-gradient-to-r from-[#ea698b] to-[#d55d92] text-white font-semibold rounded-full hover:shadow-lg hover:shadow-[#ea698b]/50 transition-all duration-300 whitespace-nowrap">
                Subscribe Now
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CategoryPage;
