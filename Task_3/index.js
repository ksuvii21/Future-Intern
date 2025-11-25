const express = require('express');
const cors = require('cors');
const path = require('path');

// Import mock data
const models = require('./data/models.json');
const news = require('./data/news.json');

const app = express();
const PORT = process.env.PORT || 5000;

// --- Middleware ---
app.use(cors({ origin: 'http://localhost:3000' })); // Allow requests from your React app
app.use(express.json()); // To parse JSON bodies

// --- API Routes ---

// Get all car models
app.get('/api/models', (req, res) => {
  res.json(models);
});

// Get all news articles
app.get('/api/news', (req, res) => {
  res.json(news);
});

// Handle contact form submission
app.post('/api/contact', (req, res) => {
  console.log('Contact form data received:', req.body);
  // In a real app, you would process this data (e.g., send an email, save to DB)
  res.status(200).json({ success: true, message: 'Your message has been received!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});