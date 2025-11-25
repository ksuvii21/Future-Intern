import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Card = styled(motion.div)`
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  }
`;

const CardImage = styled.div`
  width: 100%;
  height: 250px;
  background-image: url(${props => props.image});
  background-size: cover;
  background-position: center;
  position: relative;
`;

const CardContent = styled.div`
  padding: 30px;
`;

const CardTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 10px;
  color: ${props => props.theme.colors.primary};
`;

const CardPrice = styled.p`
  font-size: 1.2rem;
  color: ${props => props.theme.colors.secondary};
  margin-bottom: 15px;
  font-weight: bold;
`;

const CardSpecs = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-bottom: 20px;
`;

const SpecItem = styled.div`
  text-align: center;
  padding: 10px;
  background: ${props => props.theme.colors.lightGray};
  border-radius: 5px;
`;

const SpecValue = styled.div`
  font-size: 1.1rem;
  font-weight: bold;
  color: ${props => props.theme.colors.primary};
`;

const SpecLabel = styled.div`
  font-size: 0.8rem;
  color: ${props => props.theme.colors.gray};
  text-transform: uppercase;
`;

const CardButton = styled(Link)`
  display: block;
  background: ${props => props.theme.colors.primary};
  color: white;
  text-align: center;
  padding: 12px 0;
  text-decoration: none;
  border-radius: 5px;
  transition: background 0.3s ease;

  &:hover {
    background: ${props => props.theme.colors.secondary};
  }
`;

const CarCard = ({ car }) => {
  return (
    <Card
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <CardImage image={car.images[0]} />
      <CardContent>
        <CardTitle>{car.name}</CardTitle>
        <CardPrice>{car.price}</CardPrice>
        
        <CardSpecs>
          <SpecItem>
            <SpecValue>{car.horsepower} HP</SpecValue>
            <SpecLabel>Power</SpecLabel>
          </SpecItem>
          <SpecItem>
            <SpecValue>{car.topSpeed} km/h</SpecValue>
            <SpecLabel>Top Speed</SpecLabel>
          </SpecItem>
        </CardSpecs>
        
        <CardButton to={`/models/${car._id}`}>
          DISCOVER MORE
        </CardButton>
      </CardContent>
    </Card>
  );
};

export default CarCard;