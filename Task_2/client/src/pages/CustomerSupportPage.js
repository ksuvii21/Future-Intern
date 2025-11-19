import React, { useState, useEffect } from 'react';
import { Send, Mail, Phone, MapPin, MessageCircle, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

const CustomerSupportPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [expandedFAQ, setExpandedFAQ] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    // Mock submission
    console.log('Form submitted:', formData);
    setTimeout(() => {
      setSubmitting(false);
      setSuccess(true);
      setFormData({ name: '', email: '', message: '' });
    }, 1500);
  };

  const faqs = [
    {
      question: "How do I track my order?",
      answer: "You can track your order by logging into your account and navigating to 'My Orders'. Click on the specific order to view tracking information. You'll also receive email updates with tracking details."
    },
    {
      question: "What is your return policy?",
      answer: "We offer a 30-day return window for most items. Items must be unworn with original tags attached. Return shipping is free with our prepaid labels."
    },
    {
      question: "How long does shipping take?",
      answer: "Standard shipping takes 5-7 business days within India. Express shipping is available for 2-3 business days. International shipping varies by location."
    },
    {
      question: "Can I change my order after placing it?",
      answer: "Orders can be modified within 1 hour of placement. Please contact our support team immediately at support@fanseerebel.com with your order number."
    },
    {
      question: "Do you offer international shipping?",
      answer: "Yes, we ship to over 25 countries worldwide. Shipping costs and delivery times vary by location. You can view specific rates during checkout."
    },
    {
      question: "How do I reset my password?",
      answer: "Click 'Forgot Password' on the login page and enter your email address. You'll receive a reset link within a few minutes. Check your spam folder if you don't see it."
    }
  ];

  const toggleFAQ = (index) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0015] via-[#1a0a2e] to-[#0a0015] py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">Customer Support</h1>
          <p className="text-gray-400 text-lg">We're here to help you 24/7</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Contact Form */}
          <div className="lg:col-span-2 bg-gradient-to-br from-[#1a0a2e] to-[#0a0015] border border-[#571089]/30 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Contact Us</h2>
            {success ? (
              <div className="text-center p-8 bg-green-500/10 border border-green-500/30 rounded-lg">
                <h3 className="text-xl font-semibold text-green-400">Message Sent!</h3>
                <p className="text-gray-300 mt-2">Thank you for contacting us. We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="text-gray-300 block mb-2">Your Name</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-3 bg-[#2a1a3e] border border-[#571089]/50 rounded-lg text-white" required />
                </div>
                <div>
                  <label className="text-gray-300 block mb-2">Your Email</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-3 bg-[#2a1a3e] border border-[#571089]/50 rounded-lg text-white" required />
                </div>
                <div>
                  <label className="text-gray-300 block mb-2">Message</label>
                  <textarea name="message" value={formData.message} onChange={handleChange} rows="5" className="w-full px-4 py-3 bg-[#2a1a3e] border border-[#571089]/50 rounded-lg text-white" required></textarea>
                </div>
                <button type="submit" disabled={submitting} className="w-full flex justify-center py-3 px-4 rounded-lg font-semibold text-white bg-gradient-to-r from-[#ea698b] to-[#d55d92] disabled:opacity-50">
                  {submitting ? 'Sending...' : <><Send className="w-5 h-5 mr-2" /> Send Message</>}
                </button>
              </form>
            )}
          </div>

          {/* Contact Info & Live Chat */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-[#1a0a2e] to-[#0a0015] border border-[#571089]/30 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Live Chat</h3>
              <p className="text-gray-300 mb-4">Get instant help from our support team</p>
              <button className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-semibold text-white bg-gradient-to-r from-[#ea698b] to-[#d55d92]">
                <MessageCircle className="w-5 h-5" />
                Start Live Chat
              </button>
              <p className="text-gray-400 text-sm mt-2">Available 24/7</p>
            </div>

            <div className="bg-gradient-to-br from-[#1a0a2e] to-[#0a0015] border border-[#571089]/30 rounded-2xl p-6 flex items-center gap-4">
              <Mail className="w-6 h-6 text-[#ea698b]" />
              <div>
                <h3 className="text-white font-semibold">Email Support</h3>
                <a href="mailto:support@fanseerebel.com" className="text-gray-300 hover:text-[#ea698b]">support@fanseerebel.com</a>
              </div>
            </div>
            <div className="bg-gradient-to-br from-[#1a0a2e] to-[#0a0015] border border-[#571089]/30 rounded-2xl p-6 flex items-center gap-4">
              <Phone className="w-6 h-6 text-[#ea698b]" />
              <div>
                <h3 className="text-white font-semibold">Phone Support</h3>
                <p className="text-gray-300">+91 123 456 7890</p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-[#1a0a2e] to-[#0a0015] border border-[#571089]/30 rounded-2xl p-6 flex items-center gap-4">
              <MapPin className="w-6 h-6 text-[#ea698b]" />
              <div>
                <h3 className="text-white font-semibold">Our Office</h3>
                <p className="text-gray-300">123 Fashion Ave, Mumbai, India</p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-gradient-to-br from-[#1a0a2e] to-[#0a0015] border border-[#571089]/30 rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-white mb-6 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-[#571089]/30 rounded-lg">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-[#571089]/10 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-[#ea698b]" />
                    <span className="text-white font-medium">{faq.question}</span>
                  </div>
                  {expandedFAQ === index ? (
                    <ChevronUp className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </button>
                {expandedFAQ === index && (
                  <div className="px-4 pb-4">
                    <p className="text-gray-300">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerSupportPage;
