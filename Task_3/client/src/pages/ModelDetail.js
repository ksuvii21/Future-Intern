import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
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
    url(${props => props.$bgImage}) center/cover;  display: flex;
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
  border-bottom: 1px solid #eee;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 40px;
  text-align: center;
  color: ${props => props.theme.colors.primary};
`;

const SectionSubtitle = styled.p`
  max-width: 700px;
  margin: 0 auto 60px auto;
  font-size: 1.1rem;
  line-height: 1.7;
  color: #666;
  text-align: center;
`;

const OverviewGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 50px;
  margin-bottom: 80px;
  align-items: center;
`;

const OverviewImage = styled.img`
  width: 100%;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  margin-bottom: 20px;
`;

const OverviewText = styled.p`
  line-height: 1.8;
  font-size: 1.1rem;
  color: #555;
`;

const SpecsGrid = styled.div`
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

const FeaturesSection = styled(ContentSection)`
  background: #f9f9f9;
  border-bottom: none;
`;

const FeaturesGrid = styled.ul`
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
`;

const FeatureItem = styled.li`
  background: #f9f9f9;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  h4 {
    font-size: 1.4rem;
    margin-bottom: 15px;
    color: #333;
  }

  p {
    color: #666;
    line-height: 1.6;
  }
`;

const GallerySection = styled(ContentSection)`
  border-bottom: none;
`;

const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
`;

const GalleryImage = styled.img`
  width: 100%;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;
  cursor: pointer;
  &:hover {
    filter: brightness(1.1);
    transform: scale(1.05);
  }
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
      <HeroSection $bgImage={car.images[0].replace(/-\d+/, '')}>
        <HeroContent>
          <HeroTitle>{car.name}</HeroTitle>
          <HeroPrice>{car.price}</HeroPrice>
        </HeroContent>
      </HeroSection>
      
      <ContentSection>
        <OverviewGrid>
          <div>
            <SectionTitle>THE QUINTESSENCE OF LUXURY</SectionTitle>
            <OverviewText>{car.description}</OverviewText>
          </div>
          <OverviewImage src={(car.images[1] || car.images[0]).replace(/-\d+/, '')} alt={`${car.name} view`} />
        </OverviewGrid>
      </ContentSection>

      <ContentSection>
        <SectionTitle>PERFORMANCE</SectionTitle>
        <SectionSubtitle>
          Engineered for an unparalleled driving experience, pushing the boundaries of speed, power, and agility.
        </SectionSubtitle>
        <SpecsGrid>
          <SpecItem>
            <SpecLabel>Power</SpecLabel>
            <HeroPrice>{car.horsepower} HP</HeroPrice>
          </SpecItem>
          <SpecItem>
            <SpecLabel>Top Speed</SpecLabel>
            <HeroPrice>{car.topSpeed} km/h</HeroPrice>
          </SpecItem>
          <SpecItem>
            <SpecLabel>Engine</SpecLabel>
            <HeroPrice>{car.technicalSpecs?.engine || 'N/A'}</HeroPrice>
          </SpecItem>
          <SpecItem>
            <SpecLabel>Transmission</SpecLabel>
            <HeroPrice>{car.technicalSpecs?.transmission || 'N/A'}</HeroPrice>
          </SpecItem>
          <SpecItem>
            <SpecLabel>Drivetrain</SpecLabel>
            <HeroPrice>{car.technicalSpecs?.drivetrain || 'N/A'}</HeroPrice>
          </SpecItem>
          <SpecItem>
            <SpecLabel>Fuel Economy</SpecLabel>
            <HeroPrice>{car.technicalSpecs?.fuelEconomy || 'N/A'}</HeroPrice>
          </SpecItem>
        </SpecsGrid>
      </ContentSection>

      <FeaturesSection>
        <SectionTitle>KEY FEATURES</SectionTitle>
        <FeaturesGrid>
          {car.features?.map((feature, index) => (
            <FeatureItem key={index}>
              <p>{feature}</p>
            </FeatureItem>
          ))}
        </FeaturesGrid>
      </FeaturesSection>

      <GallerySection>
        <SectionTitle>GALLERY</SectionTitle>
        <GalleryGrid>
          {car.images.map((img, index) => (
            <GalleryImage key={index} src={img.replace(/-\d+/, '')} alt={`${car.name} gallery image ${index + 1}`} />
          ))}
        </GalleryGrid>
      </GallerySection>
    </DetailContainer>
  );
};

export default ModelDetail;
