import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Mail, Lock, User, CheckCircle, Eye, EyeOff, Sparkles, Shield, Zap, Fingerprint, Chrome } from 'lucide-react';
 
const Register = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user',
    agreeToTerms: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isFocused, setIsFocused] = useState({ 
    username: false, 
    email: false, 
    password: false, 
    confirmPassword: false 
  });
  const [shake, setShake] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const navigate = useNavigate();

  const LOGO_PATH = '/logo.png';

  useEffect(() => {
    if (error) {
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  }, [error]);

  const handleChange = e => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value,
    });
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
    setLoading(true);
    setError('');

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    // Validate password length
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      setLoading(false);
      return;
    }

    // Validate terms agreement
    if (!formData.agreeToTerms) {
      setError('Please agree to the Terms of Service and Privacy Policy');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:5000/api/auth/register',
        {
          username: formData.username,
          email: formData.email,
          password: formData.password,
          role: formData.role,
        }
      );

      onLogin(response.data.user, response.data.token);
      setSuccess(true);

      // Redirect after showing success message
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error) {
      setError(error.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    // Redirect to the backend Google OAuth route
    window.location.href = 'http://localhost:5000/api/auth/google';
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 md:p-10 bg-gradient-to-br from-[#0a0015] via-[#1a0a2e] to-[#0a0015]">
        <div className="max-w-2xl w-full bg-[#1a0a2e] border border-[#571089]/30 rounded-3xl shadow-2xl p-12 text-center">
          <div className="text-6xl mb-6 animate-bounce">🎉</div>
          <h2 className="text-4xl font-bold text-white mb-4">
            Welcome to <span className="bg-gradient-to-r from-[#ea698b] to-[#d55d92] bg-clip-text text-transparent">Fansee Rebel!</span>
          </h2>
          <p className="text-gray-300 text-lg mb-8">
            Your luxury fashion journey begins now. Your account has been created successfully.
          </p>
          <div className="flex justify-center items-center space-x-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#ea698b]"></div>
            <p className="text-sm text-gray-400">
              Preparing your dashboard...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:p-10 bg-gradient-to-br from-[#0a0015] via-[#1a0a2e] to-[#0a0015] relative overflow-hidden">
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#ea698b] rounded-full mix-blend-screen opacity-10 blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#822faf] rounded-full mix-blend-screen opacity-10 blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#571089] rounded-full mix-blend-screen opacity-5 blur-3xl"></div>
      </div>

      {/* Main Register Card */}
      <div className={`max-w-6xl w-full bg-[#1a0a2e] border border-[#571089]/30 rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-500 ${shake ? 'animate-shake' : ''}`}>
        <div className="grid grid-cols-1 lg:grid-cols-2">

          {/* Left Column: Register Form */}
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
                Join The <br />
                <span className="bg-gradient-to-r from-[#ea698b] to-[#d55d92] bg-clip-text text-transparent animate-gradient">
                  Rebel Family
                </span>
              </h1>
              <p className="text-md text-gray-400">
                Create your account and step into the world of exclusive luxury fashion.
              </p>
            </div>

            {/* Form Section */}
            <form className="space-y-6" onSubmit={handleSubmit}>
              {error && (
                <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg text-sm animate-fade-in">
                  {error}
                </div>
              )}

              {/* Username Input */}
              <div>
                <div className="relative group">
                  <User className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors duration-300 ${
                    isFocused.username ? 'text-[#ea698b]' : 'text-gray-500'
                  }`} />
                  <input
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="username"
                    required
                    value={formData.username}
                    onChange={handleChange}
                    onFocus={() => handleFocus('username')}
                    onBlur={() => handleBlur('username')}
                    className="w-full px-4 py-3 pl-12 bg-[#2a1a3e] border border-[#571089]/50 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-[#ea698b] focus:border-[#ea698b] transition-all duration-300 group-hover:border-[#571089]/70"
                    placeholder="Choose your rebel name"
                  />
                </div>
              </div>

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
                    placeholder="your@rebel.email"
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
                    autoComplete="new-password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    onFocus={() => handleFocus('password')}
                    onBlur={() => handleBlur('password')}
                    className="w-full px-4 py-3 pl-12 pr-12 bg-[#2a1a3e] border border-[#571089]/50 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-[#ea698b] focus:border-[#ea698b] transition-all duration-300 group-hover:border-[#571089]/70"
                    placeholder="Create a strong password"
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

              {/* Confirm Password Input */}
              <div>
                <div className="relative group">
                  <Lock className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors duration-300 ${
                    isFocused.confirmPassword ? 'text-[#ea698b]' : 'text-gray-500'
                  }`} />
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    onFocus={() => handleFocus('confirmPassword')}
                    onBlur={() => handleBlur('confirmPassword')}
                    className="w-full px-4 py-3 pl-12 pr-12 bg-[#2a1a3e] border border-[#571089]/50 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-[#ea698b] focus:border-[#ea698b] transition-all duration-300 group-hover:border-[#571089]/70"
                    placeholder="Confirm your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-[#ea698b] transition-colors duration-300"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Role Selection */}
              <div>
                <div className="relative group">
                  <User className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors duration-300 ${
                    isFocused.role ? 'text-[#ea698b]' : 'text-gray-500'
                  }`} />
                  <select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    onFocus={() => handleFocus('role')}
                    onBlur={() => handleBlur('role')}
                    className="w-full px-4 py-3 pl-12 bg-[#2a1a3e] border border-[#571089]/50 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-[#ea698b] focus:border-[#ea698b] transition-all duration-300 group-hover:border-[#571089]/70 appearance-none"
                  >
                    <option value="user">I am a Customer</option>
                    <option value="seller">I want to be a Seller</option>
                  </select>
                </div>
              </div>

              {/* Terms Agreement */}
              <div className="flex items-start text-sm">
                <div className="flex items-center h-5 group" onClick={() => handleChange({ target: { name: 'agreeToTerms', type: 'checkbox', checked: !formData.agreeToTerms } })}>
                  <div className={`relative w-4 h-4 rounded border ${
                    formData.agreeToTerms ? 'bg-[#ea698b] border-[#ea698b]' : 'border-gray-600 bg-[#2a1a3e]'
                  } transition-all duration-300 group-hover:border-[#ea698b]`}>
                    <input
                      id="agreeToTerms"
                      name="agreeToTerms"
                      type="checkbox"
                      checked={formData.agreeToTerms}
                      onChange={handleChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    {formData.agreeToTerms && (
                      <CheckCircle className="absolute -top-0.5 -left-0.5 w-5 h-5 text-white animate-pop-in" />
                    )}
                  </div>
                </div>
                <label htmlFor="agreeToTerms" className="ml-2 text-gray-400 cursor-pointer group-hover:text-gray-300 transition-colors">
                  I agree to the{' '}
                  <button
                    type="button"
                    onClick={() => setShowTermsModal(true)}
                    className="text-[#ea698b] hover:text-[#d55d92] hover:underline bg-transparent border-none cursor-pointer"
                  >
                    Terms of Service
                  </button>{' '}
                  and{' '}
                  <button
                    type="button"
                    onClick={() => setShowPrivacyModal(true)}
                    className="text-[#ea698b] hover:text-[#d55d92] hover:underline bg-transparent border-none cursor-pointer"
                  >
                    Privacy Policy
                  </button>
                </label>
              </div>

              {/* Create Account Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3 px-4 rounded-lg shadow-lg text-lg font-semibold text-white bg-gradient-to-r from-[#ea698b] to-[#d55d92] hover:from-[#d55d92] hover:to-[#ea698b] focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-[#ea698b]/50 focus:ring-offset-[#1a0a2e] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                {loading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                    Creating Your Rebel Account...
                  </div>
                ) : (
                  'Join The Rebellion'
                )}
              </button>
            </form>
            
            {/* OR Separator */}
            <div className="flex items-center gap-4">
              <div className="flex-grow h-px bg-[#571089]/30"></div>
              <span className="text-gray-500 text-sm">OR</span>
              <div className="flex-grow h-px bg-[#571089]/30"></div>
            </div>

            <button type="button" onClick={handleGoogleLogin} className="w-full flex justify-center items-center gap-3 py-3 px-4 rounded-lg border border-[#571089] text-gray-300 hover:bg-[#571089]/20 hover:border-[#ea698b]/50 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"><Chrome className="w-5 h-5" /> Continue with Google</button>

            {/* Login Link */}
            <div className="text-center pt-4">
              <span className="text-sm text-gray-400">
                Already part of the rebellion?{' '}
              </span>
              <Link
                to="/login"
                className="text-sm font-semibold text-[#ea698b] hover:text-[#d55d92] transition-colors hover:underline"
              >
                Sign In Here
              </Link>
            </div>
          </div>

          {/* Right Column: Theme-Consistent Illustration */}
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
                  <Shield 
                    className="w-20 h-20 text-white animate-pulse group-hover:scale-110 transition-transform duration-300" 
                    strokeWidth={1}
                    style={{ filter: 'drop-shadow(0 0 10px rgba(234, 105, 139, 0.8))' }}
                  />
                  <Zap className="absolute -top-2 -right-2 w-8 h-8 text-[#ea698b] animate-bounce" />
                </div>

                {/* Text */}
                <h3 className="text-3xl font-bold text-white leading-snug">
                  Join The <br/> Elite Fashion Circle
                </h3>
                <p className="text-gray-200">
                  Become part of our exclusive community with early access to luxury collections and member-only benefits.
                </p>

                {/* Enhanced Feature Tags */}
                <div className="flex flex-wrap justify-center gap-3 text-sm font-medium pt-4">
                  <div className="flex items-center gap-2 text-white bg-black/30 px-3 py-2 rounded-full border border-white/30 hover:border-[#ea698b] transition-all duration-300 group/item">
                    <Zap className="w-4 h-4 text-[#ea698b] group-hover/item:scale-110 transition-transform" />
                    Early Access
                  </div>
                  <div className="flex items-center gap-2 text-white bg-black/30 px-3 py-2 rounded-full border border-white/30 hover:border-[#ea698b] transition-all duration-300 group/item">
                    <Fingerprint className="w-4 h-4 text-[#ea698b] group-hover/item:scale-110 transition-transform" />
                    Exclusive Deals
                  </div>
                  <div className="flex items-center gap-2 text-white bg-black/30 px-3 py-2 rounded-full border border-white/30 hover:border-[#ea698b] transition-all duration-300 group/item">
                    <Shield className="w-4 h-4 text-[#ea698b] group-hover/item:scale-110 transition-transform" />
                    VIP Support
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>

      {/* Terms of Service Modal */}
      {showTermsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#1a0a2e] border border-[#571089]/30 rounded-3xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Terms of Service</h2>
                <button
                  onClick={() => setShowTermsModal(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  ✕
                </button>
              </div>
              <div className="text-gray-300 space-y-4">
                <p>
                  Welcome to Fansee Rebel, your premier destination for luxury fashion. By accessing and using our website, you agree to comply with and be bound by the following terms and conditions of use.
                </p>
                <p>
                  All content on this site, including text, graphics, logos, and images, is the property of Fansee Rebel and is protected by international copyright laws. You may not reproduce, distribute, or create derivative works without prior written consent.
                </p>
                <p>
                  Our products are sold "as is" with no warranties expressed or implied. We reserve the right to modify or discontinue any product at any time without notice. Prices are subject to change without prior notice.
                </p>
                <p>
                  Fansee Rebel is not responsible for any damages arising from the use of our website or products. Your use of this site is at your own risk. We recommend consulting with professionals for fashion advice.
                </p>
                <p>
                  By registering an account, you agree to provide accurate information and maintain the confidentiality of your login credentials. We reserve the right to terminate accounts that violate these terms.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Privacy Policy Modal */}
      {showPrivacyModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#1a0a2e] border border-[#571089]/30 rounded-3xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Privacy Policy</h2>
                <button
                  onClick={() => setShowPrivacyModal(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  ✕
                </button>
              </div>
              <div className="text-gray-300 space-y-4">
                <p>
                  At Fansee Rebel, we are committed to protecting your privacy and personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you use our website and services.
                </p>
                <p>
                  We collect information you provide directly, such as your name, email address, and payment details when you register or make a purchase. We also gather data through cookies and analytics tools to improve your browsing experience.
                </p>
                <p>
                  Your personal information is used to process orders, provide customer support, send marketing communications (with your consent), and enhance our services. We do not sell your data to third parties without your explicit permission.
                </p>
                <p>
                  We implement industry-standard security measures to protect your data from unauthorized access. However, no online transmission is 100% secure, and we cannot guarantee absolute security.
                </p>
                <p>
                  You have the right to access, update, or delete your personal information at any time. Contact our support team if you have questions about your privacy or wish to exercise these rights.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;
