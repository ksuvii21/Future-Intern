import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaShoppingCart, FaFilter, FaStar, FaHeart } from 'react-icons/fa';

const StoreContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(to bottom, #000000, #0a0a0a);
  color: white;
  padding: 80px 20px;
`;

const PageHeader = styled.div`
  text-align: center;
  margin-bottom: 60px;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
`;

const PageTitle = styled.h1`
  font-size: 4rem;
  margin-bottom: 20px;
  letter-spacing: 2px;
  color: white;
  font-weight: 900;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const PageSubtitle = styled.p`
  font-size: 1.2rem;
  color: #9ca3af;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const MainContent = styled.div`
  display: grid;
  grid-template-columns: 250px 1fr;
  gap: 30px;
  max-width: 1400px;
  margin: 0 auto;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const FilterGroup = styled.div`
  background: linear-gradient(135deg, #1f2937, #111827);
  border: 1px solid #374151;
  border-radius: 10px;
  padding: 20px;
`;

const FilterTitle = styled.h3`
  font-size: 1.1rem;
  margin-bottom: 15px;
  color: white;
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 700;
`;

const FilterOption = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
  cursor: pointer;
  color: #d1d5db;
  transition: color 0.3s ease;

  input {
    cursor: pointer;
    accent-color: #BE0F34;
  }

  &:hover {
    color: white;
  }
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
`;

const ProductCard = styled(motion.div)`
  background: linear-gradient(135deg, #1f2937, #111827);
  border: 1px solid #374151;
  border-radius: 15px;
  overflow: hidden;
  transition: all 0.3s ease;

  &:hover {
    border-color: rgba(190, 15, 52, 0.5);
    box-shadow: 0 0 30px rgba(190, 15, 52, 0.2);
    transform: translateY(-5px);
  }
`;

const ProductImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 300px;
  overflow: hidden;
  background: #0f172a;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;

  ${ProductCard}:hover & {
    transform: scale(1.05);
  }
`;

const PlaceholderImage = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #374151, #1f2937);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  color: #6b7280;
`;

const WishlistButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: rgba(0, 0, 0, 0.7);
  border: none;
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  &:hover {
    background: #BE0F34;
    transform: scale(1.1);
  }
`;

const ProductInfo = styled.div`
  padding: 25px;
`;

const ProductName = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 10px;
  color: white;
  font-weight: 700;
`;

const ProductCategory = styled.p`
  font-size: 0.9rem;
  color: #BE0F34;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 12px;
`;

const ProductRating = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 15px;
`;

const StarIcon = styled(FaStar)`
  color: #BE0F34;
`;

const RatingText = styled.span`
  color: #9ca3af;
  font-size: 0.9rem;
`;

const ProductDescription = styled.p`
  color: #d1d5db;
  font-size: 0.95rem;
  margin-bottom: 15px;
  line-height: 1.5;
  min-height: 40px;
`;

const PriceSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

const Price = styled.div`
  display: flex;
  flex-direction: column;
`;

const OriginalPrice = styled.span`
  font-size: 0.9rem;
  color: #6b7280;
  text-decoration: line-through;
`;

const CurrentPrice = styled.span`
  font-size: 1.5rem;
  font-weight: bold;
  color: #BE0F34;
`;

const Discount = styled.span`
  background: #BE0F34;
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 0.85rem;
  font-weight: bold;
`;

const AddToCartButton = styled.button`
  width: 100%;
  background: linear-gradient(135deg, #BE0F34, #A00020);
  color: white;
  border: none;
  padding: 12px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 0 20px rgba(190, 15, 52, 0.5);
  }

  &:active {
    transform: scale(0.98);
  }
`;

const ViewAllButton = styled.button`
  width: 100%;
  background: transparent;
  color: white;
  border: 2px solid white;
  padding: 12px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s ease;
  margin-top: 10px;

  &:hover {
    background: white;
    color: black;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #9ca3af;

  h2 {
    font-size: 1.5rem;
    margin-bottom: 10px;
  }
`;

const storeProducts = [
  {
    id: 1,
    name: 'Chiron Limited Edition Watch',
    category: 'Accessories',
    price: 12500,
    originalPrice: 15000,
    discount: 17,
    rating: 4.8,
    reviews: 245,
    description: 'Luxury timepiece inspired by the W16 engine\'s precision and power',
    image: 'https://images.unsplash.com/photo-1523170335684-f042f1c82f8f?w=500&h=500&fit=crop'
  },
  {
    id: 2,
    name: 'Bugatti Heritage Collection Book',
    category: 'Books & Media',
    price: 250,
    originalPrice: 350,
    discount: 29,
    rating: 4.9,
    reviews: 156,
    description: '200-page illustrated history documenting 115 years of Bugatti excellence',
    image: 'https://images.unsplash.com/photo-1507842217343-583f20270319?w=500&h=500&fit=crop'
  },
  {
    id: 3,
    name: 'Veyron 1:18 Diecast Model',
    category: 'Models',
    price: 599,
    originalPrice: 799,
    discount: 25,
    rating: 4.7,
    reviews: 312,
    description: 'Precision die-cast replica with authentic details and opening parts',
    image: 'https://images.unsplash.com/photo-1609708536965-3eb88f835b90?w=500&h=500&fit=crop'
  },
  {
    id: 4,
    name: 'Bugatti Racing Suit',
    category: 'Apparel',
    price: 1800,
    originalPrice: 2400,
    discount: 25,
    rating: 4.6,
    reviews: 128,
    description: 'Premium racing apparel with Bugatti branding and professional materials',
    image: 'https://images.unsplash.com/photo-1591028097728-8c4eef1d10fe?w=500&h=500&fit=crop'
  },
  {
    id: 5,
    name: 'Carbon Fiber Key Holder',
    category: 'Accessories',
    price: 450,
    originalPrice: 600,
    discount: 25,
    rating: 4.9,
    reviews: 287,
    description: 'Authentic carbon fiber construction with precision-machined Bugatti emblem',
    image: 'https://images.unsplash.com/photo-1591737989029-a86b60f9b4cc?w=500&h=500&fit=crop'
  },
  {
    id: 6,
    name: 'Limited Edition Luggage Set',
    category: 'Travel',
    price: 3500,
    originalPrice: 4500,
    discount: 22,
    rating: 4.8,
    reviews: 94,
    description: '3-piece luxury luggage collection crafted from premium materials',
    image: 'https://images.unsplash.com/photo-1534224039826-c60a0ff4b569?w=500&h=500&fit=crop'
  },
  {
    id: 7,
    name: 'Chiron Art Print',
    category: 'Art',
    price: 180,
    originalPrice: 250,
    discount: 28,
    rating: 4.5,
    reviews: 73,
    description: 'Fine art print of the legendary Chiron with museum-quality materials',
    image: 'https://images.unsplash.com/photo-1572365992253-3cb3e56dd362?w=500&h=500&fit=crop'
  },
  {
    id: 8,
    name: 'Bugatti Heritage Fragrance',
    category: 'Fragrances',
    price: 320,
    originalPrice: 400,
    discount: 20,
    rating: 4.7,
    reviews: 189,
    description: 'Exclusive signature fragrance capturing the essence of Bugatti luxury',
    image: 'https://images.unsplash.com/photo-1594787318286-11b905e08622?w=500&h=500&fit=crop'
  },
  {
    id: 9,
    name: 'Titanium Cufflinks Set',
    category: 'Accessories',
    price: 850,
    originalPrice: 1200,
    discount: 29,
    rating: 4.8,
    reviews: 102,
    description: 'Sophisticated titanium cufflinks with precision Bugatti craftsmanship',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&h=500&fit=crop'
  },
  {
    id: 10,
    name: 'Bugatti Motorsport Cap',
    category: 'Apparel',
    price: 120,
    originalPrice: 180,
    discount: 33,
    rating: 4.6,
    reviews: 218,
    description: 'Premium motorsport-inspired cap with embroidered Bugatti logo',
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=500&h=500&fit=crop'
  },
  {
    id: 11,
    name: 'Leather Driving Gloves',
    category: 'Accessories',
    price: 380,
    originalPrice: 500,
    discount: 24,
    rating: 4.7,
    reviews: 145,
    description: 'Premium leather gloves designed for performance and comfort',
    image: 'https://images.unsplash.com/photo-1582452402894-97b25acb22f9?w=500&h=500&fit=crop'
  },
  {
    id: 12,
    name: 'Chiron Chronograph Watch',
    category: 'Accessories',
    price: 8900,
    originalPrice: 12000,
    discount: 26,
    rating: 4.9,
    reviews: 167,
    description: 'Swiss-made chronograph inspired by W16 engineering precision',
    image: 'https://images.unsplash.com/photo-1548690596-f3a1e7c17c73?w=500&h=500&fit=crop'
  }
];

const Store = () => {
  const [products, setProducts] = useState(storeProducts);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [wishlistItems, setWishlistItems] = useState(new Set());

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const categories = [...new Set(storeProducts.map(p => p.category))];

  const handleCategoryChange = (category) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const toggleWishlist = (productId) => {
    const newWishlist = new Set(wishlistItems);
    if (newWishlist.has(productId)) {
      newWishlist.delete(productId);
    } else {
      newWishlist.add(productId);
    }
    setWishlistItems(newWishlist);
  };

  const filteredProducts = storeProducts.filter(product => {
    const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(product.category);
    const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1];
    return categoryMatch && priceMatch;
  });

  return (
    <StoreContainer>
      <PageHeader>
        <PageTitle>BUGATTI STORE</PageTitle>
        <PageSubtitle>
          Curated collection of exclusive merchandise and luxury items from the world of Bugatti
        </PageSubtitle>
      </PageHeader>

      <MainContent>
        <Sidebar>
          <FilterGroup>
            <FilterTitle>
              <FaFilter /> CATEGORIES
            </FilterTitle>
            {categories.map(category => (
              <FilterOption key={category}>
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category)}
                  onChange={() => handleCategoryChange(category)}
                />
                {category}
              </FilterOption>
            ))}
          </FilterGroup>

          <FilterGroup>
            <FilterTitle>PRICE RANGE</FilterTitle>
            <FilterOption>
              <input
                type="range"
                min="0"
                max="5000"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                style={{ width: '100%' }}
              />
            </FilterOption>
            <div style={{ color: '#d1d5db', marginTop: '10px' }}>
              $0 - ${priceRange[1].toLocaleString()}
            </div>
          </FilterGroup>
        </Sidebar>

        <div>
          {filteredProducts.length > 0 ? (
            <>
              <ProductsGrid>
                {filteredProducts.map((product, index) => (
                  <ProductCard
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <ProductImageWrapper>
                      {product.image ? (
                        <ProductImage src={product.image} alt={product.name} />
                      ) : (
                        <PlaceholderImage>Product Image</PlaceholderImage>
                      )}
                      <WishlistButton
                        onClick={() => toggleWishlist(product.id)}
                        style={{
                          background: wishlistItems.has(product.id) ? '#BE0F34' : 'rgba(0, 0, 0, 0.7)'
                        }}
                      >
                        <FaHeart fill={wishlistItems.has(product.id) ? 'white' : 'none'} />
                      </WishlistButton>
                    </ProductImageWrapper>
                    <ProductInfo>
                      <ProductCategory>{product.category}</ProductCategory>
                      <ProductName>{product.name}</ProductName>
                      <ProductRating>
                        {[...Array(5)].map((_, i) => (
                          <StarIcon key={i} size={14} color={i < Math.floor(product.rating) ? '#BE0F34' : '#4b5563'} />
                        ))}
                        <RatingText>({product.reviews})</RatingText>
                      </ProductRating>
                      <ProductDescription>{product.description}</ProductDescription>
                      <PriceSection>
                        <Price>
                          {product.originalPrice > product.price && (
                            <OriginalPrice>${product.originalPrice.toLocaleString()}</OriginalPrice>
                          )}
                          <CurrentPrice>${product.price.toLocaleString()}</CurrentPrice>
                        </Price>
                        {product.discount > 0 && (
                          <Discount>-{product.discount}%</Discount>
                        )}
                      </PriceSection>
                      <AddToCartButton>
                        <FaShoppingCart /> ADD TO CART
                      </AddToCartButton>
                      <ViewAllButton>VIEW DETAILS</ViewAllButton>
                    </ProductInfo>
                  </ProductCard>
                ))}
              </ProductsGrid>
            </>
          ) : (
            <EmptyState>
              <h2>No products found</h2>
              <p>Try adjusting your filters to find more products</p>
            </EmptyState>
          )}
        </div>
      </MainContent>
    </StoreContainer>
  );
};

export default Store;
