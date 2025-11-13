const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

const sampleProducts = [
  {
    name: 'Wireless Bluetooth Headphones',
    description: 'High-quality wireless headphones with noise cancellation and 30-hour battery life.',
    price: 199.99,
    category: 'Electronics',
    stock: 50,
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500'
  },
  {
    name: 'Smart Watch Series 5',
    description: 'Advanced smartwatch with health monitoring, GPS, and cellular connectivity.',
    price: 399.99,
    category: 'Electronics',
    stock: 30,
    imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500'
  },
  {
    name: 'Ergonomic Office Chair',
    description: 'Comfortable office chair with lumbar support and adjustable height.',
    price: 299.99,
    category: 'Furniture',
    stock: 20,
    imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500'
  },
  {
    name: 'Coffee Maker Deluxe',
    description: 'Programmable coffee maker with thermal carafe and grind-and-brew technology.',
    price: 149.99,
    category: 'Appliances',
    stock: 25,
    imageUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500'
  },
  {
    name: 'Yoga Mat Premium',
    description: 'Non-slip yoga mat made from eco-friendly materials, 6mm thick.',
    price: 49.99,
    category: 'Sports & Fitness',
    stock: 100,
    imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500'
  },
  {
    name: 'Leather Wallet',
    description: 'Genuine leather wallet with RFID blocking technology and multiple card slots.',
    price: 79.99,
    category: 'Accessories',
    stock: 60,
    imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500'
  }
];

async function seedDatabase() {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/shophub';
    await mongoose.connect(mongoURI);
    console.log('Connected to MongoDB');

    await Product.deleteMany({});
    console.log('Cleared existing products');

    await Product.insertMany(sampleProducts);
    console.log('Sample products added successfully');

    mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
