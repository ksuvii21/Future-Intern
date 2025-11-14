const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

async function checkNewArrivals() {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/shophub';
    await mongoose.connect(mongoURI);
    console.log('Connected to MongoDB');

    const count = await Product.countDocuments({isNewArrival: true});
    console.log('New arrivals count:', count);

    const products = await Product.find({isNewArrival: true}, 'name category isNewArrival');
    console.log('New arrivals:');
    products.forEach(p => console.log(`- ${p.name} (${p.category}) - isNewArrival: ${p.isNewArrival}`));

    mongoose.connection.close();
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

checkNewArrivals();
