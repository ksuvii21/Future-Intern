import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Users, ShoppingBag, Package, DollarSign, Edit, Trash2, Search, Star} from 'lucide-react';

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
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    products: { category: 'All', minPrice: '', maxPrice: '', stockLevel: 'All' },
    users: { role: 'All', dateFrom: '', dateTo: '' },
    orders: { status: 'All', dateFrom: '', dateTo: '', minAmount: '', maxAmount: '' },
  });
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: 'descending',
  });
  const [pendingReviews, setPendingReviews] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [analyticsData, setAnalyticsData] = useState({
    salesTrends: [],
    customerDemographics: [],
    productPerformance: [],
    revenueBreakdown: []
  });
  const [reportFilters, setReportFilters] = useState({
    dateRange: 'last30days',
    category: 'all',
    status: 'all'
  });
  const [ledgerData, setLedgerData] = useState([]);

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  useEffect(() => {
    fetchDashboardData();
    if (activeTab === 'reviews') {
      fetchPendingReviews();
    }
  }, [activeTab]);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };

      console.log('Fetching dashboard data...');

      // Fetch products (simplified for now)
      const productsRes = await axios.get('http://localhost:5000/api/products?limit=1000');
      console.log('Products response:', productsRes.data);

      // Fetch users
      const usersRes = await axios.get('http://localhost:5000/api/auth/users', config);
      console.log('Users response:', usersRes.data);

      // Fetch orders
      const ordersRes = await axios.get('http://localhost:5000/api/orders/all', config);
      console.log('Orders response:', ordersRes.data);

      setProducts(productsRes.data.products || []);
      setUsers(usersRes.data || []);
      setOrders(ordersRes.data || []);

      // Calculate stats
      const totalRevenue = (ordersRes.data || []).reduce((sum, order) => sum + (order.totalAmount || 0), 0);
      setStats({
        totalProducts: (productsRes.data.products || []).length,
        totalUsers: (usersRes.data || []).length,
        totalOrders: (ordersRes.data || []).length,
        totalRevenue: totalRevenue.toFixed(2)
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      // Set empty arrays on error to prevent crashes
      setProducts([]);
      setUsers([]);
      setOrders([]);
      setStats({
        totalProducts: 0,
        totalUsers: 0,
        totalOrders: 0,
        totalRevenue: '0.00'
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchPendingReviews = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const response = await axios.get('http://localhost:5000/api/products/reviews/pending', config);
      setPendingReviews(response.data);
    } catch (error) {
      console.error('Error fetching pending reviews:', error);
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

      if (editingProduct) {
        // Updates are always sent as JSON, as the backend update route expects it.
        const updateData = {
          name: newProduct.name,
          description: newProduct.description,
          price: newProduct.price,
          category: newProduct.category,
          stock: newProduct.stock,
          imageUrl: newProduct.imageUrl,
          // Note: File uploads on edit are not supported by the current backend.
          // If a new image is needed, the URL should be updated.
        };
        await axios.put(
          `http://localhost:5000/api/products/admin/${editingProduct._id}`,
          updateData,
          config
        );
      } else {
        // Creating a new product can handle both JSON (for admin with URL)
        // and FormData (for seller with file upload).
        let dataToSend;
        let headers = { ...config.headers };

        if (newProduct.imageFile) {
          dataToSend = new FormData();
          Object.keys(newProduct).forEach(key => {
            if (key === 'imageFile') dataToSend.append('image', newProduct[key]);
            else dataToSend.append(key, newProduct[key]);
          });
          headers['Content-Type'] = 'multipart/form-data';
        } else {
          dataToSend = { ...newProduct };
          headers['Content-Type'] = 'application/json';
        }

        await axios.post(
          'http://localhost:5000/api/products/admin',
          dataToSend,
          { headers }
        );
      }

      setEditingProduct(null); // Reset editing state after any submission
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
    // Ensure all fields from the initial state are present
    setNewProduct({
      name: product.name || '',
      description: product.description || '',
      price: product.price || '',
      category: product.category || '',
      stock: product.stock || '',
      imageUrl: product.imageUrl || '',
      imageFile: null,
    });
    setEditingProduct(product);
  };

  const handleDelete = async id => {
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await axios.delete(`http://localhost:5000/api/products/admin/${id}`, config);
      fetchDashboardData(); // Refetch all data to keep dashboard consistent
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await axios.put(`http://localhost:5000/api/orders/${orderId}/status`, { status: newStatus }, config);
      fetchDashboardData(); // Refetch to show updated status
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  const handleRoleUpdate = async (userId, newRole) => {
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await axios.put(`http://localhost:5000/api/auth/users/${userId}/role`, { role: newRole }, config);
      fetchDashboardData(); // Refetch to show updated role
    } catch (error) {
      console.error('Error updating user role:', error);
    }
  };

  const handleReviewModeration = async (productId, reviewId, action) => {
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await axios.put(`http://localhost:5000/api/products/${productId}/reviews/${reviewId}/moderate`, { action }, config);
      fetchPendingReviews(); // Refetch pending reviews
      alert(`Review ${action}d successfully`);
    } catch (error) {
      console.error('Error moderating review:', error);
      alert('Failed to moderate review');
    }
  };

  // Helper to get nested property values for sorting
  const getNestedValue = (obj, path) => {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
  };

  const filteredAndSortedData = (data, type) => {
    let filtered = [...data];

    // Advanced Filtering
    if (searchTerm) {
      filtered = filtered.filter(item =>
        (item.name && item.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.username && item.username.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.email && item.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item._id && item._id.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Product filters
    if (type === 'products') {
      if (filters.products.category !== 'All') {
        filtered = filtered.filter(p => p.category === filters.products.category);
      }
      if (filters.products.minPrice) {
        filtered = filtered.filter(p => p.price >= Number(filters.products.minPrice));
      }
      if (filters.products.maxPrice) {
        filtered = filtered.filter(p => p.price <= Number(filters.products.maxPrice));
      }
      if (filters.products.stockLevel !== 'All') {
        switch (filters.products.stockLevel) {
          case 'Low':
            filtered = filtered.filter(p => p.stock < 10);
            break;
          case 'Medium':
            filtered = filtered.filter(p => p.stock >= 10 && p.stock < 50);
            break;
          case 'High':
            filtered = filtered.filter(p => p.stock >= 50);
            break;
          default: break;
        }
      }
    }

    // User filters
    if (type === 'users') {
      if (filters.users.role !== 'All') {
        filtered = filtered.filter(u => u.role === filters.users.role);
      }
      if (filters.users.dateFrom) {
        const fromDate = new Date(filters.users.dateFrom);
        filtered = filtered.filter(u => new Date(u.createdAt) >= fromDate);
      }
      if (filters.users.dateTo) {
        const toDate = new Date(filters.users.dateTo);
        toDate.setHours(23, 59, 59, 999);
        filtered = filtered.filter(u => new Date(u.createdAt) <= toDate);
      }
    }

    // Order filters
    if (type === 'orders') {
      if (filters.orders.status !== 'All') {
        filtered = filtered.filter(o => o.status === filters.orders.status);
      }
      if (filters.orders.minAmount) {
        filtered = filtered.filter(o => o.totalAmount >= Number(filters.orders.minAmount));
      }
      if (filters.orders.maxAmount) {
        filtered = filtered.filter(o => o.totalAmount <= Number(filters.orders.maxAmount));
      }
      if (filters.orders.dateFrom) {
        const fromDate = new Date(filters.orders.dateFrom);
        filtered = filtered.filter(o => new Date(o.createdAt) >= fromDate);
      }
      if (filters.orders.dateTo) {
        const toDate = new Date(filters.orders.dateTo);
        toDate.setHours(23, 59, 59, 999);
        filtered = filtered.filter(o => new Date(o.createdAt) <= toDate);
      }
    }

    // Sorting
    if (sortConfig.key) {
      filtered.sort((a, b) => {
        const valA = getNestedValue(a, sortConfig.key);
        const valB = getNestedValue(b, sortConfig.key);
        if (valA < valB) return sortConfig.direction === 'ascending' ? -1 : 1;
        if (valA > valB) return sortConfig.direction === 'ascending' ? 1 : -1;
        return 0;
      });
    }
    return filtered;
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
        <div className="flex flex-wrap gap-4 justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-white">Product List</h2>
          <div className="flex items-center gap-2">
            <div className="relative w-full max-w-xs">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input type="text" placeholder="Search products..." onChange={e => setSearchTerm(e.target.value)} className="w-full pl-9 pr-3 py-2 bg-[#2a1a3e] border border-[#571089]/50 rounded-lg text-white placeholder-gray-500 text-sm" />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 p-4 bg-white/5 rounded-lg">
            <select onChange={e => setFilters(f => ({ ...f, products: { ...f.products, category: e.target.value } }))} className="py-2 px-3 bg-[#2a1a3e] border border-[#571089]/50 rounded-lg text-white text-sm">
                <option value="All">All Categories</option>
                {[...new Set(products.map(p => p.category))].map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <select onChange={e => setFilters(f => ({ ...f, products: { ...f.products, stockLevel: e.target.value } }))} className="py-2 px-3 bg-[#2a1a3e] border border-[#571089]/50 rounded-lg text-white text-sm">
                <option value="All">All Stock Levels</option>
                <option value="Low">Low (&lt;10)</option>
                <option value="Medium">Medium (10-49)</option>
                <option value="High">High (≥50)</option>
            </select>
            <input type="number" placeholder="Min Price" onChange={e => setFilters(f => ({ ...f, products: { ...f.products, minPrice: e.target.value } }))} className="py-2 px-3 bg-[#2a1a3e] border border-[#571089]/50 rounded-lg text-white placeholder-gray-500 text-sm" />
            <input type="number" placeholder="Max Price" onChange={e => setFilters(f => ({ ...f, products: { ...f.products, maxPrice: e.target.value } }))} className="py-2 px-3 bg-[#2a1a3e] border border-[#571089]/50 rounded-lg text-white placeholder-gray-500 text-sm" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-gray-300">
            <thead className="border-b border-[#571089]/30 text-xs uppercase text-gray-400">
              <tr>
                <th className="p-3 cursor-pointer" onClick={() => handleSort('name')}>Product</th>
                <th className="p-3 cursor-pointer" onClick={() => handleSort('category')}>Category</th>
                <th className="p-3 cursor-pointer" onClick={() => handleSort('price')}>Price</th>
                <th className="p-3 cursor-pointer" onClick={() => handleSort('stock')}>Stock</th>
                <th className="p-3 cursor-pointer" onClick={() => handleSort('createdAt')}>Date Added</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAndSortedData(products, 'products').length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-10 text-gray-400">
                    <Package className="w-12 h-12 mx-auto mb-2" />
                    No products found.
                  </td>
                </tr>
              ) : (
                filteredAndSortedData(products, 'products').map(product => (
                  <tr key={product._id} className="border-b border-[#571089]/20 hover:bg-white/5">
                    <td className="p-3 flex items-center gap-3">
                      <img
                        src={product.imageUrl || 'https://via.placeholder.com/40'}
                        alt={product.name}
                        className="w-10 h-10 object-cover rounded-md flex-shrink-0"
                        onError={(e) => { e.target.src = 'https://via.placeholder.com/40'; }}
                      />
                      <span className="font-medium text-white truncate max-w-xs">{product.name}</span>
                    </td>
                    <td className="p-3 capitalize">{product.category}</td>
                    <td className="p-3 font-semibold text-green-400">₹{product.price.toLocaleString('en-IN')}</td>
                    <td className="p-3">{product.stock}</td>
                    <td className="p-3 text-sm text-gray-400">{new Date(product.createdAt).toLocaleDateString()}</td>
                    <td className="p-3 text-right">
                      <div className="flex gap-2 justify-end">
                        <button
                          onClick={() => handleEdit(product)}
                          className="p-2 bg-yellow-500/20 text-yellow-400 rounded-md hover:bg-yellow-500/30 transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(product._id)}
                          className="p-2 bg-red-500/20 text-red-400 rounded-md hover:bg-red-500/30 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderUsers = () => (
    <div className="bg-gradient-to-br from-[#1a0a2e] to-[#0a0015] border border-[#571089]/30 rounded-2xl p-6">
      <div className="flex flex-wrap gap-4 justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-white">User Management</h2>
        <span className="text-sm text-gray-400">Total Users: {filteredAndSortedData(users, 'users').length}</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 p-4 bg-white/5 rounded-lg">
        <div className="relative lg:col-span-2">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input type="text" placeholder="Search by name, email..." onChange={e => setSearchTerm(e.target.value)} className="w-full pl-9 pr-3 py-2 bg-[#2a1a3e] border border-[#571089]/50 rounded-lg text-white placeholder-gray-500 text-sm" />
        </div>
        <select onChange={e => setFilters(f => ({ ...f, users: { ...f.users, role: e.target.value } }))} className="py-2 px-3 bg-[#2a1a3e] border border-[#571089]/50 rounded-lg text-white text-sm">
          <option value="All">All Roles</option>
          <option value="user">User</option>
          <option value="seller">Seller</option>
          <option value="admin">Admin</option>
        </select>
        <input type="date" placeholder="Joined After" onChange={e => setFilters(f => ({ ...f, users: { ...f.users, dateFrom: e.target.value } }))} className="py-2 px-3 bg-[#2a1a3e] border border-[#571089]/50 rounded-lg text-white text-sm" />
      </div>
      {/* Users Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-gray-300">
          <thead className="border-b border-[#571089]/30 text-xs uppercase text-gray-400">
            <tr>
              <th className="p-3 cursor-pointer" onClick={() => handleSort('username')}>Username</th>
              <th className="p-3 cursor-pointer" onClick={() => handleSort('email')}>Email</th>
              <th className="p-3 cursor-pointer" onClick={() => handleSort('role')}>Role</th>
              <th className="p-3 cursor-pointer" onClick={() => handleSort('createdAt')}>Joined</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedData(users, 'users').length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-10 text-gray-400">
                  <Users className="w-12 h-12 mx-auto mb-2" />
                  No users found.
                </td>
              </tr>
            ) : (
              filteredAndSortedData(users, 'users').map(user => (
                <tr key={user._id} className="border-b border-[#571089]/20 hover:bg-white/5">
                  <td className="p-3 font-medium text-white">{user.username}</td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${
                      user.role === 'admin' ? 'bg-red-500/20 text-red-400' :
                      user.role === 'seller' ? 'bg-blue-500/20 text-blue-400' :
                      'bg-green-500/20 text-green-400'
                    }`}>{user.role}</span>
                  </td>
                  <td className="p-3">{new Date(user.createdAt).toLocaleDateString()}</td>
                  <td className="p-3 text-right">
                    <select
                      value={user.role}
                      onChange={(e) => handleRoleUpdate(user._id, e.target.value)}
                      className="py-1 px-2 bg-[#2a1a3e] border border-[#571089]/50 rounded-lg text-white text-sm"
                    >
                      <option value="user">User</option>
                      <option value="seller">Seller</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderReviews = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Review Moderation</h2>
        <button
          onClick={fetchPendingReviews}
          className="px-4 py-2 bg-[#ea698b] text-white rounded-lg hover:bg-[#d55d92] transition-colors"
        >
          Refresh
        </button>
      </div>

      <div className="space-y-4">
        {pendingReviews.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            No pending reviews to moderate
          </div>
        ) : (
          pendingReviews.map(review => (
            <div key={review._id} className="bg-gradient-to-br from-[#1a0a2e] to-[#0a0015] border border-[#571089]/30 rounded-xl p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-white">{review.productName}</h3>
                  <p className="text-sm text-gray-400">By {review.user.username} ({review.user.email})</p>
                  <div className="flex items-center mt-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'fill-[#ea698b] text-[#ea698b]' : 'text-gray-600'}`} />
                    ))}
                    <span className="ml-2 text-sm text-gray-300">{review.rating}/5</span>
                  </div>
                </div>
                <span className="text-xs text-gray-500">{new Date(review.createdAt).toLocaleDateString()}</span>
              </div>

              <p className="text-gray-300 mb-4">{review.comment}</p>

              {review.images && review.images.length > 0 && (
                <div className="flex gap-2 mb-4">
                  {review.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Review ${index + 1}`}
                      className="w-16 h-16 object-cover rounded-md border border-[#571089]/30 cursor-pointer hover:opacity-80"
                      onClick={() => window.open(image, '_blank')}
                    />
                  ))}
                </div>
              )}

              <div className="flex gap-2">
                <button
                  onClick={() => handleReviewModeration(review.productId, review._id, 'approve')}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleReviewModeration(review.productId, review._id, 'reject')}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Reject
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );

  const renderOrders = () => (
    <div className="bg-gradient-to-br from-[#1a0a2e] to-[#0a0015] border border-[#571089]/30 rounded-2xl p-6">
      <div className="flex flex-wrap gap-4 justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-white">Order List</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6 p-4 bg-white/5 rounded-lg">
        <div className="relative lg:col-span-2">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input type="text" placeholder="Search by Order ID, User..." onChange={e => setSearchTerm(e.target.value)} className="w-full pl-9 pr-3 py-2 bg-[#2a1a3e] border border-[#571089]/50 rounded-lg text-white placeholder-gray-500 text-sm" />
        </div>
        <select onChange={e => setFilters(f => ({ ...f, orders: { ...f.orders, status: e.target.value } }))} className="py-2 px-3 bg-[#2a1a3e] border border-[#571089]/50 rounded-lg text-white text-sm">
          <option value="All">All Statuses</option>
          {['pending', 'processing', 'shipped', 'delivered', 'cancelled'].map(s => <option key={s} value={s} className="capitalize">{s}</option>)}
        </select>
        <input type="number" placeholder="Min Amount" onChange={e => setFilters(f => ({ ...f, orders: { ...f.orders, minAmount: e.target.value } }))} className="py-2 px-3 bg-[#2a1a3e] border border-[#571089]/50 rounded-lg text-white placeholder-gray-500 text-sm" />
        <input type="date" onChange={e => setFilters(f => ({ ...f, orders: { ...f.orders, dateFrom: e.target.value } }))} className="py-2 px-3 bg-[#2a1a3e] border border-[#571089]/50 rounded-lg text-white text-sm" />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-gray-300">
          <thead className="border-b border-[#571089]/30 text-xs uppercase text-gray-400">
            <tr>
              <th className="p-3 cursor-pointer" onClick={() => handleSort('_id')}>Order ID</th>
              <th className="p-3 cursor-pointer" onClick={() => handleSort('user.username')}>User</th>
              <th className="p-3 cursor-pointer" onClick={() => handleSort('createdAt')}>Date</th>
              <th className="p-3 cursor-pointer" onClick={() => handleSort('totalAmount')}>Amount</th>
              <th className="p-3 cursor-pointer" onClick={() => handleSort('status')}>Status</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedData(orders, 'orders').map(order => (
              <tr key={order._id} className="border-b border-[#571089]/20 hover:bg-white/5">
                <td className="p-3 font-mono text-sm">#{order._id.slice(-8)}</td>
                <td className="p-3">{order.user?.username || 'N/A'}</td>
                <td className="p-3">{new Date(order.createdAt).toLocaleDateString()}</td>
                <td className="p-3 font-semibold text-green-400">₹{order.totalAmount.toLocaleString('en-IN')}</td>
                <td className="p-3 capitalize">{order.status}</td>
                <td className="p-3 text-right">
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
                    className="py-1 px-2 bg-[#2a1a3e] border border-[#571089]/50 rounded-lg text-white text-sm capitalize"
                  >
                    {['pending', 'processing', 'shipped', 'delivered', 'cancelled'].map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </td>
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
          <button onClick={() => setActiveTab('reviews')} className={`px-4 py-2 font-medium transition-colors ${activeTab === 'reviews' ? 'text-[#ea698b] border-b-2 border-[#ea698b]' : 'text-gray-400'}`}>Reviews</button>
          <button onClick={() => setActiveTab('users')} className={`px-4 py-2 font-medium transition-colors ${activeTab === 'users' ? 'text-[#ea698b] border-b-2 border-[#ea698b]' : 'text-gray-400'}`}>Users</button>
          <button onClick={() => setActiveTab('orders')} className={`px-4 py-2 font-medium transition-colors ${activeTab === 'orders' ? 'text-[#ea698b] border-b-2 border-[#ea698b]' : 'text-gray-400'}`}>Orders</button>
        </div>

        <div>
          {activeTab === 'dashboard' && renderDashboard()}
          {activeTab === 'products' && renderProducts()}
          {activeTab === 'reviews' && renderReviews()}
          {activeTab === 'users' && renderUsers()}
          {activeTab === 'orders' && renderOrders()}
        </div>
      </div>
    </div>
  );
};

export default Admin;
