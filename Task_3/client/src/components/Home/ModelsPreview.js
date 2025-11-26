import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { FaStar, FaArrowRight } from 'react-icons/fa';

const Section = styled.section`
  padding: 120px 40px;
  background: linear-gradient(135deg, #000000 0%, #0a0a0a 100%);
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 80px 20px;
  }
`;

const BackgroundAccent = styled.div`
  position: absolute;
  top: -50%;
  right: -10%;
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(190, 15, 52, 0.1) 0%, transparent 70%);
  border-radius: 50%;
  pointer-events: none;
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 2;
  max-width: 1400px;
  margin: 0 auto;
`;

const SectionTitle = styled(motion.h2)`
  text-align: center;
  font-size: 4rem;
  margin-bottom: 20px;
  color: #ffffff;
  font-weight: 700;
  letter-spacing: 3px;
  text-transform: uppercase;

  span {
    color: #BE0F34;
  }

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const SectionSubtitle = styled(motion.p)`
  text-align: center;
  font-size: 1.1rem;
  color: #cccccc;
  margin-bottom: 80px;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.8;
`;

const ModelsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
  gap: 50px;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 30px;
  }
`;

const ModelCard = styled(motion.div)`
  background: linear-gradient(135deg, #1a1a1a 0%, #0d0d0d 100%);
  border-radius: 0;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(190, 15, 52, 0.15);
  border: 1px solid rgba(190, 15, 52, 0.2);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  display: flex;
  flex-direction: column;

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
    transform: translateY(-15px);
    box-shadow: 0 30px 80px rgba(190, 15, 52, 0.3);
    border-color: rgba(190, 15, 52, 0.5);

    &::before {
      left: 100%;
    }
  }
`;

const ModelImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 350px;
  overflow: hidden;
  background: linear-gradient(135deg, rgba(190, 15, 52, 0.1), transparent);
`;

const ModelImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;

  ${ModelCard}:hover & {
    transform: scale(1.05);
  }
`;

const ModelImageOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.8) 100%);
`;

const ModelBadge = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  background: #BE0F34;
  color: white;
  padding: 8px 16px;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  z-index: 20;
`;

const ModelContent = styled.div`
  padding: 35px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.8), rgba(20, 20, 20, 0.8));
`;

const ModelName = styled.h3`
  font-size: 1.8rem;
  margin-bottom: 8px;
  color: #ffffff;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
`;

const ModelCategory = styled.p`
  font-size: 0.9rem;
  color: #BE0F34;
  margin-bottom: 15px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  font-weight: 600;
`;

const ModelPrice = styled.p`
  font-size: 1.6rem;
  color: #ffffff;
  margin-bottom: 20px;
  font-weight: 700;
`;

const RatingContainer = styled.div`
  display: flex;
  gap: 6px;
  margin-bottom: 20px;
`;

const StarIcon = styled(FaStar)`
  color: #BE0F34;
  font-size: 0.85rem;
`;

const SpecsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  margin-bottom: 25px;
  padding-bottom: 25px;
  border-bottom: 1px solid rgba(190, 15, 52, 0.2);
`;

const Spec = styled.div`
  text-align: center;
  padding: 12px;
  background: rgba(190, 15, 52, 0.08);
  border-left: 3px solid #BE0F34;
`;

const SpecValue = styled.div`
  font-size: 1.2rem;
  font-weight: 700;
  color: #BE0F34;
  margin-bottom: 3px;
`;

const SpecLabel = styled.div`
  font-size: 0.7rem;
  color: #999999;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const DiscoverButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background: #BE0F34;
  color: white;
  padding: 14px 0;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-weight: 700;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  margin-top: auto;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: #8B0A27;
    transition: left 0.3s ease;
    z-index: -1;
  }

  &:hover {
    &::before {
      left: 0;
    }
  }
`;

const ViewAllContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 80px;
`;

const ViewAllButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 15px;
  background: transparent;
  color: #BE0F34;
  border: 2px solid #BE0F34;
  text-align: center;
  padding: 18px 50px;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-weight: 700;
  font-size: 1rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: #BE0F34;
    transition: left 0.3s ease;
    z-index: -1;
  }

  &:hover {
    color: white;

    &::before {
      left: 0;
    }

    svg {
      transform: translateX(5px);
    }
  }

  svg {
    transition: transform 0.3s ease;
  }
`;

const ModelsPreview = () => {
  const [featuredCars, setFeaturedCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedCars = async () => {
      try {
        const API_BASE = (process.env.REACT_APP_API_URL || '').replace(/\/$/, '');
        const url = API_BASE ? `${API_BASE}/api/cars` : `/api/cars`;
        const { data } = await axios.get(url);
        setFeaturedCars(Array.isArray(data) ? data.slice(0, 3) : []);
      } catch (error) {
        // normalize error message
        const msg = error && error.message ? error.message : String(error);
        console.error('Error fetching featured cars:', msg);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedCars();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <Section>
      <BackgroundAccent />
      <ContentWrapper>
        <SectionTitle
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Iconic <span>Masterpieces</span>
        </SectionTitle>
        <SectionSubtitle
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Discover our most celebrated models, where unprecedented performance meets timeless design and unparalleled luxury.
        </SectionSubtitle>

        <ModelsGrid
          as={motion.div}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {loading ? (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', color: '#BE0F34' }}>
              <p style={{ fontSize: '1.2rem' }}>Loading models...</p>
            </div>
          ) : (
            featuredCars.map((car, index) => (
              <ModelCard key={car._id} variants={itemVariants}>
                <ModelImageWrapper>
                  <ModelImage src={car.images[0]} alt={car.name} />
                  <ModelImageOverlay />
                  <ModelBadge>FEATURED</ModelBadge>
                </ModelImageWrapper>
                <ModelContent>
                  <ModelCategory>{car.model}</ModelCategory>
                  <ModelName>{car.name}</ModelName>
                  <ModelPrice>{car.price}</ModelPrice>

                  <RatingContainer>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <StarIcon key={i} />
                    ))}
                  </RatingContainer>

                  <SpecsContainer>
                    <Spec>
                      <SpecValue>{car.horsepower}</SpecValue>
                      <SpecLabel>HP</SpecLabel>
                    </Spec>
                    <Spec>
                      <SpecValue>{car.topSpeed}</SpecValue>
                      <SpecLabel>km/h</SpecLabel>
                    </Spec>
                  </SpecsContainer>

                  <DiscoverButton to={`/models/${car._id}`}>
                    EXPLORE <FaArrowRight size={14} />
                  </DiscoverButton>
                </ModelContent>
              </ModelCard>
            ))
          )}
        </ModelsGrid>

        <ViewAllContainer>
          <ViewAllButton to="/models">
            VIEW ALL MODELS <FaArrowRight size={18} />
          </ViewAllButton>
        </ViewAllContainer>
      </ContentWrapper>
    </Section>
  );
};

export default ModelsPreview;