import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { User, Mail, Lock, Edit, Save, X, ShoppingBag, Heart, Calendar, Eye, EyeOff, Store, MapPin, Trash2, PlusCircle, LogOut } from 'lucide-react';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [newAddress, setNewAddress] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    isDefault: false
  });
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalSpent: 0,
    wishlistItems: 0
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      navigate('/login');
      return;
    }
    const userData = JSON.parse(storedUser);
    setUser(userData);
    setFormData({
      username: userData.username,
      email: userData.email,
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    fetchUserData();
  }, [navigate]);

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };

      // Fetch orders
      const ordersResponse = await axios.get('http://localhost:5000/api/orders', config);
      setOrders(ordersResponse.data.slice(0, 5)); // Get last 5 orders

      // Calculate stats
      const totalOrders = ordersResponse.data.length;
      const totalSpent = ordersResponse.data.reduce((sum, order) => sum + order.totalAmount, 0);

      // Fetch wishlist count from API
      let wishlistCount = 0;

      if (token) {
        try {
          const wishlistResponse = await axios.get('http://localhost:5000/api/wishlist', {
            headers: { Authorization: `Bearer ${token}` }
          });
          wishlistCount = wishlistResponse.data.items.length;
        } catch (error) {
          console.error('Error fetching wishlist count:', error);
          wishlistCount = 0;
        }
      }

      setStats({
        totalOrders,
        totalSpent: totalSpent.toFixed(2),
        wishlistItems: wishlistCount
      });
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };

      const updateData = {
        username: formData.username,
        email: formData.email
      };

      // If password change is requested
      if (formData.newPassword) {
        if (formData.newPassword !== formData.confirmPassword) {
          setError('New passwords do not match');
          return;
        }
        if (!formData.currentPassword) {
          setError('Current password is required to change password');
          return;
        }
        updateData.currentPassword = formData.currentPassword;
        updateData.newPassword = formData.newPassword;
      }

      const response = await axios.put('http://localhost:5000/api/auth/profile', updateData, config);

      // Update local storage
      localStorage.setItem('user', JSON.stringify(response.data.user));
      setUser(response.data.user);

      setSuccess('Profile updated successfully!');
      setEditing(false);

      // Clear password fields
      setFormData(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }));

    } catch (error) {
      setError(error.response?.data?.message || 'Failed to update profile');
    }
  };

  const handleCancelEdit = () => {
    setFormData({
      username: user.username,
      email: user.email,
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    setEditing(false);
    setError('');
    setSuccess('');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    // Dispatch a storage event to notify other components (like the header) of the logout
    window.dispatchEvent(new Event('storage'));
    // Navigate to the home page after logout
    navigate('/');
  };
  
  const handleAddressInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewAddress(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleAddAddress = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const response = await axios.post('http://localhost:5000/api/auth/address', newAddress, config);

      localStorage.setItem('user', JSON.stringify(response.data.user));
      setUser(response.data.user);
      setSuccess('Address added successfully!');
      setShowAddressModal(false);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to add address');
    }
  };

  const handleDeleteAddress = async (addressId) => {
    if (!window.confirm('Are you sure you want to delete this address?')) return;
    setError('');
    setSuccess('');
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const response = await axios.delete(`http://localhost:5000/api/auth/address/${addressId}`, config);

      localStorage.setItem('user', JSON.stringify(response.data.user));
      setUser(response.data.user);
      setSuccess('Address deleted successfully!');
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to delete address');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0a0015] via-[#1a0a2e] to-[#0a0015] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ea698b]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0015] via-[#1a0a2e] to-[#0a0015] py-8">
      <div className="max-w-6xl mx-auto px-4">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-[#ea698b] to-[#d55d92] bg-clip-text text-transparent mb-2 capitalize">
            {user?.username}'s Dashboard
          </h1>
          <p className="text-gray-400">Manage your account settings and view your activity</p>
        </div>

        {/* Tabs */}
        <div className="flex space-x-2 border-b border-[#571089]/30 mb-8">
          <button onClick={() => setActiveTab('profile')} className={`px-4 py-2 font-medium transition-colors ${activeTab === 'profile' ? 'text-[#ea698b] border-b-2 border-[#ea698b]' : 'text-gray-400'}`}>Profile</button>
          <button onClick={() => setActiveTab('orders')} className={`px-4 py-2 font-medium transition-colors ${activeTab === 'orders' ? 'text-[#ea698b] border-b-2 border-[#ea698b]' : 'text-gray-400'}`}>Orders</button>
          <button onClick={() => setActiveTab('addresses')} className={`px-4 py-2 font-medium transition-colors ${activeTab === 'addresses' ? 'text-[#ea698b] border-b-2 border-[#ea698b]' : 'text-gray-400'}`}>Addresses</button>
        </div>



        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Become a Seller Banner (for users only) */}
          {user && user.role === 'user' && (
            <div className="lg:col-span-3">
              <div className="bg-gradient-to-r from-[#ea698b]/20 to-[#822faf]/20 border border-[#ea698b]/30 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <Store className="w-10 h-10 text-[#ea698b]" />
                  <div>
                    <h3 className="text-xl font-bold text-white">Start Selling on Fansee Rebel</h3>
                    <p className="text-gray-400">Join our marketplace and reach thousands of fashion lovers.</p>
                  </div>
                </div>
                <Link to="/become-seller" className="px-6 py-3 bg-gradient-to-r from-[#ea698b] to-[#d55d92] text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-[#ea698b]/50 transition-all whitespace-nowrap">Become a Seller</Link>
              </div>
            </div>
          )}

          {/* Profile Information */}
          <div className="lg:col-span-2 space-y-6">

            {/* Personal Information Card */}
            {activeTab === 'profile' && <div className="bg-[#1a0a2e] border border-[#571089]/30 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                  <User className="w-6 h-6 text-[#ea698b]" /> 
                  Personal Information
                </h2>
                {!editing ? (
                  <button
                    onClick={() => setEditing(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-[#ea698b] hover:bg-[#d55d92] text-white rounded-lg transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                    Edit Profile
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={handleUpdateProfile}
                      className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                    >
                      <Save className="w-4 h-4" />
                      Save
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="flex items-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
                    >
                      <X className="w-4 h-4" />
                      Cancel
                    </button>
                  </div>
                )}
              </div>

              {error && (
                <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg mb-4">
                  {error}
                </div>
              )}

              {success && (
                <div className="bg-green-900/50 border border-green-700 text-green-300 px-4 py-3 rounded-lg mb-4">
                  {success}
                </div>
              )}

              <form className="space-y-4">
                <div>
                  <label className="block text-gray-300 mb-2">Username</label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    disabled={!editing}
                    className="w-full px-4 py-3 bg-[#2a1a3e] border border-[#571089]/50 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-[#ea698b] focus:border-[#ea698b] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={!editing}
                    className="w-full px-4 py-3 bg-[#2a1a3e] border border-[#571089]/50 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-[#ea698b] focus:border-[#ea698b] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  />
                </div>

                {editing && (
                  <>
                    <div className="border-t border-[#571089]/30 pt-4">
                      <h3 className="text-lg font-semibold text-white mb-4">Change Password (Optional)</h3>

                      <div className="space-y-4">
                        <div>
                          <label className="block text-gray-300 mb-2">Current Password</label>
                          <div className="relative">
                            <input
                              type={showPassword ? "text" : "password"}
                              name="currentPassword"
                              value={formData.currentPassword}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 pl-12 bg-[#2a1a3e] border border-[#571089]/50 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-[#ea698b] focus:border-[#ea698b] transition-all"
                              placeholder="Enter current password"
                            />
                            <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                          </div>
                        </div>

                        <div>
                          <label className="block text-gray-300 mb-2">New Password</label>
                          <div className="relative">
                            <input
                              type={showPassword ? "text" : "password"}
                              name="newPassword"
                              value={formData.newPassword}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 pl-12 pr-12 bg-[#2a1a3e] border border-[#571089]/50 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-[#ea698b] focus:border-[#ea698b] transition-all"
                              placeholder="Enter new password"
                            />
                            <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-[#ea698b] transition-colors"
                            >
                              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                          </div>
                        </div>

                        <div>
                          <label className="block text-gray-300 mb-2">Confirm New Password</label>
                          <div className="relative">
                            <input
                              type={showPassword ? "text" : "password"}
                              name="confirmPassword"
                              value={formData.confirmPassword}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 pl-12 bg-[#2a1a3e] border border-[#571089]/50 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-[#ea698b] focus:border-[#ea698b] transition-all"
                              placeholder="Confirm new password"
                            />
                            <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </form>
            </div>}

            {/* Recent Orders */}
            {activeTab === 'orders' && <div className="bg-[#1a0a2e] border border-[#571089]/30 rounded-2xl p-6">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3 mb-4">
                <ShoppingBag className="w-6 h-6 text-[#ea698b]" />
                Recent Orders
              </h2>

              {orders.length > 0 ? (
                <div className="space-y-4">
                  {orders.map(order => (<Link to={`/orders/${order._id}`} key={order._id} className="block border border-[#571089]/30 rounded-lg p-4 hover:border-[#ea698b]/50 transition-colors">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-white font-semibold">Order #{order._id.slice(-8)}</p>
                          <p className="text-gray-400 text-sm">{new Date(order.createdAt).toLocaleDateString()}</p>
                          <p className="text-[#ea698b] font-bold">₹{order.totalAmount}</p></div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          order.status === 'completed' ? 'bg-green-900/50 text-green-300' :
                          order.status === 'pending' ? 'bg-yellow-900/50 text-yellow-300' :
                          'bg-gray-900/50 text-gray-300'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                    </Link>
                  ))}
                  <Link to="/orders" className="block text-center text-[#ea698b] hover:underline mt-4">View All Orders</Link>
                </div>
              ) : (
                <p className="text-gray-400 text-center py-8">No orders yet</p>
              )}
            </div>}

            {/* Address Management */}
            {activeTab === 'addresses' && <div className="bg-[#1a0a2e] border border-[#571089]/30 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                  <MapPin className="w-6 h-6 text-[#ea698b]" />
                  Address Book
                </h2>
                <button onClick={() => setShowAddressModal(true)} className="flex items-center gap-2 px-4 py-2 bg-[#ea698b] hover:bg-[#d55d92] text-white rounded-lg transition-colors">
                  <PlusCircle className="w-4 h-4" />
                  Add Address
                </button>
              </div>

              <div className="space-y-4">
                {user.addresses && user.addresses.length > 0 ? (
                  user.addresses.map(addr => (
                    <div key={addr._id} className="border border-[#571089]/30 rounded-lg p-4 flex justify-between items-start">
                      <div>
                        <p className="text-white font-semibold">{addr.name} {addr.isDefault && <span className="text-xs text-green-400 bg-green-900/50 px-2 py-1 rounded-full ml-2">Default</span>}</p>
                        <p className="text-gray-400 text-sm">{addr.address}, {addr.city}, {addr.state} - {addr.zipCode}</p>
                        <p className="text-gray-400 text-sm">Phone: {addr.phone}</p>
                      </div>
                      <button onClick={() => handleDeleteAddress(addr._id)} className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-lg transition-all">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400 text-center py-8">No saved addresses.</p>
                )}
              </div>
            </div>}

          </div>

          {/* Address Modal */}
          {showAddressModal && (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <div className="bg-gradient-to-br from-[#1a0a2e] to-[#0a0015] border border-[#571089]/30 rounded-2xl p-8 max-w-lg w-full">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-white">Add New Address</h3>
                  <button onClick={() => setShowAddressModal(false)} className="text-gray-400 hover:text-white text-2xl">×</button>
                </div>
                <form onSubmit={handleAddAddress} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <input type="text" name="name" placeholder="Full Name" value={newAddress.name} onChange={handleAddressInputChange} className="w-full px-4 py-3 bg-[#2a1a3e] border border-[#571089]/50 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-[#ea698b]" required />
                    <input type="tel" name="phone" placeholder="Phone Number" value={newAddress.phone} onChange={handleAddressInputChange} className="w-full px-4 py-3 bg-[#2a1a3e] border border-[#571089]/50 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-[#ea698b]" required />
                  </div>
                  <input type="text" name="address" placeholder="Address (House No, Street)" value={newAddress.address} onChange={handleAddressInputChange} className="w-full px-4 py-3 bg-[#2a1a3e] border border-[#571089]/50 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-[#ea698b]" required />
                  <div className="grid grid-cols-3 gap-4">
                    <input type="text" name="city" placeholder="City" value={newAddress.city} onChange={handleAddressInputChange} className="w-full px-4 py-3 bg-[#2a1a3e] border border-[#571089]/50 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-[#ea698b]" required />
                    <input type="text" name="state" placeholder="State" value={newAddress.state} onChange={handleAddressInputChange} className="w-full px-4 py-3 bg-[#2a1a3e] border border-[#571089]/50 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-[#ea698b]" required />
                    <input type="text" name="zipCode" placeholder="ZIP Code" value={newAddress.zipCode} onChange={handleAddressInputChange} className="w-full px-4 py-3 bg-[#2a1a3e] border border-[#571089]/50 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-[#ea698b]" required />
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="isDefault" name="isDefault" checked={newAddress.isDefault} onChange={handleAddressInputChange} className="w-4 h-4 text-[#ea698b] bg-gray-700 border-gray-600 rounded focus:ring-[#ea698b]" />
                    <label htmlFor="isDefault" className="ml-2 text-sm font-medium text-gray-300">Set as default address</label>
                  </div>
                  <div className="flex justify-end gap-4 pt-4">
                    <button type="button" onClick={() => setShowAddressModal(false)} className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors">Cancel</button>
                    <button type="submit" className="px-6 py-2 bg-gradient-to-r from-[#ea698b] to-[#d55d92] text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-[#ea698b]/50 transition-all">Save Address</button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Sidebar */}
          <div className="space-y-6">

            {/* Account Stats */}
            <div className="bg-[#1a0a2e] border border-[#571089]/30 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Account Overview</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <ShoppingBag className="w-5 h-5 text-[#ea698b]" />
                    <span className="text-gray-300">Total Orders</span>
                  </div>
                  <span className="text-white font-bold">{stats.totalOrders}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Heart className="w-5 h-5 text-[#ea698b]" />
                    <span className="text-gray-300">Wishlist Items</span>
                  </div>
                  <span className="text-white font-bold">{stats.wishlistItems}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-[#ea698b]">₹</span>
                    <span className="text-gray-300">Total Spent</span>
                  </div>
                  <span className="text-white font-bold">₹{stats.totalSpent}</span>
                </div>
              </div>
            </div>

            {/* Account Details */}
            <div className="bg-[#1a0a2e] border border-[#571089]/30 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Account Details</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-[#ea698b]" />
                  <span className="text-gray-300">Role:</span>
                  <span className="text-white capitalize">{user.role}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-[#ea698b]" />
                  <span className="text-gray-300">Member since:</span>
                  <span className="text-white">{new Date(user.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-[#ea698b]" />
                  <span className="text-gray-300">Email verified:</span>
                  <span className="text-green-400">Yes</span>
                </div>
              </div>
            </div>

            {/* Logout Button */}
            <div className="bg-[#1a0a2e] border border-[#571089]/30 rounded-2xl p-6">
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 hover:bg-red-500/30 hover:text-red-300 transition-all"
              >
                <LogOut className="w-5 h-5" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
