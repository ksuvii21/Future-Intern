import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import CarCard from '../components/Models/CarCard';

const ModelsContainer = styled.div`
  padding-top: 100px;
  min-height: 100vh;
  background: #f5f5f5;
`;

const ModelsHero = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  gap: 40px;
`;

const HeroImage = styled.div`
  flex: 1;
  height: 400px;
  background-image: url(${props => props.$image});
  background-size: cover;
  background-position: center;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.3);
`;

const HeroText = styled.div`
  flex: 1;
  color: #333;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const HeroTitle = styled.h1`
  font-size: 3rem;
  margin-bottom: 20px;
  color: #111;
`;

const HeroSubtitle = styled.p`
  font-size: 1.2rem;
  line-height: 1.6;
  color: #444;
`;

const ModelsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 30px;
  padding: 50px 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const Models = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

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
    return <div>Loading...</div>;
  }

  const heroImage = cars.length > 0 ? cars[0].images[0] : '/images/chiron.jpg';

  return (
    <ModelsContainer>
      <ModelsHero $image={heroImage.replace('-1', '')}>
        <HeroImage $image={heroImage} />
        <HeroText>
          <HeroTitle>Our Models</HeroTitle>
          <HeroSubtitle>
            Explore our exclusive collection of high-performance automobiles,
            engineered for speed, luxury, and innovation.
          </HeroSubtitle>
        </HeroText>
      </ModelsHero>
      <ModelsGrid>
        {cars.map(car => (
          <CarCard key={car._id} car={car} />
        ))}
      </ModelsGrid>
    </ModelsContainer>
  );
};

export default Models;
