import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaStar } from 'react-icons/fa';

const Card = styled(motion.div)`
  background: linear-gradient(135deg, #1a1a1a 0%, #0d0d0d 100%);
  border-radius: 0;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(190, 15, 52, 0.2);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid rgba(190, 15, 52, 0.2);
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
  }

  &:hover {
    transform: translateY(-15px);
    box-shadow: 0 30px 80px rgba(190, 15, 52, 0.4);
    border-color: rgba(190, 15, 52, 0.5);

    &::before {
      left: 100%;
    }
  }
`;

const CardImageWrapper = styled.div`
  width: 100%;
  height: 450px;
  background-image: url(${props => props.$image});
  background-size: cover;
  background-position: center;
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(180deg, transparent, rgba(0, 0, 0, 0.7));
  }
`;

const BadgeContainer = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 10;
`;

const Badge = styled.div`
  background: #BE0F34;
  color: white;
  padding: 8px 16px;
  border-radius: 3px;
  font-size: 0.85rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const CardContent = styled.div`
  padding: 35px;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.8), rgba(20, 20, 20, 0.8));
  position: relative;
  z-index: 2;
`;

const CardTitle = styled.h3`
  font-size: 1.8rem;
  margin-bottom: 10px;
  color: #ffffff;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
`;

const CardModel = styled.p`
  font-size: 0.9rem;
  color: #BE0F34;
  margin-bottom: 20px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  font-weight: 600;
`;

const CardPrice = styled.p`
  font-size: 1.6rem;
  color: #ffffff;
  margin-bottom: 20px;
  font-weight: 700;
  letter-spacing: 1px;

  span {
    color: #BE0F34;
  }
`;

const CardSpecs = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  margin-bottom: 30px;
  padding-bottom: 25px;
  border-bottom: 1px solid rgba(190, 15, 52, 0.2);
`;

const SpecItem = styled.div`
  text-align: center;
  padding: 15px;
  background: rgba(190, 15, 52, 0.08);
  border-radius: 3px;
  border-left: 3px solid #BE0F34;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(190, 15, 52, 0.15);
  }
`;

const SpecValue = styled.div`
  font-size: 1.4rem;
  font-weight: 700;
  color: #BE0F34;
  margin-bottom: 5px;
`;

const SpecLabel = styled.div`
  font-size: 0.75rem;
  color: #999999;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const CardButton = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #BE0F34;
  color: white;
  text-align: center;
  padding: 16px 0;
  text-decoration: none;
  border-radius: 0;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-weight: 700;
  font-size: 0.95rem;
  position: relative;
  overflow: hidden;

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
    color: #ffffff;
    transform: letterSpacing(2px);

    &::before {
      left: 0;
    }
  }
`;

const RatingContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 15px;
  align-items: center;
`;

const StarIcon = styled(FaStar)`
  color: #BE0F34;
  font-size: 0.9rem;
`;

const CarCard = ({ car, index }) => {
  const stars = Array.from({ length: 5 }, (_, i) => i);

  return (
    <Card
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <CardImageWrapper $image={car.images[0]}>
        <BadgeContainer>
          <Badge>EXCLUSIVE</Badge>
        </BadgeContainer>
      </CardImageWrapper>
      <CardContent>
        <CardModel>{car.model}</CardModel>
        <CardTitle>{car.name}</CardTitle>
        <CardPrice>
          <span>{car.price}</span>
        </CardPrice>

        <RatingContainer>
          {stars.map((star) => (
            <StarIcon key={star} />
          ))}
        </RatingContainer>

        <CardSpecs>
          <SpecItem>
            <SpecValue>{car.horsepower}</SpecValue>
            <SpecLabel>Horsepower</SpecLabel>
          </SpecItem>
          <SpecItem>
            <SpecValue>{car.topSpeed}</SpecValue>
            <SpecLabel>Top Speed (km/h)</SpecLabel>
          </SpecItem>
        </CardSpecs>

        <CardButton to={`/models/${car._id}`}>
          EXPLORE →
        </CardButton>
      </CardContent>
    </Card>
  );
};

export default CarCard;