import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const ModelsSection = styled.section`
  padding: 100px 0;
  background: white;
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 50px;
`;

const ModelsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const ModelCard = styled.div`
  background: #f5f5f5;
  border-radius: 10px;
  overflow: hidden;
  text-align: center;
`;

const ModelImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const ModelName = styled.h3`
  font-size: 1.5rem;
  margin: 20px 0 10px;
`;

const ModelButton = styled(Link)`
  display: inline-block;
  background: black;
  color: white;
  padding: 10px 20px;
  text-decoration: none;
  border-radius: 5px;
  margin: 20px 0;
  transition: background 0.3s ease;

  &:hover {
    background: ${props => props.theme.colors.secondary};
  }
`;

const ModelsPreview = () => {
  // For now, we'll use static data. In a real app, you might fetch this.
  const featuredCars = [
    {
      _id: '1',
      name: 'Chiron Super Sport',
      images: ['/images/chiron-1.jpg'],
    },
    {
      _id: '2',
      name: 'Divo',
      images: ['/images/divo-1.jpg'],
    },
  ];

  return (
    <ModelsSection>
      <SectionTitle>Our Models</SectionTitle>
      <ModelsGrid>
        {featuredCars.map(car => (
          <ModelCard key={car._id}>
            <ModelImage src={car.images[0]} alt={car.name} />
            <ModelName>{car.name}</ModelName>
            <ModelButton to={`/models/${car._id}`}>Discover</ModelButton>
          </ModelCard>
        ))}
      </ModelsGrid>
    </ModelsSection>
  );
};

export default ModelsPreview;