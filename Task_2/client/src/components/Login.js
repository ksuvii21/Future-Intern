import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Mail, Lock, CheckCircle, Fingerprint, Shield, Zap, Eye, EyeOff, Sparkles, Chrome } from 'lucide-react';
 
const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState({ email: false, password: false });
  const [shake, setShake] = useState(false);
  const navigate = useNavigate();

  const LOGO_PATH = '/logo.png';

  useEffect(() => {
    // Check for saved credentials
    const savedEmail = localStorage.getItem('savedEmail');
    if (savedEmail) {
      setFormData(prev => ({ ...prev, email: savedEmail, rememberMe: true }));
    }
  }, []);

  const handleChange = e => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value,
    });
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleFocus = (field) => {
    setIsFocused(prev => ({ ...prev, [field]: true }));
  };

  const handleBlur = (field) => {
    setIsFocused(prev => ({ ...prev, [field]: false }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await axios.post(
        'http://localhost:5000/api/auth/login',
        formData
      );
      
      // Save email if remember me is checked
      if (formData.rememberMe) {
        localStorage.setItem('savedEmail', formData.email);
      } else {
        localStorage.removeItem('savedEmail');
      }
      
      onLogin(response.data.user, response.data.token);
      
      // Success animation before navigation
      setTimeout(() => {
        navigate('/');
      }, 800);
      
    } catch (error) {
      setError(error.response?.data?.message || 'Login failed. Please check your credentials.');
      setShake(true);
      setTimeout(() => setShake(false), 500);
    } finally {
      setLoading(false);
    }
  };

  const handleGuestLogin = () => {
    setFormData({
      email: 'guest@fanseerebel.com',
      password: 'guest123',
      rememberMe: false
    });
  };

  const handleGoogleLogin = () => {
    // Redirect to the backend Google OAuth route
    window.location.href = 'http://localhost:5000/api/auth/google';
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:p-10 bg-gradient-to-br from-[#0a0015] via-[#1a0a2e] to-[#0a0015] relative overflow-hidden">
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#ea698b] rounded-full mix-blend-screen opacity-10 blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#822faf] rounded-full mix-blend-screen opacity-10 blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#571089] rounded-full mix-blend-screen opacity-5 blur-3xl"></div>
      </div>

      {/* Main Login Card */}
      <div className={`max-w-6xl w-full bg-[#1a0a2e] border border-[#571089]/30 rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-500 ${shake ? 'animate-shake' : ''}`}>
        <div className="grid grid-cols-1 lg:grid-cols-2">

          {/* Left Column: Login Form */}
          <div className="p-8 sm:p-12 lg:p-16 space-y-8 bg-[#1a0a2e] z-10 relative">
            
            {/* Floating Elements */}
            <div className="absolute top-4 right-4 opacity-20">
              <Sparkles className="w-6 h-6 text-[#ea698b] animate-pulse" />
            </div>
            
            {/* Logo and Greeting */}
            <div className="space-y-2">
              <div className="flex items-center transform hover:scale-105 transition-transform duration-300">
                <img src={LOGO_PATH} alt="Fansee Rebel" className="w-25 h-24 rounded-lg mr-2" />
              </div>
              <h1 className="text-4xl font-bold text-white mt-4">
                Hello, <br />
                <span className="bg-gradient-to-r from-[#ea698b] to-[#d55d92] bg-clip-text text-transparent animate-gradient">
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
                <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg text-sm animate-fade-in">
                  {error}
                </div>
              )}

              {/* Email Input */}
              <div>
                <div className="relative group">
                  <Mail className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors duration-300 ${
                    isFocused.email ? 'text-[#ea698b]' : 'text-gray-500'
                  }`} />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => handleFocus('email')}
                    onBlur={() => handleBlur('email')}
                    className="w-full px-4 py-3 pl-12 bg-[#2a1a3e] border border-[#571089]/50 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-[#ea698b] focus:border-[#ea698b] transition-all duration-300 group-hover:border-[#571089]/70"
                    placeholder="stanley@gmail.com"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <div className="relative group">
                  <Lock className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors duration-300 ${
                    isFocused.password ? 'text-[#ea698b]' : 'text-gray-500'
                  }`} />
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    onFocus={() => handleFocus('password')}
                    onBlur={() => handleBlur('password')}
                    className="w-full px-4 py-3 pl-12 pr-12 bg-[#2a1a3e] border border-[#571089]/50 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-[#ea698b] focus:border-[#ea698b] transition-all duration-300 group-hover:border-[#571089]/70"
                    placeholder="••••••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-[#ea698b] transition-colors duration-300"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Checkbox and Forgot Password */}
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center group" onClick={() => handleChange({ target: { name: 'rememberMe', type: 'checkbox', checked: !formData.rememberMe } })}>
                  <div className={`relative w-4 h-4 rounded border ${
                    formData.rememberMe ? 'bg-[#ea698b] border-[#ea698b]' : 'border-gray-600 bg-[#2a1a3e]'
                  } transition-all duration-300 group-hover:border-[#ea698b]`}>
                    <input
                      id="rememberMe"
                      name="rememberMe"
                      type="checkbox"
                      checked={formData.rememberMe}
                      onChange={handleChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    {formData.rememberMe && (
                      <CheckCircle className="absolute -top-0.5 -left-0.5 w-5 h-5 text-white animate-pop-in" />
                    )}
                  </div>
                  <label htmlFor="rememberMe" className="ml-2 text-gray-400 cursor-pointer group-hover:text-gray-300 transition-colors">
                    Remember me
                  </label>
                </div>

                <Link
                  to="/forgot-password"
                  className="font-medium text-[#ea698b] hover:text-[#d55d92] transition-colors hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>

              {/* Sign In Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3 px-4 rounded-lg shadow-lg text-lg font-semibold text-white bg-gradient-to-r from-[#ea698b] to-[#d55d92] hover:from-[#d55d92] hover:to-[#ea698b] focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-[#ea698b]/50 focus:ring-offset-[#1a0a2e] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                {loading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                    Signing in...
                  </div>
                ) : (
                  'Sign In'
                )}
              </button>

              {/* Google Login Button */}
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full flex justify-center items-center gap-3 py-3 px-4 rounded-lg border border-[#571089] text-gray-300 hover:bg-[#571089]/20 hover:border-[#ea698b]/50 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
              >
                <Chrome className="w-5 h-5" /> Sign In with Google
              </button>

              {/* Guest Login Button */}
              <button
                type="button"
                onClick={handleGuestLogin}
                className="w-full py-3 px-4 rounded-lg border border-[#571089] text-gray-300 hover:bg-[#571089]/20 hover:border-[#ea698b]/50 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
              >
                Try Guest Account
              </button>
            </form>

            {/* Register Link */}
            <div className="text-center pt-4">
              <span className="text-sm text-gray-400">
                Don't have an account?{' '}
              </span>
              <Link
                to="/register"
                className="text-sm font-semibold text-[#ea698b] hover:text-[#d55d92] transition-colors hover:underline"
              >
                Sign Up
              </Link>
            </div>
          </div>

          {/* Right Column: Enhanced Illustration */}
          <div className="relative hidden lg:flex items-center justify-center p-12 bg-gradient-to-br from-[#822faf] to-[#ac46a1] overflow-hidden">
            
            {/* Enhanced Background Effects */}
            <div className="absolute inset-0 opacity-20" style={{ 
                backgroundImage: 'radial-gradient(#ffffff20 1px, transparent 1px)',
                backgroundSize: '20px 20px',
            }}></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#822faf] to-transparent opacity-50"></div>
            
            {/* Floating Particles */}
            <div className="absolute inset-0">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 bg-white/30 rounded-full animate-float"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${i * 2}s`,
                    animationDuration: `${15 + i * 5}s`
                  }}
                />
              ))}
            </div>

            {/* Enhanced Illustration Container */}
            <div className="relative text-center w-full max-w-sm p-8 space-y-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl shadow-xl transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl group">
                
                {/* Animated Security Icons */}
                <div className="flex justify-center items-center relative">
                  <Fingerprint 
                    className="w-20 h-20 text-white animate-pulse group-hover:scale-110 transition-transform duration-300" 
                    strokeWidth={1}
                    style={{ filter: 'drop-shadow(0 0 10px rgba(234, 105, 139, 0.8))' }}
                  />
                  <Shield className="absolute -top-2 -right-2 w-8 h-8 text-[#ea698b] animate-bounce" />
                </div>

                {/* Text */}
                <h3 className="text-3xl font-bold text-white leading-snug">
                  Seamless & <br/> Secure Login
                </h3>
                <p className="text-gray-200">
                  Use your credentials or integrate biometrics for ultra-fast access to your luxury dashboard.
                </p>

                {/* Enhanced Feature Tags */}
                <div className="flex justify-center gap-4 text-sm font-medium pt-4">
                  <div className="flex items-center gap-2 text-white bg-black/30 px-3 py-2 rounded-full border border-white/30 hover:border-[#ea698b] transition-all duration-300 group/item">
                    <Shield className="w-4 h-4 text-[#ea698b] group-hover/item:scale-110 transition-transform" />
                    2FA Ready
                  </div>
                  <div className="flex items-center gap-2 text-white bg-black/30 px-3 py-2 rounded-full border border-white/30 hover:border-[#ea698b] transition-all duration-300 group/item">
                    <Zap className="w-4 h-4 text-[#ea698b] group-hover/item:scale-110 transition-transform" />
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