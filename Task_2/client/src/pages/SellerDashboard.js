import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Package, DollarSign, BarChart2, Edit, Trash2, Search, AlertTriangle, CheckCircle, Clock, TrendingUp, Plus, Tag, Truck } from 'lucide-react';

const SellerDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [products, setProducts] = useState([]);
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalSales: 0,
    totalRevenue: 0,
    lowStockProducts: 0,
    outOfStockProducts: 0
  });
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    imageFile: null,
  });
  const [editingProduct, setEditingProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    category: 'All',
    stockLevel: 'All'
  });
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: 'descending',
  });
  const [coupons, setCoupons] = useState([]);
  const [newCoupon, setNewCoupon] = useState({
    code: '',
    discountType: 'percentage',
    value: '',
    expiryDate: '',
  });
  const [editingCoupon, setEditingCoupon] = useState(null);

  const [shippingOptions, setShippingOptions] = useState([]);
  const [newShippingOption, setNewShippingOption] = useState({
    name: '',
    cost: '',
    estimatedDelivery: '',
  });
  const [editingShippingOption, setEditingShippingOption] = useState(null);

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    fetchDashboardData();
    // Set up real-time updates every 30 seconds
    const interval = setInterval(fetchDashboardData, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };

      const productsRes = await axios.get('http://localhost:5000/api/products/seller', config);
      setProducts(productsRes.data);

      // Calculate stats
      const totalProducts = productsRes.data.length;
      const lowStockProducts = productsRes.data.filter(p => p.stock < 10 && p.stock > 0).length;
      const outOfStockProducts = productsRes.data.filter(p => p.stock === 0).length;

      // Mock sales data (in real app, this would come from orders)
      const totalSales = Math.floor(Math.random() * 100) + 50;
      const totalRevenue = productsRes.data.reduce((sum, p) => sum + (p.price * (Math.floor(Math.random() * 10) + 1)), 0);

      setStats({
        totalProducts,
        totalSales,
        totalRevenue: totalRevenue.toFixed(2),
        lowStockProducts,
        outOfStockProducts
      });

      // Fetch coupons and shipping options from the backend
      const couponsRes = await axios.get('http://localhost:5000/api/coupons/seller', config);
      setCoupons(couponsRes.data);

      const shippingRes = await axios.get('http://localhost:5000/api/shipping/seller', config);
      setShippingOptions(shippingRes.data);


    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setProducts([]);
      setStats({
        totalProducts: 0,
        totalSales: 0,
        totalRevenue: '0.00',
        lowStockProducts: 0,
        outOfStockProducts: 0
      });
      setCoupons([]);
      setShippingOptions([]);
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

      if (editingProduct) {
        const updateData = {
          name: newProduct.name,
          description: newProduct.description,
          price: newProduct.price,
          category: newProduct.category,
          stock: newProduct.stock,
        };
        await axios.put(
          `http://localhost:5000/api/products/${editingProduct._id}`,
          updateData,
          config
        );
      } else {
        const formData = new FormData();
        Object.keys(newProduct).forEach(key => {
          if (key === 'imageFile' && newProduct[key]) formData.append('image', newProduct[key]);
          else if (key !== 'imageFile') formData.append(key, newProduct[key]);
        });

        config.headers['Content-Type'] = 'multipart/form-data';
        await axios.post(
          'http://localhost:5000/api/products',
          formData,
          config
        );
      }

      setEditingProduct(null);
      setNewProduct({
        name: '',
        description: '',
        price: '',
        category: '',
        stock: '',
        imageFile: null,
      });
      fetchDashboardData();
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  const handleEdit = product => {
    setNewProduct({
      name: product.name || '',
      description: product.description || '',
      price: product.price || '',
      category: product.category || '',
      stock: product.stock || '',
      imageFile: null,
    });
    setEditingProduct(product);
  };

  const handleDelete = async id => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const token = localStorage.getItem('token');
        const config = { headers: { Authorization: `Bearer ${token}` } };
        await axios.delete(`http://localhost:5000/api/products/${id}`, config);
        fetchDashboardData();
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  const filteredAndSortedData = () => {
    let filtered = [...products];

    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filters.category !== 'All') {
      filtered = filtered.filter(p => p.category === filters.category);
    }

    if (filters.stockLevel !== 'All') {
      switch (filters.stockLevel) {
        case 'Low':
          filtered = filtered.filter(p => p.stock < 10);
          break;
        case 'Medium':
          filtered = filtered.filter(p => p.stock >= 10 && p.stock < 50);
          break;
        case 'High':
          filtered = filtered.filter(p => p.stock >= 50);
          break;
        case 'Out of Stock':
          filtered = filtered.filter(p => p.stock === 0);
          break;
        default: break;
      }
    }

    if (sortConfig.key) {
      filtered.sort((a, b) => {
        const valA = a[sortConfig.key];
        const valB = b[sortConfig.key];
        if (valA < valB) return sortConfig.direction === 'ascending' ? -1 : 1;
        if (valA > valB) return sortConfig.direction === 'ascending' ? 1 : -1;
        return 0;
      });
    }
    return filtered;
  };

  const handleCouponSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      
      if (editingCoupon) {
        await axios.put(`http://localhost:5000/api/coupons/${editingCoupon._id}`, newCoupon, config);
      } else {
        await axios.post('http://localhost:5000/api/coupons', newCoupon, config);
      }

      setNewCoupon({ code: '', discountType: 'percentage', value: '', expiryDate: '' });
      setEditingCoupon(null);
      // Refetch data to show the new/updated coupon
      fetchDashboardData();
    } catch (error) {
      console.error('Error saving coupon:', error);
    }
  };

  const handleEditCoupon = (coupon) => {
    setEditingCoupon(coupon);
    setNewCoupon(coupon);
  };

  const handleDeleteCoupon = async (id) => {
    if (window.confirm('Are you sure you want to delete this coupon?')) {
      try {
        const token = localStorage.getItem('token');
        const config = { headers: { Authorization: `Bearer ${token}` } };
        await axios.delete(`http://localhost:5000/api/coupons/${id}`, config);
        fetchDashboardData();
      } catch (error) {
        console.error('Error deleting coupon:', error);
      }
    }
  };

  const handleShippingSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };

      if (editingShippingOption) {
        await axios.put(`http://localhost:5000/api/shipping/${editingShippingOption._id}`, newShippingOption, config);
      } else {
        await axios.post('http://localhost:5000/api/shipping', newShippingOption, config);
      }
      setNewShippingOption({ name: '', cost: '', estimatedDelivery: '' });
      setEditingShippingOption(null);
      fetchDashboardData();
    } catch (error) {
      console.error('Error saving shipping option:', error);
    }
  };

  const handleEditShipping = (option) => {
    setEditingShippingOption(option);
    setNewShippingOption(option);
  };
  const handleDeleteShipping = async (id) => {
    if (window.confirm('Are you sure you want to delete this shipping option?')) {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await axios.delete(`http://localhost:5000/api/shipping/${id}`, config);
      fetchDashboardData();
    }
  };

  const renderDiscounts = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-1 bg-gradient-to-br from-[#1a0a2e] to-[#0a0015] border border-[#571089]/30 rounded-2xl p-6 h-fit">
        <h2 className="text-xl font-bold mb-4 text-white">{editingCoupon ? 'Edit Coupon' : 'Create Coupon'}</h2>
        <form onSubmit={handleCouponSubmit} className="space-y-4">
          <input type="text" name="code" value={newCoupon.code} onChange={e => setNewCoupon({ ...newCoupon, code: e.target.value.toUpperCase() })} placeholder="Coupon Code (e.g., SUMMER25)" className="w-full px-4 py-3 bg-[#2a1a3e] border border-[#571089]/50 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-[#ea698b]" required />
          <div className="grid grid-cols-2 gap-4">
            <select name="discountType" value={newCoupon.discountType} onChange={e => setNewCoupon({ ...newCoupon, discountType: e.target.value })} className="w-full px-4 py-3 bg-[#2a1a3e] border border-[#571089]/50 rounded-lg text-white focus:ring-2 focus:ring-[#ea698b]">
              <option value="percentage">Percentage %</option>
              <option value="fixed">Fixed Amount (₹)</option>
            </select>
            <input type="number" name="value" value={newCoupon.value} onChange={e => setNewCoupon({ ...newCoupon, value: e.target.value })} placeholder="Value" className="w-full px-4 py-3 bg-[#2a1a3e] border border-[#571089]/50 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-[#ea698b]" required />
          </div>
          <input type="date" name="expiryDate" value={newCoupon.expiryDate} onChange={e => setNewCoupon({ ...newCoupon, expiryDate: e.target.value })} className="w-full px-4 py-3 bg-[#2a1a3e] border border-[#571089]/50 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-[#ea698b]" />
          <button type="submit" className="w-full bg-gradient-to-r from-[#ea698b] to-[#d55d92] text-white font-bold py-3 px-4 rounded-lg hover:shadow-lg hover:shadow-[#ea698b]/50 transition-all">
            {editingCoupon ? 'Update Coupon' : 'Create Coupon'}
          </button>
          {editingCoupon && <button type="button" onClick={() => { setEditingCoupon(null); setNewCoupon({ code: '', discountType: 'percentage', value: '', expiryDate: '' }); }} className="w-full mt-2 bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-4 rounded-lg">Cancel Edit</button>}
        </form>
      </div>
      <div className="lg:col-span-2 bg-gradient-to-br from-[#1a0a2e] to-[#0a0015] border border-[#571089]/30 rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-white mb-4">Your Coupons</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-gray-300">
            <thead className="border-b border-[#571089]/30 text-xs uppercase text-gray-400">
              <tr>
                <th className="p-3">Code</th><th className="p-3">Discount</th><th className="p-3">Expires</th><th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {coupons.map(coupon => (
                <tr key={coupon._id} className="border-b border-[#571089]/20 hover:bg-white/5">
                  <td className="p-3 font-mono text-white bg-white/5 rounded-l-lg">{coupon.code}</td>
                  <td className="p-3 font-semibold text-green-400">{coupon.discountType === 'percentage' ? `${coupon.value}%` : `₹${coupon.value}`}</td>
                  <td className="p-3">{coupon.expiryDate ? new Date(coupon.expiryDate).toLocaleDateString() : 'No Expiry'}</td>
                  <td className="p-3 text-right rounded-r-lg">
                    <div className="flex gap-2 justify-end">
                      <button onClick={() => handleEditCoupon(coupon)} className="p-2 bg-yellow-500/20 text-yellow-400 rounded-md hover:bg-yellow-500/30"><Edit className="w-4 h-4" /></button>
                      <button onClick={() => handleDeleteCoupon(coupon._id)} className="p-2 bg-red-500/20 text-red-400 rounded-md hover:bg-red-500/30"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderShipping = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-1 bg-gradient-to-br from-[#1a0a2e] to-[#0a0015] border border-[#571089]/30 rounded-2xl p-6 h-fit">
        <h2 className="text-xl font-bold mb-4 text-white">{editingShippingOption ? 'Edit Shipping Option' : 'Add Shipping Option'}</h2>
        <form onSubmit={handleShippingSubmit} className="space-y-4">
          <input type="text" name="name" value={newShippingOption.name} onChange={e => setNewShippingOption({ ...newShippingOption, name: e.target.value })} placeholder="Option Name (e.g., Express)" className="w-full px-4 py-3 bg-[#2a1a3e] border border-[#571089]/50 rounded-lg text-white" required />
          <input type="number" name="cost" value={newShippingOption.cost} onChange={e => setNewShippingOption({ ...newShippingOption, cost: e.target.value })} placeholder="Cost (₹)" className="w-full px-4 py-3 bg-[#2a1a3e] border border-[#571089]/50 rounded-lg text-white" required />
          <input type="text" name="estimatedDelivery" value={newShippingOption.estimatedDelivery} onChange={e => setNewShippingOption({ ...newShippingOption, estimatedDelivery: e.target.value })} placeholder="Est. Delivery (e.g., 2-3 days)" className="w-full px-4 py-3 bg-[#2a1a3e] border border-[#571089]/50 rounded-lg text-white" required />
          <button type="submit" className="w-full bg-gradient-to-r from-[#ea698b] to-[#d55d92] text-white font-bold py-3 px-4 rounded-lg">{editingShippingOption ? 'Update Option' : 'Add Option'}</button>
          {editingShippingOption && <button type="button" onClick={() => { setEditingShippingOption(null); setNewShippingOption({ name: '', cost: '', estimatedDelivery: '' }); }} className="w-full mt-2 bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-4 rounded-lg">Cancel Edit</button>}
        </form>
      </div>
      <div className="lg:col-span-2 bg-gradient-to-br from-[#1a0a2e] to-[#0a0015] border border-[#571089]/30 rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-white mb-4">Your Shipping Options</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-gray-300">
            <thead className="border-b border-[#571089]/30 text-xs uppercase text-gray-400"><tr><th className="p-3">Option</th><th className="p-3">Cost</th><th className="p-3">Est. Delivery</th><th className="p-3 text-right">Actions</th></tr></thead>
            <tbody>
              {shippingOptions.map(opt => (
                <tr key={opt._id} className="border-b border-[#571089]/20 hover:bg-white/5">
                  <td className="p-3 font-medium text-white">{opt.name}</td><td className="p-3 font-semibold text-green-400">₹{opt.cost}</td><td className="p-3">{opt.estimatedDelivery}</td>
                  <td className="p-3 text-right">
                    <div className="flex gap-2 justify-end">
                      <button onClick={() => handleEditShipping(opt)} className="p-2 bg-yellow-500/20 text-yellow-400 rounded-md hover:bg-yellow-500/30"><Edit className="w-4 h-4" /></button>
                      <button onClick={() => handleDeleteShipping(opt._id)} className="p-2 bg-red-500/20 text-red-400 rounded-md hover:bg-red-500/30"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderDashboard = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
      <div className="bg-gradient-to-br from-[#1a0a2e] to-[#0a0015] border border-[#571089]/30 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm">Total Sales</p>
            <p className="text-3xl font-bold">{stats.totalSales}</p>
          </div>
          <div className="p-3 bg-green-500/20 rounded-lg">
            <TrendingUp className="w-6 h-6 text-green-400" />
          </div>
        </div>
      </div>
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
            <p className="text-gray-400 text-sm">Analytics</p>
            <p className="text-3xl font-bold">View</p>
          </div>
          <div className="p-3 bg-blue-500/20 rounded-lg">
            <BarChart2 className="w-6 h-6 text-blue-400" />
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
          <input type="file" name="imageFile" onChange={handleInputChange} accept="image/*" className="w-full px-4 py-3 bg-[#2a1a3e] border border-[#571089]/50 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#ea698b] file:text-white hover:file:bg-[#d55d92]" required={!editingProduct} />
          <button type="submit" className="w-full bg-gradient-to-r from-[#ea698b] to-[#d55d92] text-white font-bold py-3 px-4 rounded-lg hover:shadow-lg hover:shadow-[#ea698b]/50 transition-all">
            {editingProduct ? 'Update Product' : 'Add Product'}
          </button>
          {editingProduct && (
            <button type="button" onClick={() => { setEditingProduct(null); setNewProduct({ name: '', description: '', price: '', category: '', stock: '', imageFile: null }); }} className="w-full mt-2 bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-4 rounded-lg">
              Cancel Edit
            </button>
          )}
        </form>
      </div>
      <div className="lg:col-span-2 bg-gradient-to-br from-[#1a0a2e] to-[#0a0015] border border-[#571089]/30 rounded-2xl p-6">
        <div className="flex flex-wrap gap-4 justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-white">Your Products</h2>
          <div className="flex items-center gap-2">
            <div className="relative w-full max-w-xs">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input type="text" placeholder="Search products..." onChange={e => setSearchTerm(e.target.value)} className="w-full pl-9 pr-3 py-2 bg-[#2a1a3e] border border-[#571089]/50 rounded-lg text-white placeholder-gray-500 text-sm" />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 p-4 bg-white/5 rounded-lg">
            <select onChange={e => setFilters(f => ({ ...f, category: e.target.value }))} className="py-2 px-3 bg-[#2a1a3e] border border-[#571089]/50 rounded-lg text-white text-sm">
                <option value="All">All Categories</option>
                {[...new Set(products.map(p => p.category))].map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <select onChange={e => setFilters(f => ({ ...f, stockLevel: e.target.value }))} className="py-2 px-3 bg-[#2a1a3e] border border-[#571089]/50 rounded-lg text-white text-sm">
                <option value="All">All Stock Levels</option>
                <option value="Low">Low (&lt;10)</option>
                <option value="Medium">Medium (10-49)</option>
                <option value="High">High (≥50)</option>
                <option value="Out of Stock">Out of Stock</option>
            </select>
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
              {filteredAndSortedData().length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-10 text-gray-400">
                    <Package className="w-12 h-12 mx-auto mb-2" />
                    No products found.
                  </td>
                </tr>
              ) : (
                filteredAndSortedData().map(product => (
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
                    <td className="p-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        product.stock === 0 ? 'bg-red-500/20 text-red-400' :
                        product.stock < 10 ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-green-500/20 text-green-400'
                      }`}>
                        {product.stock}
                      </span>
                    </td>
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

  const renderInventory = () => (
    <div className="space-y-6">
      {/* Stock Alerts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-[#1a0a2e] to-[#0a0015] border border-[#571089]/30 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className="w-8 h-8 text-yellow-400" />
            <h3 className="text-xl font-bold text-white">Low Stock Alert</h3>
          </div>
          <p className="text-3xl font-bold text-yellow-400">{stats.lowStockProducts}</p>
          <p className="text-gray-400">Products with stock &lt; 10</p>
        </div>
        <div className="bg-gradient-to-br from-[#1a0a2e] to-[#0a0015] border border-[#571089]/30 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <Trash2 className="w-8 h-8 text-red-400" />
            <h3 className="text-xl font-bold text-white">Out of Stock</h3>
          </div>
          <p className="text-3xl font-bold text-red-400">{stats.outOfStockProducts}</p>
          <p className="text-gray-400">Products with 0 stock</p>
        </div>
        <div className="bg-gradient-to-br from-[#1a0a2e] to-[#0a0015] border border-[#571089]/30 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <CheckCircle className="w-8 h-8 text-green-400" />
            <h3 className="text-xl font-bold text-white">Well Stocked</h3>
          </div>
          <p className="text-3xl font-bold text-green-400">{stats.totalProducts - stats.lowStockProducts - stats.outOfStockProducts}</p>
          <p className="text-gray-400">Products with stock ≥ 10</p>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-gradient-to-br from-[#1a0a2e] to-[#0a0015] border border-[#571089]/30 rounded-2xl p-6">
        <div className="flex flex-wrap gap-4 justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-white">Inventory Management</h2>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-400">Auto-updates every 30s</span>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-gray-300">
            <thead className="border-b border-[#571089]/30 text-xs uppercase text-gray-400">
              <tr>
                <th className="p-3">Product</th>
                <th className="p-3">Current Stock</th>
                <th className="p-3">Status</th>
                <th className="p-3">Last Updated</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
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
                  <td className="p-3 font-semibold">{product.stock}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      product.stock === 0 ? 'bg-red-500/20 text-red-400' :
                      product.stock < 10 ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-green-500/20 text-green-400'
                    }`}>
                      {product.stock === 0 ? 'Out of Stock' :
                       product.stock < 10 ? 'Low Stock' : 'In Stock'}
                    </span>
                  </td>
                  <td className="p-3 text-sm text-gray-400">{new Date(product.updatedAt || product.createdAt).toLocaleDateString()}</td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => handleEdit(product)}
                      className="px-3 py-1 bg-[#ea698b]/20 text-[#ea698b] rounded-md hover:bg-[#ea698b]/30 transition-colors text-sm"
                    >
                      Update Stock
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
            Seller Dashboard
          </h1>
          <p className="text-gray-400">Welcome to your seller portal. Manage your products and monitor inventory.</p>
        </div>

        <div className="flex space-x-2 border-b border-[#571089]/30 mb-8">
          <button onClick={() => setActiveTab('dashboard')} className={`px-4 py-2 font-medium transition-colors ${activeTab === 'dashboard' ? 'text-[#ea698b] border-b-2 border-[#ea698b]' : 'text-gray-400'}`}>Dashboard</button>
          <button onClick={() => setActiveTab('products')} className={`px-4 py-2 font-medium transition-colors ${activeTab === 'products' ? 'text-[#ea698b] border-b-2 border-[#ea698b]' : 'text-gray-400'}`}>Products</button>
          <button onClick={() => setActiveTab('inventory')} className={`px-4 py-2 font-medium transition-colors ${activeTab === 'inventory' ? 'text-[#ea698b] border-b-2 border-[#ea698b]' : 'text-gray-400'}`}>Inventory</button>
          <button onClick={() => setActiveTab('discounts')} className={`flex items-center gap-2 px-4 py-2 font-medium transition-colors ${activeTab === 'discounts' ? 'text-[#ea698b] border-b-2 border-[#ea698b]' : 'text-gray-400'}`}><Tag className="w-4 h-4" />Discounts</button>
          <button onClick={() => setActiveTab('shipping')} className={`flex items-center gap-2 px-4 py-2 font-medium transition-colors ${activeTab === 'shipping' ? 'text-[#ea698b] border-b-2 border-[#ea698b]' : 'text-gray-400'}`}><Truck className="w-4 h-4" />Shipping</button>
        </div>

        <div>
          {activeTab === 'dashboard' && renderDashboard()}
          {activeTab === 'products' && renderProducts()}
          {activeTab === 'inventory' && renderInventory()}
          {activeTab === 'discounts' && renderDiscounts()}
          {activeTab === 'shipping' && renderShipping()}
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;
