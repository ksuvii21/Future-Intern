import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaShoppingCart, FaFilter, FaStar, FaHeart, FaArrowRight } from 'react-icons/fa';

const StoreContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(to bottom, #000000, #0a0a0a);
  color: white;
  padding: 80px 20px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -10%;
    width: 600px;
    height: 600px;
    background: radial-gradient(circle, rgba(190, 15, 52, 0.08) 0%, transparent 70%);
    border-radius: 50%;
    pointer-events: none;
    z-index: 0;
  }
`;

const PageHeader = styled(motion.div)`
  text-align: center;
  margin-bottom: 80px;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  z-index: 2;
`;

const PageTitle = styled.h1`
  font-size: 4.5rem;
  margin-bottom: 20px;
  letter-spacing: 3px;
  color: white;
  font-weight: 900;
  text-transform: uppercase;

  span {
    color: #BE0F34;
  }

  @media (max-width: 768px) {
    font-size: 2.5rem;
    letter-spacing: 2px;
  }
`;

const PageSubtitle = styled.p`
  font-size: 1.1rem;
  color: #cccccc;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.8;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const MainContent = styled.div`
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 40px;
  max-width: 1600px;
  margin: 0 auto;
  position: relative;
  z-index: 1;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;

  @media (max-width: 1024px) {
    flex-direction: row;
    flex-wrap: wrap;
    gap: 15px;
  }
`;

const FilterGroup = styled(motion.div)`
  background: linear-gradient(135deg, rgba(26, 26, 26, 0.8), rgba(13, 13, 13, 0.8));
  border: 1px solid rgba(190, 15, 52, 0.2);
  border-radius: 8px;
  padding: 25px 20px;
  backdrop-filter: blur(10px);

  @media (max-width: 1024px) {
    flex: 1;
    min-width: 200px;
  }
`;

const FilterTitle = styled.h3`
  font-size: 1.1rem;
  margin-bottom: 18px;
  color: white;
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;

  svg {
    color: #BE0F34;
  }
`;

const FilterOption = styled.label`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 14px;
  cursor: pointer;
  color: #d1d5db;
  transition: all 0.3s ease;
  font-size: 0.95rem;

  input {
    cursor: pointer;
    accent-color: #BE0F34;
    width: 18px;
    height: 18px;
  }

  &:hover {
    color: #BE0F34;
    transform: translateX(5px);
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

const PriceRangeInput = styled.input`
  width: 100%;
  accent-color: #BE0F34;
  cursor: pointer;
  margin-bottom: 10px;

  &::-webkit-slider-thumb {
    background: #BE0F34;
    border: 2px solid #ffffff;
    cursor: pointer;
  }
`;

const PriceDisplay = styled.div`
  color: #d1d5db;
  font-size: 0.95rem;
  padding: 10px;
  background: rgba(190, 15, 52, 0.1);
  border-left: 3px solid #BE0F34;
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 35px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 25px;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ProductCard = styled(motion.div)`
  background: linear-gradient(135deg, rgba(26, 26, 26, 0.9), rgba(13, 13, 13, 0.9));
  border: 1px solid rgba(190, 15, 52, 0.15);
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(190, 15, 52, 0.1), transparent);
    transition: left 0.5s ease;
    z-index: 10;
  }

  &:hover {
    border-color: rgba(190, 15, 52, 0.4);
    box-shadow: 0 20px 60px rgba(190, 15, 52, 0.25);
    transform: translateY(-12px);

    &::before {
      left: 100%;
    }
  }
`;

const ProductImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 320px;
  overflow: hidden;
  background: linear-gradient(135deg, rgba(190, 15, 52, 0.05), transparent);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;

  ${ProductCard}:hover & {
    transform: scale(1.08);
  }
`;

const DiscountBadge = styled.div`
  position: absolute;
  top: 15px;
  left: 15px;
  background: #BE0F34;
  color: white;
  padding: 8px 14px;
  border-radius: 4px;
  font-size: 0.85rem;
  font-weight: 700;
  z-index: 20;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const WishlistButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: rgba(0, 0, 0, 0.6);
  border: 2px solid rgba(190, 15, 52, 0.3);
  color: white;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  z-index: 20;
  font-size: 1.2rem;

  &:hover {
    background: #BE0F34;
    border-color: #BE0F34;
    transform: scale(1.15);
  }

  &.active {
    background: #BE0F34;
    border-color: #BE0F34;
    color: white;
  }
`;

const ProductInfo = styled.div`
  padding: 28px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const ProductName = styled.h3`
  font-size: 1.35rem;
  margin-bottom: 8px;
  color: white;
  font-weight: 700;
  line-height: 1.3;
`;

const ProductCategory = styled.p`
  font-size: 0.85rem;
  color: #BE0F34;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  margin-bottom: 15px;
  font-weight: 600;
`;

const ProductRating = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 15px;
  flex-wrap: wrap;
`;

const StarIcon = styled(FaStar)`
  color: #BE0F34;
  font-size: 0.9rem;
`;

const RatingText = styled.span`
  color: #9ca3af;
  font-size: 0.9rem;
  margin-left: 5px;
`;

const ProductDescription = styled.p`
  color: #d1d5db;
  font-size: 0.95rem;
  margin-bottom: 20px;
  line-height: 1.6;
  flex-grow: 1;
`;

const PriceSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(190, 15, 52, 0.15);
`;

const Price = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const OriginalPrice = styled.span`
  font-size: 0.9rem;
  color: #6b7280;
  text-decoration: line-through;
`;

const CurrentPrice = styled.span`
  font-size: 1.7rem;
  font-weight: 900;
  color: #BE0F34;
  letter-spacing: 0.5px;
`;

const AddToCartButton = styled(motion.button)`
  width: 100%;
  background: linear-gradient(135deg, #BE0F34 0%, #A00020 100%);
  color: white;
  border: none;
  padding: 15px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 700;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 0.95rem;
  position: relative;
  overflow: hidden;
  margin-bottom: 10px;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s ease;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(190, 15, 52, 0.4);

    &::before {
      left: 100%;
    }
  }

  &:active {
    transform: translateY(0);
  }
`;

const ViewDetailsButton = styled(motion.button)`
  width: 100%;
  background: transparent;
  color: #BE0F34;
  border: 2px solid #BE0F34;
  padding: 12px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 700;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:hover {
    background: #BE0F34;
    color: white;

    svg {
      transform: translateX(5px);
    }
  }

  svg {
    transition: transform 0.3s ease;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 80px 20px;
  color: #9ca3af;
  grid-column: 1 / -1;

  h2 {
    font-size: 1.8rem;
    margin-bottom: 10px;
    color: white;
  }

  p {
    font-size: 1.1rem;
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
  const [priceRange, setPriceRange] = useState([0, 20000]);
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <StoreContainer>
      <PageHeader
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <PageTitle>
          BUGATTI <span>STORE</span>
        </PageTitle>
        <PageSubtitle>
          Curated collection of exclusive merchandise and luxury items from the world of Bugatti
        </PageSubtitle>
      </PageHeader>

      <MainContent>
        <Sidebar>
          <FilterGroup
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
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

          <FilterGroup
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <FilterTitle>PRICE RANGE</FilterTitle>
            <PriceRangeInput
              type="range"
              min="0"
              max="20000"
              step="100"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
            />
            <PriceDisplay>
              $0 - ${priceRange[1].toLocaleString()}
            </PriceDisplay>
          </FilterGroup>
        </Sidebar>

        <div>
          {filteredProducts.length > 0 ? (
            <ProductsGrid
              as={motion.div}
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {filteredProducts.map((product, index) => (
                <ProductCard key={product.id} variants={itemVariants}>
                  <ProductImageWrapper>
                    <ProductImage src={product.image} alt={product.name} />
                    {product.discount > 0 && (
                      <DiscountBadge>-{product.discount}%</DiscountBadge>
                    )}
                    <WishlistButton
                      onClick={() => toggleWishlist(product.id)}
                      className={wishlistItems.has(product.id) ? 'active' : ''}
                    >
                      <FaHeart fill={wishlistItems.has(product.id) ? 'currentColor' : 'none'} />
                    </WishlistButton>
                  </ProductImageWrapper>
                  <ProductInfo>
                    <ProductCategory>{product.category}</ProductCategory>
                    <ProductName>{product.name}</ProductName>
                    <ProductRating>
                      {[...Array(5)].map((_, i) => (
                        <StarIcon key={i} color={i < Math.floor(product.rating) ? '#BE0F34' : '#4b5563'} />
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
                    </PriceSection>
                    <AddToCartButton whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <FaShoppingCart /> ADD TO CART
                    </AddToCartButton>
                    <ViewDetailsButton whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      VIEW DETAILS <FaArrowRight />
                    </ViewDetailsButton>
                  </ProductInfo>
                </ProductCard>
              ))}
            </ProductsGrid>
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
