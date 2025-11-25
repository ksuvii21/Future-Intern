import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

const ModelDetailContainer = styled.div`
  padding-top: 100px;
  min-height: 100vh;
`;

const CarDetail = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const CarImage = styled.img`
  width: 100%;
  height: 500px;
  object-fit: cover;
  margin-bottom: 30px;
`;

const CarName = styled.h1`
  font-size: 3rem;
  margin-bottom: 20px;
`;

const CarPrice = styled.h2`
  font-size: 2rem;
  color: ${props => props.theme.colors.secondary};
  margin-bottom: 20px;
`;

const CarDescription = styled.p`
  font-size: 1.1rem;
  margin-bottom: 30px;
  line-height: 1.6;
`;

const SpecsSection = styled.div`
  margin-top: 40px;
`;

const SpecsTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 20px;
`;

const SpecsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
`;

const SpecItem = styled.div`
  background: #f5f5f5;
  padding: 20px;
  border-radius: 5px;
`;

const SpecLabel = styled.strong`
  display: block;
  margin-bottom: 5px;
`;

const ModelDetail = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const response = await axios.get(`/api/cars/${id}`);
        setCar(response.data);
      } catch (error) {
        console.error('Error fetching car:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCar();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!car) {
    return <div>Car not found</div>;
  }

  return (
    <ModelDetailContainer>
      <CarDetail>
        <CarImage src={car.images[0]} alt={car.name} />
        <CarName>{car.name}</CarName>
        <CarPrice>{car.price}</CarPrice>
        <CarDescription>{car.description}</CarDescription>

        <SpecsSection>
          <SpecsTitle>Technical Specifications</SpecsTitle>
          <SpecsGrid>
            <SpecItem>
              <SpecLabel>Engine:</SpecLabel>
              {car.technicalSpecs.engine}
            </SpecItem>
            <SpecItem>
              <SpecLabel>Horsepower:</SpecLabel>
              {car.horsepower} HP
            </SpecItem>
            <SpecItem>
              <SpecLabel>Top Speed:</SpecLabel>
              {car.topSpeed} km/h
            </SpecItem>
            <SpecItem>
              <SpecLabel>Acceleration (0-100 km/h):</SpecLabel>
              {car.acceleration}
            </SpecItem>
            <SpecItem>
              <SpecLabel>Transmission:</SpecLabel>
              {car.technicalSpecs.transmission}
            </SpecItem>
            <SpecItem>
              <SpecLabel>Drivetrain:</SpecLabel>
              {car.technicalSpecs.drivetrain}
            </SpecItem>
          </SpecsGrid>
        </SpecsSection>

        <SpecsSection>
          <SpecsTitle>Features</SpecsTitle>
          <ul>
            {car.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </SpecsSection>
      </CarDetail>
    </ModelDetailContainer>
  );
};

export default ModelDetail;