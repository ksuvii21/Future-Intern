const mongoose = require('mongoose');

async function fixDriveUrls() {
  try {
    await mongoose.connect('mongodb://localhost:27017/shophub');
    console.log('Connected to MongoDB');

    const products = await mongoose.connection.db.collection('products').find({}).toArray();
    console.log(`Found ${products.length} products`);

    const driveProducts = products.filter(p => p.imageUrl && p.imageUrl.includes('drive.google'));
    console.log(`Found ${driveProducts.length} products with Google Drive URLs`);

    for (const product of driveProducts) {
      const fileIdMatch = product.imageUrl.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
      if (fileIdMatch) {
        const convertedUrl = `https://drive.google.com/uc?export=view&id=${fileIdMatch[1]}`;
        await mongoose.connection.db.collection('products').updateOne(
          { _id: product._id },
          { $set: { imageUrl: convertedUrl } }
        );
        console.log(`Updated ${product.name}: ${product.imageUrl} -> ${convertedUrl}`);
      }
    }

    console.log('All Google Drive URLs have been converted to direct links');
    mongoose.disconnect();
  } catch (error) {
    console.error('Error:', error.message);
    mongoose.disconnect();
  }
}

fixDriveUrls();
