import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Store, CheckCircle, Sparkles } from 'lucide-react';

const BecomeSellerPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };

      const response = await axios.put('http://localhost:5000/api/seller/become-seller', {}, config);

      // Update user in local storage with new role
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      setSuccess(true);

      // Redirect to seller dashboard after a short delay
      setTimeout(() => {
        navigate('/seller-dashboard');
        window.location.reload(); // Force a reload to update navbar
      }, 2500);

    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-[#0a0015] via-[#1a0a2e] to-[#0a0015]">
        <div className="max-w-2xl w-full bg-[#1a0a2e] border border-[#571089]/30 rounded-3xl shadow-2xl p-12 text-center">
          <div className="text-6xl mb-6 animate-bounce">🎉</div>
          <h2 className="text-4xl font-bold text-white mb-4">
            Congratulations, Seller!
          </h2>
          <p className="text-gray-300 text-lg mb-8">
            Your account has been upgraded. Welcome to the Fansee Rebel marketplace.
          </p>
          <div className="flex justify-center items-center space-x-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#ea698b]"></div>
            <p className="text-sm text-gray-400">
              Redirecting you to your new dashboard...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-[#0a0015] via-[#1a0a2e] to-[#0a0015]">
      <div className="max-w-2xl w-full bg-[#1a0a2e] border border-[#571089]/30 rounded-3xl shadow-2xl p-12">
        <div className="text-center mb-8">
          <div className="inline-block p-4 bg-gradient-to-r from-[#ea698b]/20 to-[#822faf]/20 border border-[#ea698b]/30 rounded-full mb-6">
            <Store className="w-10 h-10 text-[#ea698b]" />
          </div>
          <h1 className="text-4xl font-bold text-white">
            Become a <span className="bg-gradient-to-r from-[#ea698b] to-[#d55d92] bg-clip-text text-transparent">Seller</span>
          </h1>
          <p className="text-gray-400 mt-2">Join our marketplace and start selling your products to a world of fashion lovers.</p>
        </div>

        {error && (
          <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg mb-6 text-sm">
            {error}
          </div>
        )}

        <ul className="space-y-3 text-gray-300 mb-8">
          <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-green-400" /> Access to a dedicated Seller Dashboard.</li>
          <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-green-400" /> List and manage your own products.</li>
          <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-green-400" /> Track your sales and earnings.</li>
        </ul>

        <form onSubmit={handleSubmit}>
          <p className="text-xs text-gray-500 text-center mb-4">By clicking the button below, you agree to our Seller Terms & Conditions and to upgrade your account role.</p>
          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-3 px-4 rounded-lg shadow-lg text-lg font-semibold text-white bg-gradient-to-r from-[#ea698b] to-[#d55d92] hover:from-[#d55d92] hover:to-[#ea698b] disabled:opacity-50 transition-all duration-300"
          >
            {loading ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                Upgrading Account...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                Upgrade to Seller Account
              </div>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BecomeSellerPage;