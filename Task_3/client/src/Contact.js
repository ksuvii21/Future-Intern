import React, { useState } from 'react';
import { postContactForm } from '../services/api';

function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending...');
    try {
      const response = await postContactForm(formData);
      setStatus(response.message);
      setFormData({ name: '', email: '', message: '' }); // Clear form
    } catch (error) {
      setStatus('Failed to send message. Please try again.');
      console.error('Contact form error:', error);
    }
  };

  return (
    <div className="container">
      <h1>Contact Us</h1>
      <form onSubmit={handleSubmit} className="contact-form">
        <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} required />
        <textarea name="message" placeholder="Your Message" value={formData.message} onChange={handleChange} required></textarea>
        <button type="submit" className="btn">Submit</button>
      </form>
      {status && <p className="form-status">{status}</p>}
    </div>
  );
}

export default Contact;