const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { notFound, errorHandler } = require('./controllers/errorHandler');
const passport = require('passport');
const session = require('express-session');
const cloudinary = require('cloudinary').v2;

const dotenv = require('dotenv');
dotenv.config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Passport config
require('./config/passport')(passport);

const app = express();

// Middleware
const allowedOrigins = [
  process.env.FRONTEND_URL, 
  `${process.env.FRONTEND_URL}/`, 
  'http://localhost:3000'
].filter(Boolean); // filter(Boolean) removes any undefined/null values

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Allow cookies to be sent back and forth
}));
app.use(express.json());

// Express session
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect to MongoDB
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/shophub';
mongoose.connect(mongoURI)
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('MongoDB connection error:', err));

// Routes

// Root route for health check
app.get('/', (req, res) => {
  res.send('Backend API is running!');
});

// API root route
app.get('/api', (req, res) => {
  res.json({
    message: 'Welcome to the E-commerce API. See documentation for available endpoints.'
  });
});

app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/seller', require('./routes/sellerRoutes'));
app.use('/api/users', require('./routes/userRoutes')); // Add this line
app.use('/api/cart', require('./routes/cartRoutes'));
app.use('/api/wishlist', require('./routes/wishlistRoutes'));
app.use('/api/notifications', require('./routes/notificationRoutes'));

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
