const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

const sampleProducts = [
  {
    name: 'Elegant Evening Gown',
    description: 'Stunning floor-length evening gown with intricate lace detailing and flowing silhouette. Perfect for special occasions.',
    price: 299.99,
    category: 'Dresses',
    stock: 15,
    imageUrl: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500'
  },
  {
    name: 'Diamond Stud Earrings',
    description: 'Classic 1-carat diamond stud earrings in 18k white gold setting. Timeless elegance for any occasion.',
    price: 899.99,
    category: 'Jewelry',
    stock: 8,
    imageUrl: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500'
  },
  {
    name: 'Designer Handbag',
    description: 'Luxury leather handbag with gold hardware and structured silhouette. Spacious interior with multiple compartments.',
    price: 599.99,
    category: 'Accessories',
    stock: 12,
    imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500'
  },
  {
    name: 'Pearl Necklace Set',
    description: 'Exquisite freshwater pearl necklace with matching earrings. Classic and sophisticated design.',
    price: 349.99,
    category: 'Jewelry',
    stock: 20,
    imageUrl: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=500'
  },
  {
    name: 'Silk Cocktail Dress',
    description: 'Luxurious silk cocktail dress with asymmetric hem and delicate beading. Perfect for evening events.',
    price: 249.99,
    category: 'Dresses',
    stock: 18,
    imageUrl: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500'
  },
  {
    name: 'Gold Bangle Bracelet',
    description: '18k yellow gold bangle bracelet with intricate engraving. Stackable design for versatile styling.',
    price: 199.99,
    category: 'Jewelry',
    stock: 25,
    imageUrl: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500'
  },
  {
    name: 'Satin Wrap Dress',
    description: 'Elegant satin wrap dress with tie waist and flowing skirt. Versatile piece for both casual and formal wear.',
    price: 179.99,
    category: 'Dresses',
    stock: 22,
    imageUrl: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500'
  },
  {
    name: 'Crystal Hair Accessories',
    description: 'Delicate crystal-encrusted hair clips and combs. Add sparkle to your updo or everyday hairstyle.',
    price: 89.99,
    category: 'Accessories',
    stock: 30,
    imageUrl: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500'
  },
  {
    name: 'Velvet Maxi Dress',
    description: 'Sumptuous velvet maxi dress with deep V-neck and long sleeves. Luxurious fabric for winter elegance.',
    price: 329.99,
    category: 'Dresses',
    stock: 10,
    imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500'
  },
  {
    name: 'Silver Hoop Earrings',
    description: 'Large silver hoop earrings with intricate filigree design. Bold statement piece for modern women.',
    price: 129.99,
    category: 'Jewelry',
    stock: 35,
    imageUrl: 'https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?w=500'
  },
  {
    name: 'Embroidered Clutch',
    description: 'Hand-embroidered silk clutch with beaded detailing. Perfect complement to evening wear.',
    price: 159.99,
    category: 'Accessories',
    stock: 16,
    imageUrl: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500'
  },
  {
    name: 'Chiffon Blouse',
    description: 'Light and airy chiffon blouse with delicate ruffles and pearl buttons. Elegant layering piece.',
    price: 119.99,
    category: 'Dresses',
    stock: 28,
    imageUrl: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=500'
  }
];

async function seedDatabase() {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/Fansee Rebel';
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
