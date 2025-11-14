import React, { useState, useEffect } from 'react';
import { CreditCard, Smartphone, Truck, MapPin, User, Mail, Home, Calendar, Award } from 'lucide-react';

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    upiId: '',
  });

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  const handleInputChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    // Here you would typically send the order to your backend
    alert('Order placed successfully!');
    localStorage.removeItem('cart');
    setCartItems([]);
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0015] via-[#1a0a2e] to-[#0a0015]">
      {/* Header */}
      <div className="bg-black/20 backdrop-blur-sm border-b border-[#571089]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-4xl font-bold text-white">Checkout</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
                        <span className="text-[#ea698b] font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-[#571089]/30 pt-4 space-y-2">
                <div className="flex justify-between text-gray-400">
                  <span>Subtotal:</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Shipping:</span>
                  <span className="text-green-400">Free</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Tax:</span>
                  <span>${(totalPrice * 0.08).toFixed(2)}</span>
                </div>
                <div className="border-t border-[#571089]/30 pt-2 mt-4">
                  <div className="flex justify-between text-xl font-bold text-white">
                    <span>Total:</span>
                    <span className="bg-gradient-to-r from-[#ea698b] to-[#d55d92] bg-clip-text text-transparent">
                      ${(totalPrice + totalPrice * 0.08).toFixed(2)}
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
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
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-300 mb-2">Card Number</label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/5 border border-[#571089]/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#ea698b] transition-all"
                      placeholder="1234 5678 9012 3456"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-300 mb-2 flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/5 border border-[#571089]/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#ea698b] transition-all"
                        placeholder="MM/YY"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 mb-2">CVV</label>
                      <input
                        type="text"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/5 border border-[#571089]/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#ea698b] transition-all"
                        placeholder="123"
                        required
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'upi' && (
                <div className="space-y-4">
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

              {paymentMethod === 'cod' && (
                <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                  <p className="text-green-400 text-sm">
                    Pay in cash when your order is delivered to your doorstep. No advance payment required.
                  </p>
                </div>
              )}
            </div>

            {/* Place Order Button */}
            <div className="flex justify-end">
              <button
                onClick={handleSubmit}
                className="px-12 py-4 bg-gradient-to-r from-[#ea698b] to-[#d55d92] text-white font-bold rounded-xl hover:shadow-lg hover:shadow-[#ea698b]/50 transform hover:scale-105 transition-all duration-300 flex items-center gap-2"
              >
                <Award className="w-5 h-5" />
                Place Order - ${(totalPrice + totalPrice * 0.08).toFixed(2)}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
