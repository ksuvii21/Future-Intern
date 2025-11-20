import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Smartphone, Truck, MapPin, User, Mail, Home, Award } from 'lucide-react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [cartLoading, setCartLoading] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '' ,
    upiId: '',
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchCart = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Please login to place an order.');
        setCartLoading(false);
        return;
      }
      try {
        const response = await fetch('http://localhost:5000/api/cart', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          setCartItems(data.items || []);
        } else {
          setError('Failed to load cart');
        }
      } catch (error) {
        setError('Failed to load cart');
      } finally {
        setCartLoading(false);
      }
    };
    fetchCart();
  }, []);

  const handleInputChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      return;
    }

    setIsProcessing(true);
    setError(null);

    const token = localStorage.getItem('token');
    if (!token) {
      setError('Please login to place an order.');
      setIsProcessing(false);
      return;
    }

    if (cartItems.length === 0) {
      setError('Your cart is empty.');
      setIsProcessing(false);
      return;
    }

    // Client-side validation for shipping address fields
    const shippingAddressFields = ['name', 'email', 'phone', 'address', 'city', 'state', 'zipCode'];
    for (const field of shippingAddressFields) {
      if (!formData[field]) {
        setError(`Please fill in the shipping address field: ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
        setIsProcessing(false);
        return;
      }
    }

    const orderData = {
      products: cartItems.map(item => ({
        product: item.product?._id || item._id,
        name: item.product?.name || item.name,
        price: item.product?.price || item.price,
        quantity: item.quantity,
        selectedColor: item.selectedColor,
        selectedSize: item.selectedSize,
        imageUrl: item.product?.imageUrl || item.imageUrl
      })),
      totalAmount: totalPrice + totalPrice * 0.08, // Including tax
      shippingAddress: {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode
      },
      paymentMethod,
      paymentDetails: {} // Will be populated by Stripe info if needed
    };

    try {
      // 1. Create Payment Intent on the server
      const paymentIntentRes = await fetch('http://localhost:5000/api/orders/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ products: orderData.products })
      });

      if (!paymentIntentRes.ok) {
        const errorData = await paymentIntentRes.json();
        throw new Error(errorData.message || 'Failed to create payment intent.');
      }

      const { clientSecret } = await paymentIntentRes.json();

      // 2. Confirm the payment on the client side
      const paymentResult = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: formData.name,
            email: formData.email,
            address: {
              line1: formData.address,
              city: formData.city,
              state: formData.state,
              postal_code: formData.zipCode,
            },
          },
        },
      });

      if (paymentResult.error) {
        throw new Error(paymentResult.error.message);
      }

      // 3. If payment is successful, create the order in our database
      if (paymentResult.paymentIntent.status === 'succeeded') {
        orderData.paymentDetails.stripePaymentIntentId = paymentResult.paymentIntent.id;

        const orderCreationRes = await fetch('http://localhost:5000/api/orders/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(orderData)
        });

        if (!orderCreationRes.ok) {
          const errorData = await orderCreationRes.json();
          throw new Error(errorData.message || 'Payment succeeded, but failed to save order.');
        }

        localStorage.removeItem('cart');
        setCartItems([]);
        navigate('/orders');
      }
    } catch (error) {
      console.error('Order submission error:', error);
      setError(error.message);
    } finally {
      setIsProcessing(false);
    }
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + (Number(item.product?.price) || 0) * (Number(item.quantity) || 0),
    0
  );

  if (cartLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0a0015] via-[#1a0a2e] to-[#0a0015] flex items-center justify-center">
        <div className="text-white text-xl">Loading cart...</div>
      </div>
    );
  }

  if (cartItems.length === 0 && !cartLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0a0015] via-[#1a0a2e] to-[#0a0015] flex items-center justify-center">
        <div className="text-red-400 text-xl">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0015] via-[#1a0a2e] to-[#0a0015] relative">
      {/* Header */}
      <div className="bg-black/20 backdrop-blur-sm border-b border-[#571089]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl sm:text-4xl font-bold text-white">Checkout</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-[#1a0a2e] to-[#0a0015] border border-[#571089]/30 rounded-2xl p-6 sticky top-6">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <Award className="w-6 h-6 text-[#ea698b]" />
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                {cartItems.map(item => (
                  <div key={item._id} className="flex gap-4 p-4 bg-white/5 rounded-lg border border-[#571089]/20">
                    <img
                      src={item.product?.imageUrl || item.imageUrl || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiBmaWxsPSIjMWEwYTJlIi8+Cjx0ZXh0IHg9IjQwIiB5PSI0MCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjEwIiBmaWxsPSIjOWNhNGIxIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+Tm8gSW1hZ2U8L3RleHQ+Cjwvc3ZnPg=='}
                      alt={item.product?.name || item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/80x80?text=No+Image';
                      }}
                    />
                    <div className="flex-1">
                      <h3 className="text-white font-medium mb-1">{item.product?.name || item.name}</h3>
                      <p className="text-gray-400 text-sm mb-2">
                        {item.selectedColor && `Color: ${item.selectedColor} | `}
                        {item.selectedSize && `Size: ${item.selectedSize}`}
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Qty: {item.quantity}</span>
                        <span className="text-[#ea698b] font-semibold">₹{((item.product?.price || item.price || 0) * item.quantity).toLocaleString('en-IN')}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-[#571089]/30 pt-4 space-y-2">
                <div className="flex justify-between text-gray-400">
                  <span>Subtotal:</span>
                  <span>₹{totalPrice.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Shipping:</span>
                  <span className="text-green-400">Free</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Tax:</span>
                  <span>₹{(totalPrice * 0.08).toLocaleString('en-IN')}</span>
                </div>
                <div className="border-t border-[#571089]/30 pt-2 mt-4">
                <div className="flex justify-between text-xl font-bold text-white">
                  <span>Total:</span>
                  <span className="bg-gradient-to-r from-[#ea698b] to-[#d55d92] bg-clip-text text-transparent">
                    ₹{(totalPrice + (totalPrice * 0.08)).toLocaleString('en-IN')}
                  </span>
                </div>
                </div>
              </div>
            </div>
          </div>
          {/* Shipping & Payment Information */}
          <div className="lg:col-span-2 space-y-8">
            {/* Shipping Information */}
            <div className="bg-gradient-to-br from-[#1a0a2e] to-[#0a0015] border border-[#571089]/30 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <MapPin className="w-6 h-6 text-[#ea698b]" />
                Shipping Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-300 mb-2 flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/5 border border-[#571089]/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#ea698b] transition-all"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 mb-2 flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/5 border border-[#571089]/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#ea698b] transition-all"
                      placeholder="Enter your email"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 mb-2 flex items-center gap-2">
                      <Smartphone className="w-4 h-4" />
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/5 border border-[#571089]/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#ea698b] transition-all"
                      placeholder="Enter your phone number"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-300 mb-2 flex items-center gap-2">
                      <Home className="w-4 h-4" />
                      Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/5 border border-[#571089]/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#ea698b] transition-all"
                      placeholder="Enter your address"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-300 mb-2">City</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/5 border border-[#571089]/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#ea698b] transition-all"
                        placeholder="City"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 mb-2">State</label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/5 border border-[#571089]/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#ea698b] transition-all"
                        placeholder="State"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-300 mb-2">ZIP Code</label>
                    <input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/5 border border-[#571089]/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#ea698b] transition-all"
                      placeholder="ZIP Code"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-gradient-to-br from-[#1a0a2e] to-[#0a0015] border border-[#571089]/30 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <CreditCard className="w-6 h-6 text-[#ea698b]" />
                Payment Method
              </h2>

              {/* Payment Options */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <button
                  onClick={() => setPaymentMethod('card')}
                className={`p-4 rounded-xl border-2 transition-all flex items-center gap-3 ${
                  paymentMethod === 'card'
                    ? 'border-[#ea698b] bg-[#ea698b]/10 text-[#ea698b]'
                    : 'border-[#571089]/30 bg-white/5 text-gray-300 hover:border-[#571089]/50'
                }`}
                >
                  <CreditCard className="w-6 h-6" />
                  <div className="text-left">
                    <div className="font-semibold">Credit/Debit Card</div>
                    <div className="text-sm opacity-75">Visa, MasterCard, etc.</div>
                  </div>
                </button>

                <button
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-4 rounded-xl border-2 transition-all flex items-center gap-3 ${
                    paymentMethod === 'upi'
                      ? 'border-[#ea698b] bg-[#ea698b]/10 text-[#ea698b]'
                      : 'border-[#571089]/30 bg-white/5 text-gray-300 hover:border-[#571089]/50'
                  }`}
                >
                  <Smartphone className="w-6 h-6" />
                  <div className="text-left">
                    <div className="font-semibold">UPI</div>
                    <div className="text-sm opacity-75">Google Pay, PhonePe, etc.</div>
                  </div>
                </button>

                <button
                  onClick={() => setPaymentMethod('upi_scanner')}
                  className={`p-4 rounded-xl border-2 transition-all flex items-center gap-3 ${
                    paymentMethod === 'upi_scanner'
                      ? 'border-[#ea698b] bg-[#ea698b]/10 text-[#ea698b]'
                      : 'border-[#571089]/30 bg-white/5 text-gray-300 hover:border-[#571089]/50'
                  }`}
                >
                  <Smartphone className="w-6 h-6" />
                  <div className="text-left">
                    <div className="font-semibold">UPI Scanner</div>
                    <div className="text-sm opacity-75">Scan QR Code</div>
                  </div>
                </button>

                <button
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-4 rounded-xl border-2 transition-all flex items-center gap-3 ${
                    paymentMethod === 'cod'
                      ? 'border-[#ea698b] bg-[#ea698b]/10 text-[#ea698b]'
                      : 'border-[#571089]/30 bg-white/5 text-gray-300 hover:border-[#571089]/50'
                  }`}
                >
                  <Truck className="w-6 h-6" />
                  <div className="text-left">
                    <div className="font-semibold">Cash on Delivery</div>
                    <div className="text-sm opacity-75">Pay when you receive</div>
                  </div>
                </button>
              </div>

              {/* Payment Forms */}
              {paymentMethod === 'card' && (
                <div className="p-4 bg-white/5 border border-[#571089]/30 rounded-lg">
                  <CardElement
                    options={{
                      style: {
                        base: {
                          color: '#ffffff',
                          fontFamily: 'Arial, sans-serif',
                          fontSmoothing: 'antialiased',
                          fontSize: '16px',
                          '::placeholder': {
                            color: '#a0aec0',
                          },
                        },
                        invalid: {
                          color: '#f56565',
                          iconColor: '#f56565',
                        },
                      },
                    }}
                  />
                </div>
              )}

              {paymentMethod === 'upi' && (
                <div className="space-y-4">
                  <div className="text-center">
                    <button
                      type="button"
                      className="w-full px-6 py-4 bg-gradient-to-r from-[#ea698b] to-[#d55d92] text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-[#ea698b]/50 transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3 mb-4"
                      onClick={() => {
                        // Placeholder for UPI scanner functionality
                        alert('UPI Scanner: Please allow camera access to scan QR codes. Feature coming soon!');
                      }}
                    >
                      <Smartphone className="w-6 h-6" />
                      Scan UPI QR Code
                    </button>
                    <p className="text-gray-400 text-sm mb-4">or enter UPI ID manually</p>
                  </div>

                  <div>
                    <label className="block text-gray-300 mb-2">UPI ID</label>
                    <input
                      type="text"
                      name="upiId"
                      value={formData.upiId}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/5 border border-[#571089]/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#ea698b] transition-all"
                      placeholder="yourname@upi"
                      required
                    />
                  </div>

                  <div className="p-4 bg-[#ea698b]/10 border border-[#ea698b]/30 rounded-lg">
                    <p className="text-[#ea698b] text-sm">
                      You will be redirected to your UPI app to complete the payment securely.
                    </p>
                  </div>
                </div>
              )}

              {paymentMethod === 'upi_scanner' && (
                <div className="space-y-4">
                  <div className="text-center">
                    <button
                      type="button"
                      className="w-full px-6 py-4 bg-gradient-to-r from-[#ea698b] to-[#d55d92] text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-[#ea698b]/50 transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3 mb-4"
                      onClick={() => {
                        // Placeholder for UPI scanner functionality
                        alert('UPI Scanner: Please allow camera access to scan QR codes. Feature coming soon!');
                      }}
                    >
                      <Smartphone className="w-6 h-6" />
                      Open Camera & Scan QR Code
                    </button>
                    <p className="text-gray-400 text-sm mb-4">Scan the merchant's UPI QR code to pay</p>
                  </div>

                  <div className="p-4 bg-[#ea698b]/10 border border-[#ea698b]/30 rounded-lg">
                    <p className="text-[#ea698b] text-sm">
                      Position the QR code within the camera frame. The payment will be processed securely through your UPI app.
                    </p>
                  </div>
                </div>
              )}

              {paymentMethod === 'cod' && (
                <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                  <p className="text-green-400 text-sm">
                    Pay in cash when your order is delivered to your doorstep. No advance payment required.
                  </p>
                </div>
              )}
            </div>

            {/* Error Display */}
            {error && (
              <div className="bg-red-500/20 border border-red-500/30 text-red-400 p-4 rounded-lg text-center">
                {error}
              </div>
            )}

            {/* Place Order Button */}
            <div className="flex justify-end">
              <button
                onClick={handleSubmit}
                disabled={isProcessing || !stripe}
                className="px-12 py-4 bg-gradient-to-r from-[#ea698b] to-[#d55d92] text-white font-bold rounded-xl hover:shadow-lg hover:shadow-[#ea698b]/50 transform hover:scale-105 transition-all duration-300 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? 'Processing...' : `Place Order - ₹${(totalPrice + (totalPrice * 0.08)).toLocaleString('en-IN')}`}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
