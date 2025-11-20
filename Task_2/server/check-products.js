const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

async function checkProducts() {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/shophub';
    await mongoose.connect(mongoURI);
    const count = await Product.countDocuments();
    console.log('Total products in database:', count);

    const products = await Product.find().limit(10);
    console.log('First 10 products:');
    products.forEach((p, i) => console.log(`${i+1}: ${p.name} - ${p.category}`));

    await mongoose.disconnect();
  } catch (error) {
    console.error('Error:', error);
  }
}

checkProducts();
