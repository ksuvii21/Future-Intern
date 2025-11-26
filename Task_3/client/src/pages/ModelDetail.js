import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaArrowRight, FaCheck } from 'react-icons/fa';

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const DetailContainer = styled.div`
  padding-top: 80px;
  min-height: 100vh;
  background: #000000;
  color: #ffffff;
`;

const HeroSection = styled(motion.div)`
  height: 75vh;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.3), rgba(190, 15, 52, 0.1)),
    url(${props => props.$bgImage}) center/cover;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.7) 100%);
  }
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
`;

const HeroTitle = styled(motion.h1)`
  font-size: 5rem;
  margin-bottom: 20px;
  text-transform: uppercase;
  letter-spacing: 4px;
  font-weight: 700;

  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;

const HeroPrice = styled(motion.p)`
  font-size: 2rem;
  font-weight: 700;
  color: #BE0F34;
  letter-spacing: 2px;
`;

const HeroAcceleration = styled(motion.p)`
  font-size: 1.2rem;
  color: #cccccc;
  margin-top: 15px;
  letter-spacing: 1px;
`;

const ContentSection = styled.div`
  padding: 100px 40px;
  max-width: 1400px;
  margin: 0 auto;
  border-bottom: 1px solid rgba(190, 15, 52, 0.2);

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 768px) {
    padding: 60px 20px;
  }
`;

const SectionTitle = styled(motion.h2)`
  font-size: 3.5rem;
  margin-bottom: 40px;
  text-align: center;
  color: #ffffff;
  letter-spacing: 2px;
  text-transform: uppercase;

  span {
    color: #BE0F34;
  }

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const SectionSubtitle = styled.p`
  max-width: 700px;
  margin: 0 auto 60px auto;
  font-size: 1.1rem;
  line-height: 1.8;
  color: #999999;
  text-align: center;
`;

const OverviewGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  margin-bottom: 80px;
  align-items: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 40px;
  }
`;

const OverviewImage = styled(motion.img)`
  width: 100%;
  border-radius: 0;
  box-shadow: 0 30px 80px rgba(190, 15, 52, 0.2);
  margin-bottom: 0;
`;

const OverviewText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  p {
    line-height: 1.9;
    font-size: 1.1rem;
    color: #cccccc;
  }
`;

const SpecsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
  margin-top: 60px;
`;

const SpecItem = styled(motion.div)`
  background: linear-gradient(135deg, rgba(190, 15, 52, 0.1), rgba(190, 15, 52, 0.05));
  padding: 40px;
  border-radius: 0;
  text-align: center;
  border-left: 4px solid #BE0F34;
  border-top: 1px solid rgba(190, 15, 52, 0.2);
  transition: all 0.3s ease;

  &:hover {
    background: linear-gradient(135deg, rgba(190, 15, 52, 0.15), rgba(190, 15, 52, 0.1));
    transform: translateY(-5px);
  }
`;

const SpecLabel = styled.div`
  font-size: 0.95rem;
  color: #999999;
  margin-bottom: 15px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
`;

const SpecValue = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: #BE0F34;
`;

const FeaturesSection = styled(ContentSection)`
  background: linear-gradient(135deg, rgba(20, 20, 20, 0.5), rgba(0, 0, 0, 0.8));
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
`;

const FeatureItem = styled(motion.div)`
  background: linear-gradient(135deg, rgba(190, 15, 52, 0.08), transparent);
  padding: 35px;
  border-radius: 0;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
  border-left: 4px solid #BE0F34;
  border-bottom: 1px solid rgba(190, 15, 52, 0.1);
  display: flex;
  align-items: flex-start;
  gap: 20px;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 60px rgba(190, 15, 52, 0.2);
  }

  h4 {
    font-size: 1.3rem;
    margin-bottom: 10px;
    color: #ffffff;
    letter-spacing: 1px;
    text-transform: uppercase;
  }

  p {
    color: #cccccc;
    line-height: 1.6;
    font-size: 0.95rem;
  }
`;

const FeatureIcon = styled.div`
  color: #BE0F34;
  font-size: 1.5rem;
  flex-shrink: 0;
  margin-top: 3px;
`;

const FeatureContent = styled.div`
  flex: 1;
`;

const GallerySection = styled(ContentSection)``;

const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
`;

const GalleryImage = styled(motion.img)`
  width: 100%;
  border-radius: 0;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    filter: brightness(1.15);
    transform: scale(1.02);
    box-shadow: 0 20px 60px rgba(190, 15, 52, 0.3);
  }
`;

const BackButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 12px 30px;
  background: rgba(190, 15, 52, 0.1);
  color: #BE0F34;
  text-decoration: none;
  border: 1px solid #BE0F34;
  border-radius: 0;
  margin: 40px;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 600;
  font-size: 0.9rem;

  &:hover {
    background: #BE0F34;
    color: white;
  }

  @media (max-width: 768px) {
    margin: 20px;
  }
`;

const ModelDetail = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/cars/${id}`);
        setCar(data);
      } catch (error) {
        console.error("Error fetching car details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCar();
  }, [id]);

  if (loading) {
    return (
      <DetailContainer>
        <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <p style={{ fontSize: '1.5rem', color: '#BE0F34' }}>Loading...</p>
        </div>
      </DetailContainer>
    );
  }

  if (!car) {
    return (
      <DetailContainer>
        <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <p style={{ fontSize: '1.5rem', color: '#999' }}>Car not found</p>
        </div>
      </DetailContainer>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <DetailContainer>
      <BackButton to="/models">← BACK TO MODELS</BackButton>

      <HeroSection $bgImage={car.images[0]} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.8 }}>
        <HeroContent>
          <HeroTitle initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2, duration: 0.8 }}>
            {car.name}
          </HeroTitle>
          <HeroPrice initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4, duration: 0.8 }}>
            {car.price}
          </HeroPrice>
          <HeroAcceleration initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.6, duration: 0.8 }}>
            {car.acceleration}
          </HeroAcceleration>
        </HeroContent>
      </HeroSection>

      <ContentSection>
        <SectionTitle initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          The <span>Quintessence</span> of Luxury
        </SectionTitle>
        <OverviewGrid>
          <OverviewImage src={car.images[1] || car.images[0]} alt={`${car.name} view`} initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} />
          <OverviewText>
            <p>{car.description}</p>
            {car.features && car.features.slice(0, 4).map((feature, index) => (
              <motion.div key={index} style={{ display: 'flex', gap: '15px', alignItems: 'flex-start' }} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1, duration: 0.6 }} viewport={{ once: true }}>
                <FaCheck style={{ color: '#BE0F34', marginTop: '5px', flexShrink: 0 }} />
                <span>{feature}</span>
              </motion.div>
            ))}
          </OverviewText>
        </OverviewGrid>
      </ContentSection>

      <ContentSection>
        <SectionTitle initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <span>Performance</span> Metrics
        </SectionTitle>
        <SectionSubtitle>Engineered for an unparalleled driving experience, pushing the boundaries of speed, power, and agility.</SectionSubtitle>
        <SpecsGrid as={motion.div} variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <SpecItem variants={itemVariants}>
            <SpecLabel>Power Output</SpecLabel>
            <SpecValue>{car.horsepower} HP</SpecValue>
          </SpecItem>
          <SpecItem variants={itemVariants}>
            <SpecLabel>Top Speed</SpecLabel>
            <SpecValue>{car.topSpeed} km/h</SpecValue>
          </SpecItem>
          <SpecItem variants={itemVariants}>
            <SpecLabel>Acceleration</SpecLabel>
            <SpecValue>{car.acceleration}</SpecValue>
          </SpecItem>
          <SpecItem variants={itemVariants}>
            <SpecLabel>Engine</SpecLabel>
            <SpecValue style={{ fontSize: '1.1rem' }}>{car.technicalSpecs?.engine || 'N/A'}</SpecValue>
          </SpecItem>
          <SpecItem variants={itemVariants}>
            <SpecLabel>Transmission</SpecLabel>
            <SpecValue style={{ fontSize: '1.1rem' }}>{car.technicalSpecs?.transmission || 'N/A'}</SpecValue>
          </SpecItem>
          <SpecItem variants={itemVariants}>
            <SpecLabel>Drivetrain</SpecLabel>
            <SpecValue style={{ fontSize: '1.1rem' }}>{car.technicalSpecs?.drivetrain || 'N/A'}</SpecValue>
          </SpecItem>
        </SpecsGrid>
      </ContentSection>

      <FeaturesSection>
        <SectionTitle initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          Key <span>Features</span>
        </SectionTitle>
        <FeaturesGrid as={motion.div} variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          {car.features?.map((feature, index) => (
            <FeatureItem key={index} variants={itemVariants}>
              <FeatureIcon>
                <FaCheck />
              </FeatureIcon>
              <FeatureContent>
                <p>{feature}</p>
              </FeatureContent>
            </FeatureItem>
          ))}
        </FeaturesGrid>
      </FeaturesSection>

      <GallerySection>
        <SectionTitle initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <span>Gallery</span>
        </SectionTitle>
        <GalleryGrid as={motion.div} variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          {car.images.map((img, index) => (
            <GalleryImage key={index} src={img} alt={`${car.name} gallery image ${index + 1}`} variants={itemVariants} />
          ))}
        </GalleryGrid>
      </GallerySection>
    </DetailContainer>
  );
};

export default ModelDetail;
