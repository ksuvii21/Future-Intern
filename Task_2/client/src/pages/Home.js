import React, { useState, useEffect } from 'react';
import { ShoppingBag, Search, User, Heart, Menu, X, ChevronRight, Star, TrendingUp, Shield, Truck, RotateCcw } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductList from '../components/ProductList';
import axios from 'axios';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check for user in localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    // Update cart count
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      const count = cart.reduce((total, item) => total + item.quantity, 0);
      setCartCount(count);
    };
    updateCartCount();

    // Handle scroll effect
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
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
    return selectedCategory === 'All' || product.category === selectedCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0015] via-[#1a0a2e] to-[#0a0015]">
      {/* Elegant Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#0a0015]/95 backdrop-blur-lg shadow-xl border-b border-[#571089]/30' : 'bg-transparent'
      }`}>
        {/* Top Announcement Bar */}
        <div className="bg-gradient-to-r from-[#ea698b] via-[#ac46a1] to-[#822faf] text-white text-sm py-2">
          <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
            <span className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Exclusive: Up to 70% OFF on Premium Collections
            </span>
            <span className="hidden md:block">Free Shipping on Orders Over $50</span>
          </div>
        </div>

        {/* Main Header */}
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#ea698b] to-[#822faf] rounded-lg flex items-center justify-center">
                <ShoppingBag className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-[#ea698b] via-[#d55d92] to-[#c05299] bg-clip-text text-transparent">
                  Fansee Rebel
                </h1>
                <p className="text-xs text-gray-400">Luxury Fashion & Jewelry</p>
              </div>
            </Link>

            {/* Search Bar - Desktop */}
            <div className="hidden lg:flex flex-1 max-w-2xl mx-8">
              <div className="relative w-full">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for elegant dresses, jewelry and more..."
                  className="w-full pl-12 pr-4 py-3 bg-white/5 border border-[#571089]/30 rounded-full text-white placeholder-gray-400 focus:outline-none focus:border-[#ea698b] focus:bg-white/10 transition-all"
                />
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-4">
              <button className="hidden md:flex items-center gap-2 text-gray-300 hover:text-[#ea698b] transition-colors">
                <Heart className="w-5 h-5" />
                <span className="text-sm">Wishlist</span>
              </button>
              {user ? (
                <div className="hidden md:flex items-center gap-2 text-gray-300">
                  <User className="w-5 h-5" />
                  <span className="text-sm">Hello, {user.username}</span>
                  <button onClick={handleLogout} className="text-sm hover:text-[#ea698b] ml-2">
                    Logout
                  </button>
                </div>
              ) : (
                <Link to="/login" className="hidden md:flex items-center gap-2 text-gray-300 hover:text-[#ea698b] transition-colors">
                  <User className="w-5 h-5" />
                  <span className="text-sm">Account</span>
                </Link>
              )}
              <Link to="/cart" className="relative p-2 text-gray-300 hover:text-[#ea698b] transition-colors">
                <ShoppingBag className="w-6 h-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-[#ea698b] to-[#d55d92] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                )}
              </Link>
              <Link to="/admin" className="hidden md:flex items-center gap-2 text-gray-300 hover:text-[#ea698b] transition-colors">
                <span className="text-sm">Sell</span>
              </Link>
              <button className="lg:hidden text-gray-300" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Category Navigation */}
          <nav className="hidden lg:flex items-center justify-center gap-8 mt-4 pt-4 border-t border-[#571089]/20">
            {['All Categories', 'Dresses', 'Jewelry', 'Accessories', 'Collections', 'New Arrivals'].map((item) => (
              <Link
                key={item}
                to={item === 'All Categories' ? '/' : `/category/${item.toLowerCase()}`}
                className="text-sm text-gray-300 hover:text-[#ea698b] transition-colors font-medium relative group"
              >
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#ea698b] to-[#d55d92] group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
          </nav>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)}></div>
          <div className="absolute right-0 top-0 h-full w-64 bg-[#0a0015] border-l border-[#571089]/30 p-6">
            <nav className="flex flex-col gap-4 mt-16">
              {['All Categories', 'Dresses', 'Jewelry', 'Accessories', 'Collections', 'Login', 'Sell'].map((item) => (
                <Link 
                  key={item}
                  to={item === 'All Categories' ? '/' : item === 'Login' ? '/login' : item === 'Sell' ? '/admin' : `/category/${item.toLowerCase()}`}
                  className="text-left text-gray-300 hover:text-[#ea698b] transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="pt-32">
        {/* Hero Section */}
        <section className="pt-20 pb-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="inline-block px-4 py-2 bg-gradient-to-r from-[#ea698b]/20 to-[#822faf]/20 border border-[#ea698b]/30 rounded-full">
                  <span className="text-[#ea698b] text-sm font-medium">✨ New Season Collection</span>
                </div>
                <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                  <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
                    Elegance
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-[#ea698b] via-[#c05299] to-[#822faf] bg-clip-text text-transparent">
                    Redefined
                  </span>
                </h1>
                <p className="text-xl text-gray-400 leading-relaxed">
                  Discover our curated collection of luxury fashion, exquisite jewelry, and timeless accessories that define sophisticated style.
                </p>
                <div className="flex flex-wrap gap-4">
                  <button className="px-8 py-4 bg-gradient-to-r from-[#ea698b] to-[#d55d92] text-white font-semibold rounded-full hover:shadow-lg hover:shadow-[#ea698b]/50 transition-all duration-300 hover:scale-105">
                    Shop Collection
                  </button>
                  <button className="px-8 py-4 bg-white/5 backdrop-blur-sm border border-[#571089]/30 text-white font-semibold rounded-full hover:bg-white/10 transition-all duration-300">
                    Explore More
                  </button>
                </div>
                <div className="flex items-center gap-8 pt-4">
                  <div>
                    <p className="text-3xl font-bold text-white">500+</p>
                    <p className="text-sm text-gray-400">Premium Products</p>
                  </div>
                  <div className="w-px h-12 bg-[#571089]/30"></div>
                  <div>
                    <p className="text-3xl font-bold text-white">50k+</p>
                    <p className="text-sm text-gray-400">Happy Customers</p>
                  </div>
                  <div className="w-px h-12 bg-[#571089]/30"></div>
                  <div>
                    <div className="flex items-center gap-1">
                      <Star className="w-5 h-5 fill-[#ea698b] text-[#ea698b]" />
                      <p className="text-3xl font-bold text-white">4.9</p>
                    </div>
                    <p className="text-sm text-gray-400">Customer Rating</p>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[#ea698b] to-[#822faf] rounded-3xl blur-3xl opacity-20"></div>
                <div className="relative bg-gradient-to-br from-[#1a0a2e] to-[#571089]/20 p-8 rounded-3xl border border-[#571089]/30 backdrop-blur-sm">
                  <div className="text-9xl text-center mb-4">👗</div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-white mb-2">Limited Time Offer</p>
                    <p className="text-[#ea698b] text-4xl font-bold mb-4">70% OFF</p>
                    <p className="text-gray-400">On Selected Premium Items</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Category Filter */}
        <section className="py-8 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-[#ea698b] to-[#d55d92] text-white shadow-lg shadow-[#ea698b]/30'
                      : 'bg-white/5 backdrop-blur-sm border border-[#571089]/30 text-gray-300 hover:bg-white/10 hover:border-[#ea698b]/50'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section className="py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">
                  {selectedCategory === 'All' ? 'Featured Collection' : selectedCategory}
                </h2>
                <p className="text-gray-400">{filteredProducts.length} exquisite items</p>
              </div>
              <button className="hidden md:flex items-center gap-2 text-[#ea698b] hover:text-[#d55d92] transition-colors">
                <span>View All</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {loading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ea698b]"></div>
              </div>
            ) : (
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
            )}
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-[#ea698b]/10 to-[#d55d92]/10 border border-[#ea698b]/30 rounded-2xl p-8 text-center hover:border-[#ea698b]/50 transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-[#ea698b] to-[#d55d92] rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Truck className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Free Shipping</h3>
                <p className="text-gray-400">On all orders over $50</p>
              </div>
              <div className="bg-gradient-to-br from-[#c05299]/10 to-[#ac46a1]/10 border border-[#c05299]/30 rounded-2xl p-8 text-center hover:border-[#c05299]/50 transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-[#c05299] to-[#ac46a1] rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Secure Payment</h3>
                <p className="text-gray-400">100% protected transactions</p>
              </div>
              <div className="bg-gradient-to-br from-[#822faf]/10 to-[#6d23b6]/10 border border-[#822faf]/30 rounded-2xl p-8 text-center hover:border-[#822faf]/50 transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-[#822faf] to-[#6d23b6] rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <RotateCcw className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Easy Returns</h3>
                <p className="text-gray-400">30-day hassle-free returns</p>
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

      {/* Footer */}
      <footer className="border-t border-[#571089]/30 bg-[#0a0015]">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-[#ea698b] to-[#822faf] rounded-lg flex items-center justify-center">
                  <ShoppingBag className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-[#ea698b] to-[#d55d92] bg-clip-text text-transparent">
                  Fansee Rebel
                </h3>
              </div>
              <p className="text-gray-400 text-sm mb-4">
                Your premier destination for luxury fashion, exquisite jewelry, and timeless elegance.
              </p>
              <div className="flex gap-3">
                {['💎', '👗', '💄', '👠'].map((icon, i) => (
                  <span key={i} className="text-2xl opacity-70 hover:opacity-100 transition-opacity cursor-pointer">
                    {icon}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Shop</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                {['New Arrivals', 'Dresses', 'Jewelry', 'Accessories', 'Sale'].map((item) => (
                  <li key={item}>
                    <Link to={`/category/${item.toLowerCase()}`} className="hover:text-[#ea698b] transition-colors">{item}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Customer Care</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                {['Contact Us', 'Track Order', 'Returns', 'Shipping Info', 'Size Guide'].map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-[#ea698b] transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                {['About Us', 'Careers', 'Press', 'Blog', 'Affiliate Program'].map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-[#ea698b] transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="border-t border-[#571089]/30 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2025 Fansee Rebel. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <span className="text-gray-400 text-sm">Secure payments via</span>
              <div className="flex gap-2">
                {['VISA', 'MC', 'AMEX', 'PayPal'].map((payment) => (
                  <span key={payment} className="px-3 py-1 bg-white/5 border border-[#571089]/30 rounded text-xs text-gray-400 font-medium">
                    {payment}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;