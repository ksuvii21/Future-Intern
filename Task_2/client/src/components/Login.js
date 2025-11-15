import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Mail, Lock, User, CheckCircle, Fingerprint, Shield, Zap } from 'lucide-react'; // Added Fingerprint, Shield, Zap

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const LOGO_PATH = '/logo.png'; 

  const handleChange = e => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post(
        'http://localhost:5000/api/auth/login',
        formData
      );
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      navigate('/');
    } catch (error) {
      setError(error.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    // Outer container matching the dark gradient of the home page
    <div className="min-h-screen flex items-center justify-center p-4 md:p-10 bg-gradient-to-br from-[#0a0015] via-[#1a0a2e] to-[#0a0015]">
      
      {/* Main Login Card - Wide for the two-column layout */}
      <div className="max-w-6xl w-full bg-[#1a0a2e] border border-[#571089]/30 rounded-3xl shadow-2xl overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2">

          {/* Left Column: Login Form */}
          <div className="p-8 sm:p-12 lg:p-16 space-y-8 bg-[#1a0a2e] z-10">
            
            {/* Logo and Greeting */}
            <div className="space-y-2">
              <div className="flex items-center">
                <img src={LOGO_PATH} alt="Fansee Rebel" className="w-10 h-10 rounded-lg mr-2" />
                <span className="text-xl font-semibold text-gray-300">Fansee Rebel</span>
              </div>
              <h1 className="text-4xl font-bold text-white mt-4">
                Holla, <br />
                <span className="bg-gradient-to-r from-[#ea698b] to-[#d55d92] bg-clip-text text-transparent">
                    Welcome Back
                </span>
              </h1>
              <p className="text-md text-gray-400">
                Hey, welcome back to your special place for luxury fashion.
              </p>
            </div>

            {/* Form Section */}
            <form className="space-y-6" onSubmit={handleSubmit}>
              {error && (
                <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              {/* Email Input */}
              <div>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 pl-12 bg-[#2a1a3e] border border-[#571089]/50 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-[#ea698b] focus:border-[#ea698b] transition-colors"
                    placeholder="stanley@gmail.com"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-3 pl-12 bg-[#2a1a3e] border border-[#571089]/50 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-[#ea698b] focus:border-[#ea698b] transition-colors"
                    placeholder="••••••••••••"
                  />
                </div>
              </div>

              {/* Checkbox and Forgot Password */}
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <input
                    id="rememberMe"
                    name="rememberMe"
                    type="checkbox"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    className="h-4 w-4 rounded text-[#ea698b] border-gray-600 focus:ring-[#ea698b] bg-[#2a1a3e] checked:bg-[#ea698b] transition-all"
                  />
                  <label htmlFor="rememberMe" className="ml-2 text-gray-400 cursor-pointer">
                    Remember me
                  </label>
                </div>

                <Link
                  to="/forgot-password"
                  className="font-medium text-[#ea698b] hover:text-[#d55d92] transition-colors"
                >
                  Forgot Password?
                </Link>
              </div>

              {/* Sign In Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3 px-4 rounded-lg shadow-lg text-lg font-semibold text-white bg-gradient-to-r from-[#ea698b] to-[#d55d92] hover:from-[#d55d92] hover:to-[#ea698b] focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-[#ea698b]/50 focus:ring-offset-[#1a0a2e] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {loading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                    Signing in...
                  </div>
                ) : (
                  'Sign In'
                )}
              </button>
            </form>

            {/* Register Link */}
            <div className="text-center pt-4">
              <span className="text-sm text-gray-400">
                Don't have an account?{' '}
              </span>
              <Link
                to="/register"
                className="text-sm font-semibold text-[#ea698b] hover:text-[#d55d92] transition-colors"
              >
                Sign Up
              </Link>
            </div>
          </div>

          {/* Right Column: Theme-Consistent Illustration */}
          <div className="relative hidden lg:flex items-center justify-center p-12 bg-gradient-to-br from-[#822faf] to-[#ac46a1] overflow-hidden">
            
            {/* Background Texture/Effect */}
            <div className="absolute inset-0 opacity-20" style={{ 
                backgroundImage: 'radial-gradient(#ffffff20 1px, transparent 1px)',
                backgroundSize: '20px 20px',
            }}></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#822faf] to-transparent opacity-50"></div>

            {/* Illustration Container */}
            <div className="relative text-center w-full max-w-sm p-8 space-y-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl shadow-xl transition-all duration-500 hover:scale-[1.02]">
                
                {/* Main Security Icon (Animated) */}
                <div className="flex justify-center items-center">
                    <Fingerprint 
                        className="w-20 h-20 text-white animate-pulse" 
                        strokeWidth={1}
                        style={{ filter: 'drop-shadow(0 0 10px rgba(234, 105, 139, 0.8))' }}
                    />
                </div>

                {/* Text */}
                <h3 className="text-3xl font-bold text-white leading-snug">
                    Seamless & <br/> Secure Login
                </h3>
                <p className="text-gray-200">
                    Use your credentials or integrate biometrics for ultra-fast access to your luxury dashboard.
                </p>

                {/* Feature Tags */}
                <div className="flex justify-center gap-4 text-sm font-medium pt-4">
                    <div className="flex items-center gap-2 text-white bg-black/30 px-3 py-1 rounded-full border border-white/30">
                        <Shield className="w-4 h-4 text-[#ea698b]" />
                        2FA Ready
                    </div>
                    <div className="flex items-center gap-2 text-white bg-black/30 px-3 py-1 rounded-full border border-white/30">
                        <Zap className="w-4 h-4 text-[#ea698b]" />
                        Fast Access
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;