import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaCheck } from 'react-icons/fa';
import axios from 'axios';

const ContactContainer = styled.div`
  background: linear-gradient(to bottom, #000000, #0a0a0a);
  color: white;
  min-height: 100vh;
  padding-top: 100px;
`;

const HeroSection = styled.div`
  position: relative;
  height: 60vh;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)),
              url('/images/heritage-bg.jpg') center/cover;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at 50% 50%, rgba(190, 15, 52, 0.1) 0%, transparent 100%);
    pointer-events: none;
  }
`;

const HeroContent = styled(motion.div)`
  position: relative;
  z-index: 2;

  h1 {
    font-size: 4rem;
    margin-bottom: 15px;
    letter-spacing: 2px;
    font-weight: 900;
    background: linear-gradient(135deg, #ffffff, #BE0F34);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;

    @media (max-width: 768px) {
      font-size: 2rem;
    }
  }

  p {
    font-size: 1.2rem;
    color: #d1d5db;
  }
`;

const ContentSection = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: 80px 20px;
`;

const SectionTitle = styled.h2`
  font-size: 3rem;
  margin-bottom: 60px;
  color: white;
  font-weight: 900;
  letter-spacing: 2px;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 50px;
  margin-bottom: 60px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 40px;
  }
`;

const FormSection = styled(motion.div)`
  background: linear-gradient(135deg, #1f2937, #111827);
  border: 1px solid #374151;
  border-radius: 15px;
  padding: 50px;

  @media (max-width: 768px) {
    padding: 30px;
  }
`;

const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const FormGroup = styled.div`
  margin-bottom: 25px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 10px;
  font-weight: 700;
  color: #BE0F34;
  font-size: 0.95rem;
  letter-spacing: 1px;
`;

const Input = styled.input`
  width: 100%;
  padding: 14px 16px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid #374151;
  border-radius: 8px;
  color: white;
  font-size: 1rem;
  transition: all 0.3s ease;

  &::placeholder {
    color: #9ca3af;
  }

  &:focus {
    outline: none;
    border-color: #BE0F34;
    background: rgba(190, 15, 52, 0.1);
    box-shadow: 0 0 20px rgba(190, 15, 52, 0.2);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 14px 16px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid #374151;
  border-radius: 8px;
  color: white;
  font-size: 1rem;
  height: 150px;
  resize: vertical;
  font-family: inherit;
  transition: all 0.3s ease;

  &::placeholder {
    color: #9ca3af;
  }

  &:focus {
    outline: none;
    border-color: #BE0F34;
    background: rgba(190, 15, 52, 0.1);
    box-shadow: 0 0 20px rgba(190, 15, 52, 0.2);
  }
`;

const SubmitButton = styled(motion.button)`
  width: 100%;
  background: linear-gradient(135deg, #BE0F34, #A00020);
  color: white;
  border: none;
  padding: 16px;
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: 1px;
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.3s ease;
  text-transform: uppercase;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(190, 15, 52, 0.4);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const SuccessMessage = styled(motion.div)`
  background: linear-gradient(135deg, rgba(34, 197, 94, 0.1), rgba(34, 197, 94, 0.05));
  border: 1px solid #22c55e;
  color: #86efac;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 12px;

  svg {
    font-size: 1.5rem;
  }
`;

const InfoCard = styled(motion.div)`
  background: linear-gradient(135deg, #1f2937, #111827);
  border: 1px solid #374151;
  border-radius: 15px;
  padding: 30px;
  transition: all 0.3s ease;

  &:hover {
    border-color: rgba(190, 15, 52, 0.5);
    box-shadow: 0 0 30px rgba(190, 15, 52, 0.2);
    transform: translateY(-5px);
  }
`;

const IconWrapper = styled.div`
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, rgba(190, 15, 52, 0.2), rgba(160, 0, 32, 0.2));
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px
  font-size: 1.8rem;
  color: #BE0F34;
`;

const InfoTitle = styled.h3`
  font-size: 1.3rem;
  color: white;
  margin-bottom: 12px;
  font-weight: 700;
`;

const InfoText = styled.p`
  color: #d1d5db;
  line-height: 1.8;
  font-size: 0.95rem;

  a {
    color: #BE0F34;
    text-decoration: none;
    transition: color 0.3s ease;

    &:hover {
      color: #ffffff;
    }
  }
`;

const LocationsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  margin-top: 60px;
`;

const LocationCard = styled(motion.div)`
  background: linear-gradient(135deg, #1f2937, #111827);
  border: 1px solid #374151;
  border-radius: 15px;
  padding: 40px;
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    border-color: rgba(190, 15, 52, 0.5);
    box-shadow: 0 0 30px rgba(190, 15, 52, 0.2);
    transform: translateY(-10px);
  }

  .icon {
    font-size: 2.5rem;
    color: #BE0F34;
    margin-bottom: 20px;
  }

  h3 {
    font-size: 1.3rem;
    color: white;
    margin-bottom: 15px;
    font-weight: 700;
  }

  p {
    color: #d1d5db;
    line-height: 1.8;
    margin-bottom: 15px;
  }

  .hours {
    font-size: 0.9rem;
    color: #9ca3af;
    padding-top: 15px;
    border-top: 1px solid #374151;
  }
`;

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await axios.post('http://localhost:5000/api/contact', formData);
      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      setError('Error sending message. Please try again.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: FaPhone,
      title: 'PHONE',
      details: ['+33 (0)3 88 10 61 00'],
      description: 'Contact our sales team'
    },
    {
      icon: FaEnvelope,
      title: 'EMAIL',
      details: ['contact@bugatti.com'],
      description: 'Send us your inquiries'
    },
    {
      icon: FaMapMarkerAlt,
      title: 'HEADQUARTERS',
      details: ['Molsheim, Alsace', 'France'],
      description: 'Our main office'
    },
    {
      icon: FaClock,
      title: 'BUSINESS HOURS',
      details: ['Mon - Fri: 9:00 AM - 6:00 PM', 'Sat - Sun: Closed'],
      description: 'Europe Time (CET)'
    }
  ];

  const locations = [
    {
      title: 'MOLSHEIM - HEADQUARTERS',
      address: 'Molsheim, Alsace, France',
      phone: '+33 (0)3 88 10 61 00',
      hours: 'Mon - Fri: 9:00 AM - 6:00 PM'
    },
    {
      title: 'SALES & EXPERIENCE',
      address: 'Global Showrooms',
      phone: 'Regional offices available',
      hours: 'By appointment'
    },
    {
      title: 'SERVICE CENTER',
      address: 'Worldwide authorized service',
      phone: 'Regional contacts',
      hours: 'Dedicated service hours'
    }
  ];

  return (
    <ContactContainer>
      {/* Hero Section */}
      <HeroSection>
        <HeroContent
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1>CONTACT US</h1>
          <p>Connect with the world of Bugatti excellence</p>
        </HeroContent>
      </HeroSection>

      {/* Main Contact Section */}
      <ContentSection>
        <ContactGrid>
          {/* Form */}
          <FormSection
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 style={{ fontSize: '1.8rem', marginBottom: '30px', color: 'white' }}>
              SEND US A MESSAGE
            </h2>

            {submitted && (
              <SuccessMessage
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <FaCheck /> Your message has been sent successfully!
              </SuccessMessage>
            )}

            {error && (
              <SuccessMessage style={{ background: 'rgba(239, 68, 68, 0.1)', borderColor: '#ef4444', color: '#fca5a5' }}>
                {error}
              </SuccessMessage>
            )}

            <form onSubmit={handleSubmit}>
              <FormGroup>
                <Label>Full Name</Label>
                <Input
                  type="text"
                  name="name"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label>Email Address</Label>
                <Input
                  type="email"
                  name="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label>Phone Number</Label>
                <Input
                  type="tel"
                  name="phone"
                  placeholder="+1 (555) 000-0000"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </FormGroup>

              <FormGroup>
                <Label>Subject</Label>
                <Input
                  type="text"
                  name="subject"
                  placeholder="How can we help?"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label>Message</Label>
                <TextArea
                  name="message"
                  placeholder="Tell us more about your inquiry..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </FormGroup>

              <SubmitButton
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {loading ? 'SENDING...' : 'SEND MESSAGE'}
              </SubmitButton>
            </form>
          </FormSection>

          {/* Contact Info */}
          <InfoSection>
            {contactInfo.map((info, idx) => (
              <InfoCard
                key={idx}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
              >
                <IconWrapper>
                  <info.icon />
                </IconWrapper>
                <InfoTitle>{info.title}</InfoTitle>
                <InfoText>
                  {info.details.map((detail, i) => (
                    <div key={i}>
                      {detail.includes('@') ? (
                        <a href={`mailto:${detail}`}>{detail}</a>
                      ) : detail.includes('+') ? (
                        <a href={`tel:${detail}`}>{detail}</a>
                      ) : (
                        detail
                      )}
                    </div>
                  ))}
                </InfoText>
                <InfoText style={{ marginTop: '12px', fontSize: '0.85rem', color: '#9ca3af' }}>
                  {info.description}
                </InfoText>
              </InfoCard>
            ))}
          </InfoSection>
        </ContactGrid>
      </ContentSection>

      {/* Locations Section */}
      <ContentSection style={{ backgroundColor: 'rgba(190, 15, 52, 0.05)', padding: '80px 20px', margin: '-40px -20px 0 -20px' }}>
        <SectionTitle>OUR LOCATIONS</SectionTitle>
        <LocationsGrid>
          {locations.map((location, idx) => (
            <LocationCard
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
            >
              <div className="icon">
                <FaMapMarkerAlt />
              </div>
              <h3>{location.title}</h3>
              <p>{location.address}</p>
              <p>
                <strong style={{ color: '#BE0F34' }}>Phone:</strong> {location.phone}
              </p>
              <div className="hours">
                <FaClock style={{ marginRight: '8px' }} />
                {location.hours}
              </div>
            </LocationCard>
          ))}
        </LocationsGrid>
      </ContentSection>
    </ContactContainer>
  );
};

export default Contact;
