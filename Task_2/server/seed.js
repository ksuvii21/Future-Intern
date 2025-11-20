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
  6. Cashmere Sweater- White, Blue, Black, Green, Red.
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
  5. Rose Gold Watch- 3 variants with company.
  6. Leather Ankle Boots- Black, Brown, White, Cream.
  7. Silk Scarf- Pink, Blue, Green. 
*/

const sampleProducts = [
  {
    name: 'Elegant Evening Gown',
    description: 'Stunning floor-length evening gown with intricate lace detailing and flowing silhouette. Perfect for special occasions.',
    price: 4499.15,
    category: 'Dresses',
    stock: 15,
    imageUrl: 'https://i.pinimg.com/736x/17/7d/8e/177d8e9da528eca0433fdbd694d9cf65.jpg',
    variants: [
      { color: 'Red', imageUrl: 'https://i.pinimg.com/736x/17/7d/8e/177d8e9da528eca0433fdbd694d9cf65.jpg', stock: 5 },
      { color: 'Blue-Black', imageUrl: 'https://i.pinimg.com/1200x/84/33/84/8433843541b3bcfdc279a9430678e333.jpg', stock: 5 },
      { color: 'Red-Black', imageUrl: 'https://i.pinimg.com/1200x/be/37/68/be3768f7c25a393ffbc1cc1a74da7204.jpg', stock: 5 }
    ],
    isNewArrival: false,
    rating: 4.8,
    numReviews: 24
  },
  {
    name: 'Elegant Evening Gown - Blue-Black',
    description: 'Stunning floor-length evening gown with intricate lace detailing and flowing silhouette. Perfect for special occasions.',
    price: 4599.15,
    category: 'Dresses',
    stock: 15,
    imageUrl: 'https://i.pinimg.com/1200x/84/33/84/8433843541b3bcfdc279a9430678e333.jpg',
    variants: [
      { color: 'Blue-Black', imageUrl: 'https://i.pinimg.com/1200x/84/33/84/8433843541b3bcfdc279a9430678e333.jpg', stock: 5 },
      { color: 'Red', imageUrl: 'https://i.pinimg.com/736x/17/7d/8e/177d8e9da528eca0433fdbd694d9cf65.jpg', stock: 5 },
      { color: 'Red-Black', imageUrl: 'https://i.pinimg.com/1200x/be/37/68/be3768f7c25a393ffbc1cc1a74da7204.jpg', stock: 5 }
    ],
    isNewArrival: false,
    rating: 4.8,
    numReviews: 24
  },
  {
    name: 'Elegant Evening Gown - Red-Black',
    description: 'Stunning floor-length evening gown with intricate lace detailing and flowing silhouette. Perfect for special occasions.',
    price: 4699.15,
    category: 'Dresses',
    stock: 15,
    imageUrl: 'https://i.pinimg.com/1200x/be/37/68/be3768f7c25a393ffbc1cc1a74da7204.jpg',
    variants: [
      { color: 'Red-Black', imageUrl: 'https://i.pinimg.com/1200x/be/37/68/be3768f7c25a393ffbc1cc1a74da7204.jpg', stock: 5 },
      { color: 'Red', imageUrl: 'https://i.pinimg.com/736x/17/7d/8e/177d8e9da528eca0433fdbd694d9cf65.jpg', stock: 5 },
      { color: 'Blue-Black', imageUrl: 'https://i.pinimg.com/1200x/84/33/84/8433843541b3bcfdc279a9430678e333.jpg', stock: 5 }
    ],
    isNewArrival: false,
    rating: 4.8,
    numReviews: 24
  },
  {
    name: 'Velvet Maxi Dress',
    description: 'Sumptuous velvet maxi dress with deep V-neck and long sleeves. Luxurious fabric for winter elegance.',
    price: 4299.15,
    category: 'Dresses',
    stock: 10,
    imageUrl: 'https://i.pinimg.com/1200x/2f/3e/a7/2f3ea7bd7bdc9c7d655cef6d4d4c6ba0.jpg',
    variants: [
      { color: 'Red', imageUrl: 'https://i.pinimg.com/1200x/2f/3e/a7/2f3ea7bd7bdc9c7d655cef6d4d4c6ba0.jpg', stock: 4 },
      { color: 'Green', imageUrl: 'https://i.pinimg.com/1200x/02/c5/0e/02c50e8bc313d06a833f3ee672933260.jpg', stock: 3 },
      { color: 'Black', imageUrl: 'https://i.pinimg.com/1200x/ab/04/77/ab04778495e2a60595faef8874c0b9fd.jpg', stock: 3 },
      { color: 'Purple', imageUrl: 'https://i.pinimg.com/1200x/99/b2/a5/99b2a5a1c000e051d7c7c9aaceb34cdd.jpg', stock: 2 },
      { color: 'Navy Blue', imageUrl: 'https://i.pinimg.com/736x/3e/f8/61/3ef86150cff14188c3b5957393d7ad41.jpg', stock: 2 }
    ],
    isNewArrival: false,
    rating: 4.9,
    numReviews: 12
  },
  {
    name: 'Velvet Maxi Dress - Green',
    description: 'Sumptuous velvet maxi dress with deep V-neck and long sleeves. Luxurious fabric for winter elegance.',
    price: 4099.15,
    category: 'Dresses',
    stock: 10,
    imageUrl: 'https://i.pinimg.com/1200x/02/c5/0e/02c50e8bc313d06a833f3ee672933260.jpg',
    variants: [
      { color: 'Green', imageUrl: 'https://i.pinimg.com/1200x/02/c5/0e/02c50e8bc313d06a833f3ee672933260.jpg', stock: 3 },
      { color: 'Red', imageUrl: 'https://i.pinimg.com/1200x/2f/3e/a7/2f3ea7bd7bdc9c7d655cef6d4d4c6ba0.jpg', stock: 4 },
      { color: 'Black', imageUrl: 'https://i.pinimg.com/1200x/ab/04/77/ab04778495e2a60595faef8874c0b9fd.jpg', stock: 3 },
      { color: 'Purple', imageUrl: 'https://i.pinimg.com/1200x/99/b2/a5/99b2a5a1c000e051d7c7c9aaceb34cdd.jpg', stock: 2 },
      { color: 'Navy Blue', imageUrl: 'https://i.pinimg.com/736x/3e/f8/61/3ef86150cff14188c3b5957393d7ad41.jpg', stock: 2 }
    ],
    isNewArrival: false,
    rating: 4.9,
    numReviews: 12
  },
  {
    name: 'Velvet Maxi Dress - Black',
    description: 'Sumptuous velvet maxi dress with deep V-neck and long sleeves. Luxurious fabric for winter elegance.',
    price: 4999.15,
    category: 'Dresses',
    stock: 10,
    imageUrl: 'https://i.pinimg.com/1200x/ab/04/77/ab04778495e2a60595faef8874c0b9fd.jpg',
    variants: [
      { color: 'Black', imageUrl: 'https://i.pinimg.com/1200x/ab/04/77/ab04778495e2a60595faef8874c0b9fd.jpg', stock: 3 },
      { color: 'Red', imageUrl: 'https://i.pinimg.com/1200x/2f/3e/a7/2f3ea7bd7bdc9c7d655cef6d4d4c6ba0.jpg', stock: 4 },
      { color: 'Green', imageUrl: 'https://i.pinimg.com/1200x/02/c5/0e/02c50e8bc313d06a833f3ee672933260.jpg', stock: 3 },
      { color: 'Purple', imageUrl: 'https://i.pinimg.com/1200x/99/b2/a5/99b2a5a1c000e051d7c7c9aaceb34cdd.jpg', stock: 2 },
      { color: 'Navy Blue', imageUrl: 'https://i.pinimg.com/736x/3e/f8/61/3ef86150cff14188c3b5957393d7ad41.jpg', stock: 2 }
    ],
    isNewArrival: false,
    rating: 4.9,
    numReviews: 12
  },
  {
    name: 'Velvet Maxi Dress - Purple',
    description: 'Sumptuous velvet maxi dress with deep V-neck and long sleeves. Luxurious fabric for winter elegance.',
    price: 4299.15,
    category: 'Dresses',
    stock: 10,
    imageUrl: 'https://i.pinimg.com/1200x/99/b2/a5/99b2a5a1c000e051d7c7c9aaceb34cdd.jpg',
    variants: [
      { color: 'Purple', imageUrl: 'https://i.pinimg.com/1200x/99/b2/a5/99b2a5a1c000e051d7c7c9aaceb34cdd.jpg', stock: 2 },
      { color: 'Red', imageUrl: 'https://i.pinimg.com/1200x/2f/3e/a7/2f3ea7bd7bdc9c7d655cef6d4d4c6ba0.jpg', stock: 4 },
      { color: 'Green', imageUrl: 'https://i.pinimg.com/1200x/02/c5/0e/02c50e8bc313d06a833f3ee672933260.jpg', stock: 3 },
      { color: 'Black', imageUrl: 'https://i.pinimg.com/1200x/ab/04/77/ab04778495e2a60595faef8874c0b9fd.jpg', stock: 3 },
      { color: 'Navy Blue', imageUrl: 'https://i.pinimg.com/736x/3e/f8/61/3ef86150cff14188c3b5957393d7ad41.jpg', stock: 2 }
    ],
    isNewArrival: false,
    rating: 4.9,
    numReviews: 12
  },
  {
    name: 'Velvet Maxi Dress - Navy Blue',
    description: 'Sumptuous velvet maxi dress with deep V-neck and long sleeves. Luxurious fabric for winter elegance.',
    price: 4299.15,
    category: 'Dresses',
    stock: 10,
    imageUrl: 'https://i.pinimg.com/736x/3e/f8/61/3ef86150cff14188c3b5957393d7ad41.jpg',
    variants: [
      { color: 'Navy Blue', imageUrl: 'https://i.pinimg.com/736x/3e/f8/61/3ef86150cff14188c3b5957393d7ad41.jpg', stock: 2 },
      { color: 'Red', imageUrl: 'https://i.pinimg.com/1200x/2f/3e/a7/2f3ea7bd7bdc9c7d655cef6d4d4c6ba0.jpg', stock: 4 },
      { color: 'Green', imageUrl: 'https://i.pinimg.com/1200x/02/c5/0e/02c50e8bc313d06a833f3ee672933260.jpg', stock: 3 },
      { color: 'Black', imageUrl: 'https://i.pinimg.com/1200x/ab/04/77/ab04778495e2a60595faef8874c0b9fd.jpg', stock: 3 },
      { color: 'Purple', imageUrl: 'https://i.pinimg.com/1200x/99/b2/a5/99b2a5a1c000e051d7c7c9aaceb34cdd.jpg', stock: 2 }
    ],
    isNewArrival: false,
    rating: 4.9,
    numReviews: 12
  },
  {
    name: 'Silk Cocktail Dress',
    description: 'Luxurious silk cocktail dress with asymmetric hem and delicate beading. Perfect for evening events.',
    price: 3099.15,
    category: 'Dresses',
    stock: 18,
    imageUrl: 'https://i.pinimg.com/1200x/ea/02/2b/ea022b104a901fbc73d40fbbdd4aad95.jpg',
    variants: [
      { color: 'Red', imageUrl: 'https://i.pinimg.com/1200x/ea/02/2b/ea022b104a901fbc73d40fbbdd4aad95.jpg', stock: 6 },
      { color: 'Navy Blue', imageUrl: 'https://i.pinimg.com/1200x/96/9b/93/969b939280a6ef1fee231781eb7fc372.jpg', stock: 6 },
      { color: 'Black', imageUrl: 'https://i.pinimg.com/736x/f7/36/02/f7360267ab6dc116f9670b2166b40879.jpg', stock: 6 }
    ],
    isNewArrival: true,
    rating: 4.8,
    numReviews: 15
  },
  {
    name: 'Silk Cocktail Dress - Navy Blue',
    description: 'Luxurious silk cocktail dress with asymmetric hem and delicate beading. Perfect for evening events.',
    price: 3099.15,
    category: 'Dresses',
    stock: 18,
    imageUrl: 'https://i.pinimg.com/1200x/96/9b/93/969b939280a6ef1fee231781eb7fc372.jpg',
    variants: [
      { color: 'Navy Blue', imageUrl: 'https://i.pinimg.com/1200x/96/9b/93/969b939280a6ef1fee231781eb7fc372.jpg', stock: 6 },
      { color: 'Red', imageUrl: 'https://i.pinimg.com/1200x/ea/02/2b/ea022b104a901fbc73d40fbbdd4aad95.jpg', stock: 6 },
      { color: 'Black', imageUrl: 'https://i.pinimg.com/736x/f7/36/02/f7360267ab6dc116f9670b2166b40879.jpg', stock: 6 }
    ],
    isNewArrival: true,
    rating: 4.8,
    numReviews: 15
  },
  {
    name: 'Silk Cocktail Dress - Black',
    description: 'Luxurious silk cocktail dress with asymmetric hem and delicate beading. Perfect for evening events.',
    price: 3299.15,
    category: 'Dresses',
    stock: 18,
    imageUrl: 'https://i.pinimg.com/736x/f7/36/02/f7360267ab6dc116f9670b2166b40879.jpg',
    variants: [
      { color: 'Black', imageUrl: 'https://i.pinimg.com/736x/f7/36/02/f7360267ab6dc116f9670b2166b40879.jpg', stock: 6 },
      { color: 'Red', imageUrl: 'https://i.pinimg.com/1200x/ea/02/2b/ea022b104a901fbc73d40fbbdd4aad95.jpg', stock: 6 },
      { color: 'Navy Blue', imageUrl: 'https://i.pinimg.com/1200x/96/9b/93/969b939280a6ef1fee231781eb7fc372.jpg', stock: 6 }
    ],
    isNewArrival: true,
    rating: 4.8,
    numReviews: 15
  },
  {
    name: 'Satin Wrap Dress',
    description: 'Elegant satin wrap dress with tie waist and flowing skirt. Versatile piece for both casual and formal wear.',
    price: 4999.15,
    category: 'Dresses',
    stock: 22,
    imageUrl: 'https://i.pinimg.com/1200x/7e/31/0b/7e310b8bf8b2019c6c66fa83b3922516.jpg',
    variants: [
      { color: 'Red', imageUrl: 'https://i.pinimg.com/1200x/7e/31/0b/7e310b8bf8b2019c6c66fa83b3922516.jpg', stock: 8 },
      { color: 'Light Green', imageUrl: 'https://i.pinimg.com/1200x/cb/67/25/cb6725d31d435bd4cbe401dee953ada9.jpg', stock: 7 },
      { color: 'Dark Green', imageUrl: 'https://i.pinimg.com/1200x/18/0a/eb/180aeb0dd7df42ee573df18619430811.jpg', stock: 7 },
      { color: 'Blue', imageUrl: 'https://i.pinimg.com/1200x/01/76/6a/01766a8afb7ff81bb53ea3d50320a51f.jpg', stock: 7 }
    ],
    isNewArrival: true,
    rating: 4.7,
    numReviews: 19
  },
  {
    name: 'Satin Wrap Dress - Light Green',
    description: 'Elegant satin wrap dress with tie waist and flowing skirt. Versatile piece for both casual and formal wear.',
    price: 4999.15,
    category: 'Dresses',
    stock: 22,
    imageUrl: 'https://i.pinimg.com/1200x/cb/67/25/cb6725d31d435bd4cbe401dee953ada9.jpg',
    variants: [
      { color: 'Light Green', imageUrl: 'https://i.pinimg.com/1200x/cb/67/25/cb6725d31d435bd4cbe401dee953ada9.jpg', stock: 7 },
      { color: 'Red', imageUrl: 'https://i.pinimg.com/1200x/7e/31/0b/7e310b8bf8b2019c6c66fa83b3922516.jpg', stock: 8 },
      { color: 'Dark Green', imageUrl: 'https://i.pinimg.com/1200x/18/0a/eb/180aeb0dd7df42ee573df18619430811.jpg', stock: 7 },
      { color: 'Blue', imageUrl: 'https://i.pinimg.com/1200x/01/76/6a/01766a8afb7ff81bb53ea3d50320a51f.jpg', stock: 7 }
    ],
    isNewArrival: true,
    rating: 4.7,
    numReviews: 19
  },
  {
    name: 'Satin Wrap Dress - Dark Green',
    description: 'Elegant satin wrap dress with tie waist and flowing skirt. Versatile piece for both casual and formal wear.',
    price: 4999.15,
    category: 'Dresses',
    stock: 22,
    imageUrl: 'https://i.pinimg.com/1200x/18/0a/eb/180aeb0dd7df42ee573df18619430811.jpg',
    variants: [
      { color: 'Dark Green', imageUrl: 'https://i.pinimg.com/1200x/18/0a/eb/180aeb0dd7df42ee573df18619430811.jpg', stock: 7 },
      { color: 'Red', imageUrl: 'https://i.pinimg.com/1200x/7e/31/0b/7e310b8bf8b2019c6c66fa83b3922516.jpg', stock: 8 },
      { color: 'Light Green', imageUrl: 'https://i.pinimg.com/1200x/cb/67/25/cb6725d31d435bd4cbe401dee953ada9.jpg', stock: 7 },
      { color: 'Blue', imageUrl: 'https://i.pinimg.com/1200x/01/76/6a/01766a8afb7ff81bb53ea3d50320a51f.jpg', stock: 7 }
    ],
    isNewArrival: true,
    rating: 4.7,
    numReviews: 19
  },
  {
    name: 'Satin Wrap Dress - Blue',
    description: 'Elegant satin wrap dress with tie waist and flowing skirt. Versatile piece for both casual and formal wear.',
    price: 4999.15,
    category: 'Dresses',
    stock: 22,
    imageUrl: 'https://i.pinimg.com/1200x/01/76/6a/01766a8afb7ff81bb53ea3d50320a51f.jpg',
    variants: [
      { color: 'Blue', imageUrl: 'https://i.pinimg.com/1200x/01/76/6a/01766a8afb7ff81bb53ea3d50320a51f.jpg', stock: 7 },
      { color: 'Red', imageUrl: 'https://i.pinimg.com/1200x/7e/31/0b/7e310b8bf8b2019c6c66fa83b3922516.jpg', stock: 8 },
      { color: 'Light Green', imageUrl: 'https://i.pinimg.com/1200x/cb/67/25/cb6725d31d435bd4cbe401dee953ada9.jpg', stock: 7 },
      { color: 'Dark Green', imageUrl: 'https://i.pinimg.com/1200x/18/0a/eb/180aeb0dd7df42ee573df18619430811.jpg', stock: 7 }
    ],
    isNewArrival: true,
    rating: 4.7,
    numReviews: 19
  },
  {
    name: 'Chiffon Blouse',
    description: 'Light and airy chiffon blouse with delicate ruffles and pearl buttons. Elegant layering piece.',
    price: 1599.15,
    category: 'Dresses',
    stock: 28,
    imageUrl: 'https://i.pinimg.com/1200x/95/97/30/9597308035ebd87a5e11c5b3d6c50376.jpg',
    variants: [
      { color: 'Black', imageUrl: 'https://i.pinimg.com/1200x/95/97/30/9597308035ebd87a5e11c5b3d6c50376.jpg', stock: 10 },
      { color: 'Blue', imageUrl: 'https://i.pinimg.com/1200x/4a/3a/bf/4a3abfb4aa790b2a173fba7e5577a8ea.jpg', stock: 9 },
      { color: 'Red', imageUrl: 'https://i.pinimg.com/1200x/76/63/f3/7663f3bb566d3b2a243b22cacbe53d09.jpg', stock: 9 },
      { color: 'White', imageUrl: 'https://i.pinimg.com/1200x/6f/cc/2e/6fcc2e7995a0c7ffff020c7a315068ef.jpg', stock: 9 },
      { color: 'Green', imageUrl: 'https://i.pinimg.com/736x/1c/a4/6a/1ca46a357251cf715d9dd3fec3cf2f1c.jpg', stock: 10 }
    ],
    isNewArrival: true,
    rating: 4.5,
    numReviews: 21
  },
  {
    name: 'Chiffon Blouse - Blue',
    description: 'Light and airy chiffon blouse with delicate ruffles and pearl buttons. Elegant layering piece.',
    price: 1599.15,
    category: 'Dresses',
    stock: 28,
    imageUrl: 'https://i.pinimg.com/1200x/4a/3a/bf/4a3abfb4aa790b2a173fba7e5577a8ea.jpg',
    variants: [
      { color: 'Blue', imageUrl: 'https://i.pinimg.com/1200x/4a/3a/bf/4a3abfb4aa790b2a173fba7e5577a8ea.jpg', stock: 9 },
      { color: 'Black', imageUrl: 'https://i.pinimg.com/1200x/95/97/30/9597308035ebd87a5e11c5b3d6c50376.jpg', stock: 10 },
      { color: 'Red', imageUrl: 'https://i.pinimg.com/1200x/76/63/f3/7663f3bb566d3b2a243b22cacbe53d09.jpg', stock: 9 },
      { color: 'White', imageUrl: 'https://i.pinimg.com/1200x/6f/cc/2e/6fcc2e7995a0c7ffff020c7a315068ef.jpg', stock: 9 },
      { color: 'Green', imageUrl: 'https://i.pinimg.com/736x/1c/a4/6a/1ca46a357251cf715d9dd3fec3cf2f1c.jpg', stock: 10 }
    ],
    isNewArrival: true,
    rating: 4.5,
    numReviews: 21
  },
  {
    name: 'Chiffon Blouse - Red',
    description: 'Light and airy chiffon blouse with delicate ruffles and pearl buttons. Elegant layering piece.',
    price: 1599.15,
    category: 'Dresses',
    stock: 28,
    imageUrl: 'https://i.pinimg.com/1200x/76/63/f3/7663f3bb566d3b2a243b22cacbe53d09.jpg',
    variants: [
      { color: 'Red', imageUrl: 'https://i.pinimg.com/1200x/76/63/f3/7663f3bb566d3b2a243b22cacbe53d09.jpg', stock: 9 },
      { color: 'Black', imageUrl: 'https://i.pinimg.com/1200x/95/97/30/9597308035ebd87a5e11c5b3d6c50376.jpg', stock: 10 },
      { color: 'Blue', imageUrl: 'https://i.pinimg.com/1200x/4a/3a/bf/4a3abfb4aa790b2a173fba7e5577a8ea.jpg', stock: 9 },
      { color: 'White', imageUrl: 'https://i.pinimg.com/1200x/6f/cc/2e/6fcc2e7995a0c7ffff020c7a315068ef.jpg', stock: 9 },
      { color: 'Green', imageUrl: 'https://i.pinimg.com/736x/1c/a4/6a/1ca46a357251cf715d9dd3fec3cf2f1c.jpg', stock: 10 }
    ],
    isNewArrival: true,
    rating: 4.5,
    numReviews: 21
  },
  {
    name: 'Chiffon Blouse - White',
    description: 'Light and airy chiffon blouse with delicate ruffles and pearl buttons. Elegant layering piece.',
    price: 1599.15,
    category: 'Dresses',
    stock: 28,
    imageUrl: 'https://i.pinimg.com/1200x/6f/cc/2e/6fcc2e7995a0c7ffff020c7a315068ef.jpg',
    variants: [
      { color: 'White', imageUrl: 'https://i.pinimg.com/1200x/6f/cc/2e/6fcc2e7995a0c7ffff020c7a315068ef.jpg', stock: 9 },
      { color: 'Black', imageUrl: 'https://i.pinimg.com/1200x/95/97/30/9597308035ebd87a5e11c5b3d6c50376.jpg', stock: 10 },
      { color: 'Blue', imageUrl: 'https://i.pinimg.com/1200x/4a/3a/bf/4a3abfb4aa790b2a173fba7e5577a8ea.jpg', stock: 9 },
      { color: 'Red', imageUrl: 'https://i.pinimg.com/1200x/76/63/f3/7663f3bb566d3b2a243b22cacbe53d09.jpg', stock: 9 },
      { color: 'Green', imageUrl: 'https://i.pinimg.com/736x/1c/a4/6a/1ca46a357251cf715d9dd3fec3cf2f1c.jpg', stock: 10 }
    ],
    isNewArrival: true,
    rating: 4.5,
    numReviews: 21
  },
  {
    name: 'Chiffon Blouse - Green',
    description: 'Light and airy chiffon blouse with delicate ruffles and pearl buttons. Elegant layering piece.',
    price: 1599.15,
    category: 'Dresses',
    stock: 28,
    imageUrl: 'https://i.pinimg.com/736x/1c/a4/6a/1ca46a357251cf715d9dd3fec3cf2f1c.jpg',
    variants: [
      { color: 'Green', imageUrl: 'https://i.pinimg.com/736x/1c/a4/6a/1ca46a357251cf715d9dd3fec3cf2f1c.jpg', stock: 10 },
      { color: 'Black', imageUrl: 'https://i.pinimg.com/1200x/95/97/30/9597308035ebd87a5e11c5b3d6c50376.jpg', stock: 10 },
      { color: 'Blue', imageUrl: 'https://i.pinimg.com/1200x/4a/3a/bf/4a3abfb4aa790b2a173fba7e5577a8ea.jpg', stock: 9 },
      { color: 'Red', imageUrl: 'https://i.pinimg.com/1200x/76/63/f3/7663f3bb566d3b2a243b22cacbe53d09.jpg', stock: 9 },
      { color: 'White', imageUrl: 'https://i.pinimg.com/1200x/6f/cc/2e/6fcc2e7995a0c7ffff020c7a315068ef.jpg', stock: 9 }
    ],
    isNewArrival: true,
    rating: 4.5,
    numReviews: 21
  },
  {
    name: 'Cashmere Sweater',
    description: 'Ultra-soft cashmere sweater with crew neck and ribbed cuffs. Luxurious comfort for cooler days.',
    price: 1699.15,
    category: 'Dresses',
    stock: 20,
    imageUrl: 'https://i.pinimg.com/1200x/a2/01/15/a201158baeb4fd979e200b01fefa4b0b.jpg',
    variants: [
      { color: 'White', imageUrl: 'https://i.pinimg.com/1200x/a2/01/15/a201158baeb4fd979e200b01fefa4b0b.jpg', stock: 7 },
      { color: 'Blue', imageUrl: 'https://i.pinimg.com/736x/39/17/b4/3917b46f3bcd9c6a12d1a015aa185c82.jpg', stock: 7 },
      { color: 'Black', imageUrl: 'https://i.pinimg.com/736x/35/4a/44/354a4406601ef03badf7c2f69582003b.jpg', stock: 6 },
      { color: 'Green', imageUrl: 'https://i.pinimg.com/736x/92/93/f5/9293f5bb151897edf16913a81eecc8e6.jpg', stock: 5 },
      { color: 'Red', imageUrl: 'https://i.pinimg.com/736x/eb/94/a3/eb94a338256803a15a553a079925e465.jpg', stock: 5 }
    ],
    isNewArrival: true,
    rating: 4.8,
    numReviews: 17
  },
  {
    name: 'Cashmere Sweater - Blue',
    description: 'Ultra-soft cashmere sweater with crew neck and ribbed cuffs. Luxurious comfort for cooler days.',
    price: 1699.15,
    category: 'Dresses',
    stock: 20,
    imageUrl: 'https://i.pinimg.com/736x/39/17/b4/3917b46f3bcd9c6a12d1a015aa185c82.jpg',
    variants: [
      { color: 'Blue', imageUrl: 'https://i.pinimg.com/736x/39/17/b4/3917b46f3bcd9c6a12d1a015aa185c82.jpg', stock: 7 },
      { color: 'White', imageUrl: 'https://i.pinimg.com/1200x/a2/01/15/a201158baeb4fd979e200b01fefa4b0b.jpg', stock: 7 },
      { color: 'Black', imageUrl: 'https://i.pinimg.com/736x/35/4a/44/354a4406601ef03badf7c2f69582003b.jpg', stock: 6 },
      { color: 'Green', imageUrl: 'https://i.pinimg.com/736x/92/93/f5/9293f5bb151897edf16913a81eecc8e6.jpg', stock: 5 },
      { color: 'Red', imageUrl: 'https://i.pinimg.com/736x/eb/94/a3/eb94a338256803a15a553a079925e465.jpg', stock: 5 }
    ],
    isNewArrival: true,
    rating: 4.8,
    numReviews: 17
  },
  {
    name: 'Cashmere Sweater - Black',
    description: 'Ultra-soft cashmere sweater with crew neck and ribbed cuffs. Luxurious comfort for cooler days.',
    price: 1699.15,
    category: 'Dresses',
    stock: 20,
    imageUrl: 'https://i.pinimg.com/736x/35/4a/44/354a4406601ef03badf7c2f69582003b.jpg',
    variants: [
      { color: 'Black', imageUrl: 'https://i.pinimg.com/736x/35/4a/44/354a4406601ef03badf7c2f69582003b.jpg', stock: 6 },
      { color: 'White', imageUrl: 'https://i.pinimg.com/1200x/a2/01/15/a201158baeb4fd979e200b01fefa4b0b.jpg', stock: 7 },
      { color: 'Blue', imageUrl: 'https://i.pinimg.com/736x/39/17/b4/3917b46f3bcd9c6a12d1a015aa185c82.jpg', stock: 7 },
      { color: 'Green', imageUrl: 'https://i.pinimg.com/736x/92/93/f5/9293f5bb151897edf16913a81eecc8e6.jpg', stock: 5 },
      { color: 'Red', imageUrl: 'https://i.pinimg.com/736x/eb/94/a3/eb94a338256803a15a553a079925e465.jpg', stock: 5 }
    ],
    isNewArrival: true,
    rating: 4.8,
    numReviews: 17
  },
  {
    name: 'Cashmere Sweater - Green',
    description: 'Ultra-soft cashmere sweater with crew neck and ribbed cuffs. Luxurious comfort for cooler days.',
    price: 1699.15,
    category: 'Dresses',
    stock: 20,
    imageUrl: 'https://i.pinimg.com/736x/92/93/f5/9293f5bb151897edf16913a81eecc8e6.jpg',
    variants: [
      { color: 'Green', imageUrl: 'https://i.pinimg.com/736x/92/93/f5/9293f5bb151897edf16913a81eecc8e6.jpg', stock: 5 },
      { color: 'White', imageUrl: 'https://i.pinimg.com/1200x/a2/01/15/a201158baeb4fd979e200b01fefa4b0b.jpg', stock: 7 },
      { color: 'Blue', imageUrl: 'https://i.pinimg.com/736x/39/17/b4/3917b46f3bcd9c6a12d1a015aa185c82.jpg', stock: 7 },
      { color: 'Black', imageUrl: 'https://i.pinimg.com/736x/35/4a/44/354a4406601ef03badf7c2f69582003b.jpg', stock: 6 },
      { color: 'Red', imageUrl: 'https://i.pinimg.com/736x/eb/94/a3/eb94a338256803a15a553a079925e465.jpg', stock: 5 }
    ],
    isNewArrival: true,
    rating: 4.8,
    numReviews: 17
  },
  {
    name: 'Cashmere Sweater - Red',
    description: 'Ultra-soft cashmere sweater with crew neck and ribbed cuffs. Luxurious comfort for cooler days.',
    price: 1699.15,
    category: 'Dresses',
    stock: 20,
    imageUrl: 'https://i.pinimg.com/736x/eb/94/a3/eb94a338256803a15a553a079925e465.jpg',
    variants: [
      { color: 'Red', imageUrl: 'https://i.pinimg.com/736x/eb/94/a3/eb94a338256803a15a553a079925e465.jpg', stock: 5 },
      { color: 'White', imageUrl: 'https://i.pinimg.com/1200x/a2/01/15/a201158baeb4fd979e200b01fefa4b0b.jpg', stock: 7 },
      { color: 'Blue', imageUrl: 'https://i.pinimg.com/736x/39/17/b4/3917b46f3bcd9c6a12d1a015aa185c82.jpg', stock: 7 },
      { color: 'Black', imageUrl: 'https://i.pinimg.com/736x/35/4a/44/354a4406601ef03badf7c2f69582003b.jpg', stock: 6 },
      { color: 'Green', imageUrl: 'https://i.pinimg.com/736x/92/93/f5/9293f5bb151897edf16913a81eecc8e6.jpg', stock: 5 }
    ],
    isNewArrival: true,
    rating: 4.8,
    numReviews: 17
  },
  {
    name: 'Tulle Shirt',
    description: 'Romantic tulle shirt with layered design and delicate detailing. Perfect for special occasions or everyday elegance.',
    price: 1299.15,
    category: 'Dresses',
    stock: 24,
    imageUrl: 'https://i.pinimg.com/1200x/c8/35/35/c83535e6210ad6c13371315e9c36a9e2.jpg',
    variants: [
      { color: 'White', imageUrl: 'https://i.pinimg.com/1200x/c8/35/35/c83535e6210ad6c13371315e9c36a9e2.jpg', stock: 8 },
      { color: 'Cream', imageUrl: 'https://i.pinimg.com/1200x/17/59/14/175914e3fb75944c5c1760189bfc5fd8.jpg', stock: 8 },
      { color: 'Light Brown', imageUrl: 'https://i.pinimg.com/736x/ef/fa/5e/effa5ee311c44c4fdef858f7cb17fdde.jpg', stock: 8 },
      { color: 'Blue', imageUrl: 'https://i.pinimg.com/1200x/ef/9d/ac/ef9dac25b0086913d41f7734fd40abc8.jpg', stock: 8 },
      { color: 'Red', imageUrl: 'https://i.pinimg.com/1200x/3b/14/33/3b14339bb34b6fa9c2c6259e9d124b17.jpg', stock: 8 }
    ],
    isNewArrival: true,
    rating: 4.7,
    numReviews: 20
  },
  {
    name: 'Tulle Shirt - Cream',
    description: 'Romantic tulle shirt with layered design and delicate detailing. Perfect for special occasions or everyday elegance.',
    price: 1299.15,
    category: 'Dresses',
    stock: 24,
    imageUrl: 'https://i.pinimg.com/1200x/17/59/14/175914e3fb75944c5c1760189bfc5fd8.jpg',
    variants: [
      { color: 'Cream', imageUrl: 'https://i.pinimg.com/1200x/17/59/14/175914e3fb75944c5c1760189bfc5fd8.jpg', stock: 8 },
      { color: 'White', imageUrl: 'https://i.pinimg.com/1200x/c8/35/35/c83535e6210ad6c13371315e9c36a9e2.jpg', stock: 8 },
      { color: 'Light Brown', imageUrl: 'https://i.pinimg.com/736x/ef/fa/5e/effa5ee311c44c4fdef858f7cb17fdde.jpg', stock: 8 },
      { color: 'Blue', imageUrl: 'https://i.pinimg.com/1200x/ef/9d/ac/ef9dac25b0086913d41f7734fd40abc8.jpg', stock: 8 },
      { color: 'Red', imageUrl: 'https://i.pinimg.com/1200x/3b/14/33/3b14339bb34b6fa9c2c6259e9d124b17.jpg', stock: 8 }
    ],
    isNewArrival: true,
    rating: 4.7,
    numReviews: 20
  },
  {
    name: 'Tulle Shirt - Light Brown',
    description: 'Romantic tulle shirt with layered design and delicate detailing. Perfect for special occasions or everyday elegance.',
    price: 1299.15,
    category: 'Dresses',
    stock: 24,
    imageUrl: 'https://i.pinimg.com/736x/ef/fa/5e/effa5ee311c44c4fdef858f7cb17fdde.jpg',
    variants: [
      { color: 'Light Brown', imageUrl: 'https://i.pinimg.com/736x/ef/fa/5e/effa5ee311c44c4fdef858f7cb17fdde.jpg', stock: 8 },
      { color: 'White', imageUrl: 'https://i.pinimg.com/1200x/c8/35/35/c83535e6210ad6c13371315e9c36a9e2.jpg', stock: 8 },
      { color: 'Cream', imageUrl: 'https://i.pinimg.com/1200x/17/59/14/175914e3fb75944c5c1760189bfc5fd8.jpg', stock: 8 },
      { color: 'Blue', imageUrl: 'https://i.pinimg.com/1200x/ef/9d/ac/ef9dac25b0086913d41f7734fd40abc8.jpg', stock: 8 },
      { color: 'Red', imageUrl: 'https://i.pinimg.com/1200x/3b/14/33/3b14339bb34b6fa9c2c6259e9d124b17.jpg', stock: 8 }
    ],
    isNewArrival: true,
    rating: 4.7,
    numReviews: 20
  },
  {
    name: 'Tulle Shirt - Blue',
    description: 'Romantic tulle shirt with layered design and delicate detailing. Perfect for special occasions or everyday elegance.',
    price: 1299.15,
    category: 'Dresses',
    stock: 24,
    imageUrl: 'https://i.pinimg.com/1200x/ef/9d/ac/ef9dac25b0086913d41f7734fd40abc8.jpg',
    variants: [
      { color: 'Blue', imageUrl: 'https://i.pinimg.com/1200x/ef/9d/ac/ef9dac25b0086913d41f7734fd40abc8.jpg', stock: 8 },
      { color: 'White', imageUrl: 'https://i.pinimg.com/1200x/c8/35/35/c83535e6210ad6c13371315e9c36a9e2.jpg', stock: 8 },
      { color: 'Cream', imageUrl: 'https://i.pinimg.com/1200x/17/59/14/175914e3fb75944c5c1760189bfc5fd8.jpg', stock: 8 },
      { color: 'Light Brown', imageUrl: 'https://i.pinimg.com/736x/ef/fa/5e/effa5ee311c44c4fdef858f7cb17fdde.jpg', stock: 8 },
      { color: 'Red', imageUrl: 'https://i.pinimg.com/1200x/3b/14/33/3b14339bb34b6fa9c2c6259e9d124b17.jpg', stock: 8 }
    ],
    isNewArrival: true,
    rating: 4.7,
    numReviews: 20
  },
  {
    name: 'Tulle Shirt - Red',
    description: 'Romantic tulle shirt with layered design and delicate detailing. Perfect for special occasions or everyday elegance.',
    price: 1299.15,
    category: 'Dresses',
    stock: 24,
    imageUrl: 'https://i.pinimg.com/1200x/3b/14/33/3b14339bb34b6fa9c2c6259e9d124b17.jpg',
    variants: [
      { color: 'Red', imageUrl: 'https://i.pinimg.com/1200x/3b/14/33/3b14339bb34b6fa9c2c6259e9d124b17.jpg', stock: 8 },
      { color: 'White', imageUrl: 'https://i.pinimg.com/1200x/c8/35/35/c83535e6210ad6c13371315e9c36a9e2.jpg', stock: 8 },
      { color: 'Cream', imageUrl: 'https://i.pinimg.com/1200x/17/59/14/175914e3fb75944c5c1760189bfc5fd8.jpg', stock: 8 },
      { color: 'Light Brown', imageUrl: 'https://i.pinimg.com/736x/ef/fa/5e/effa5ee311c44c4fdef858f7cb17fdde.jpg', stock: 8 },
      { color: 'Blue', imageUrl: 'https://i.pinimg.com/1200x/ef/9d/ac/ef9dac25b0086913d41f7734fd40abc8.jpg', stock: 8 }
    ],
    isNewArrival: true,
    rating: 4.7,
    numReviews: 20
  },
  {
    name: 'Tulle Skirt',
    description: 'Romantic tulle shirt with layered design and delicate detailing. Perfect for special occasions or everyday elegance.',
    price: 1359.15,
    category: 'Dresses',
    stock: 24,
    imageUrl: 'https://i.pinimg.com/1200x/7e/24/79/7e2479621324efcc0497a93339457122.jpg',
    variants: [
      { color: 'Red', imageUrl: 'https://i.pinimg.com/1200x/7e/24/79/7e2479621324efcc0497a93339457122.jpg', stock: 8 },
      { color: 'Pink', imageUrl: 'https://i.pinimg.com/1200x/71/0c/ce/710cceb17f4cbdccf2ec982338e52d7e.jpg', stock: 8 },
      { color: 'Black', imageUrl: 'https://i.pinimg.com/736x/a9/0b/bc/a90bbcffa3510b6704ec2a89f542b604.jpg', stock: 8 },
      { color: 'White', imageUrl: 'https://i.pinimg.com/736x/91/91/71/9191711700631689e229a45790707d07.jpg', stock: 8 }
    ],
    isNewArrival: true,
    rating: 4.7,
    numReviews: 20
  },
  {
    name: 'Tulle Skirt - Pink',
    description: 'Romantic tulle shirt with layered design and delicate detailing. Perfect for special occasions or everyday elegance.',
    price: 1259.15,
    category: 'Dresses',
    stock: 24,
    imageUrl: 'https://i.pinimg.com/1200x/71/0c/ce/710cceb17f4cbdccf2ec982338e52d7e.jpg',
    variants: [
      { color: 'Pink', imageUrl: 'https://i.pinimg.com/1200x/71/0c/ce/710cceb17f4cbdccf2ec982338e52d7e.jpg', stock: 8 },
      { color: 'Red', imageUrl: 'https://i.pinimg.com/1200x/7e/24/79/7e2479621324efcc0497a93339457122.jpg', stock: 8 },
      { color: 'Black', imageUrl: 'https://i.pinimg.com/736x/a9/0b/bc/a90bbcffa3510b6704ec2a89f542b604.jpg', stock: 8 },
      { color: 'White', imageUrl: 'https://i.pinimg.com/736x/91/91/71/9191711700631689e229a45790707d07.jpg', stock: 8 }
    ],
    isNewArrival: true,
    rating: 4.7,
    numReviews: 20
  },
  {
    name: 'Tulle Skirt - Black',
    description: 'Romantic tulle shirt with layered design and delicate detailing. Perfect for special occasions or everyday elegance.',
    price: 1279.15,
    category: 'Dresses',
    stock: 24,
    imageUrl: 'https://i.pinimg.com/736x/a9/0b/bc/a90bbcffa3510b6704ec2a89f542b604.jpg',
    variants: [
      { color: 'Black', imageUrl: 'https://i.pinimg.com/736x/a9/0b/bc/a90bbcffa3510b6704ec2a89f542b604.jpg', stock: 8 },
      { color: 'Red', imageUrl: 'https://i.pinimg.com/1200x/7e/24/79/7e2479621324efcc0497a93339457122.jpg', stock: 8 },
      { color: 'Pink', imageUrl: 'https://i.pinimg.com/1200x/71/0c/ce/710cceb17f4cbdccf2ec982338e52d7e.jpg', stock: 8 },
      { color: 'White', imageUrl: 'https://i.pinimg.com/736x/91/91/71/9191711700631689e229a45790707d07.jpg', stock: 8 }
    ],
    isNewArrival: true,
    rating: 4.7,
    numReviews: 20
  },
  {
    name: 'Tulle Skirt - White',
    description: 'Romantic tulle shirt with layered design and delicate detailing. Perfect for special occasions or everyday elegance.',
    price: 1399.15,
    category: 'Dresses',
    stock: 24,
    imageUrl: 'https://i.pinimg.com/736x/91/91/71/9191711700631689e229a45790707d07.jpg',
    variants: [
      { color: 'White', imageUrl: 'https://i.pinimg.com/736x/91/91/71/9191711700631689e229a45790707d07.jpg', stock: 8 },
      { color: 'Red', imageUrl: 'https://i.pinimg.com/1200x/7e/24/79/7e2479621324efcc0497a93339457122.jpg', stock: 8 },
      { color: 'Pink', imageUrl: 'https://i.pinimg.com/1200x/71/0c/ce/710cceb17f4cbdccf2ec982338e52d7e.jpg', stock: 8 },
      { color: 'Black', imageUrl: 'https://i.pinimg.com/736x/a9/0b/bc/a90bbcffa3510b6704ec2a89f542b604.jpg', stock: 8 }
    ],
    isNewArrival: true,
    rating: 4.7,
    numReviews: 20
  },
  {
    name: 'Diamond Stud Earrings',
    description: 'Classic 1-carat diamond stud earrings in 18k white gold setting. Timeless elegance for any occasion.',
    price: 7649.15,
    category: 'Jewelry',
    stock: 8,
    imageUrl: 'https://i.pinimg.com/1200x/b9/2a/a3/b92aa39aac6056f81b9a6681b922ea89.jpg',
    variants: [
      { color: 'White Gold', imageUrl: 'https://i.pinimg.com/1200x/b9/2a/a3/b92aa39aac6056f81b9a6681b922ea89.jpg', stock: 4 },
      { color: 'Black Gold', imageUrl: 'https://i.pinimg.com/736x/bc/eb/dc/bcebdcf475c8564dd2e9953c42ba6bd3.jpg', stock: 4 },
      { color: 'White', imageUrl: 'https://i.pinimg.com/1200x/40/62/a4/4062a46d409c992ab041d003e8fce319.jpg', stock: 4 }
    ],
    isNewArrival: false,
    rating: 4.9,
    numReviews: 18
  },
  {
    name: 'Diamond Stud Earrings - Black Gold',
    description: 'Classic 1-carat diamond stud earrings in 18k white gold setting. Timeless elegance for any occasion.',
    price: 7649.15,
    category: 'Jewelry',
    stock: 8,
    imageUrl: 'https://i.pinimg.com/736x/bc/eb/dc/bcebdcf475c8564dd2e9953c42ba6bd3.jpg',
    variants: [
      { color: 'Black Gold', imageUrl: 'https://i.pinimg.com/736x/bc/eb/dc/bcebdcf475c8564dd2e9953c42ba6bd3.jpg', stock: 4 },
      { color: 'White Gold', imageUrl: 'https://i.pinimg.com/1200x/b9/2a/a3/b92aa39aac6056f81b9a6681b922ea89.jpg', stock: 4 },
      { color: 'White', imageUrl: 'https://i.pinimg.com/1200x/40/62/a4/4062a46d409c992ab041d003e8fce319.jpg', stock: 4 }
    ],
    isNewArrival: false,
    rating: 4.9,
    numReviews: 18
  },
  {
    name: 'Diamond Stud Earrings - White',
    description: 'Classic 1-carat diamond stud earrings in 18k white gold setting. Timeless elegance for any occasion.',
    price: 7649.15,
    category: 'Jewelry',
    stock: 8,
    imageUrl: 'https://i.pinimg.com/1200x/40/62/a4/4062a46d409c992ab041d003e8fce319.jpg',
    variants: [
      { color: 'White', imageUrl: 'https://i.pinimg.com/1200x/40/62/a4/4062a46d409c992ab041d003e8fce319.jpg', stock: 4 },
      { color: 'White Gold', imageUrl: 'https://i.pinimg.com/1200x/b9/2a/a3/b92aa39aac6056f81b9a6681b922ea89.jpg', stock: 4 },
      { color: 'Black Gold', imageUrl: 'https://i.pinimg.com/736x/bc/eb/dc/bcebdcf475c8564dd2e9953c42ba6bd3.jpg', stock: 4 }
    ],
    isNewArrival: false,
    rating: 4.9,
    numReviews: 18
  },
  {
    name: 'Emerald Drop Earrings',
    description: 'Exquisite freshwater pearl necklace with matching earrings. Classic and sophisticated design.',
    price: 4974.15,
    category: 'Jewelry',
    stock: 20,
    imageUrl: 'https://i.pinimg.com/1200x/66/d9/b7/66d9b763cc9064a3f03ab1e459146092.jpg',
    variants: [
      { color: 'Gold', imageUrl: 'https://i.pinimg.com/1200x/66/d9/b7/66d9b763cc9064a3f03ab1e459146092.jpg', stock: 10 },
      { color: 'Emerald', imageUrl: 'https://i.pinimg.com/1200x/c9/f6/1a/c9f61af97627380595c8e816b02ff2b7.jpg', stock: 10 },
      { color: 'Butterfly', imageUrl: 'https://i.pinimg.com/1200x/af/7f/c9/af7fc907f5f26ef64b8ecc56be9a08e0.jpg', stock: 10 }
    ],
    isNewArrival: false,
    rating: 4.6,
    numReviews: 27
  },
  {
    name: 'Emerald Drop Earrings - Emerald',
    description: 'Exquisite freshwater pearl necklace with matching earrings. Classic and sophisticated design.',
    price: 4974.15,
    category: 'Jewelry',
    stock: 20,
    imageUrl: 'https://i.pinimg.com/1200x/c9/f6/1a/c9f61af97627380595c8e816b02ff2b7.jpg',
    variants: [
      { color: 'Emerald', imageUrl: 'https://i.pinimg.com/1200x/c9/f6/1a/c9f61af97627380595c8e816b02ff2b7.jpg', stock: 10 },
      { color: 'Gold', imageUrl: 'https://i.pinimg.com/1200x/66/d9/b7/66d9b763cc9064a3f03ab1e459146092.jpg', stock: 10 },
      { color: 'Butterfly', imageUrl: 'https://i.pinimg.com/1200x/af/7f/c9/af7fc907f5f26ef64b8ecc56be9a08e0.jpg', stock: 10 }
    ],
    isNewArrival: false,
    rating: 4.6,
    numReviews: 27
  },
  {
    name: 'Emerald Drop Earrings - Butterfly',
    description: 'Exquisite freshwater pearl necklace with matching earrings. Classic and sophisticated design.',
    price: 5974.15,
    category: 'Jewelry',
    stock: 20,
    imageUrl: 'https://i.pinimg.com/1200x/af/7f/c9/af7fc907f5f26ef64b8ecc56be9a08e0.jpg',
    variants: [
      { color: 'Butterfly', imageUrl: 'https://i.pinimg.com/1200x/af/7f/c9/af7fc907f5f26ef64b8ecc56be9a08e0.jpg', stock: 10 },
      { color: 'Emerald', imageUrl: 'https://i.pinimg.com/1200x/c9/f6/1a/c9f61af97627380595c8e816b02ff2b7.jpg', stock: 10 },
      { color: 'Gold', imageUrl: 'https://i.pinimg.com/1200x/66/d9/b7/66d9b763cc9064a3f03ab1e459146092.jpg', stock: 10 }
    ],
    isNewArrival: false,
    rating: 4.6,
    numReviews: 27
  },
  {
    name: 'Pearl Necklace Set - Gold',
    description: 'Exquisite freshwater pearl necklace with matching earrings. Classic and sophisticated design.',
    price: 9974.15,
    category: 'Jewelry',
    stock: 20,
    imageUrl: 'https://i.pinimg.com/1200x/00/91/a5/0091a5c38cd9e4169cb3e5b9aac3d032.jpg',
    variants: [
      { color: 'White', imageUrl: 'https://i.pinimg.com/1200x/00/91/a5/0091a5c38cd9e4169cb3e5b9aac3d032.jpg', stock: 10 },
      { color: 'Gold', imageUrl: 'https://i.pinimg.com/1200x/15/69/da/1569da9d9af7dc3c2d2045da56e1766b.jpg', stock: 10 },
      { color: 'Emerald', imageUrl: 'https://i.pinimg.com/736x/96/fd/01/96fd013bf8bb1f36ded49b0d990422b6.jpg', stock: 10 }
    ],
    isNewArrival: false,
    rating: 4.6,
    numReviews: 27
  },
  {
    name: 'Pearl Necklace Set - Emerald',
    description: 'Exquisite freshwater pearl necklace with matching earrings. Classic and sophisticated design.',
    price: 9974.15,
    category: 'Jewelry',
    stock: 20,
    imageUrl: 'https://i.pinimg.com/1200x/15/69/da/1569da9d9af7dc3c2d2045da56e1766b.jpg',
    variants: [
      { color: 'Gold', imageUrl: 'https://i.pinimg.com/1200x/15/69/da/1569da9d9af7dc3c2d2045da56e1766b.jpg', stock: 10 },
      { color: 'White', imageUrl: 'https://i.pinimg.com/1200x/00/91/a5/0091a5c38cd9e4169cb3e5b9aac3d032.jpg', stock: 10 },
      { color: 'Emerald', imageUrl: 'https://i.pinimg.com/736x/96/fd/01/96fd013bf8bb1f36ded49b0d990422b6.jpg', stock: 10 }
    ],
    isNewArrival: false,
    rating: 4.6,
    numReviews: 27
  },
  {
    name: 'Pearl Necklace Set',
    description: 'Exquisite freshwater pearl necklace with matching earrings. Classic and sophisticated design.',
    price: 9974.15,
    category: 'Jewelry',
    stock: 20,
    imageUrl: 'https://i.pinimg.com/736x/96/fd/01/96fd013bf8bb1f36ded49b0d990422b6.jpg',
    variants: [
      { color: 'Emerald', imageUrl: 'https://i.pinimg.com/736x/96/fd/01/96fd013bf8bb1f36ded49b0d990422b6.jpg', stock: 10 },
      { color: 'White', imageUrl: 'https://i.pinimg.com/1200x/00/91/a5/0091a5c38cd9e4169cb3e5b9aac3d032.jpg', stock: 10 },
      { color: 'Gold', imageUrl: 'https://i.pinimg.com/1200x/15/69/da/1569da9d9af7dc3c2d2045da56e1766b.jpg', stock: 10 }
    ],
    isNewArrival: false,
    rating: 4.6,
    numReviews: 27
  },
  {
    name: 'Gold Bangle Bracelet',
    description: '18k yellow gold bangle bracelet with intricate engraving. Stackable design for versatile styling.',
    price: 3699.15,
    category: 'Jewelry',
    stock: 25,
    imageUrl: 'https://i.pinimg.com/1200x/0b/b1/b3/0bb1b33706dbc5daa5101c0a03a77c9c.jpg',
    variants: [
      { color: 'Yellow Gold', imageUrl: 'https://i.pinimg.com/1200x/0b/b1/b3/0bb1b33706dbc5daa5101c0a03a77c9c.jpg', stock: 13 },
      { color: 'Rose Gold', imageUrl: 'https://i.pinimg.com/1200x/a3/17/82/a317829ddbba3c7a7ef33afc5d23aff0.jpg', stock: 12 },
      { color: 'Flower', imageUrl: 'https://i.pinimg.com/1200x/64/38/c7/6438c7c5faca2c8925f17da104c97a3f.jpg', stock: 12 }
    ],
    isNewArrival: false,
    rating: 4.5,
    numReviews: 22
  },
  {
    name: 'Gold Bangle Bracelet - Rose Gold',
    description: '18k yellow gold bangle bracelet with intricate engraving. Stackable design for versatile styling.',
    price: 3699.15,
    category: 'Jewelry',
    stock: 25,
    imageUrl: 'https://i.pinimg.com/1200x/a3/17/82/a317829ddbba3c7a7ef33afc5d23aff0.jpg',
    variants: [
      { color: 'Rose Gold', imageUrl: 'https://i.pinimg.com/1200x/a3/17/82/a317829ddbba3c7a7ef33afc5d23aff0.jpg', stock: 12 },
      { color: 'Yellow Gold', imageUrl: 'https://i.pinimg.com/1200x/0b/b1/b3/0bb1b33706dbc5daa5101c0a03a77c9c.jpg', stock: 13 },
      { color: 'Flower', imageUrl: 'https://i.pinimg.com/1200x/64/38/c7/6438c7c5faca2c8925f17da104c97a3f.jpg', stock: 12 }
    ],
    isNewArrival: false,
    rating: 4.5,
    numReviews: 22
  },
  {
    name: 'Gold Bangle Bracelet - Flower',
    description: '18k yellow gold bangle bracelet with intricate engraving. Stackable design for versatile styling.',
    price: 3699.15,
    category: 'Jewelry',
    stock: 25,
    imageUrl: 'https://i.pinimg.com/1200x/64/38/c7/6438c7c5faca2c8925f17da104c97a3f.jpg',
    variants: [
      { color: 'Flower', imageUrl: 'https://i.pinimg.com/1200x/64/38/c7/6438c7c5faca2c8925f17da104c97a3f.jpg', stock: 12 },
      { color: 'Yellow Gold', imageUrl: 'https://i.pinimg.com/1200x/0b/b1/b3/0bb1b33706dbc5daa5101c0a03a77c9c.jpg', stock: 13 },
      { color: 'Rose Gold', imageUrl: 'https://i.pinimg.com/1200x/a3/17/82/a317829ddbba3c7a7ef33afc5d23aff0.jpg', stock: 12 }
    ],
    isNewArrival: false,
    rating: 4.5,
    numReviews: 22
  },
  {
    name: 'Silver Hoop Earrings',
    description: 'Large silver hoop earrings with intricate filigree design. Bold statement piece for modern women.',
    price: 11040.15,
    category: 'Jewelry',
    stock: 35,
    imageUrl: 'https://i.pinimg.com/736x/27/b3/0c/27b30ccdf6485fb9b22abee1d1fb7947.jpg',
    variants: [
      { color: 'Gold', imageUrl: 'https://i.pinimg.com/736x/27/b3/0c/27b30ccdf6485fb9b22abee1d1fb7947.jpg', stock: 17 },
      { color: 'Silver', imageUrl: 'https://i.pinimg.com/736x/d8/35/96/d8359643c16133ce10065a866d38eb6d.jpg', stock: 18 },
      { color: 'White', imageUrl: 'https://i.pinimg.com/736x/dc/98/3c/dc983c1081b09ec896e084442a8ffa3c.jpg', stock: 17 }
    ],
    isNewArrival: true,
    rating: 4.6,
    numReviews: 28
  },
  {
    name: 'Silver Hoop Earrings - Silver',
    description: 'Large silver hoop earrings with intricate filigree design. Bold statement piece for modern women.',
    price: 11040.15,
    category: 'Jewelry',
    stock: 35,
    imageUrl: 'https://i.pinimg.com/736x/d8/35/96/d8359643c16133ce10065a866d38eb6d.jpg',
    variants: [
      { color: 'Silver', imageUrl: 'https://i.pinimg.com/736x/d8/35/96/d8359643c16133ce10065a866d38eb6d.jpg', stock: 18 },
      { color: 'Gold', imageUrl: 'https://i.pinimg.com/736x/27/b3/0c/27b30ccdf6485fb9b22abee1d1fb7947.jpg', stock: 17 },
      { color: 'White', imageUrl: 'https://i.pinimg.com/736x/dc/98/3c/dc983c1081b09ec896e084442a8ffa3c.jpg', stock: 17 }
    ],
    isNewArrival: true,
    rating: 4.6,
    numReviews: 28
  },
  {
    name: 'Silver Hoop Earrings - White',
    description: 'Large silver hoop earrings with intricate filigree design. Bold statement piece for modern women.',
    price: 11040.15,
    category: 'Jewelry',
    stock: 35,
    imageUrl: 'https://i.pinimg.com/736x/dc/98/3c/dc983c1081b09ec896e084442a8ffa3c.jpg',
    variants: [
      { color: 'White', imageUrl: 'https://i.pinimg.com/736x/dc/98/3c/dc983c1081b09ec896e084442a8ffa3c.jpg', stock: 17 },
      { color: 'Silver', imageUrl: 'https://i.pinimg.com/736x/d8/35/96/d8359643c16133ce10065a866d38eb6d.jpg', stock: 18 },
      { color: 'Gold', imageUrl: 'https://i.pinimg.com/736x/27/b3/0c/27b30ccdf6485fb9b22abee1d1fb7947.jpg', stock: 17 }
    ],
    isNewArrival: true,
    rating: 4.6,
    numReviews: 28
  },
  {
    name: 'Diamond Tennis Bracelet',
    description: 'Sparkling diamond tennis bracelet in platinum setting. Dazzling elegance for special occasions.',
    price: 11049.15,
    category: 'Jewelry',
    stock: 5,
    imageUrl: 'https://i.pinimg.com/1200x/fc/2d/e9/fc2de9f6286835fcdced2079985acb7c.jpg',
    variants: [
      { color: 'Platinum', imageUrl: 'https://i.pinimg.com/1200x/fc/2d/e9/fc2de9f6286835fcdced2079985acb7c.jpg', stock: 3 },
      { color: 'White Gold', imageUrl: 'https://i.pinimg.com/736x/9e/54/17/9e5417f57e1d27dbd28c30609068c578.jpg', stock: 2 }
    ],
    isNewArrival: false,
    rating: 5.0,
    numReviews: 8
  },
  {
    name: 'Diamond Tennis Bracelet - White Gold',
    description: 'Sparkling diamond tennis bracelet in platinum setting. Dazzling elegance for special occasions.',
    price: 11049.15,
    category: 'Jewelry',
    stock: 5,
    imageUrl: 'https://i.pinimg.com/736x/9e/54/17/9e5417f57e1d27dbd28c30609068c578.jpg',
    variants: [
      { color: 'White Gold', imageUrl: 'https://i.pinimg.com/736x/9e/54/17/9e5417f57e1d27dbd28c30609068c578.jpg', stock: 2 },
      { color: 'Platinum', imageUrl: 'https://i.pinimg.com/1200x/fc/2d/e9/fc2de9f6286835fcdced2079985acb7c.jpg', stock: 3 }
    ],
    isNewArrival: false,
    rating: 5.0,
    numReviews: 8
  },
  {
    name: 'Designer Handbag',
    description: 'Luxury leather handbag with gold hardware and structured silhouette. Spacious interior with multiple compartments.',
    price: 5099.15,
    category: 'Accessories',
    stock: 12,
    imageUrl: 'https://i.pinimg.com/736x/ca/64/d9/ca64d90081b931c08f4c7129f766449a.jpg',
    variants: [
      { color: 'Blue', imageUrl: 'https://i.pinimg.com/736x/ca/64/d9/ca64d90081b931c08f4c7129f766449a.jpg', stock: 6 },
      { color: 'Brown', imageUrl: 'https://i.pinimg.com/736x/60/20/68/602068c076c9138ba97f02c3cc2f4367.jpg', stock: 6 },
      { color: 'Burgundy', imageUrl: 'https://i.pinimg.com/1200x/61/5c/db/615cdb9f9b4fa65ab22d4acbe15ce82c.jpg', stock: 6 },
      { color: 'White', imageUrl: 'https://i.pinimg.com/736x/e7/aa/62/e7aa623a6fff5868f69eadd67f0c4cbe.jpg', stock: 6 }
    ],
    isNewArrival: false,
    rating: 4.7,
    numReviews: 31
  },
  {
    name: 'Designer Handbag - Brown',
    description: 'Luxury leather handbag with gold hardware and structured silhouette. Spacious interior with multiple compartments.',
    price: 5099.15,
    category: 'Accessories',
    stock: 12,
    imageUrl: 'https://i.pinimg.com/736x/60/20/68/602068c076c9138ba97f02c3cc2f4367.jpg',
    variants: [
      { color: 'Brown', imageUrl: 'https://i.pinimg.com/736x/60/20/68/602068c076c9138ba97f02c3cc2f4367.jpg', stock: 6 },
      { color: 'Blue', imageUrl: 'https://i.pinimg.com/736x/ca/64/d9/ca64d90081b931c08f4c7129f766449a.jpg', stock: 6 },
      { color: 'Burgundy', imageUrl: 'https://i.pinimg.com/1200x/61/5c/db/615cdb9f9b4fa65ab22d4acbe15ce82c.jpg', stock: 6 },
      { color: 'White', imageUrl: 'https://i.pinimg.com/736x/e7/aa/62/e7aa623a6fff5868f69eadd67f0c4cbe.jpg', stock: 6 }
    ],
    isNewArrival: false,
    rating: 4.7,
    numReviews: 31
  },
  {
    name: 'Designer Handbag - Burgundy',
    description: 'Luxury leather handbag with gold hardware and structured silhouette. Spacious interior with multiple compartments.',
    price: 5099.15,
    category: 'Accessories',
    stock: 12,
    imageUrl: 'https://i.pinimg.com/1200x/61/5c/db/615cdb9f9b4fa65ab22d4acbe15ce82c.jpg',
    variants: [
      { color: 'Burgundy', imageUrl: 'https://i.pinimg.com/1200x/61/5c/db/615cdb9f9b4fa65ab22d4acbe15ce82c.jpg', stock: 6 },
      { color: 'Blue', imageUrl: 'https://i.pinimg.com/736x/ca/64/d9/ca64d90081b931c08f4c7129f766449a.jpg', stock: 6 },
      { color: 'Brown', imageUrl: 'https://i.pinimg.com/736x/60/20/68/602068c076c9138ba97f02c3cc2f4367.jpg', stock: 6 },
      { color: 'White', imageUrl: 'https://i.pinimg.com/736x/e7/aa/62/e7aa623a6fff5868f69eadd67f0c4cbe.jpg', stock: 6 }
    ],
    isNewArrival: false,
    rating: 4.7,
    numReviews: 31
  },
  {
    name: 'Designer Handbag - White',
    description: 'Luxury leather handbag with gold hardware and structured silhouette. Spacious interior with multiple compartments.',
    price: 5099.15,
    category: 'Accessories',
    stock: 12,
    imageUrl: 'https://i.pinimg.com/736x/e7/aa/62/e7aa623a6fff5868f69eadd67f0c4cbe.jpg',
    variants: [
      { color: 'White', imageUrl: 'https://i.pinimg.com/736x/e7/aa/62/e7aa623a6fff5868f69eadd67f0c4cbe.jpg', stock: 6 },
      { color: 'Blue', imageUrl: 'https://i.pinimg.com/736x/ca/64/d9/ca64d90081b931c08f4c7129f766449a.jpg', stock: 6 },
      { color: 'Brown', imageUrl: 'https://i.pinimg.com/736x/60/20/68/602068c076c9138ba97f02c3cc2f4367.jpg', stock: 6 },
      { color: 'Burgundy', imageUrl: 'https://i.pinimg.com/1200x/61/5c/db/615cdb9f9b4fa65ab22d4acbe15ce82c.jpg', stock: 6 }
    ],
    isNewArrival: false,
    rating: 4.7,
    numReviews: 31
  },
  {
    name: 'Crystal Hair Accessories',
    description: 'Delicate crystal-encrusted hair clips and combs. Add sparkle to your updo or everyday hairstyle.',
    price: 1064.15,
    category: 'Accessories',
    stock: 30,
    imageUrl: 'https://i.pinimg.com/1200x/43/43/40/434340016214bf4dace539d2c2c25054.jpg',
    variants: [
      { color: 'Purple', imageUrl: 'https://i.pinimg.com/1200x/43/43/40/434340016214bf4dace539d2c2c25054.jpg', stock: 15 },
      { color: 'Silver', imageUrl: 'https://i.pinimg.com/1200x/17/64/a0/1764a0f0c965c60dad06f7a88d95091c.jpg', stock: 15 },
      { color: 'Black', imageUrl: 'https://i.pinimg.com/1200x/d8/0c/77/d80c771e13b8cede79a02f9a869841d8.jpg', stock: 15 },
      { color: 'White', imageUrl: 'https://i.pinimg.com/1200x/b2/d2/94/b2d294c14978a09c86b1f1137278882a.jpg', stock: 15 },
      { color: 'Butterfly', imageUrl: 'https://i.pinimg.com/1200x/dc/13/52/dc135207d67678b5b63a5e6b7773ed67.jpg', stock: 15 } 
    ],
    isNewArrival: true,
    rating: 4.4,
    numReviews: 33
  },
  {
    name: 'Crystal Hair Accessories - Silver',
    description: 'Delicate crystal-encrusted hair clips and combs. Add sparkle to your updo or everyday hairstyle.',
    price: 1064.15,
    category: 'Accessories',
    stock: 30,
    imageUrl: 'https://i.pinimg.com/1200x/17/64/a0/1764a0f0c965c60dad06f7a88d95091c.jpg',
    variants: [
      { color: 'Silver', imageUrl: 'https://i.pinimg.com/1200x/17/64/a0/1764a0f0c965c60dad06f7a88d95091c.jpg', stock: 15 },
      { color: 'Purple', imageUrl: 'https://i.pinimg.com/1200x/43/43/40/434340016214bf4dace539d2c2c25054.jpg', stock: 15 },
      { color: 'Black', imageUrl: 'https://i.pinimg.com/1200x/d8/0c/77/d80c771e13b8cede79a02f9a869841d8.jpg', stock: 15 },
      { color: 'White', imageUrl: 'https://i.pinimg.com/1200x/b2/d2/94/b2d294c14978a09c86b1f1137278882a.jpg', stock: 15 },
      { color: 'Butterfly', imageUrl: 'https://i.pinimg.com/1200x/dc/13/52/dc135207d67678b5b63a5e6b7773ed67.jpg', stock: 15 } 
    ],
    isNewArrival: true,
    rating: 4.4,
    numReviews: 33
  },
  {
    name: 'Crystal Hair Accessories - Black',
    description: 'Delicate crystal-encrusted hair clips and combs. Add sparkle to your updo or everyday hairstyle.',
    price: 1064.15,
    category: 'Accessories',
    stock: 30,
    imageUrl: 'https://i.pinimg.com/1200x/d8/0c/77/d80c771e13b8cede79a02f9a869841d8.jpg',
    variants: [
      { color: 'Black', imageUrl: 'https://i.pinimg.com/1200x/d8/0c/77/d80c771e13b8cede79a02f9a869841d8.jpg', stock: 15 },,
      { color: 'Black', imageUrl: 'https://i.pinimg.com/1200x/d8/0c/77/d80c771e13b8cede79a02f9a869841d8.jpg', stock: 15 },
      { color: 'Purple', imageUrl: 'https://i.pinimg.com/1200x/43/43/40/434340016214bf4dace539d2c2c25054.jpg', stock: 15 },
      { color: 'Silver', imageUrl: 'https://i.pinimg.com/1200x/17/64/a0/1764a0f0c965c60dad06f7a88d95091c.jpg', stock: 15 },
      { color: 'White', imageUrl: 'https://i.pinimg.com/1200x/b2/d2/94/b2d294c14978a09c86b1f1137278882a.jpg', stock: 15 },
      { color: 'Butterfly', imageUrl: 'https://i.pinimg.com/1200x/dc/13/52/dc135207d67678b5b63a5e6b7773ed67.jpg', stock: 15 } 
    ],
    isNewArrival: true,
    rating: 4.4,
    numReviews: 33
  },
  {
    name: 'Crystal Hair Accessories - White',
    description: 'Delicate crystal-encrusted hair clips and combs. Add sparkle to your updo or everyday hairstyle.',
    price: 1064.15,
    category: 'Accessories',
    stock: 30,
    imageUrl: 'https://i.pinimg.com/1200x/b2/d2/94/b2d294c14978a09c86b1f1137278882a.jpg',
    variants: [
      { color: 'White', imageUrl: 'https://i.pinimg.com/1200x/b2/d2/94/b2d294c14978a09c86b1f1137278882a.jpg', stock: 15 },
      { color: 'Purple', imageUrl: 'https://i.pinimg.com/1200x/43/43/40/434340016214bf4dace539d2c2c25054.jpg', stock: 15 },
      { color: 'Silver', imageUrl: 'https://i.pinimg.com/1200x/17/64/a0/1764a0f0c965c60dad06f7a88d95091c.jpg', stock: 15 },
      { color: 'Black', imageUrl: 'https://i.pinimg.com/1200x/d8/0c/77/d80c771e13b8cede79a02f9a869841d8.jpg', stock: 15 },
      { color: 'Butterfly', imageUrl: 'https://i.pinimg.com/1200x/dc/13/52/dc135207d67678b5b63a5e6b7773ed67.jpg', stock: 15 } 
    ],
    isNewArrival: true,
    rating: 4.4,
    numReviews: 33
  },
  {
    name: 'Crystal Hair Accessories - Butterfly',
    description: 'Delicate crystal-encrusted hair clips and combs. Add sparkle to your updo or everyday hairstyle.',
    price: 1064.15,
    category: 'Accessories',
    stock: 30,
    imageUrl: 'https://i.pinimg.com/1200x/dc/13/52/dc135207d67678b5b63a5e6b7773ed67.jpg',
    variants: [
      { color: 'Butterfly', imageUrl: 'https://i.pinimg.com/1200x/dc/13/52/dc135207d67678b5b63a5e6b7773ed67.jpg', stock: 15 } ,
      { color: 'Purple', imageUrl: 'https://i.pinimg.com/1200x/43/43/40/434340016214bf4dace539d2c2c25054.jpg', stock: 15 },
      { color: 'Silver', imageUrl: 'https://i.pinimg.com/1200x/17/64/a0/1764a0f0c965c60dad06f7a88d95091c.jpg', stock: 15 },
      { color: 'Black', imageUrl: 'https://i.pinimg.com/1200x/d8/0c/77/d80c771e13b8cede79a02f9a869841d8.jpg', stock: 15 },
      { color: 'White', imageUrl: 'https://i.pinimg.com/1200x/b2/d2/94/b2d294c14978a09c86b1f1137278882a.jpg', stock: 15 }
    ],
    isNewArrival: true,
    rating: 4.4,
    numReviews: 33
  },
  {
    name: 'Embroidered Clutch',
    description: 'Hand-embroidered silk clutch with beaded detailing. Perfect complement to evening wear.',
    price: 1359.15,
    category: 'Accessories',
    stock: 16,
    imageUrl: 'https://i.pinimg.com/1200x/b9/27/cc/b927cc02e2b4832b0cf2e42563746ed6.jpg',
    variants: [
      { color: 'Black', imageUrl: 'https://i.pinimg.com/1200x/b9/27/cc/b927cc02e2b4832b0cf2e42563746ed6.jpg', stock: 8 },
      { color: 'Blue', imageUrl: 'https://i.pinimg.com/1200x/95/7b/ff/957bff37ff0de452125339efdb94af60.jpg', stock: 8 },
      { color: 'White', imageUrl: 'https://i.pinimg.com/736x/38/96/fb/3896fb70b1730a7db25393bdff5f132c.jpg', stock: 8 }
    ],
    isNewArrival: false,
    rating: 4.8,
    numReviews: 16
  },
  {
    name: 'Embroidered Clutch - Blue',
    description: 'Hand-embroidered silk clutch with beaded detailing. Perfect complement to evening wear.',
    price: 1359.15,
    category: 'Accessories',
    stock: 16,
    imageUrl: 'https://i.pinimg.com/1200x/95/7b/ff/957bff37ff0de452125339efdb94af60.jpg',
    variants: [
      { color: 'Blue', imageUrl: 'https://i.pinimg.com/1200x/95/7b/ff/957bff37ff0de452125339efdb94af60.jpg', stock: 8 },
      { color: 'Black', imageUrl: 'https://i.pinimg.com/1200x/b9/27/cc/b927cc02e2b4832b0cf2e42563746ed6.jpg', stock: 8 },
      { color: 'White', imageUrl: 'https://i.pinimg.com/736x/38/96/fb/3896fb70b1730a7db25393bdff5f132c.jpg', stock: 8 }
    ],
    isNewArrival: false,
    rating: 4.8,
    numReviews: 16
  },
  {
    name: 'Embroidered Clutch - White',
    description: 'Hand-embroidered silk clutch with beaded detailing. Perfect complement to evening wear.',
    price: 1359.15,
    category: 'Accessories',
    stock: 16,
    imageUrl: 'https://i.pinimg.com/736x/38/96/fb/3896fb70b1730a7db25393bdff5f132c.jpg',
    variants: [
      { color: 'White', imageUrl: 'https://i.pinimg.com/736x/38/96/fb/3896fb70b1730a7db25393bdff5f132c.jpg', stock: 8 },
      { color: 'Black', imageUrl: 'https://i.pinimg.com/1200x/b9/27/cc/b927cc02e2b4832b0cf2e42563746ed6.jpg', stock: 8 },
      { color: 'Blue', imageUrl: 'https://i.pinimg.com/1200x/95/7b/ff/957bff37ff0de452125339efdb94af60.jpg', stock: 8 }
    ],
    isNewArrival: false,
    rating: 4.8,
    numReviews: 16
  },
  {
    name: 'Designer Sunglasses',
    description: 'Luxury oversized sunglasses with gold accents and UV protection. Timeless style meets modern comfort.',
    price: 2379.15,
    category: 'Accessories',
    stock: 14,
    imageUrl: 'https://i.pinimg.com/736x/dc/57/0e/dc570e8a4f27bdc98352b1a0018d146b.jpg',
    variants: [
      { color: 'Pink', imageUrl: 'https://i.pinimg.com/736x/dc/57/0e/dc570e8a4f27bdc98352b1a0018d146b.jpg', stock: 7 },
      { color: 'Black', imageUrl: 'https://i.pinimg.com/736x/7a/33/38/7a3338b6f1af8b2f6dae90a9fac1efd4.jpg', stock: 7 },
      { color: 'Brown', imageUrl: 'https://i.pinimg.com/736x/df/15/e8/df15e8f2c4803285f0d9e78c16f0a555.jpg', stock: 7 }
    ],
    isNewArrival: true,
    rating: 4.7,
    numReviews: 25
  },
  {
    name: 'Designer Sunglasses - Black',
    description: 'Luxury oversized sunglasses with gold accents and UV protection. Timeless style meets modern comfort.',
    price: 2379.15,
    category: 'Accessories',
    stock: 14,
    imageUrl: 'https://i.pinimg.com/736x/7a/33/38/7a3338b6f1af8b2f6dae90a9fac1efd4.jpg',
    variants: [
      { color: 'Black', imageUrl: 'https://i.pinimg.com/736x/7a/33/38/7a3338b6f1af8b2f6dae90a9fac1efd4.jpg', stock: 7 },
      { color: 'Brown', imageUrl: 'https://i.pinimg.com/736x/df/15/e8/df15e8f2c4803285f0d9e78c16f0a555.jpg', stock: 7 },
      { color: 'Pink', imageUrl: 'https://i.pinimg.com/736x/dc/57/0e/dc570e8a4f27bdc98352b1a0018d146b.jpg', stock: 7 }
    ],
    isNewArrival: true,
    rating: 4.7,
    numReviews: 25
  },
  {
    name: 'Designer Sunglasses - Brown',
    description: 'Luxury oversized sunglasses with gold accents and UV protection. Timeless style meets modern comfort.',
    price: 2379.15,
    category: 'Accessories',
    stock: 14,
    imageUrl: 'https://i.pinimg.com/736x/df/15/e8/df15e8f2c4803285f0d9e78c16f0a555.jpg',
    variants: [
      { color: 'Brown', imageUrl: 'https://i.pinimg.com/736x/df/15/e8/df15e8f2c4803285f0d9e78c16f0a555.jpg', stock: 7 },
      { color: 'Black', imageUrl: 'https://i.pinimg.com/736x/7a/33/38/7a3338b6f1af8b2f6dae90a9fac1efd4.jpg', stock: 7 },
      { color: 'Pink', imageUrl: 'https://i.pinimg.com/736x/dc/57/0e/dc570e8a4f27bdc98352b1a0018d146b.jpg', stock: 7 }
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
    imageUrl: 'https://i.pinimg.com/1200x/a0/49/e4/a049e4bdb58ca6f388da6f47b5f466f5.jpg',
    variants: [
      { color: 'Rose Gold', imageUrl: 'https://i.pinimg.com/1200x/a0/49/e4/a049e4bdb58ca6f388da6f47b5f466f5.jpg', stock: 5 },
      { color: 'Black Gold', imageUrl: 'https://i.pinimg.com/1200x/d9/3e/42/d93e42b2bab26bd2a4a94216fca5dba6.jpg', stock: 4 },
      { color: 'Pink Gold', imageUrl: 'https://i.pinimg.com/1200x/ae/4a/7b/ae4a7be5ff11046ebc8f6e462adc9975.jpg', stock: 4 }
    ],
    isNewArrival: false,
    rating: 4.9,
    numReviews: 14
  },
  {
    name: 'Rose Gold Watch - Black Gold',
    description: 'Elegant rose gold watch with diamond bezel and leather strap. Sophisticated timepiece for the modern woman.',
    price: 3824.15,
    category: 'Accessories',
    stock: 9,
    imageUrl: 'https://i.pinimg.com/1200x/d9/3e/42/d93e42b2bab26bd2a4a94216fca5dba6.jpg',
    variants: [
      { color: 'Black Gold', imageUrl: 'https://i.pinimg.com/1200x/d9/3e/42/d93e42b2bab26bd2a4a94216fca5dba6.jpg', stock: 4 },
      { color: 'Rose Gold', imageUrl: 'https://i.pinimg.com/1200x/a0/49/e4/a049e4bdb58ca6f388da6f47b5f466f5.jpg', stock: 5 },
      { color: 'Pink Gold', imageUrl: 'https://i.pinimg.com/1200x/ae/4a/7b/ae4a7be5ff11046ebc8f6e462adc9975.jpg', stock: 4 }
    ],
    isNewArrival: false,
    rating: 4.9,
    numReviews: 14
  },
  {
    name: 'Rose Gold Watch - Pink Gold',
    description: 'Elegant rose gold watch with diamond bezel and leather strap. Sophisticated timepiece for the modern woman.',
    price: 3824.15,
    category: 'Accessories',
    stock: 9,
    imageUrl: 'https://i.pinimg.com/1200x/ae/4a/7b/ae4a7be5ff11046ebc8f6e462adc9975.jpg',
    variants: [
      { color: 'Pink Gold', imageUrl: 'https://i.pinimg.com/1200x/ae/4a/7b/ae4a7be5ff11046ebc8f6e462adc9975.jpg', stock: 4 },
      { color: 'Rose Gold', imageUrl: 'https://i.pinimg.com/1200x/a0/49/e4/a049e4bdb58ca6f388da6f47b5f466f5.jpg', stock: 5 },
      { color: 'Black Gold', imageUrl: 'https://i.pinimg.com/1200x/d9/3e/42/d93e42b2bab26bd2a4a94216fca5dba6.jpg', stock: 4 }
    ],
    isNewArrival: false,
    rating: 4.9,
    numReviews: 14
  },
  {
    name: 'Leather Ankle Boots',
    description: 'Premium leather ankle boots with block heel and side zipper. Versatile style for any season.',
    price: 2974.15,
    category: 'Accessories',
    stock: 18,
    imageUrl: 'https://i.pinimg.com/1200x/82/6e/22/826e226c96b6e4643a48fe3933da1cc8.jpg',
    variants: [
      { color: 'Black', imageUrl: 'https://i.pinimg.com/1200x/82/6e/22/826e226c96b6e4643a48fe3933da1cc8.jpg', stock: 9 },
      { color: 'Brown', imageUrl: 'https://i.pinimg.com/736x/d2/21/36/d2213672b28d496e308bb60c546daec4.jpg', stock: 9 },
      { color: 'White', imageUrl: 'https://i.pinimg.com/1200x/e6/e6/76/e6e67652de2b62d1e4c82caf7e7c39d3.jpg', stock: 9 },
      { color: 'Cream', imageUrl: 'https://i.pinimg.com/736x/21/1b/31/211b3105cee08f6b575ad2eb9fba1734.jpg', stock: 9 }
    ],
    isNewArrival: true,
    rating: 4.6,
    numReviews: 23
  },
  {
    name: 'Leather Ankle Boots - Brown',
    description: 'Premium leather ankle boots with block heel and side zipper. Versatile style for any season.',
    price: 2974.15,
    category: 'Accessories',
    stock: 18,
    imageUrl: 'https://i.pinimg.com/736x/d2/21/36/d2213672b28d496e308bb60c546daec4.jpg',
    variants: [
      { color: 'Brown', imageUrl: 'https://i.pinimg.com/736x/d2/21/36/d2213672b28d496e308bb60c546daec4.jpg', stock: 9 },
      { color: 'Black', imageUrl: 'https://i.pinimg.com/1200x/82/6e/22/826e226c96b6e4643a48fe3933da1cc8.jpg', stock: 9 },
      { color: 'White', imageUrl: 'https://i.pinimg.com/1200x/e6/e6/76/e6e67652de2b62d1e4c82caf7e7c39d3.jpg', stock: 9 },
      { color: 'Cream', imageUrl: 'https://i.pinimg.com/736x/21/1b/31/211b3105cee08f6b575ad2eb9fba1734.jpg', stock: 9 }
    ],
    isNewArrival: true,
    rating: 4.6,
    numReviews: 23
  },
  {
    name: 'Leather Ankle Boots - White',
    description: 'Premium leather ankle boots with block heel and side zipper. Versatile style for any season.',
    price: 2974.15,
    category: 'Accessories',
    stock: 18,
    imageUrl: 'https://i.pinimg.com/1200x/e6/e6/76/e6e67652de2b62d1e4c82caf7e7c39d3.jpg',
    variants: [
      { color: 'White', imageUrl: 'https://i.pinimg.com/1200x/e6/e6/76/e6e67652de2b62d1e4c82caf7e7c39d3.jpg', stock: 9 },
      { color: 'Black', imageUrl: 'https://i.pinimg.com/1200x/82/6e/22/826e226c96b6e4643a48fe3933da1cc8.jpg', stock: 9 },
      { color: 'Brown', imageUrl: 'https://i.pinimg.com/736x/d2/21/36/d2213672b28d496e308bb60c546daec4.jpg', stock: 9 },
      { color: 'Cream', imageUrl: 'https://i.pinimg.com/736x/21/1b/31/211b3105cee08f6b575ad2eb9fba1734.jpg', stock: 9 }
    ],
    isNewArrival: true,
    rating: 4.6,
    numReviews: 23
  },
  {
    name: 'Leather Ankle Boots - Cream',
    description: 'Premium leather ankle boots with block heel and side zipper. Versatile style for any season.',
    price: 2974.15,
    category: 'Accessories',
    stock: 18,
    imageUrl: 'https://i.pinimg.com/736x/21/1b/31/211b3105cee08f6b575ad2eb9fba1734.jpg',
    variants: [
      { color: 'Cream', imageUrl: 'https://i.pinimg.com/736x/21/1b/31/211b3105cee08f6b575ad2eb9fba1734.jpg', stock: 9 },
      { color: 'Black', imageUrl: 'https://i.pinimg.com/1200x/82/6e/22/826e226c96b6e4643a48fe3933da1cc8.jpg', stock: 9 },
      { color: 'Brown', imageUrl: 'https://i.pinimg.com/736x/d2/21/36/d2213672b28d496e308bb60c546daec4.jpg', stock: 9 },
      { color: 'White', imageUrl: 'https://i.pinimg.com/1200x/e6/e6/76/e6e67652de2b62d1e4c82caf7e7c39d3.jpg', stock: 9 }
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
    imageUrl: 'https://i.pinimg.com/1200x/1c/97/27/1c9727e0795545d01e2ecaeab09857c4.jpg',
    variants: [
      { color: 'Pink', imageUrl: 'https://i.pinimg.com/1200x/1c/97/27/1c9727e0795545d01e2ecaeab09857c4.jpg', stock: 16 },
      { color: 'Blue', imageUrl: 'https://i.pinimg.com/736x/c8/a0/e7/c8a0e72f8d24548e9fd9f6a2750a3766.jpg', stock: 16 },
      { color: 'Green', imageUrl: 'https://i.pinimg.com/736x/94/ca/eb/94caeb1ad863c1cdc993b3b1c4b34f90.jpg', stock: 16 }
    ],
    isNewArrival: true,
    rating: 4.4,
    numReviews: 29
  },
  {
    name: 'Silk Scarf - Blue',
    description: 'Luxurious silk scarf with artistic print and fringed edges. Elevate any outfit with this versatile accessory.',
    price: 764.15,
    category: 'Accessories',
    stock: 32,
    imageUrl: 'https://i.pinimg.com/736x/c8/a0/e7/c8a0e72f8d24548e9fd9f6a2750a3766.jpg',
    variants: [
      { color: 'Blue', imageUrl: 'https://i.pinimg.com/736x/c8/a0/e7/c8a0e72f8d24548e9fd9f6a2750a3766.jpg', stock: 16 },
      { color: 'Pink', imageUrl: 'https://i.pinimg.com/1200x/1c/97/27/1c9727e0795545d01e2ecaeab09857c4.jpg', stock: 16 },
      { color: 'Green', imageUrl: 'https://i.pinimg.com/736x/94/ca/eb/94caeb1ad863c1cdc993b3b1c4b34f90.jpg', stock: 16 }
    ],
    isNewArrival: true,
    rating: 4.4,
    numReviews: 29
  },
  {
    name: 'Silk Scarf - Green',
    description: 'Luxurious silk scarf with artistic print and fringed edges. Elevate any outfit with this versatile accessory.',
    price: 764.15,
    category: 'Accessories',
    stock: 32,
    imageUrl: 'https://i.pinimg.com/736x/94/ca/eb/94caeb1ad863c1cdc993b3b1c4b34f90.jpg',
    variants: [
      { color: 'Green', imageUrl: 'https://i.pinimg.com/736x/94/ca/eb/94caeb1ad863c1cdc993b3b1c4b34f90.jpg', stock: 16 },
      { color: 'Pink', imageUrl: 'https://i.pinimg.com/1200x/1c/97/27/1c9727e0795545d01e2ecaeab09857c4.jpg', stock: 16 },
      { color: 'Blue', imageUrl: 'https://i.pinimg.com/736x/c8/a0/e7/c8a0e72f8d24548e9fd9f6a2750a3766.jpg', stock: 16 }
    ],
    isNewArrival: true,
    rating: 4.4,
    numReviews: 29
  }
];

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