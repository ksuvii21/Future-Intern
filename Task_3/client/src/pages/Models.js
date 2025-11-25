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
  height: 60vh;
  background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)),
              url('/images/chiron.jpg') center/cover no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
  font-size: 3rem;
  font-weight: bold;
  letter-spacing: 3px;
`;

const ModelsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 30px;
  padding: 50px 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const PageTitle = styled.h1`
  text-align: center;
  font-size: 3rem;
  margin-bottom: 50px;
  padding-top: 50px;
`;

const Models = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get('/api/cars');
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

  return (
    <ModelsContainer>
      <ModelsHero>Our Models</ModelsHero>
      <ModelsGrid>
        {cars.map(car => (
          <CarCard key={car._id} car={car} />
        ))}
      </ModelsGrid>
    </ModelsContainer>
  );
};

export default Models;