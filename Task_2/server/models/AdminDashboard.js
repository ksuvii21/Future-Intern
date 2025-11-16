import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { LayoutDashboard, Package, ShoppingCart, Users, DollarSign, Edit, Trash2, PlusCircle, Save, X, Search } from 'lucide-react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState(null);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const fetchAllData = useCallback(async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };

      const [statsRes, productsRes, ordersRes, usersRes] = await Promise.all([
        axios.get('http://localhost:5000/api/admin/stats', config),
        axios.get('http://localhost:5000/api/products', config),
        axios.get('http://localhost:5000/api/orders/all', config),
        axios.get('http://localhost:5000/api/auth/users', config),
      ]);

      setStats(statsRes.data);
      setProducts(productsRes.data.products || []);
      setOrders(ordersRes.data);
      setUsers(usersRes.data);

    } catch (error) {
      console.error("Failed to fetch admin data", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const productData = Object.fromEntries(formData.entries());
    productData.price = Number(productData.price);
    productData.stock = Number(productData.stock);
    productData.isNewArrival = productData.isNewArrival === 'on';

    const token = localStorage.getItem('token');
    const config = { headers: { Authorization: `Bearer ${token}` } };

    try {
      if (editingProduct) {
        await axios.put(`http://localhost:5000/api/products/${editingProduct._id}`, productData, config);
      } else {
        await axios.post('http://localhost:5000/api/products', productData, config);
      }
      setShowProductModal(false);
      setEditingProduct(null);
      fetchAllData(); // Refresh data
    } catch (error) {
      console.error("Failed to save product", error);
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const token = localStorage.getItem('token');
        const config = { headers: { Authorization: `Bearer ${token}` } };
        await axios.delete(`http://localhost:5000/api/products/${productId}`, config);
        fetchAllData();
      } catch (error) {
        console.error("Failed to delete product", error);
      }
    }
  };

  const handleUpdateOrderStatus = async (orderId, status) => {
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await axios.put(`http://localhost:5000/api/orders/${orderId}/status`, { status }, config);
      fetchAllData();
    } catch (error) {
      console.error("Failed to update order status", error);
    }
  };

  const handleUpdateUserRole = async (userId, role) => {
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await axios.put(`http://localhost:5000/api/auth/users/${userId}/role`, { role }, config);
      fetchAllData();
    } catch (error) {
      console.error("Failed to update user role", error);
    }
  };

  const openProductModal = (product = null) => {
    setEditingProduct(product);
    setShowProductModal(true);
  };

  const StatCard = ({ icon, title, value, color }) => (
    <div className={`bg-gradient-to-br from-[#1a0a2e] to-[#0a0015] border border-[#571089]/30 rounded-2xl p-6 flex items-center gap-4`}>
      <div className={`w-12 h-12 rounded-lg flex items-center justify-center bg-gradient-to-br ${color}`}>
        {icon}
      </div>
      <div>
        <p className="text-gray-400 text-sm">{title}</p>
        <p className="text-2xl font-bold text-white">{value}</p>
      </div>
    </div>
  );

  const renderDashboard = () => (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={<DollarSign />} title="Total Revenue" value={`$${stats?.totalRevenue?.toFixed(2) || 0}`} color="from-green-500/30 to-green-600/30" />
        <StatCard icon={<ShoppingCart />} title="Total Orders" value={stats?.totalOrders || 0} color="from-blue-500/30 to-blue-600/30" />
        <StatCard icon={<Users />} title="Total Users" value={stats?.totalUsers || 0} color="from-purple-500/30 to-purple-600/30" />
        <StatCard icon={<Package />} title="Total Products" value={stats?.totalProducts || 0} color="from-yellow-500/30 to-yellow-600/30" />
      </div>
      <div className="bg-gradient-to-br from-[#1a0a2e] to-[#0a0015] border border-[#571089]/30 rounded-2xl p-6 h-[400px]">
        <h3 className="text-xl font-bold text-white mb-4">Monthly Sales</h3>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={stats?.monthlySales} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#57108930" />
            <XAxis dataKey="_id" tick={{ fill: '#9ca3af' }} />
            <YAxis tick={{ fill: '#9ca3af' }} />
            <Tooltip contentStyle={{ backgroundColor: '#1a0a2e', border: '1px solid #571089' }} />
            <Legend />
            <Bar dataKey="total" fill="#ea698b" name="Sales ($)" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  const renderProducts = () => (
    <div className="bg-gradient-to-br from-[#1a0a2e] to-[#0a0015] border border-[#571089]/30 rounded-2xl p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Manage Products</h2>
        <button onClick={() => openProductModal()} className="flex items-center gap-2 px-4 py-2 bg-[#ea698b] hover:bg-[#d55d92] text-white rounded-lg transition-colors">
          <PlusCircle className="w-4 h-4" /> Add Product
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-400">
          <thead className="text-xs text-gray-300 uppercase bg-white/5">
            <tr>
              <th scope="col" className="px-6 py-3">Product Name</th>
              <th scope="col" className="px-6 py-3">Category</th>
              <th scope="col" className="px-6 py-3">Price</th>
              <th scope="col" className="px-6 py-3">Stock</th>
              <th scope="col" className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p._id} className="border-b border-[#571089]/30 hover:bg-white/5">
                <td className="px-6 py-4 font-medium text-white">{p.name}</td>
                <td className="px-6 py-4">{p.category}</td>
                <td className="px-6 py-4">${p.price}</td>
                <td className="px-6 py-4">{p.stock}</td>
                <td className="px-6 py-4 flex gap-2">
                  <button onClick={() => openProductModal(p)} className="p-2 text-blue-400 hover:text-blue-300"><Edit className="w-4 h-4" /></button>
                  <button onClick={() => handleDeleteProduct(p._id)} className="p-2 text-red-400 hover:text-red-300"><Trash2 className="w-4 h-4" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderOrders = () => (
    <div className="bg-gradient-to-br from-[#1a0a2e] to-[#0a0015] border border-[#571089]/30 rounded-2xl p-6">
      <h2 className="text-2xl font-bold text-white mb-6">Manage Orders</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-400">
          <thead className="text-xs text-gray-300 uppercase bg-white/5">
            <tr>
              <th scope="col" className="px-6 py-3">Order ID</th>
              <th scope="col" className="px-6 py-3">User</th>
              <th scope="col" className="px-6 py-3">Date</th>
              <th scope="col" className="px-6 py-3">Total</th>
              <th scope="col" className="px-6 py-3">Status</th>
              <th scope="col" className="px-6 py-3">Update Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(o => (
              <tr key={o._id} className="border-b border-[#571089]/30 hover:bg-white/5">
                <td className="px-6 py-4 font-medium text-white">...{o._id.slice(-6)}</td>
                <td className="px-6 py-4">{o.user?.username || 'N/A'}</td>
                <td className="px-6 py-4">{new Date(o.createdAt).toLocaleDateString()}</td>
                <td className="px-6 py-4">₹{o.totalAmount.toLocaleString('en-IN')}</td>
                <td className="px-6 py-4 capitalize">{o.status}</td>
                <td className="px-6 py-4">
                  <select
                    value={o.status}
                    onChange={(e) => handleUpdateOrderStatus(o._id, e.target.value)}
                    className="bg-[#2a1a3e] border border-[#571089]/50 rounded-lg text-white text-xs p-1"
                  >
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderUsers = () => (
    <div className="bg-gradient-to-br from-[#1a0a2e] to-[#0a0015] border border-[#571089]/30 rounded-2xl p-6">
      <h2 className="text-2xl font-bold text-white mb-6">Manage Users</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-400">
          <thead className="text-xs text-gray-300 uppercase bg-white/5">
            <tr>
              <th scope="col" className="px-6 py-3">Username</th>
              <th scope="col" className="px-6 py-3">Email</th>
              <th scope="col" className="px-6 py-3">Joined</th>
              <th scope="col" className="px-6 py-3">Role</th>
              <th scope="col" className="px-6 py-3">Update Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u._id} className="border-b border-[#571089]/30 hover:bg-white/5">
                <td className="px-6 py-4 font-medium text-white">{u.username}</td>
                <td className="px-6 py-4">{u.email}</td>
                <td className="px-6 py-4">{new Date(u.createdAt).toLocaleDateString()}</td>
                <td className="px-6 py-4 capitalize">{u.role}</td>
                <td className="px-6 py-4">
                  <select
                    value={u.role}
                    onChange={(e) => handleUpdateUserRole(u._id, e.target.value)}
                    className="bg-[#2a1a3e] border border-[#571089]/50 rounded-lg text-white text-xs p-1"
                  >
                    <option value="user">User</option>
                    <option value="seller">Seller</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderContent = () => {
    if (loading) {
      return <div className="flex justify-center items-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ea698b]"></div></div>;
    }
    switch (activeTab) {
      case 'dashboard': return renderDashboard();
      case 'products': return renderProducts();
      case 'orders': return renderOrders();
      case 'users': return renderUsers();
      default: return null;
    }
  };

  const TabButton = ({ id, icon, label }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors w-full text-left ${activeTab === id ? 'bg-[#ea698b]/20 text-[#ea698b]' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
    >
      {icon}
      <span className="font-medium">{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0015] via-[#1a0a2e] to-[#0a0015] text-white">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-[#ea698b] to-[#d55d92] bg-clip-text text-transparent">Admin Panel</h1>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <aside className="lg:col-span-2">
            <div className="bg-gradient-to-br from-[#1a0a2e] to-[#0a0015] border border-[#571089]/30 rounded-2xl p-4 space-y-2">
              <TabButton id="dashboard" icon={<LayoutDashboard className="w-5 h-5" />} label="Dashboard" />
              <TabButton id="products" icon={<Package className="w-5 h-5" />} label="Products" />
              <TabButton id="orders" icon={<ShoppingCart className="w-5 h-5" />} label="Orders" />
              <TabButton id="users" icon={<Users className="w-5 h-5" />} label="Users" />
            </div>
          </aside>

          <main className="lg:col-span-10">
            {renderContent()}
          </main>
        </div>
      </div>

      {showProductModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-[#1a0a2e] to-[#0a0015] border border-[#571089]/30 rounded-2xl p-8 max-w-2xl w-full">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-white">{editingProduct ? 'Edit Product' : 'Add New Product'}</h3>
              <button onClick={() => { setShowProductModal(false); setEditingProduct(null); }} className="text-gray-400 hover:text-white text-2xl">×</button>
            </div>
            <form onSubmit={handleProductSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto pr-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 mb-2">Name</label>
                  <input type="text" name="name" defaultValue={editingProduct?.name} className="w-full px-4 py-3 bg-[#2a1a3e] border border-[#571089]/50 rounded-lg text-white" required />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">Category</label>
                  <input type="text" name="category" defaultValue={editingProduct?.category} className="w-full px-4 py-3 bg-[#2a1a3e] border border-[#571089]/50 rounded-lg text-white" required />
                </div>
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Description</label>
                <textarea name="description" defaultValue={editingProduct?.description} rows="4" className="w-full px-4 py-3 bg-[#2a1a3e] border border-[#571089]/50 rounded-lg text-white" required></textarea>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 mb-2">Price ($)</label>
                  <input type="number" name="price" step="0.01" defaultValue={editingProduct?.price} className="w-full px-4 py-3 bg-[#2a1a3e] border border-[#571089]/50 rounded-lg text-white" required />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">Stock</label>
                  <input type="number" name="stock" defaultValue={editingProduct?.stock} className="w-full px-4 py-3 bg-[#2a1a3e] border border-[#571089]/50 rounded-lg text-white" required />
                </div>
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Image URL</label>
                <input type="text" name="imageUrl" defaultValue={editingProduct?.imageUrl} className="w-full px-4 py-3 bg-[#2a1a3e] border border-[#571089]/50 rounded-lg text-white" />
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="isNewArrival" name="isNewArrival" defaultChecked={editingProduct?.isNewArrival} className="w-4 h-4 text-[#ea698b] bg-gray-700 border-gray-600 rounded focus:ring-[#ea698b]" />
                <label htmlFor="isNewArrival" className="ml-2 text-sm font-medium text-gray-300">New Arrival</label>
              </div>
              <div className="flex justify-end gap-4 pt-4">
                <button type="button" onClick={() => { setShowProductModal(false); setEditingProduct(null); }} className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg">Cancel</button>
                <button type="submit" className="px-6 py-2 bg-gradient-to-r from-[#ea698b] to-[#d55d92] text-white font-semibold rounded-lg">Save Product</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;