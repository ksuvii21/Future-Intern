import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { motion } from 'framer-motion';
import CarCard from '../components/Models/CarCard';

const ModelsContainer = styled.div`
  padding-top: 80px;
  min-height: 100vh;
  background: #000000;
  position: relative;
`;

const ModelsHero = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  min-height: 70vh;
  max-width: 1400px;
  margin: 0 auto;
  padding: 60px 40px;
  gap: 60px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 40px 20px;
    gap: 40px;
  }
`;

const HeroImage = styled(motion.div)`
  height: 500px;
  background-image: url(${props => props.$image});
  background-size: cover;
  background-position: center;
  border-radius: 10px;
  box-shadow: 0 20px 60px rgba(190, 15, 52, 0.3);
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(190, 15, 52, 0.1), transparent);
    border-radius: 10px;
  }

  @media (max-width: 768px) {
    height: 350px;
  }
`;

const HeroText = styled(motion.div)`
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const HeroTitle = styled.h1`
  font-size: 4rem;
  margin-bottom: 20px;
  color: #ffffff;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.2rem;
  line-height: 1.8;
  color: #cccccc;
  margin-bottom: 40px;
`;

const RedAccent = styled.span`
  color: #BE0F34;
  font-weight: 700;
`;

const ModelsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
  gap: 40px;
  padding: 80px 40px;
  max-width: 1400px;
  margin: 0 auto;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 50px 20px;
    gap: 30px;
  }
`;

const SectionTitle = styled.h2`
  font-size: 3rem;
  text-align: center;
  color: #ffffff;
  margin-bottom: 20px;
  letter-spacing: 2px;
  text-transform: uppercase;
  max-width: 1400px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 40px;

  span {
    color: #BE0F34;
  }
`;

const SectionSubtitle = styled.p`
  text-align: center;
  color: #999999;
  font-size: 1.1rem;
  margin-bottom: 60px;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
`;

const Models = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/cars');
        setCars(response.data);
      } catch (error) {
        console.error('Error fetching cars:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  if (loading) {
    return (
      <ModelsContainer>
        <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
          Loading...</div>
      </ModelsContainer>
    );
  }

  const heroImage = cars.length > 0 ? cars[0].images[0] : '/images/chiron.jpg';

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  return (
    <ModelsContainer>
      <ModelsHero
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <HeroImage
          $image={heroImage}
          initial={{ scale: 1.05 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        />
        <HeroText
          initial={{ x: 50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <HeroTitle>
            Engineered <RedAccent>Excellence</RedAccent>
          </HeroTitle>
          <HeroSubtitle>
            Explore our exclusive collection of hypercars, where <RedAccent>performance</RedAccent> meets unparalleled luxury. 
            Each model represents the pinnacle of automotive engineering and design.
          </HeroSubtitle>
        </HeroText>
      </ModelsHero>

      <SectionTitle>
        Our <RedAccent>Legendary</RedAccent> Collection
      </SectionTitle>
      <SectionSubtitle>
        Discover the world's most exclusive and powerful hypercars
      </SectionSubtitle>

      <ModelsGrid
        as={motion.div}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {cars.map((car, index) => (
          <motion.div key={car._id} variants={itemVariants}>
            <CarCard car={car} index={index} />
          </motion.div>
        ))}
      </ModelsGrid>
    </ModelsContainer>
  );
};

export default Models;
