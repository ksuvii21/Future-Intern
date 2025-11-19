import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Package, Truck, CheckCircle, Clock, XCircle, MapPin, CreditCard, User, Calendar, DollarSign } from 'lucide-react';

const OrderDetail = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCancelling, setIsCancelling] = useState(false);
  const navigate = useNavigate();
  const [notification, setNotification] = useState({ show: false, message: '', type: 'success' });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    if (notification.show) {
      const timer = setTimeout(() => {
        setNotification({ show: false, message: '', type: 'success' }); 
      }, 5000); // Auto-hide after 5 seconds
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const fetchOrderDetail = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Authentication required. Please log in.');
      navigate('/login'); // Redirect to login
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/orders/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setOrder(data);
      } else {
        if (response.status === 401) {
          setError('Invalid credentials. Please log in again.');
          localStorage.removeItem('token'); // Clear invalid token
          navigate('/login'); // Redirect to login
        } else {
          setError('Failed to fetch order details');
        }

      }
    } catch (error) {
      console.error('Fetch order detail error:', error);
      setError('Failed to fetch order details');
    } finally {
      setLoading(false);
    }
  }, [id, navigate]);

  useEffect(() => {
    fetchOrderDetail();
  }, [fetchOrderDetail]);

  const handleCancelOrder = async () => {
    if (!window.confirm('Are you sure you want to cancel this order? This action cannot be undone.')) {
      return;
    }

    setIsCancelling(true);
    const token = localStorage.getItem('token');

    try {
      const response = await fetch(`http://localhost:5000/api/orders/${id}/cancel`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (response.ok) {
        setNotification({ show: true, message: 'Order cancelled successfully!', type: 'success' });
        // Update the order status in the local state to immediately reflect the change
        setOrder(prevOrder => ({ ...prevOrder, status: 'cancelled' }));
      } else {
        setNotification({ show: true, message: `Cancellation failed: ${data.message}`, type: 'error' });
      }
    } catch (err) {
      setNotification({ show: true, message: 'An error occurred while cancelling the order.', type: 'error' });
    } finally {
      setIsCancelling(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'ordered':
        return <Clock className="w-6 h-6 text-yellow-400" />;
      case 'processing':
        return <Package className="w-6 h-6 text-blue-400" />;
      case 'shipped':
        return <Truck className="w-6 h-6 text-purple-400" />;
      case 'out for delivery':
        return <Truck className="w-6 h-6 text-orange-400" />;
      case 'delivered':
        return <CheckCircle className="w-6 h-6 text-green-400" />;
      case 'cancelled':
        return <XCircle className="w-6 h-6 text-red-400" />;
      default:
        return <Clock className="w-6 h-6 text-gray-400" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'ordered':
        return 'text-yellow-400 border-yellow-400/30';
      case 'processing':
        return 'text-blue-400 border-blue-400/30';
      case 'shipped':
        return 'text-purple-400 border-purple-400/30';
      case 'out for delivery':
        return 'text-orange-400 border-orange-400/30';
      case 'delivered':
        return 'text-green-400 border-green-400/30';
      case 'cancelled':
        return 'text-red-400 border-red-400/30';
      default:
        return 'text-gray-400 border-gray-400/30';
    }
  };

  const getStatusSteps = (status) => {
    const steps = ['ordered', 'processing', 'shipped', 'out for delivery', 'delivered'];
    const currentIndex = steps.indexOf(status);
    return steps.map((step, index) => ({
      step,
      completed: index <= currentIndex,
      current: index === currentIndex
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0a0015] via-[#1a0a2e] to-[#0a0015] flex items-center justify-center">
        <div className="text-white text-xl">Loading order details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0a0015] via-[#1a0a2e] to-[#0a0015] flex items-center justify-center">
        <div className="text-red-400 text-xl">{error}</div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0a0015] via-[#1a0a2e] to-[#0a0015] flex items-center justify-center">
        <div className="text-white text-xl">Order not found</div>
      </div>
    );
  }

  const statusSteps = getStatusSteps(order.status);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0015] via-[#1a0a2e] to-[#0a0015]">
      {/* Notification Toast */}
      {notification.show && (
        <div className={`fixed top-28 right-6 z-50 p-4 rounded-lg shadow-2xl text-white transition-all duration-300 animate-fade-in-right ${
            notification.type === 'success'
              ? 'bg-gradient-to-r from-green-500 to-green-600'
              : 'bg-gradient-to-r from-red-500 to-red-600'
          }`}
        >
          <div className="flex items-center gap-3">
            {notification.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
            <span className="font-medium">{notification.message}</span>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="bg-black/20 backdrop-blur-sm border-b border-[#571089]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-4">
            <Link
              to="/orders"
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Orders
            </Link>
            <h1 className="text-4xl font-bold text-white">Order #{order._id.slice(-8)}</h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Status & Tracking */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-[#1a0a2e] to-[#0a0015] border border-[#571089]/30 rounded-2xl p-6 sticky top-6">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                {getStatusIcon(order.status)}
                Order Status
              </h2>

              <div className={`p-4 rounded-xl border-2 mb-6 ${getStatusColor(order.status)} bg-white/5`}>
                <div className="flex items-center gap-3">
                  {getStatusIcon(order.status)}
                  <div>
                    <p className="text-white font-semibold capitalize">{order.status}</p>
                    <p className="text-gray-400 text-sm">Last updated: {new Date(order.updatedAt).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>

              {/* Status Timeline */}
              <div className="space-y-4">
                {statusSteps.map((stepInfo, index) => (
                  <div key={stepInfo.step} className="flex items-center gap-3"><div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      stepInfo.completed ? 'bg-[#ea698b]' : 'bg-gray-600'
                    }`}>
                      {stepInfo.completed ? (
                        <CheckCircle className="w-4 h-4 text-white" />
                      ) : (
                        <div className="w-2 h-2 bg-gray-400 rounded-full" />
                      )}
                    </div>
                    <div>
                      <p className={`font-medium capitalize ${
                        stepInfo.completed ? 'text-white' : 'text-gray-400'
                      }`}>
                        {stepInfo.step}
                      </p>
                      {stepInfo.current && (
                        <p className="text-gray-400 text-sm">In progress</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Cancel Order Button */}
              {order.status === 'ordered' && (
                <div className="mt-6">
                  <button
                    onClick={handleCancelOrder}
                    disabled={isCancelling}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 hover:bg-red-500/30 hover:text-red-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <XCircle className="w-5 h-5" />
                    {isCancelling ? 'Cancelling...' : 'Cancel Order'}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Order Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Order Items */}
            <div className="bg-gradient-to-br from-[#1a0a2e] to-[#0a0015] border border-[#571089]/30 rounded-2xl p-6">
              <h2 className="text-2xl font-bold text-white mb-6">Order Items</h2>
              <div className="space-y-4">
                {order.products.map((item, index) => (
                  <div key={index} className="flex gap-4 p-4 bg-white/5 rounded-lg border border-[#571089]/20">
                    <img
                      src={item.imageUrl || 'https://via.placeholder.com/80x80?text=No+Image'}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/80x80?text=No+Image';
                      }}
                    />
                    <div className="flex-1">
                      <h3 className="text-white font-medium mb-1">{item.name}</h3>
                      <p className="text-gray-400 text-sm mb-2">
                        {item.selectedColor && `Color: ${item.selectedColor} | `}
                        {item.selectedSize && `Size: ${item.selectedSize}`}
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Qty: {item.quantity}</span>
                        <span className="text-[#ea698b] font-semibold">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-[#571089]/30 pt-4 mt-6">
                <div className="flex justify-between text-xl font-bold text-white">
                  <span>Total:</span>
                  <span className="bg-gradient-to-r from-[#ea698b] to-[#d55d92] bg-clip-text text-transparent">
                    ₹{order.totalAmount.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            </div>

            {/* Shipping & Payment Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Shipping Address */}
              <div className="bg-gradient-to-br from-[#1a0a2e] to-[#0a0015] border border-[#571089]/30 rounded-2xl p-6">
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-[#ea698b]" />
                  Shipping Address
                </h2>
                <div className="space-y-2 text-gray-300">
                  <p className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    {order.shippingAddress.name}
                  </p>
                  <p className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {order.shippingAddress.address}
                  </p>
                  <p className="ml-6">{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}</p>
                  <p className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4" />
                    {order.shippingAddress.phone}
                  </p>
                </div>
              </div>

              {/* Payment Info */}
              <div className="bg-gradient-to-br from-[#1a0a2e] to-[#0a0015] border border-[#571089]/30 rounded-2xl p-6">
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-[#ea698b]" />
                  Payment Method
                </h2>
                <div className="space-y-2 text-gray-300">
                  <p className="capitalize">{order.paymentMethod}</p>
                  {order.paymentMethod === 'card' && order.paymentDetails && (
                    <p>**** **** **** {order.paymentDetails.cardNumber?.slice(-4)}</p>
                  )}
                  {order.paymentMethod === 'upi' && order.paymentDetails && (
                    <p>{order.paymentDetails.upiId}</p>
                  )}
                  {order.paymentMethod === 'cod' && (
                    <p>Cash on Delivery</p>
                  )}
                </div>
              </div>
            </div>

            {/* Order Info */}
            <div className="bg-gradient-to-br from-[#1a0a2e] to-[#0a0015] border border-[#571089]/30 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white mb-4">Order Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>Ordered on: {new Date(order.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  <span>Total: ₹{order.totalAmount.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
