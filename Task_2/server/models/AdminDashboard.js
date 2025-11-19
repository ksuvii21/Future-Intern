import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, AreaChart, Area } from 'recharts';
import { LayoutDashboard, Package, ShoppingCart, Users, DollarSign, Edit, Trash2, PlusCircle, Save, X, Search, FileDown, AlertTriangle, CheckSquare, Settings, Menu, BarChart2 as BarChartIcon } from 'lucide-react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState(null);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [customerAnalytics, setCustomerAnalytics] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const PIE_COLORS = ['#ea698b', '#c05299', '#822faf', '#6d23b6', '#ac46a1'];

  const fetchAllData = useCallback(async () => {
    // Scroll to top when tab changes
    window.scrollTo(0, 0);
    
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };

      const [statsRes, productsRes, ordersRes, usersRes, customerAnalyticsRes] = await Promise.all([
        axios.get('http://localhost:5000/api/admin/stats', config),
        axios.get('http://localhost:5000/api/products', config),
        axios.get('http://localhost:5000/api/orders/all', config),
        axios.get('http://localhost:5000/api/auth/users', config),
        axios.get('http://localhost:5000/api/admin/customer-analytics', config),
      ]);

      setStats(statsRes.data);
      setProducts(productsRes.data.products || []);
      setOrders(ordersRes.data);
      setUsers(usersRes.data);
      setCustomerAnalytics(customerAnalyticsRes.data || { topCustomers: [], userRegistrations: [] });

    } catch (error) {
      console.error("Failed to fetch admin data", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
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

  const handleBulkDelete = async () => {
    if (window.confirm(`Are you sure you want to delete ${selectedProducts.length} products?`)) {
      try {
        const token = localStorage.getItem('token');
        await axios.post('http://localhost:5000/api/products/bulk-delete', { productIds: selectedProducts }, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setSelectedProducts([]);
        fetchAllData();
      } catch (error) {
        console.error("Failed to bulk delete products", error);
      }
    }
  };

  const handleSelectProduct = (productId) => {
    setSelectedProducts(prev =>
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
    );
  };

  const generateSalesReportPDF = () => {
    const doc = new jsPDF();
    doc.text("Sales Report", 14, 16);
    doc.setFontSize(10);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 22);

    const salesData = [
      ["Total Revenue", `Rs. ${stats.totalRevenue.toFixed(2)}`],
      ["Total Orders", stats.totalOrders],
      ["Avg. Order Value", `Rs. ${stats.avgOrderValue.toFixed(2)}`],
      ["Total Products", stats.totalProducts],
    ];

    doc.autoTable({
      startY: 30,
      head: [['Metric', 'Value']],
      body: salesData,
    });

    const topProducts = stats.productPerformance.map(p => [p.name, p.unitsSold, `Rs. ${p.totalRevenue.toFixed(2)}`]);
    doc.autoTable({
      startY: doc.lastAutoTable.finalY + 10,
      head: [['Top Products', 'Units Sold', 'Revenue']],
      body: topProducts,
    });

    doc.save('sales-report.pdf');
  };

  const generateLedgerPDF = () => {
    const doc = new jsPDF();
    doc.text("Financial Ledger", 14, 16);
    doc.setFontSize(10);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 22);

    const tableColumn = ["Order ID", "Date", "Customer", "Amount", "Status"];
    const tableRows = [];

    orders.forEach(order => {
      const orderData = [
        order._id,
        new Date(order.createdAt).toLocaleDateString(),
        order.user?.username || 'N/A',
        `Rs. ${order.totalAmount.toFixed(2)}`,
        order.status
      ];
      tableRows.push(orderData);
    });

    doc.autoTable(tableColumn, tableRows, { startY: 30 });
    doc.save('financial-ledger.pdf');
  };

  const generateCustomerAnalyticsPDF = () => {
    const doc = new jsPDF();
    doc.text("Customer Analytics Report", 14, 16);
    const head = [['Customer', 'Email', 'Total Orders', 'Total Spent (Rs.)']];
    const body = customerAnalytics?.topCustomers?.map(c => [c.userDetails.username, c.userDetails.email, c.totalOrders, c.totalSpent.toFixed(2)]) || [];
    
    doc.autoTable({ head, body, startY: 30 });
    doc.save('customer-analytics.pdf');
  };
  
  const StatCard = ({ icon, title, value, color, prefix = '', suffix = '' }) => (
    <div className={`bg-gradient-to-br from-[#1a0a2e] to-[#0a0015] border border-[#571089]/30 rounded-2xl p-6 flex items-center gap-4`}>
      <div className={`w-12 h-12 rounded-lg flex items-center justify-center bg-gradient-to-br ${color}`}>
        {icon}
      </div>
      <div>
        <p className="text-gray-400 text-sm">{title}</p>
        <p className="text-2xl font-bold text-white">{prefix}{value}{suffix}</p>
      </div>
    </div>
  );

  const renderDashboard = () => (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={<DollarSign />} title="Total Revenue" value={stats?.totalRevenue?.toFixed(2) || 0} prefix="₹" color="from-green-500/30 to-green-600/30" />
        <StatCard icon={<DollarSign />} title="Avg. Order Value" value={stats?.avgOrderValue?.toFixed(2) || 0} prefix="₹" color="from-teal-500/30 to-teal-600/30" />
        <StatCard icon={<ShoppingCart />} title="Total Orders" value={stats?.totalOrders || 0} color="from-blue-500/30 to-blue-600/30" />
        <StatCard icon={<Users />} title="Total Users" value={stats?.totalUsers || 0} color="from-purple-500/30 to-purple-600/30" />
      </div>
      <div className="bg-gradient-to-br from-[#1a0a2e] to-[#0a0015] border border-[#571089]/30 rounded-2xl p-6 h-[400px]">
        <h3 className="text-xl font-bold text-white mb-4">Monthly Sales</h3>
        <ResponsiveContainer width="100%" height="90%">
          <BarChart data={stats?.monthlySales} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#57108930" />
            <XAxis dataKey="_id" tick={{ fill: '#9ca3af' }} />
            <YAxis tick={{ fill: '#9ca3af' }} />
            <Tooltip contentStyle={{ backgroundColor: '#1a0a2e', border: '1px solid #571089' }} />
            <Legend />
            <Bar dataKey="total" fill="#ea698b" name="Sales (₹)" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-gradient-to-br from-[#1a0a2e] to-[#0a0015] border border-[#571089]/30 rounded-2xl p-6 h-[400px]">
          <h3 className="text-xl font-bold text-white mb-4">Sales by Category</h3>
          <ResponsiveContainer width="100%" height="90%">
            <PieChart>
              <Pie data={stats?.salesByCategory} dataKey="totalRevenue" nameKey="_id" cx="50%" cy="50%" outerRadius={120} fill="#8884d8" label>
                {stats?.salesByCategory?.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: '#1a0a2e', border: '1px solid #571089' }} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-gradient-to-br from-[#1a0a2e] to-[#0a0015] border border-[#571089]/30 rounded-2xl p-6 h-[400px]">
          <h3 className="text-xl font-bold text-white mb-4">Recent User Registrations</h3>
          <ResponsiveContainer width="100%" height="90%">
            <AreaChart data={customerAnalytics?.userRegistrations}>
              <CartesianGrid strokeDasharray="3 3" stroke="#57108930" />
              <XAxis dataKey="_id" tick={{ fill: '#9ca3af' }} />
              <YAxis tick={{ fill: '#9ca3af' }} />
              <Tooltip contentStyle={{ backgroundColor: '#1a0a2e', border: '1px solid #571089' }} />
              <Area type="monotone" dataKey="count" stroke="#822faf" fill="#822faf" fillOpacity={0.3} name="New Users" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );

  const renderProducts = () => (
    <div className="bg-gradient-to-br from-[#1a0a2e] to-[#0a0015] border border-[#571089]/30 rounded-2xl p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Manage Products</h2>
          {selectedProducts.length > 0 && (
            <p className="text-sm text-gray-400">{selectedProducts.length} products selected</p>
          )}
        </div>
        <div className="flex gap-2 self-start sm:self-center">
          {selectedProducts.length > 0 && (
            <button onClick={handleBulkDelete} className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors">
              <Trash2 className="w-4 h-4" /> Delete Selected
            </button>
          )}
          <button onClick={() => openProductModal()} className="flex items-center gap-2 px-4 py-2 bg-[#ea698b] hover:bg-[#d55d92] text-white rounded-lg transition-colors self-start sm:self-center">
            <PlusCircle className="w-4 h-4" /> Add Product
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-400">
          <thead className="text-xs text-gray-300 uppercase bg-white/5">
            <tr>
              <th scope="col" className="p-4">
                <input 
                  type="checkbox" 
                  className="bg-transparent rounded border-gray-600 text-[#ea698b] focus:ring-[#ea698b]" 
                  onChange={(e) => setSelectedProducts(e.target.checked ? products.map(p => p._id) : [])}
                  checked={selectedProducts.length > 0 && selectedProducts.length === products.length}
                />
              </th>
              <th scope="col" className="px-6 py-3">Product Name</th>
              <th scope="col" className="px-6 py-3 hidden md:table-cell">Category</th>
              <th scope="col" className="px-6 py-3 hidden sm:table-cell">Price</th>
              <th scope="col" className="px-6 py-3 hidden sm:table-cell">Stock</th>
              <th scope="col" className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p._id} className="border-b border-[#571089]/30 hover:bg-white/5">
                <td className="p-4">
                  <input 
                    type="checkbox" 
                    className="bg-transparent rounded border-gray-600 text-[#ea698b] focus:ring-[#ea698b]" 
                    checked={selectedProducts.includes(p._id)} 
                    onChange={() => handleSelectProduct(p._id)} 
                  />
                </td>
                <td className="px-6 py-4 font-medium text-white">{p.name}</td>
                <td className="px-6 py-4 hidden md:table-cell">{p.category}</td>
                <td className="px-6 py-4 hidden sm:table-cell">₹{p.price}</td>
                <td className="px-6 py-4 hidden sm:table-cell">{p.stock}</td>
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
    <div className="bg-gradient-to-br from-[#1a0a2e] to-[#0a0015] border border-[#571089]/30 rounded-2xl p-4 sm:p-6">
      <h2 className="text-2xl font-bold text-white mb-6">Manage Orders</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-400">
          <thead className="text-xs text-gray-300 uppercase bg-white/5">
            <tr>
              <th scope="col" className="px-6 py-3">Order ID</th>
              <th scope="col" className="px-6 py-3 hidden md:table-cell">User</th>
              <th scope="col" className="px-6 py-3 hidden sm:table-cell">Date</th>
              <th scope="col" className="px-6 py-3">Total</th>
              <th scope="col" className="px-6 py-3">Status</th>
              <th scope="col" className="px-6 py-3">Update Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(o => (
              <tr key={o._id} className="border-b border-[#571089]/30 hover:bg-white/5">
                <td className="px-6 py-4 font-medium text-white" title={o._id}>...{o._id.slice(-6)}</td>
                <td className="px-6 py-4 hidden md:table-cell">{o.user?.username || 'N/A'}</td>
                <td className="px-6 py-4 hidden sm:table-cell">{new Date(o.createdAt).toLocaleDateString()}</td>
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
    <div className="bg-gradient-to-br from-[#1a0a2e] to-[#0a0015] border border-[#571089]/30 rounded-2xl p-4 sm:p-6">
      <h2 className="text-2xl font-bold text-white mb-6">Manage Users</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-400">
          <thead className="text-xs text-gray-300 uppercase bg-white/5">
            <tr>
              <th scope="col" className="px-6 py-3">Username</th>
              <th scope="col" className="px-6 py-3 hidden md:table-cell">Email</th>
              <th scope="col" className="px-6 py-3 hidden sm:table-cell">Joined</th>
              <th scope="col" className="px-6 py-3">Role</th>
              <th scope="col" className="px-6 py-3">Update Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u._id} className="border-b border-[#571089]/30 hover:bg-white/5">
                <td className="px-6 py-4 font-medium text-white">{u.username}</td>
                <td className="px-6 py-4 hidden md:table-cell">{u.email}</td>
                <td className="px-6 py-4 hidden sm:table-cell">{new Date(u.createdAt).toLocaleDateString()}</td>
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

  const renderPerformance = () => (
    <div className="bg-gradient-to-br from-[#1a0a2e] to-[#0a0015] border border-[#571089]/30 rounded-2xl p-4 sm:p-6">
      <h2 className="text-2xl font-bold text-white mb-6">Top Product Performance</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-400">
          <thead className="text-xs text-gray-300 uppercase bg-white/5">
            <tr>
              <th scope="col" className="px-6 py-3">Product Name</th>
              <th scope="col" className="px-6 py-3">Units Sold</th>
              <th scope="col" className="px-6 py-3 hidden sm:table-cell">Total Revenue</th>
            </tr>
          </thead>
          <tbody>
            {stats?.productPerformance?.map(p => (
              <tr key={p._id} className="border-b border-[#571089]/30 hover:bg-white/5">
                <td className="px-6 py-4 font-medium text-white">{p.name}</td>
                <td className="px-6 py-4">{p.unitsSold}</td>
                <td className="px-6 py-4 text-green-400 hidden sm:table-cell">₹{p.totalRevenue.toLocaleString('en-IN')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderReports = () => (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-3xl font-bold text-white">Sales Reports</h2>
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <button onClick={generateSalesReportPDF} className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
            <FileDown className="w-4 h-4" /> Download Sales PDF
          </button>
          <button onClick={generateLedgerPDF} className="flex items-center justify-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
            <FileDown className="w-4 h-4" /> Download Ledger PDF
          </button>
        </div>
      </div>
      {/* Sales specific dashboard content */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={<DollarSign />} title="Total Revenue" value={stats?.totalRevenue?.toFixed(2) || 0} prefix="₹" color="from-green-500/30 to-green-600/30" />
        <StatCard icon={<DollarSign />} title="Avg. Order Value" value={stats?.avgOrderValue?.toFixed(2) || 0} prefix="₹" color="from-teal-500/30 to-teal-600/30" />
        <StatCard icon={<ShoppingCart />} title="Total Orders" value={stats?.totalOrders || 0} color="from-blue-500/30 to-blue-600/30" />
        <StatCard icon={<Package />} title="Total Products" value={stats?.totalProducts || 0} color="from-yellow-500/30 to-yellow-600/30" />
      </div>
      <div className="bg-gradient-to-br from-[#1a0a2e] to-[#0a0015] border border-[#571089]/30 rounded-2xl p-6 h-[400px]">
        <h3 className="text-xl font-bold text-white mb-4">Monthly Sales</h3>
        <ResponsiveContainer width="100%" height="90%">
          <BarChart data={stats?.monthlySales} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#57108930" />
            <XAxis dataKey="_id" tick={{ fill: '#9ca3af' }} />
            <YAxis tick={{ fill: '#9ca3af' }} />
            <Tooltip contentStyle={{ backgroundColor: '#1a0a2e', border: '1px solid #571089' }} />
            <Legend />
            <Bar dataKey="total" fill="#ea698b" name="Sales (₹)" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      {renderPerformance()}
    </div>
  );

  const renderCustomers = () => (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-3xl font-bold text-white">Customer Analytics</h2>
        <button onClick={generateCustomerAnalyticsPDF} className="flex items-center justify-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors">
          <FileDown className="w-4 h-4" /> Download Customer PDF
        </button>
      </div>
      <div className="bg-gradient-to-br from-[#1a0a2e] to-[#0a0015] border border-[#571089]/30 rounded-2xl p-6 h-[400px]">
        <h3 className="text-xl font-bold text-white mb-4">New User Registrations</h3>
        <ResponsiveContainer width="100%" height="90%">
          <AreaChart data={customerAnalytics?.userRegistrations}>
            <CartesianGrid strokeDasharray="3 3" stroke="#57108930" />
            <XAxis dataKey="_id" tick={{ fill: '#9ca3af' }} />
            <YAxis tick={{ fill: '#9ca3af' }} />
            <Tooltip contentStyle={{ backgroundColor: '#1a0a2e', border: '1px solid #571089' }} />
            <Area type="monotone" dataKey="count" stroke="#822faf" fill="#822faf" fillOpacity={0.3} name="New Users" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="bg-gradient-to-br from-[#1a0a2e] to-[#0a0015] border border-[#571089]/30 rounded-2xl p-4 sm:p-6">
        <h3 className="text-xl font-bold text-white mb-4">Top Customers</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-400">
            <thead className="text-xs text-gray-300 uppercase bg-white/5">
              <tr>
                <th scope="col" className="px-6 py-3">Customer</th>
                <th scope="col" className="px-6 py-3 hidden md:table-cell">Email</th>
                <th scope="col" className="px-6 py-3">Total Orders</th>
                <th scope="col" className="px-6 py-3">Total Spent</th>
              </tr>
            </thead>
            <tbody>
              {customerAnalytics?.topCustomers?.map(c => (
                <tr key={c._id} className="border-b border-[#571089]/30 hover:bg-white/5">
                  <td className="px-6 py-4 font-medium text-white">{c.userDetails.username}</td>
                  <td className="px-6 py-4 hidden md:table-cell">{c.userDetails.email}</td>
                  <td className="px-6 py-4 text-center">{c.totalOrders}</td>
                  <td className="px-6 py-4 text-green-400 font-semibold">₹{c.totalSpent.toLocaleString('en-IN')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
      case 'reports': return renderReports();
      case 'customers': return renderCustomers();
      case 'performance': return renderPerformance();
      default: return null;
    }
  };

  const TabButton = ({ id, icon, label, isSidebarOpen }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors w-full text-left ${activeTab === id ? 'bg-[#ea698b]/20 text-[#ea698b]' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
    >
      {icon}
      <span className={`font-medium transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 lg:opacity-100'}`}>{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0015] via-[#1a0a2e] to-[#0a0015] text-white">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <header className="mb-8 flex justify-between items-center">
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-[#ea698b] to-[#d55d92] bg-clip-text text-transparent">Admin Panel</h1>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="lg:hidden p-2 rounded-md bg-white/10">
            <Menu className="w-6 h-6" />
          </button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar */}
          <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-gradient-to-br from-[#1a0a2e] to-[#0a0015] border-r border-[#571089]/30 p-4 transform transition-transform duration-300 lg:relative lg:translate-x-0 lg:w-auto lg:col-span-2 lg:bg-transparent lg:border-none lg:p-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            <div className="bg-gradient-to-br from-[#1a0a2e] to-[#0a0015] border border-[#571089]/30 rounded-2xl p-4 space-y-2 h-full lg:h-auto">
              <div className="flex justify-between items-center lg:hidden mb-4">
                <h2 className="text-xl font-bold text-white">Menu</h2>
                <button onClick={() => setIsSidebarOpen(false)}><X className="w-6 h-6" /></button>
              </div>
              <TabButton id="dashboard" icon={<LayoutDashboard className="w-5 h-5" />} label="Dashboard" isSidebarOpen={isSidebarOpen} />
              <TabButton id="products" icon={<Package className="w-5 h-5" />} label="Products" isSidebarOpen={isSidebarOpen} />
              <TabButton id="orders" icon={<ShoppingCart className="w-5 h-5" />} label="Orders" isSidebarOpen={isSidebarOpen} />
              <TabButton id="users" icon={<Users className="w-5 h-5" />} label="Users" isSidebarOpen={isSidebarOpen} />
              <TabButton id="reports" icon={<FileDown className="w-5 h-5" />} label="Reports" isSidebarOpen={isSidebarOpen} />
              <TabButton id="customers" icon={<Users className="w-5 h-5" />} label="Customers" isSidebarOpen={isSidebarOpen} />
              <TabButton id="performance" icon={<BarChartIcon className="w-5 h-5" />} label="Performance" isSidebarOpen={isSidebarOpen} />
            </div>
          </aside>

          <main className="lg:col-span-10">
            {renderContent()}
          </main>
        </div>
      </div>

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div onClick={() => setIsSidebarOpen(false)} className="fixed inset-0 bg-black/50 z-30 lg:hidden"></div>
      )}

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
                  <label className="block text-gray-300 mb-2">Price (₹)</label>
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