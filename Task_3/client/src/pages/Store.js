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
    reviews: 45,
    description: 'Luxury timepiece inspired by the W16 engine\'s precision',
    image: null
  },
  {
    id: 2,
    name: 'Bugatti Heritage Collection Book',
    category: 'Books & Media',
    price: 250,
    originalPrice: 350,
    discount: 29,
    rating: 4.9,
    reviews: 32,
    description: '200-page illustrated history of Bugatti excellence',
    image: null
  },
  {
    id: 3,
    name: 'Veyron 1:18 Diecast Model',
    category: 'Models',
    price: 599,
    originalPrice: 799,
    discount: 25,
    rating: 4.7,
    reviews: 61,
    description: 'Precision die-cast replica with authentic details',
    image: null
  },
  {
    id: 4,
    name: 'Bugatti Racing Suit',
    category: 'Apparel',
    price: 1800,
    originalPrice: 2400,
    discount: 25,
    rating: 4.6,
    reviews: 28,
    description: 'Premium racing apparel with Bugatti branding',
    image: null
  },
  {
    id: 5,
    name: 'Carbon Fiber Key Holder',
    category: 'Accessories',
    price: 450,
    originalPrice: 600,
    discount: 25,
    rating: 4.9,
    reviews: 52,
    description: 'Authentic carbon fiber with Bugatti logo',
    image: null
  },
  {
    id: 6,
    name: 'Limited Edition Luggage Set',
    category: 'Travel',
    price: 3500,
    originalPrice: 4500,
    discount: 22,
    rating: 4.8,
    reviews: 19,
    description: '3-piece luxury luggage collection',
    image: null
  },
  {
    id: 7,
    name: 'Chiron Art Print',
    category: 'Art',
    price: 180,
    originalPrice: 250,
    discount: 28,
    rating: 4.5,
    reviews: 37,
    description: 'Fine art print of the legendary Chiron',
    image: null
  },
  {
    id: 8,
    name: 'Bugatti Heritage Fragrance',
    category: 'Fragrances',
    price: 320,
    originalPrice: 400,
    discount: 20,
    rating: 4.7,
    reviews: 44,
    description: 'Exclusive Bugatti signature fragrance',
    image: null
  }
];

const Store = () => {
  const [products, setProducts] = useState(storeProducts);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [wishlistItems, setWishlistItems] = useState(new Set());

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
