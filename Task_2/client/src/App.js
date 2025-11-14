import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import CategoryPage from './pages/CategoryPage';
import Login from './components/Login';
import Register from './components/Register';
import ForgotPassword from './components/ForgotPassword';
import Admin from './components/Admin';
import './App.css';

function App() {
  const [cartCount, setCartCount] = useState(0);
  const [user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(() => {
    const stored = localStorage.getItem('darkMode');
    return stored ? JSON.parse(stored) : false;
  });

  useEffect(() => {
    // Check for user in localStorage on app load
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      const count = cart.reduce((total, item) => total + item.quantity, 0);
      setCartCount(count);
    };

    updateCartCount();
    window.addEventListener('storage', updateCartCount);
    return () => window.removeEventListener('storage', updateCartCount);
  }, []);

  useEffect(() => {
    // Apply dark mode to document
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    // Store preference
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <Router>
      <div className={`App min-h-screen ${darkMode ? 'bg-gradient-to-br from-gray-900 to-gray-800' : 'bg-gradient-to-br from-gray-50 to-gray-100'}`}>
        {/* Header */}
        <header className={`shadow-sm border-b sticky top-0 z-50 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          {/* Top Bar */}
          <div className={`text-white text-sm py-1 ${darkMode ? 'bg-gray-950' : 'bg-gray-900'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
              <span>Free shipping on orders over $50</span>
              <div className="flex space-x-4">
                <Link to="/admin" className="hover:text-gray-300">
                  Sell
                </Link>
                {user ? (
                  <button
                    onClick={handleLogout}
                    className="hover:text-gray-300"
                  >
                    Logout
                  </button>
                ) : (
                  <Link to="/login" className="hover:text-gray-300">
                    Account
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* Main Header */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <div className="flex items-center">
                <Link to="/" className="flex items-center space-x-2">
                  <img
                    src="/Logo.png"
                    alt="Fansee Rebel"
                    className="h-8 w-auto"
                  />
                  <span className="text-3xl font-bold text-pink-500 hover:text-pink-600 transition-colors">
                    Fansee Rebel
                  </span>
                </Link>
              </div>

              {/* Search Bar */}
              <div className="flex-1 max-w-2xl mx-8">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search for elegant dresses, jewelry and more..."
                    className={`w-full px-4 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-colors ${
                      darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'
                    }`}
                  />
                  <button className="absolute right-0 top-0 h-full px-4 bg-pink-500 text-white rounded-r-md hover:bg-pink-600 transition-colors">
                    🔍
                  </button>
                </div>
              </div>

              {/* Right Side */}
              <div className="flex items-center space-x-6">
                <button
                  onClick={toggleDarkMode}
                  className={`p-2 rounded-lg transition-colors ${
                    darkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-700'
                  }`}
                  title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                >
                  {darkMode ? '☀️' : '🌙'}
                </button>
                <div className={`hover:text-pink-500 font-medium transition-colors ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  {user ? (
                    `Hello, ${user.username}`
                  ) : (
                    <Link to="/login">Hello, Sign in</Link>
                  )}
                </div>
                <Link
                  to="/cart"
                  className={`relative hover:text-pink-500 transition-colors ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}
                >
                  <span className="text-2xl">🛒</span>
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </Link>
              </div>
            </div>
          </div>

          {/* Category Navigation */}
          <div className={`border-t py-3 ${
            darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-100 border-gray-200'
          }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <nav className="flex space-x-8">
                <Link
                  to="/"
                  className={`font-medium transition-colors hover:text-pink-500 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}
                >
                  All Categories
                </Link>
                <Link
                  to="/category/dresses"
                  className={`font-medium transition-colors hover:text-pink-500 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}
                >
                  Dresses
                </Link>
                <Link
                  to="/category/jewelry"
                  className={`font-medium transition-colors hover:text-pink-500 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}
                >
                  Jewelry
                </Link>
                <Link
                  to="/category/accessories"
                  className={`font-medium transition-colors hover:text-pink-500 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}
                >
                  Accessories
                </Link>
                <Link
                  to="/category/collections"
                  className={`font-medium transition-colors hover:text-pink-500 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}
                >
                  Collections
                </Link>
              </nav>
            </div>
          </div>
        </header>

        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/category/:category" element={<CategoryPage />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className={`mt-16 ${darkMode ? 'bg-gray-950' : 'bg-gray-900'} text-white`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4 text-pink-400">
                  Fansee Rebel
                </h3>
                <p className="text-gray-300 text-sm mb-4">
                  Your premier destination for elegant women's fashion,
                  exquisite jewelry, and luxury accessories.
                </p>
                <div className="flex space-x-4">
                  <span className="text-2xl">💎</span>
                  <span className="text-2xl">👗</span>
                  <span className="text-2xl">💄</span>
                  <span className="text-2xl">👠</span>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Customer Service</h4>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>
                    <Link to="/" className="hover:text-white">
                      Contact Us
                    </Link>
                  </li>
                  <li>
                    <Link to="/" className="hover:text-white">
                      Track Order
                    </Link>
                  </li>
                  <li>
                    <Link to="/" className="hover:text-white">
                      Returns & Exchanges
                    </Link>
                  </li>
                  <li>
                    <Link to="/" className="hover:text-white">
                      Shipping Info
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">About Us</h4>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>
                    <Link to="/" className="hover:text-white">
                      Our Story
                    </Link>
                  </li>
                  <li>
                    <Link to="/" className="hover:text-white">
                      Careers
                    </Link>
                  </li>
                  <li>
                    <Link to="/" className="hover:text-white">
                      Press
                    </Link>
                  </li>
                  <li>
                    <Link to="/" className="hover:text-white">
                      Corporate Sales
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Payment & Security</h4>
                <div className="space-y-2">
                  <p className="text-sm text-gray-300">100% Secure Payments</p>
                  <div className="flex space-x-2">
                    <span className="bg-white text-gray-900 px-2 py-1 rounded text-xs font-medium">
                      VISA
                    </span>
                    <span className="bg-white text-gray-900 px-2 py-1 rounded text-xs font-medium">
                      MC
                    </span>
                    <span className="bg-white text-gray-900 px-2 py-1 rounded text-xs font-medium">
                      PayPal
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="border-t border-gray-700 mt-8 pt-8 text-center">
              <p className="text-gray-400 text-sm">
                &copy; 2024 Fansee Rebel. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
