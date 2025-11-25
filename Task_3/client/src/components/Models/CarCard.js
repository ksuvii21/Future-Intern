import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Card = styled.div`
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
`;

const CardContent = styled.div`
  padding: 20px;
`;

const CardTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 10px;
`;

const CardPrice = styled.p`
  font-size: 1.2rem;
  color: ${props => props.theme.colors.secondary};
  margin-bottom: 10px;
`;

const CardSpecs = styled.div`
  margin-bottom: 20px;
`;

const CardSpec = styled.p`
  font-size: 0.9rem;
  margin-bottom: 5px;
`;

const CardButton = styled(Link)`
  display: inline-block;
  background: black;
  color: white;
  padding: 10px 20px;
  text-decoration: none;
  border-radius: 5px;
  transition: background 0.3s ease;

  &:hover {
    background: ${props => props.theme.colors.secondary};
  }
`;

const CarCard = ({ car }) => {
  return (
    <Card>
      <CardImage src={car.images[0]} alt={car.name} />
      <CardContent>
        <CardTitle>{car.name}</CardTitle>
        <CardPrice>{car.price}</CardPrice>
        <CardSpecs>
          <CardSpec><strong>Horsepower:</strong> {car.horsepower} HP</CardSpec>
          <CardSpec><strong>Top Speed:</strong> {car.topSpeed} km/h</CardSpec>
          <CardSpec><strong>Acceleration:</strong> {car.acceleration}</CardSpec>
        </CardSpecs>
        <CardButton to={`/models/${car._id}`}>Learn More</CardButton>
      </CardContent>
    </Card>
  );
};

export default CarCard;