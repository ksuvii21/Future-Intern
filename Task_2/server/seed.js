const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

/* List of dresses, jewelry, and accessories by me-
A) Dresses-
  1. Elegant Evening Gown- Red, Blue-Black, Red-Black. 
  2. Velvet Maxi Dress- Red, Green, Black, Purple, Navy Blue.
  3. Silk Cocktail Dress- Red, Black, Navy Blue.
  4. Satin Wrap Dress- Red, Light Green, Dark Green, Blue.
  5. Chiffon Blouse- Black, Blue, Burgundy, White, Green
  6. Cashmere Sweater- white, Blue, Black, Green, Red.
  7.Tulle Shirt- White, Cream, Light brown, Blue, Red. 
  8.Tulle Skirt- Red, Pink, Black, White.
B) Jewelry-
  1. Diamond Stud Earrings- White Gold, Yellow Gold, White.
  2. Emerald Drop Earrings- Emerald, gold-emerald, butterfly. 
  3. Pearl Necklace Set- Emerald, White, Gold.
  4. Gold Bangle Bracelet- Gold, Silver, Flower.
  5. Silver Hoop Earrings- White, Silver, Flower.
  6. Diamond Tennis Bracelet- Silver, White.
C) Accessories-
  1. Designer Handbag- Brown, Burgundy, Blue, White.
  2. Crystal Hair Accessories- Purple, Silver, Black, White, Butterfly.
  3. Embroidered Clutch- Black, Blue, White.
  4. Designer Sunglasses- Pink, Black, Brown.
  5. Rose Gold Watch-
  6. Leather Ankle Boots- 
  7. Silk Scarf */

const sampleProducts = [
  {
    name: 'Elegant Evening Gown',
    description: 'Stunning floor-length evening gown with intricate lace detailing and flowing silhouette. Perfect for special occasions.',
    price: 2549.15,
    category: 'Dresses',
    stock: 15,
    imageUrl: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500',
    variants: [
      { color: 'Black', imageUrl: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500', stock: 5 },
      { color: 'Red', imageUrl: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500', stock: 5 },
      { color: 'Navy Blue', imageUrl: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=500', stock: 5 }
    ],
    isNewArrival: false,
    rating: 4.8,
    numReviews: 24
  },
  {
    name: 'Diamond Stud Earrings',
    description: 'Classic 1-carat diamond stud earrings in 18k white gold setting. Timeless elegance for any occasion.',
    price: 7649.15,
    category: 'Jewelry',
    stock: 8,
    imageUrl: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500',
    variants: [
      { color: 'White Gold', imageUrl: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500', stock: 4 },
      { color: 'Yellow Gold', imageUrl: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500', stock: 4 }
    ],
    isNewArrival: false,
    rating: 4.9,
    numReviews: 18
  },
  {
    name: 'Designer Handbag',
    description: 'Luxury leather handbag with gold hardware and structured silhouette. Spacious interior with multiple compartments.',
    price: 5099.15,
    category: 'Accessories',
    stock: 12,
    imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500',
    variants: [
      { color: 'Black', imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500', stock: 6 },
      { color: 'Brown', imageUrl: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500', stock: 6 }
    ],
    isNewArrival: false,
    rating: 4.7,
    numReviews: 31
  },
  {
    name: 'Pearl Necklace Set',
    description: 'Exquisite freshwater pearl necklace with matching earrings. Classic and sophisticated design.',
    price: 2974.15,
    category: 'Jewelry',
    stock: 20,
    imageUrl: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=500',
    variants: [
      { color: 'White', imageUrl: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=500', stock: 10 },
      { color: 'Cream', imageUrl: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500', stock: 10 }
    ],
    isNewArrival: false,
    rating: 4.6,
    numReviews: 27
  },
  {
    name: 'Silk Cocktail Dress',
    description: 'Luxurious silk cocktail dress with asymmetric hem and delicate beading. Perfect for evening events.',
    price: 2124.15,
    category: 'Dresses',
    stock: 18,
    imageUrl: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500',
    variants: [
      { color: 'Black', imageUrl: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500', stock: 6 },
      { color: 'Emerald Green', imageUrl: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500', stock: 6 },
      { color: 'Burgundy', imageUrl: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=500', stock: 6 }
    ],
    isNewArrival: true,
    rating: 4.8,
    numReviews: 15
  },
  {
    name: 'Gold Bangle Bracelet',
    description: '18k yellow gold bangle bracelet with intricate engraving. Stackable design for versatile styling.',
    price: 1699.15,
    category: 'Jewelry',
    stock: 25,
    imageUrl: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500',
    variants: [
      { color: 'Yellow Gold', imageUrl: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500', stock: 13 },
      { color: 'Rose Gold', imageUrl: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500', stock: 12 }
    ],
    isNewArrival: false,
    rating: 4.5,
    numReviews: 22
  },
  {
    name: 'Satin Wrap Dress',
    description: 'Elegant satin wrap dress with tie waist and flowing skirt. Versatile piece for both casual and formal wear.',
    price: 1529.15,
    category: 'Dresses',
    stock: 22,
    imageUrl: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500',
    variants: [
      { color: 'Black', imageUrl: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500', stock: 8 },
      { color: 'Navy Blue', imageUrl: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500', stock: 7 },
      { color: 'Burgundy', imageUrl: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=500', stock: 7 }
    ],
    isNewArrival: true,
    rating: 4.7,
    numReviews: 19
  },
  {
    name: 'Crystal Hair Accessories',
    description: 'Delicate crystal-encrusted hair clips and combs. Add sparkle to your updo or everyday hairstyle.',
    price: 764.15,
    category: 'Accessories',
    stock: 30,
    imageUrl: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500',
    variants: [
      { color: 'Clear Crystal', imageUrl: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500', stock: 15 },
      { color: 'Rose Gold', imageUrl: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500', stock: 15 }
    ],
    isNewArrival: true,
    rating: 4.4,
    numReviews: 33
  },
  {
    name: 'Velvet Maxi Dress',
    description: 'Sumptuous velvet maxi dress with deep V-neck and long sleeves. Luxurious fabric for winter elegance.',
    price: 2804.15,
    category: 'Dresses',
    stock: 10,
    imageUrl: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500',
    variants: [
      { color: 'Black', imageUrl: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500', stock: 4 },
      { color: 'Emerald Green', imageUrl: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500', stock: 3 },
      { color: 'Burgundy', imageUrl: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=500', stock: 3 }
    ],
    isNewArrival: false,
    rating: 4.9,
    numReviews: 12
  },
  {
    name: 'Silver Hoop Earrings',
    description: 'Large silver hoop earrings with intricate filigree design. Bold statement piece for modern women.',
    price: 1104.15,
    category: 'Jewelry',
    stock: 35,
    imageUrl: 'https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?w=500',
    variants: [
      { color: 'Silver', imageUrl: 'https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?w=500', stock: 18 },
      { color: 'Gold', imageUrl: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500', stock: 17 }
    ],
    isNewArrival: true,
    rating: 4.6,
    numReviews: 28
  },
  {
    name: 'Embroidered Clutch',
    description: 'Hand-embroidered silk clutch with beaded detailing. Perfect complement to evening wear.',
    price: 1359.15,
    category: 'Accessories',
    stock: 16,
    imageUrl: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500',
    variants: [
      { color: 'Black', imageUrl: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500', stock: 8 },
      { color: 'Gold', imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500', stock: 8 }
    ],
    isNewArrival: false,
    rating: 4.8,
    numReviews: 16
  },
  {
    name: 'Chiffon Blouse',
    description: 'Light and airy chiffon blouse with delicate ruffles and pearl buttons. Elegant layering piece.',
    price: 1019.15,
    category: 'Dresses',
    stock: 28,
    imageUrl: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=500',
    variants: [
      { color: 'White', imageUrl: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=500', stock: 10 },
      { color: 'Pastel Pink', imageUrl: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500', stock: 9 },
      { color: 'Light Blue', imageUrl: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500', stock: 9 }
    ],
    isNewArrival: true,
    rating: 4.5,
    numReviews: 21
  },
  {
    name: 'Designer Sunglasses',
    description: 'Luxury oversized sunglasses with gold accents and UV protection. Timeless style meets modern comfort.',
    price: 2379.15,
    category: 'Accessories',
    stock: 14,
    imageUrl: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500',
    variants: [
      { color: 'Black', imageUrl: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500', stock: 7 },
      { color: 'Tortoise', imageUrl: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500', stock: 7 }
    ],
    isNewArrival: true,
    rating: 4.7,
    numReviews: 25
  },
  {
    name: 'Rose Gold Watch',
    description: 'Elegant rose gold watch with diamond bezel and leather strap. Sophisticated timepiece for the modern woman.',
    price: 3824.15,
    category: 'Accessories',
    stock: 9,
    imageUrl: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=500',
    variants: [
      { color: 'Rose Gold', imageUrl: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=500', stock: 5 },
      { color: 'Silver', imageUrl: 'https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?w=500', stock: 4 }
    ],
    isNewArrival: false,
    rating: 4.9,
    numReviews: 14
  },
  {
    name: 'Cashmere Sweater',
    description: 'Ultra-soft cashmere sweater with crew neck and ribbed cuffs. Luxurious comfort for cooler days.',
    price: 1614.15,
    category: 'Dresses',
    stock: 20,
    imageUrl: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500',
    variants: [
      { color: 'Cream', imageUrl: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500', stock: 7 },
      { color: 'Gray', imageUrl: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500', stock: 7 },
      { color: 'Navy Blue', imageUrl: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=500', stock: 6 }
    ],
    isNewArrival: true,
    rating: 4.8,
    numReviews: 17
  },
  {
    name: 'Diamond Tennis Bracelet',
    description: 'Sparkling diamond tennis bracelet in platinum setting. Dazzling elegance for special occasions.',
    price: 11049.15,
    category: 'Jewelry',
    stock: 5,
    imageUrl: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500',
    variants: [
      { color: 'Platinum', imageUrl: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500', stock: 3 },
      { color: 'White Gold', imageUrl: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500', stock: 2 }
    ],
    isNewArrival: false,
    rating: 5.0,
    numReviews: 8
  },
  {
    name: 'Leather Ankle Boots',
    description: 'Premium leather ankle boots with block heel and side zipper. Versatile style for any season.',
    price: 2974.15,
    category: 'Accessories',
    stock: 18,
    imageUrl: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500',
    variants: [
      { color: 'Black', imageUrl: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500', stock: 9 },
      { color: 'Brown', imageUrl: 'https://images.unsplash.com/photo-1601762603339-fd61e28b698a?w=500', stock: 9 }
    ],
    isNewArrival: true,
    rating: 4.6,
    numReviews: 23
  },
  {
    name: 'Silk Scarf',
    description: 'Luxurious silk scarf with artistic print and fringed edges. Elevate any outfit with this versatile accessory.',
    price: 764.15,
    category: 'Accessories',
    stock: 32,
    imageUrl: 'https://images.unsplash.com/photo-1601762603339-fd61e28b698a?w=500',
    variants: [
      { color: 'Multi-Color', imageUrl: 'https://images.unsplash.com/photo-1601762603339-fd61e28b698a?w=500', stock: 16 },
      { color: 'Black & White', imageUrl: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500', stock: 16 }
    ],
    isNewArrival: true,
    rating: 4.4,
    numReviews: 29
  },
  {
    name: 'Emerald Drop Earrings',
    description: 'Stunning emerald drop earrings with diamond accents. Nature\'s beauty captured in exquisite jewelry.',
    price: 5949.15,
    category: 'Jewelry',
    stock: 7,
    imageUrl: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500',
    variants: [
      { color: 'Emerald', imageUrl: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500', stock: 4 },
      { color: 'Ruby', imageUrl: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500', stock: 3 }
    ],
    isNewArrival: false,
    rating: 4.9,
    numReviews: 11
  },
  {
    name: 'Tulle Shirt',
    description: 'Romantic tulle shirt with layered design and delicate detailing. Perfect for special occasions or everyday elegance.',
    price: 1359.15,
    category: 'Dresses',
    stock: 24,
    imageUrl: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500',
    variants: [
      { color: 'White', imageUrl: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500', stock: 8 },
      { color: 'Black', imageUrl: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500', stock: 8 },
      { color: 'Champagne', imageUrl: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=500', stock: 8 }
    ],
    isNewArrival: true,
    rating: 4.7,
    numReviews: 20
  }
];
/* const sampleProducts = [
  {
    name: 'Elegant Evening Gown',
    description: 'Stunning floor-length evening gown with intricate lace detailing and flowing silhouette. Perfect for special occasions.',
    price: 2549.15,
    category: 'Dresses',
    stock: 15,    
    imageUrls: [
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500',
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500',
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=500'
    ],
    isNewArrival: false,
    rating: 4.8,
    numReviews: 24
  },
  {
    name: 'Diamond Stud Earrings',
    description: 'Classic 1-carat diamond stud earrings in 18k white gold setting. Timeless elegance for any occasion.',
    price: 7649.15,
    category: 'Jewelry',
    stock: 8,    
    imageUrls: [
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500',
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500'
    ],
    isNewArrival: false,
    rating: 4.9,
    numReviews: 18
  },
  {
    name: 'Designer Handbag',
    description: 'Luxury leather handbag with gold hardware and structured silhouette. Spacious interior with multiple compartments.',
    price: 5099.15,
    category: 'Accessories',
    stock: 12,    
    imageUrls: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500'
    ],
    isNewArrival: false,
    rating: 4.7,
    numReviews: 31
  },
  {
    name: 'Pearl Necklace Set',
    description: 'Exquisite freshwater pearl necklace with matching earrings. Classic and sophisticated design.',
    price: 2974.15,
    category: 'Jewelry',
    stock: 20,    
    imageUrls: [
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=500'
    ],
    isNewArrival: false,
    rating: 4.6,
    numReviews: 27
  },
  {
    name: 'Silk Cocktail Dress',
    description: 'Luxurious silk cocktail dress with asymmetric hem and delicate beading. Perfect for evening events.',
    price: 2124.15,
    category: 'Dresses',
    stock: 18,    
    imageUrls: [
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500'
    ],
    isNewArrival: true,
    rating: 4.8,
    numReviews: 15
  },
  {
    name: 'Gold Bangle Bracelet',
    description: '18k yellow gold bangle bracelet with intricate engraving. Stackable design for versatile styling.',
    price: 1699.15,
    category: 'Jewelry',
    stock: 25,    
    imageUrls: [
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500'
    ],
    isNewArrival: false,
    rating: 4.5,
    numReviews: 22
  },
  {
    name: 'Satin Wrap Dress',
    description: 'Elegant satin wrap dress with tie waist and flowing skirt. Versatile piece for both casual and formal wear.',
    price: 1529.15,
    category: 'Dresses',
    stock: 22,    
    imageUrls: [
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500'
    ],
    isNewArrival: true,
    rating: 4.7,
    numReviews: 19
  },
  {
    name: 'Crystal Hair Accessories',
    description: 'Delicate crystal-encrusted hair clips and combs. Add sparkle to your updo or everyday hairstyle.',
    price: 764.15,
    category: 'Accessories',
    stock: 30,    
    imageUrls: [
      'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500'
    ],
    isNewArrival: true,
    rating: 4.4,
    numReviews: 33
  },
  {
    name: 'Velvet Maxi Dress',
    description: 'Sumptuous velvet maxi dress with deep V-neck and long sleeves. Luxurious fabric for winter elegance.',
    price: 2804.15,
    category: 'Dresses',
    stock: 10,    
    imageUrls: [
      'https://drive.google.com/file/d/13MOz-x3T9KXR4yrXzuNF9kyDOLJz28Co'
    ],
    isNewArrival: false,
    rating: 4.9,
    numReviews: 12
  },
  {
    name: 'Silver Hoop Earrings',
    description: 'Large silver hoop earrings with intricate filigree design. Bold statement piece for modern women.',
    price: 1104.15,
    category: 'Jewelry',
    stock: 35,    
    imageUrls: [
      'https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?w=500'
    ],
    isNewArrival: true,
    rating: 4.6,
    numReviews: 28
  },
  {
    name: 'Embroidered Clutch',
    description: 'Hand-embroidered silk clutch with beaded detailing. Perfect complement to evening wear.',
    price: 1359.15,
    category: 'Accessories',
    stock: 16,    
    imageUrls: [
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500'
    ],
    isNewArrival: false,
    rating: 4.8,
    numReviews: 16
  },
  {
    name: 'Chiffon Blouse',
    description: 'Light and airy chiffon blouse with delicate ruffles and pearl buttons. Elegant layering piece.',
    price: 1019.15,
    category: 'Dresses',
    stock: 28,    
    imageUrls: [
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=500'
    ],
    isNewArrival: true,
    rating: 4.5,
    numReviews: 21
  },
  {
    name: 'Designer Sunglasses',
    description: 'Luxury oversized sunglasses with gold accents and UV protection. Timeless style meets modern comfort.',
    price: 2379.15,
    category: 'Accessories',
    stock: 14,    
    imageUrls: [
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500'
    ],
    isNewArrival: true,
    rating: 4.7,
    numReviews: 25
  },
  {
    name: 'Rose Gold Watch',
    description: 'Elegant rose gold watch with diamond bezel and leather strap. Sophisticated timepiece for the modern woman.',
    price: 3824.15,
    category: 'Accessories',
    stock: 9,    
    imageUrls: [
      'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=500'
    ],
    isNewArrival: false,
    rating: 4.9,
    numReviews: 14
  },
  {
    name: 'Cashmere Sweater',
    description: 'Ultra-soft cashmere sweater with crew neck and ribbed cuffs. Luxurious comfort for cooler days.',
    price: 1614.15,
    category: 'Dresses',
    stock: 20,    
    imageUrls: [
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500'
    ],
    isNewArrival: true,
    rating: 4.8,
    numReviews: 17
  },
  {
    name: 'Diamond Tennis Bracelet',
    description: 'Sparkling diamond tennis bracelet in platinum setting. Dazzling elegance for special occasions.',
    price: 11049.15,
    category: 'Jewelry',
    stock: 5,    
    imageUrls: [
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500'
    ],
    isNewArrival: false,
    rating: 5.0,
    numReviews: 8
  },
  {
    name: 'Leather Ankle Boots',
    description: 'Premium leather ankle boots with block heel and side zipper. Versatile style for any season.',
    price: 2974.15,
    category: 'Accessories',
    stock: 18,    
    imageUrls: [
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500'
    ],
    isNewArrival: true,
    rating: 4.6,
    numReviews: 23
  },
  {
    name: 'Silk Scarf',
    description: 'Luxurious silk scarf with artistic print and fringed edges. Elevate any outfit with this versatile accessory.',
    price: 764.15,
    category: 'Accessories',
    stock: 32,    
    imageUrls: [
      'https://images.unsplash.com/photo-1601762603339-fd61e28b698a?w=500'
    ],
    isNewArrival: true,
    rating: 4.4,
    numReviews: 29
  },
  {
    name: 'Emerald Drop Earrings',
    description: 'Stunning emerald drop earrings with diamond accents. Nature\'s beauty captured in exquisite jewelry.',
    price: 5949.15,
    category: 'Jewelry',
    stock: 7,    
    imageUrls: [
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500'
    ],
    isNewArrival: false,
    rating: 4.9,
    numReviews: 11
  },
  {
    name: 'Tulle Shirt',
    description: 'Romantic tulle shirt with layered design and delicate detailing. Perfect for special occasions or everyday elegance.',
    price: 1359.15,
    category: 'Dresses',
    stock: 24,    
    imageUrls: [
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500'
    ],
    isNewArrival: true,
    rating: 4.7,
    numReviews: 20
  }
]; */

async function seedDatabase() {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/shophub';
    await mongoose.connect(mongoURI);
    console.log('Connected to MongoDB');

    await Product.deleteMany({});
    console.log('Cleared existing products');

    // Convert Google Drive URLs before inserting
    const processedProducts = sampleProducts.map(product => {
      if (product.imageUrls && product.imageUrls[0] && product.imageUrls[0].includes('drive.google.com')) {
        const fileIdMatch = product.imageUrls[0].match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
        if (fileIdMatch) {
          return {
            ...product,
            imageUrls: [`https://drive.google.com/uc?export=view&id=${fileIdMatch[1]}`]
          };
        }
      }
      return product;
    });

    await Product.insertMany(processedProducts);
    console.log('Sample products added successfully');

    mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
