import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

const DetailContainer = styled.div`
  padding-top: 100px;
  min-height: 100vh;
  background: #fff;
  color: #333;
`;

const HeroSection = styled.div`
  height: 70vh;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
              url(${props => props.$bgImage}) center/cover;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
`;

const HeroContent = styled.div`
  text-align: center;
`;

const HeroTitle = styled.h1`
  font-size: 4rem;
  margin-bottom: 20px;
  text-transform: uppercase;
  letter-spacing: 3px;
`;

const HeroPrice = styled.p`
  font-size: 1.5rem;
  font-weight: bold;
`;

const ContentSection = styled.div`
  padding: 80px 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 40px;
  text-align: center;
  color: ${props => props.theme.colors.primary};
`;

const OverviewGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 50px;
  margin-bottom: 80px;
  align-items: center;
`;

const OverviewText = styled.p`
  line-height: 1.8;
  font-size: 1.1rem;
  color: #555;
`;

const SpecsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
`;

const SpecItem = styled.div`
  background: #f5f5f5;
  padding: 25px;
  border-radius: 10px;
  text-align: center;
  border-left: 5px solid ${props => props.theme.colors.secondary};
`;

const SpecLabel = styled.div`
  font-size: 1rem;
  color: #777;
  margin-bottom: 10px;
`;

const ModelDetail = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // For now, use mock data. Replace with actual API call
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

  if (loading) return <div>Loading...</div>;
  if (!car) return <div>Car not found</div>;

  return (
    <DetailContainer>
      <HeroSection $bgImage={`http://localhost:5000${car.images[0]}`}>
        <HeroContent>
          <HeroTitle>{car.name}</HeroTitle>
          <HeroPrice>{car.price}</HeroPrice>
        </HeroContent>
      </HeroSection>
      
      <ContentSection>
        <OverviewGrid>
          <div>
            <SectionTitle>OVERVIEW</SectionTitle>
            <OverviewText>{car.description}</OverviewText>
          </div>
          <SpecsGrid>
            <SpecItem>
              <SpecLabel>Power</SpecLabel>
              <HeroPrice>{car.horsepower} HP</HeroPrice>
            </SpecItem>
            <SpecItem>
              <SpecLabel>Top Speed</SpecLabel>
              <HeroPrice>{car.topSpeed} km/h</HeroPrice>
            </SpecItem>
          </SpecsGrid>
        </OverviewGrid>
      </ContentSection>
    </DetailContainer>
  );
};

export default ModelDetail;
