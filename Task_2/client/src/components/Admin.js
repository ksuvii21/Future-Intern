import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Users, ShoppingBag, Package, DollarSign, Edit, Trash2 } from 'lucide-react';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalUsers: 0,
    totalOrders: 0,
    totalRevenue: 0
  });
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    imageUrl: '',
    imageFile: null,
  });
  const [editingProduct, setEditingProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };

      const [productsRes, usersRes, ordersRes] = await Promise.all([
        axios.get('http://localhost:5000/api/products'),
        axios.get('http://localhost:5000/api/auth/users', config),
        axios.get('http://localhost:5000/api/orders/all', config)
      ]);

      setProducts(productsRes.data.products || []);
      setUsers(usersRes.data);
      setOrders(ordersRes.data);

      // Calculate stats
      const totalRevenue = ordersRes.data.reduce((sum, order) => sum + (order.totalAmount || 0), 0);
      setStats({
        totalProducts: productsRes.data.products.length,
        totalUsers: usersRes.data.length,
        totalOrders: ordersRes.data.length,
        totalRevenue: totalRevenue.toFixed(2)
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = e => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setNewProduct({
        ...newProduct,
        [name]: files[0],
      });
    } else {
      setNewProduct({
        ...newProduct,
        [name]: value,
      });
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };

      let dataToSend;
      let headers = { ...config.headers };

      if (newProduct.imageFile) {
        // For file uploads (sellers), use FormData
        dataToSend = new FormData();
        dataToSend.append('name', newProduct.name);
        dataToSend.append('description', newProduct.description);
        dataToSend.append('price', newProduct.price);
        dataToSend.append('category', newProduct.category);
        dataToSend.append('stock', newProduct.stock);
        dataToSend.append('image', newProduct.imageFile);
        headers['Content-Type'] = 'multipart/form-data';
      } else {
        // For URL-based uploads (admins), use JSON
        dataToSend = {
          name: newProduct.name,
          description: newProduct.description,
          price: newProduct.price,
          category: newProduct.category,
          stock: newProduct.stock,
          imageUrl: newProduct.imageUrl,
        };
        headers['Content-Type'] = 'application/json';
      }

      if (editingProduct) {
        await axios.put(
          `http://localhost:5000/api/products/${editingProduct._id}`,
          dataToSend,
          { headers }
        );
        setEditingProduct(null);
      } else {
        await axios.post(
          'http://localhost:5000/api/products',
          dataToSend,
          { headers }
        );
      }

      setNewProduct({
        name: '',
        description: '',
        price: '',
        category: '',
        stock: '',
        imageUrl: '',
        imageFile: null,
      });
      fetchDashboardData(); // Refetch all data to keep dashboard consistent
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  const handleEdit = product => {
    setNewProduct(product);
    setEditingProduct(product);
  };

  const handleDelete = async id => {
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await axios.delete(`http://localhost:5000/api/products/${id}`, config);
      fetchDashboardData(); // Refetch all data to keep dashboard consistent
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const renderDashboard = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-gradient-to-br from-[#1a0a2e] to-[#0a0015] border border-[#571089]/30 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm">Total Revenue</p>
            <p className="text-3xl font-bold">₹{stats.totalRevenue}</p>
          </div>
          <div className="p-3 bg-[#ea698b]/20 rounded-lg">
            <DollarSign className="w-6 h-6 text-[#ea698b]" />
          </div>
        </div>
      </div>
      <div className="bg-gradient-to-br from-[#1a0a2e] to-[#0a0015] border border-[#571089]/30 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm">Total Orders</p>
            <p className="text-3xl font-bold">{stats.totalOrders}</p>
          </div>
          <div className="p-3 bg-[#ea698b]/20 rounded-lg">
            <ShoppingBag className="w-6 h-6 text-[#ea698b]" />
          </div>
        </div>
      </div>
      <div className="bg-gradient-to-br from-[#1a0a2e] to-[#0a0015] border border-[#571089]/30 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm">Total Users</p>
            <p className="text-3xl font-bold">{stats.totalUsers}</p>
          </div>
          <div className="p-3 bg-[#ea698b]/20 rounded-lg">
            <Users className="w-6 h-6 text-[#ea698b]" />
          </div>
        </div>
      </div>
      <div className="bg-gradient-to-br from-[#1a0a2e] to-[#0a0015] border border-[#571089]/30 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm">Total Products</p>
            <p className="text-3xl font-bold">{stats.totalProducts}</p>
          </div>
          <div className="p-3 bg-[#ea698b]/20 rounded-lg">
            <Package className="w-6 h-6 text-[#ea698b]" />
          </div>
        </div>
      </div>
    </div>
  );

  const renderProducts = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-1 bg-gradient-to-br from-[#1a0a2e] to-[#0a0015] border border-[#571089]/30 rounded-2xl p-6 h-fit">
        <h2 className="text-xl font-bold mb-4 text-white">
          {editingProduct ? 'Edit Product' : 'Add New Product'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="name" value={newProduct.name} onChange={handleInputChange} placeholder="Name" className="w-full px-4 py-3 bg-[#2a1a3e] border border-[#571089]/50 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-[#ea698b]" required />
          <textarea name="description" value={newProduct.description} onChange={handleInputChange} placeholder="Description" className="w-full px-4 py-3 bg-[#2a1a3e] border border-[#571089]/50 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-[#ea698b]" rows="3" required />
          <div className="grid grid-cols-2 gap-4">
            <input type="number" name="price" value={newProduct.price} onChange={handleInputChange} placeholder="Price" className="w-full px-4 py-3 bg-[#2a1a3e] border border-[#571089]/50 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-[#ea698b]" step="0.01" required />
            <input type="number" name="stock" value={newProduct.stock} onChange={handleInputChange} placeholder="Stock" className="w-full px-4 py-3 bg-[#2a1a3e] border border-[#571089]/50 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-[#ea698b]" required />
          </div>
          <input type="text" name="category" value={newProduct.category} onChange={handleInputChange} placeholder="Category" className="w-full px-4 py-3 bg-[#2a1a3e] border border-[#571089]/50 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-[#ea698b]" required />
          <input type="url" name="imageUrl" value={newProduct.imageUrl} onChange={handleInputChange} placeholder="Image URL (for admins)" className="w-full px-4 py-3 bg-[#2a1a3e] border border-[#571089]/50 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-[#ea698b]" />
          <input type="file" name="imageFile" onChange={handleInputChange} accept="image/*" className="w-full px-4 py-3 bg-[#2a1a3e] border border-[#571089]/50 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#ea698b] file:text-white hover:file:bg-[#d55d92]" />
          <button type="submit" className="w-full bg-gradient-to-r from-[#ea698b] to-[#d55d92] text-white font-bold py-3 px-4 rounded-lg hover:shadow-lg hover:shadow-[#ea698b]/50 transition-all">
            {editingProduct ? 'Update Product' : 'Add Product'}
          </button>
          {editingProduct && (
            <button type="button" onClick={() => { setEditingProduct(null); setNewProduct({ name: '', description: '', price: '', category: '', stock: '', imageUrl: '', imageFile: null }); }} className="w-full mt-2 bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-4 rounded-lg">
              Cancel Edit
            </button>
          )}
        </form>
      </div>
      <div className="lg:col-span-2 bg-gradient-to-br from-[#1a0a2e] to-[#0a0015] border border-[#571089]/30 rounded-2xl p-6">
        <h2 className="text-xl font-bold mb-4 text-white">Product List</h2>
        <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
          {products.map(product => (
            <div key={product._id} className="border border-[#571089]/30 rounded-lg p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <img
                  src={product.imageUrl || 'https://via.placeholder.com/60'}
                  alt={product.name}
                  className="w-16 h-16 object-cover rounded-md"
                  onError={(e) => { e.target.src = 'https://via.placeholder.com/60'; }}
                />
                <div>
                  <h3 className="font-semibold text-white">{product.name}</h3>
                  <p className="text-green-400 font-bold">₹{product.price}</p>
                  <p className="text-gray-400 text-sm">Stock: {product.stock}</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button onClick={() => handleEdit(product)} className="p-2 bg-yellow-500/20 text-yellow-400 rounded-md hover:bg-yellow-500/30 transition-colors"><Edit className="w-4 h-4" /></button>
                <button onClick={() => handleDelete(product._id)} className="p-2 bg-red-500/20 text-red-400 rounded-md hover:bg-red-500/30 transition-colors"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderUsers = () => (
    <div className="bg-gradient-to-br from-[#1a0a2e] to-[#0a0015] border border-[#571089]/30 rounded-2xl p-6">
      <h2 className="text-xl font-bold mb-4 text-white">User List</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-gray-300">
          <thead className="border-b border-[#571089]/30">
            <tr>
              <th className="p-3">Username</th>
              <th className="p-3">Email</th>
              <th className="p-3">Role</th>
              <th className="p-3">Joined</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id} className="border-b border-[#571089]/20 hover:bg-white/5">
                <td className="p-3">{user.username}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3 capitalize">{user.role}</td>
                <td className="p-3">{new Date(user.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderOrders = () => (
    <div className="bg-gradient-to-br from-[#1a0a2e] to-[#0a0015] border border-[#571089]/30 rounded-2xl p-6">
      <h2 className="text-xl font-bold mb-4 text-white">Order List</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-gray-300">
          <thead className="border-b border-[#571089]/30">
            <tr>
              <th className="p-3">Order ID</th>
              <th className="p-3">User</th>
              <th className="p-3">Date</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order._id} className="border-b border-[#571089]/20 hover:bg-white/5">
                <td className="p-3 font-mono text-sm">#{order._id.slice(-8)}</td>
                <td className="p-3">{order.user?.username || 'N/A'}</td>
                <td className="p-3">{new Date(order.createdAt).toLocaleDateString()}</td>
                <td className="p-3 font-semibold text-green-400">₹{order.totalAmount.toLocaleString('en-IN')}</td>
                <td className="p-3 capitalize">{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0a0015] via-[#1a0a2e] to-[#0a0015] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ea698b]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0015] via-[#1a0a2e] to-[#0a0015] py-8 text-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-[#ea698b] to-[#d55d92] bg-clip-text text-transparent mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-400">Welcome, Admin! Manage your store from here.</p>
        </div>

        <div className="flex space-x-2 border-b border-[#571089]/30 mb-8">
          <button onClick={() => setActiveTab('dashboard')} className={`px-4 py-2 font-medium transition-colors ${activeTab === 'dashboard' ? 'text-[#ea698b] border-b-2 border-[#ea698b]' : 'text-gray-400'}`}>Dashboard</button>
          <button onClick={() => setActiveTab('products')} className={`px-4 py-2 font-medium transition-colors ${activeTab === 'products' ? 'text-[#ea698b] border-b-2 border-[#ea698b]' : 'text-gray-400'}`}>Products</button>
          <button onClick={() => setActiveTab('users')} className={`px-4 py-2 font-medium transition-colors ${activeTab === 'users' ? 'text-[#ea698b] border-b-2 border-[#ea698b]' : 'text-gray-400'}`}>Users</button>
          <button onClick={() => setActiveTab('orders')} className={`px-4 py-2 font-medium transition-colors ${activeTab === 'orders' ? 'text-[#ea698b] border-b-2 border-[#ea698b]' : 'text-gray-400'}`}>Orders</button>
        </div>

        <div>
          {activeTab === 'dashboard' && renderDashboard()}
          {activeTab === 'products' && renderProducts()}
          {activeTab === 'users' && renderUsers()}
          {activeTab === 'orders' && renderOrders()}
        </div>
      </div>
    </div>
  );
};

export default Admin;
