import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, Filter, X, Star, ShoppingBag, Heart, SlidersHorizontal } from 'lucide-react';
import axios from 'axios';

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [maxProductPrice, setMaxProductPrice] = useState(10000);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  // Filter states
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [priceRange, setPriceRange] = useState({
    min: searchParams.get('minPrice') || '',
    max: searchParams.get('maxPrice') || ''
  });
  const [sortBy, setSortBy] = useState(searchParams.get('sortBy') || 'createdAt');
  const [sortOrder, setSortOrder] = useState(searchParams.get('sortOrder') || 'desc');
  const [showFilters, setShowFilters] = useState(false);

  // Categories for faceted search
  const categories = [
    'All',
    'Dresses',
    'Jewelry',
    'Accessories',
    'New Arrivals'
  ];

  // Sorting options
  const sortOptions = [
    { value: 'createdAt', label: 'Newest First', order: 'desc' },
    { value: 'price', label: 'Price: Low to High', order: 'asc' },
    { value: 'price', label: 'Price: High to Low', order: 'desc' },
    { value: 'rating', label: 'Highest Rated', order: 'desc' },
    { value: 'name', label: 'Name: A to Z', order: 'asc' },
    { value: 'name', label: 'Name: Z to A', order: 'desc' }
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [searchParams]);

  useEffect(() => {
    fetchProducts();
  }, [searchQuery, selectedCategory, priceRange, sortBy, sortOrder, currentPage]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();

      if (searchQuery.trim()) params.append('search', searchQuery);
      if (selectedCategory !== 'all') params.append('category', selectedCategory);
      if (priceRange.min) params.append('minPrice', priceRange.min);
      if (priceRange.max) params.append('maxPrice', priceRange.max);
      if (sortBy) params.append('sortBy', sortBy);
      if (sortOrder) params.append('sortOrder', sortOrder);
      params.append('page', currentPage);
      params.append('limit', '12');

      const response = await axios.get(`http://localhost:5000/api/products?${params}`);
      setProducts(response.data.products);
      setMaxProductPrice(response.data.maxProductPrice);
      setTotalPages(response.data.totalPages);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('Failed to load products');
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    updateURL();
    fetchProducts();
  };

  const updateURL = () => {
    const params = new URLSearchParams();
    if (searchQuery.trim()) params.set('search', searchQuery);
    if (selectedCategory !== 'all') params.set('category', selectedCategory);
    if (priceRange.min) params.set('minPrice', priceRange.min);
    if (priceRange.max) params.set('maxPrice', priceRange.max);
    if (sortBy !== 'createdAt') params.set('sortBy', sortBy);
    if (sortOrder !== 'desc') params.set('sortOrder', sortOrder);

    setSearchParams(params);
  };

  const handleSortChange = (sortOption) => {
    setSortBy(sortOption.value);
    setSortOrder(sortOption.order);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setPriceRange({ min: '', max: '' });
    setSortBy('createdAt');
    setSortOrder('desc');
    setCurrentPage(1);
    setSearchParams({});
  };

  const addToWishlist = async (productId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please log in to add items to your wishlist');
        return;
      }

      await axios.post('http://localhost:5000/api/wishlist', {
        productId: productId
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert('Added to wishlist!');
    } catch (error) {
      if (error.response?.status === 400) {
        alert('Already in wishlist!');
      } else {
        console.error('Error adding to wishlist:', error);
        alert('Failed to add to wishlist');
      }
    }
  };

  const addToCart = async (product) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please log in to add items to your cart.');
      return;
    }
    try {
      await axios.post('http://localhost:5000/api/cart', {
        productId: product._id,
        quantity: 1,
        selectedColor: product.variants?.[0]?.color || 'Default',
        selectedSize: 'M'
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Added to cart!');
    } catch (err) {
      console.error("Error adding to cart", err);
      alert('Failed to add to cart.');
    }
  };

  const renderProductCard = (product) => (
    <div
      key={product._id}
      className="group bg-gradient-to-br from-[#1a0a2e] to-[#0a0015] border border-[#571089]/30 rounded-2xl overflow-hidden hover:border-[#ea698b]/50 transition-all duration-300 hover:shadow-xl hover:shadow-[#ea698b]/20 hover:-translate-y-2"
    >
      <div className="relative overflow-hidden bg-gradient-to-br from-[#571089]/20 to-[#47126b]/20 aspect-square">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          onError={(e) => { // Fallback to local SVG if image fails to load
            e.target.onerror = null; // Prevent infinite loop if fallback also fails
            e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjMWEwYTJlIi8+Cjx0ZXh0IHg9IjIwMCIgeT0iMjAwIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM5Y2E0YjEiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5ObyBJbWFnZTwvdGV4dD4KPC9zdmc+';
          }}
        />
        <button
          onClick={() => addToWishlist(product._id)}
          className="absolute top-4 right-4 p-2 bg-black/50 backdrop-blur-sm rounded-full text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-[#ea698b]"
        >
          <Heart className="w-5 h-5" />
        </button>
        <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
          <Link
            to={`/product/${product._id}`}
            className="block w-full py-3 bg-gradient-to-r from-[#ea698b] to-[#d55d92] text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-[#ea698b]/50 transition-all text-center"
          >
            Quick View
          </Link>
        </div>
      </div>
      <div className="p-6">
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
          <button
            onClick={() => addToCart(product)}
            className="p-2 bg-gradient-to-r from-[#ea698b] to-[#d55d92] text-white rounded-lg hover:shadow-lg hover:shadow-[#ea698b]/50 transition-all"
          >
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
            <span className="text-[#ea698b] text-sm font-medium">🔍 Advanced Search</span>
          </div>
          <h1 className="text-5xl lg:text-7xl font-bold leading-tight mb-6">
            <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
              Find Your
            </span>
            <br />
            <span className="bg-gradient-to-r from-[#ea698b] via-[#c05299] to-[#822faf] bg-clip-text text-transparent">
              Perfect Style
            </span>
          </h1>
          <p className="text-xl text-gray-400 leading-relaxed max-w-3xl mx-auto">
            Discover products with advanced filters, price ranges, and sorting options tailored to your preferences.
          </p>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="px-4 pb-8">
        <div className="max-w-7xl mx-auto">
          {/* Search Bar */}
          <div className="mb-8">
            <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search for products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white/5 border border-[#571089]/30 rounded-full text-white placeholder-gray-400 focus:outline-none focus:border-[#ea698b] focus:bg-white/10 transition-all text-lg"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 px-6 py-2 bg-gradient-to-r from-[#ea698b] to-[#d55d92] text-white rounded-full hover:shadow-lg hover:shadow-[#ea698b]/50 transition-all"
              >
                Search
              </button>
            </form>
          </div>

          {/* Filter Controls */}
          <div className="flex flex-col lg:flex-row gap-4 mb-8">
            {/* Sort Dropdown */}
            <div className="flex-1">
              <select
                value={`${sortBy}-${sortOrder}`}
                onChange={(e) => {
                  const [sort, order] = e.target.value.split('-');
                  setSortBy(sort);
                  setSortOrder(order);
                }}
                className="w-full px-4 py-3 bg-white/5 border border-[#571089]/30 rounded-lg text-white focus:outline-none focus:border-[#ea698b] focus:bg-white/10 transition-all"
              >
                {sortOptions.map((option, index) => (
                  <option key={index} value={`${option.value}-${option.order}`} className="bg-[#1a0a2e] text-white">
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Filter Toggle Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-6 py-3 bg-white/5 border border-[#571089]/30 rounded-lg text-white hover:bg-white/10 hover:border-[#ea698b]/50 transition-all flex items-center gap-2"
            >
              <SlidersHorizontal className="w-5 h-5" />
              Filters
              {(searchQuery || selectedCategory !== 'all' || priceRange.min || priceRange.max) && (
                <span className="bg-[#ea698b] text-white text-xs rounded-full px-2 py-1">
                  Active
                </span>
              )}
            </button>

            {/* Clear Filters */}
            {(searchQuery || selectedCategory !== 'all' || priceRange.min || priceRange.max) && (
              <button
                onClick={clearFilters}
                className="px-6 py-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 hover:bg-red-500/30 hover:border-red-500/50 transition-all flex items-center gap-2"
              >
                <X className="w-5 h-5" />
                Clear All
              </button>
            )}
          </div>

          {/* Advanced Filters Panel */}
          {showFilters && (
            <div className="bg-gradient-to-br from-[#1a0a2e] to-[#0a0015] border border-[#571089]/30 rounded-2xl p-6 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Category Filter */}
                <div>
                  <label className="text-gray-300 font-medium mb-3 block">Category</label>
                  <div className="space-y-2">
                    {categories.map(category => (
                      <label key={category} className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="category"
                          value={category.toLowerCase().replace(' ', '-')}
                          checked={selectedCategory === category.toLowerCase().replace(' ', '-')}
                          onChange={(e) => setSelectedCategory(e.target.value)}
                          className="text-[#ea698b] focus:ring-[#ea698b]"
                        />
                        <span className="text-gray-300">{category}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Range Filter */}
                <div>
                  <label className="text-gray-300 font-medium mb-3 block">Price Range</label>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm text-gray-400">Min Price</label>
                      <input
                        type="number"
                        placeholder="0"
                        value={priceRange.min}
                        onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                        className="w-full px-3 py-2 bg-white/5 border border-[#571089]/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#ea698b] focus:bg-white/10 transition-all"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-gray-400">Max Price</label>
                      <input
                        type="number"
                        placeholder={maxProductPrice.toString()}
                        value={priceRange.max}
                        onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                        className="w-full px-3 py-2 bg-white/5 border border-[#571089]/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#ea698b] focus:bg-white/10 transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Quick Price Ranges */}
                <div>
                  <label className="text-gray-300 font-medium mb-3 block">Quick Ranges</label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { label: 'Under ₹1000', min: '', max: '1000' },
                      { label: '₹1000-₹5000', min: '1000', max: '5000' },
                      { label: '₹5000-₹10000', min: '5000', max: '10000' },
                      { label: 'Over ₹10000', min: '10000', max: '' }
                    ].map((range, index) => (
                      <button
                        key={index}
                        onClick={() => setPriceRange({ min: range.min, max: range.max })}
                        className="px-3 py-2 bg-white/5 border border-[#571089]/30 rounded-lg text-gray-300 hover:bg-white/10 hover:border-[#ea698b]/50 transition-all text-sm"
                      >
                        {range.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Results Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">
                Search Results
              </h2>
              <p className="text-gray-400">
                {loading ? 'Loading...' : `${products.length} products found`}
                {searchQuery && ` for "${searchQuery}"`}
              </p>
            </div>
          </div>

          {/* Products Grid */}
          {loading ? (
            <div className="flex justify-center items-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ea698b]"></div>
            </div>
          ) : error ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">😔</div>
              <h3 className="text-2xl font-bold text-white mb-4">{error}</h3>
              <button
                onClick={fetchProducts}
                className="px-6 py-3 bg-gradient-to-r from-[#ea698b] to-[#d55d92] text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-[#ea698b]/50 transition-all"
              >
                Try Again
              </button>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-white mb-4">No products found</h3>
              <p className="text-gray-400 mb-8">Try adjusting your search criteria or filters</p>
              <button
                onClick={clearFilters}
                className="px-6 py-3 bg-gradient-to-r from-[#ea698b] to-[#d55d92] text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-[#ea698b]/50 transition-all"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                {products.map(product => renderProductCard(product))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-white/5 border border-[#571089]/30 rounded-lg text-white hover:bg-white/10 hover:border-[#ea698b]/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>

                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const pageNum = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i;
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`px-4 py-2 rounded-lg transition-all ${
                          currentPage === pageNum
                            ? 'bg-gradient-to-r from-[#ea698b] to-[#d55d92] text-white'
                            : 'bg-white/5 border border-[#571089]/30 text-white hover:bg-white/10 hover:border-[#ea698b]/50'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}

                  <button
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-white/5 border border-[#571089]/30 rounded-lg text-white hover:bg-white/10 hover:border-[#ea698b]/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default SearchPage;
