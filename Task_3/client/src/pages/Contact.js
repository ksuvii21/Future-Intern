import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const ContactContainer = styled.div`
  padding-top: 100px;
  min-height: 100vh;
  background: #f5f5f5;
`;

const ContactForm = styled.form`
  max-width: 600px;
  margin: 0 auto;
  padding: 50px 20px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const FormTitle = styled.h1`
  text-align: center;
  margin-bottom: 30px;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
  height: 150px;
  resize: vertical;
`;

const SubmitButton = styled.button`
  background: ${props => props.theme.colors.secondary};
  color: white;
  border: none;
  padding: 15px 30px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
  width: 100%;
  transition: background 0.3s ease;

  &:hover {
    background: #a00d2a;
  }
`;

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/contact', formData);
      setSubmitted(true);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  if (submitted) {
    return (
      <ContactContainer>
        <ContactForm>
          <FormTitle>Thank You!</FormTitle>
          <p>Your message has been sent successfully. We will get back to you soon.</p>
        </ContactForm>
      </ContactContainer>
    );
  }

  return (
    <ContactContainer>
      <ContactForm onSubmit={handleSubmit}>
        <FormTitle>Contact Us</FormTitle>
        <FormGroup>
          <Label htmlFor="name">Name</Label>
          <Input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="phone">Phone</Label>
          <Input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="message">Message</Label>
          <TextArea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <SubmitButton type="submit">Send Message</SubmitButton>
      </ContactForm>
    </ContactContainer>
  );
};

export default Contact;