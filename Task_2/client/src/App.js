import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingBag, Search, User, Heart, Menu, X, TrendingUp } from 'lucide-react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import WishlistPage from './pages/WishlistPage';
import CategoryPage from './pages/CategoryPage';
import SearchPage from './pages/SearchPage';
import OrderHistory from './pages/OrderHistory';
import OrderDetail from './pages/OrderDetail';
import Profile from './pages/Profile';
import Login from './components/Login';
import Register from './components/Register';
import ForgotPassword from './components/ForgotPassword';
import Admin from './components/Admin';
import BecomeSellerPage from './pages/BecomeSellerPage';
import ProtectedRoute from './components/ProtectedRoute';
import SellerDashboard from './pages/SellerDashboard';
import ContactUsPage from './pages/ContactUsPage';
import ReturnPolicyPage from './pages/ReturnPolicyPage';
import RefundPolicyPage from './pages/RefundPolicyPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import DisclaimerPage from './pages/DisclaimerPage';
import AboutUsPage from './pages/AboutUsPage';
import ScrollToTop from './components/ScrollToTop'; // Import ScrollToTop
import CustomerSupportPage from './pages/CustomerSupportPage';
import './App.css';

// The main application state and context provider
function App() {
  const [cartCount, setCartCount] = useState(0);
  const [user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(() => {
    const stored = localStorage.getItem('darkMode');
    return stored ? JSON.parse(stored) : true;
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isHeaderHovered, setIsHeaderHovered] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // Define auth pages where header/footer should be hidden
  const authPages = ['/login', '/register', '/forgot-password', '/admin', '/profile', '/seller-dashboard', '/become-seller'];

  useEffect(() => {
    // Check for user in localStorage on app load
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    const updateCartCount = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await axios.get('http://localhost:5000/api/cart', {
            headers: { Authorization: `Bearer ${token}` }
          });
          const count = response.data.items.reduce((total, item) => total + item.quantity, 0);
          setCartCount(count);
        } catch (error) {
          console.error('Error fetching cart count:', error);
          // If API fails (e.g., token expired), clear local cart and set count to 0
          localStorage.removeItem('cart');
          setCartCount(0);
        }
      } else {
        // For non-logged in users, use localStorage
        const cart = JSON.parse(localStorage.getItem('cart') || '[]') || [];
        const count = cart.reduce((total, item) => total + item.quantity, 0);
        setCartCount(count);
      }
    };

    updateCartCount();
    window.addEventListener('storage', updateCartCount);

    // Handle scroll effect
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('storage', updateCartCount);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    // After initial render, remove the class after a delay
    setTimeout(() => {
      setIsInitialLoad(false);
    }, 500); // Adjust the delay as needed
  }, []);

  useEffect(() => {
    // Apply dark mode to document
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const handleLogin = (userData, token) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  const handleLogout = (navigate) => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setCartCount(0);
    // Dispatch storage event to update any components listening for changes
    window.dispatchEvent(new Event('storage'));
    if (navigate) navigate('/');
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <Router>
      {/* AppLayout is a descendant of Router and can use useLocation() */}      
      <AppLayout
        cartCount={cartCount}
        setCartCount={setCartCount}
        user={user}
        setUser={setUser}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        scrolled={scrolled}
        handleLogout={handleLogout}
        setScrolled={setScrolled}
        handleLogin={handleLogin}
        toggleDarkMode={toggleDarkMode}
        authPages={authPages}
        isHeaderHovered={isHeaderHovered}
        setIsHeaderHovered={setIsHeaderHovered}
        isInitialLoad={isInitialLoad}
      />
    </Router>
  );
}

// AppLayout (formerly AppContent) uses useLocation()
function AppLayout({
  cartCount,
  user,
  darkMode,
  mobileMenuOpen,
  setMobileMenuOpen,
  scrolled,
  handleLogout,
  handleLogin,
  authPages,
  isHeaderHovered,  
  isInitialLoad,
  setIsHeaderHovered
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isSuggestionsVisible, setIsSuggestionsVisible] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthPage = authPages.includes(location.pathname);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchQuery.trim().length > 1) {
        try {
          const response = await axios.get(`http://localhost:5000/api/products/suggestions?q=${searchQuery}`);
          setSuggestions(response.data);
          setIsSuggestionsVisible(true);
        } catch (error) {
          console.error('Error fetching search suggestions:', error);
        }
      } else {
        setSuggestions([]);
        setIsSuggestionsVisible(false);
      }
    };

    const debounceFetch = setTimeout(() => {
      fetchSuggestions();
    }, 300); // Debounce to avoid rapid API calls

    return () => clearTimeout(debounceFetch);
  }, [searchQuery]);

  const handleSuggestionClick = () => {
    setSearchQuery('');
    setSuggestions([]);
    setIsSuggestionsVisible(false);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery(''); // Clear search bar after submission
      setIsSuggestionsVisible(false);
    }
  };

  return (
    <div className={`App min-h-screen ${darkMode ? 'bg-gradient-to-br from-[#0a0015] via-[#1a0a2e] to-[#0a0015]' : 'bg-gradient-to-br from-gray-50 to-gray-100'}`}>
      <ScrollToTop />
      {/* Elegant Header - Only show if not on auth pages */}
      {!isAuthPage && (
        <header
          className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isInitialLoad ? 'header-expanded' : ''} ${
            scrolled ? 'bg-[#0a0015]/95 backdrop-blur-lg shadow-xl border-b border-[#571089]/30' : 'bg-[#0a0015]/95 backdrop-blur-lg'
          }`}
          onMouseEnter={() => setIsHeaderHovered(true)}
          onMouseLeave={() => setIsHeaderHovered(false)}
        >
          {/* Top Announcement Bar */}
          <div className="bg-gradient-to-r from-[#ea698b] via-[#ac46a1] to-[#822faf] text-white text-sm py-2">
            <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
              <span className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Exclusive: Up to 70% OFF on Premium Collections
              </span>
              <span className="hidden md:block">Free Shipping on Orders Over ₹5000</span>
            </div>
          </div>

          {/* Main Header */}
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <Link to="/" className="flex items-center">
                <img src="/logo.png" alt="Fansee Rebel" className="w-28 h-25 rounded-lg" />
              </Link>

              {/* Search Bar - Desktop */}
              <div className="hidden lg:flex flex-1 max-w-2xl mx-8 relative">
                <form onSubmit={handleSearchSubmit} className="relative w-full">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search for elegant dresses, jewelry and more..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => searchQuery.length > 1 && setIsSuggestionsVisible(true)}
                    onBlur={() => setTimeout(() => setIsSuggestionsVisible(false), 200)} // Delay to allow click on suggestion
                    className="w-full pl-12 pr-4 py-3 bg-white/5 border border-[#571089]/30 rounded-full text-white placeholder-gray-400 focus:outline-none focus:border-[#ea698b] focus:bg-white/10 transition-all"
                  />
                </form>
                {isSuggestionsVisible && suggestions.length > 0 && (
                  <div className="absolute top-full mt-2 w-full bg-[#1a0a2e] border border-[#571089]/30 rounded-2xl shadow-lg overflow-hidden z-10">
                    <ul className="max-h-96 overflow-y-auto">
                      {suggestions.map(suggestion => (
                        <li key={suggestion._id}>
                          <Link
                            to={`/product/${suggestion._id}`}
                            onClick={handleSuggestionClick}
                            className="flex items-center gap-4 p-3 hover:bg-[#571089]/20 transition-colors"
                          >
                            <img src={suggestion.imageUrl} alt={suggestion.name} className="w-12 h-12 object-cover rounded-md" />
                            <span className="text-white">{suggestion.name}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Right Actions */}
              <div className="flex items-center gap-4">
                <Link to="/wishlist" className="hidden md:flex items-center gap-2 text-gray-300 hover:text-[#ea698b] transition-colors">
                  <Heart className="w-5 h-5" />
                  <span className="text-sm">Wishlist</span>
                </Link>
                {user ? (
                  <div className="hidden md:flex items-center gap-2 text-gray-300 relative group">
                    <User className="w-5 h-5" />
                    <span className="text-sm">Hello, {user.username}</span>
                    <Link to="/profile" className="text-sm hover:text-[#ea698b] ml-2">
                      Profile
                    </Link>
                    <button
                      onClick={() => handleLogout(navigate)}
                      className="text-sm hover:text-[#ea698b] ml-2 px-3 py-1 bg-white/5 border border-[#571089]/30 rounded-md transition-colors"
                    >
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
                {/* Conditional Admin/Seller Links */}
                {user && user.role === 'admin' && (
                  <Link to="/admin" className="hidden md:flex items-center gap-2 text-gray-300 hover:text-[#ea698b] transition-colors">
                    <span className="text-sm">Admin</span>
                  </Link>
                )}
                {user && user.role === 'seller' && (
                  <Link to="/seller-dashboard" className="hidden md:flex items-center gap-2 text-gray-300 hover:text-[#ea698b] transition-colors">
                    <span className="text-sm">Seller Dashboard</span>
                  </Link>
                )}

                <button className="lg:hidden text-gray-300" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                  {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>
            </div>

            {/* Category Navigation */}
            <nav
              className={`hidden lg:flex items-center justify-center gap-8 mt-4 pt-4 border-t border-[#571089]/20 transition-all duration-300 ease-in-out ${
                isHeaderHovered || scrolled ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0 invisible'
              }`}
            >
              {['All Categories', 'Dresses', 'Jewelry', 'Accessories', 'New Arrivals'].map((item) => (
                <Link
                  key={item}
                  to={item === 'All Categories' ? '/' : `/category/${item.toLowerCase().replace(/ /g, '-')}`}
                  className="text-sm text-gray-300 hover:text-[#ea698b] transition-colors font-medium relative group"
                >
                  {item}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#ea698b] to-[#d55d92] group-hover:w-full transition-all duration-300"></span>
                </Link>
              ))}
              <Link
                to="/search"
                className="text-sm text-gray-300 hover:text-[#ea698b] transition-colors font-medium relative group"
              >
                Search & Explore
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#ea698b] to-[#d55d92] group-hover:w-full transition-all duration-300"></span>
              </Link>
            </nav>
          </div>
        </header>
      )}

      {/* Mobile Menu */}
      {!isAuthPage && mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)}></div>
          <div className="absolute right-0 top-0 h-full w-64 bg-[#0a0015] border-l border-[#571089]/30 p-6">
            <nav className="flex flex-col gap-4 mt-16 text-left">
              {['All Categories', 'Dresses', 'Jewelry', 'Accessories', 'Girlies <3', 'New Arrivals'].map((item) => (
                <Link
                  key={item}
                  to={item === 'All Categories' ? '/' : `/category/${item.toLowerCase().replace(/ /g, '-')}`}
                  className="text-gray-300 hover:text-[#ea698b] transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item}
                </Link>
              ))}
              {/* Conditional Admin/Seller Links for Mobile */}
              {user && user.role === 'admin' && (
                <Link to="/admin" onClick={() => setMobileMenuOpen(false)} className="text-gray-300 hover:text-[#ea698b] transition-colors py-2">Admin Dashboard</Link>
              )}
              {user && user.role === 'seller' && (
                <Link to="/seller-dashboard" onClick={() => setMobileMenuOpen(false)} className="text-gray-300 hover:text-[#ea698b] transition-colors py-2">Seller Dashboard</Link>
              )}
            </nav>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className={`flex-1 transition-all duration-300 ease-in-out ${
        isAuthPage ? '' : 
        (isHeaderHovered || scrolled ? 'pt-[190px]' : 'pt-[130px]')
      }`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/category/:category" element={<CategoryPage />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/orders" element={<OrderHistory />} />
          <Route path="/orders/:id" element={<OrderDetail />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register onLogin={handleLogin} />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/admin" element={
            <ProtectedRoute user={user} allowedRoles={['admin']}>
              <Admin />
            </ProtectedRoute>
          } />
          <Route path="/become-seller" element={
            <ProtectedRoute user={user} allowedRoles={['user']}>
              <BecomeSellerPage />
            </ProtectedRoute>
          } />
          <Route path="/seller-dashboard" element={
            <ProtectedRoute user={user} allowedRoles={['seller', 'admin']}>
              <SellerDashboard />
            </ProtectedRoute>
          } />
          <Route path="/contact" element={<ContactUsPage />} />
          <Route path="/customer-support" element={<CustomerSupportPage />} />
          <Route path="/return-policy" element={<ReturnPolicyPage />} />
          <Route path="/refund-policy" element={<RefundPolicyPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/disclaimer" element={<DisclaimerPage />} />
          <Route path="/about" element={<AboutUsPage />} />
        </Routes>
      </main>

      {/* Footer - Only show if not on auth pages */}
      {!isAuthPage && (
        <footer className="border-t border-[#571089]/30 bg-[#0a0015]">
          <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <img src="/logo.png" alt="Fansee Rebel" className="w-25 h-20 rounded-lg" />
                  <h3 className="text-3xl font-bold bg-gradient-to-r from-[#ea698b] to-[#d55d92] bg-clip-text text-transparent">
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
                      <Link to={`/category/${item.toLowerCase().replace(/ /g, '-')}`} className="hover:text-[#ea698b] transition-colors">{item}</Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-4">Customer Care</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><Link to="/contact" className="hover:text-[#ea698b] transition-colors">Contact Us</Link></li>
                  <li><Link to="/customer-support" className="hover:text-[#ea698b] transition-colors">Customer Support</Link></li>
                  <li><Link to="/return-policy" className="hover:text-[#ea698b] transition-colors">Returns</Link></li>
                  <li><Link to="/refund-policy" className="hover:text-[#ea698b] transition-colors">Refunds</Link></li>
                  <li><Link to="/profile" className="hover:text-[#ea698b] transition-colors">Track Order</Link></li>
                  <li><Link to="/profile" className="hover:text-[#ea698b] transition-colors">Shipping Info</Link></li>
                  <li><Link to="/" className="hover:text-[#ea698b] transition-colors">Size Guide</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-4">Company</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><Link to="/about" className="hover:text-[#ea698b] transition-colors">About Us</Link></li>
                  <li><Link to="/" className="hover:text-[#ea698b] transition-colors">Careers</Link></li>
                  <li><Link to="/" className="hover:text-[#ea698b] transition-colors">Press</Link></li>
                  <li><Link to="/" className="hover:text-[#ea698b] transition-colors">Blog</Link></li>
                  <li><Link to="/" className="hover:text-[#ea698b] transition-colors">Affiliate Program</Link></li>
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
      )}
    </div>
  );
}

export default App;