import React, { useState, useEffect } from 'react';
import { Send, Mail, Phone, MapPin } from 'lucide-react';

const ContactUsPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0015] via-[#1a0a2e] to-[#0a0015] py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">Contact Us</h1>
          <p className="text-gray-400 text-lg">We'd love to hear from you. Drop us a line below.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-[#1a0a2e] to-[#0a0015] border border-[#571089]/30 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Send a Message</h2>
            {success ? (
              <div className="text-center p-8 bg-green-500/10 border border-green-500/30 rounded-lg">
                <h3 className="text-xl font-semibold text-green-400">Message Sent!</h3>
                <p className="text-gray-300 mt-2">Thank you for contacting us. We'll get back to you shortly.</p>
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

          <div className="space-y-6 text-gray-300">
            <div className="bg-gradient-to-br from-[#1a0a2e] to-[#0a0015] border border-[#571089]/30 rounded-2xl p-6 flex items-center gap-4">
              <Mail className="w-6 h-6 text-[#ea698b]" />
              <div>
                <h3 className="text-white font-semibold">Email Us</h3>
                <a href="mailto:support@fanseerebel.com" className="hover:text-[#ea698b]">support@fanseerebel.com</a>
              </div>
            </div>
            <div className="bg-gradient-to-br from-[#1a0a2e] to-[#0a0015] border border-[#571089]/30 rounded-2xl p-6 flex items-center gap-4">
              <Phone className="w-6 h-6 text-[#ea698b]" />
              <div>
                <h3 className="text-white font-semibold">Call Us</h3>
                <p>+91 123 456 7890</p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-[#1a0a2e] to-[#0a0015] border border-[#571089]/30 rounded-2xl p-6 flex items-center gap-4">
              <MapPin className="w-6 h-6 text-[#ea698b]" />
              <div>
                <h3 className="text-white font-semibold">Our Office</h3>
                <p>123 Fashion Ave, Mumbai, India</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUsPage;