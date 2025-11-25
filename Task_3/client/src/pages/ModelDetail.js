import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

const DetailContainer = styled.div\`
  padding-top: 100px;
  min-height: 100vh;
\`;

const HeroSection = styled.div\`
  height: 70vh;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
              url(\${props => props.\$bgImage}) center/cover;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
\`;

const ModelDetail = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // For now, use mock data. Replace with actual API call
    const mockCar = {
      _id: id,
      name: 'Chiron Super Sport',
      model: 'Chiron',
      price: '$3,800,000',
      horsepower: 1578,
      topSpeed: 440,
      acceleration: '0-100 km/h in 2.4 seconds',
      description: 'The ultimate hyper sports car, representing the pinnacle of automotive engineering.',
      images: ['/images/chiron-hero.jpg'],
      features: [
        '8.0-liter quad-turbo W16 engine',
        'Carbon fiber monocoque',
        'Advanced aerodynamics',
        'Customizable interior'
      ],
      technicalSpecs: {
        engine: '8.0L W16 Quad-Turbo',
        transmission: '7-speed dual-clutch',
        drivetrain: 'AWD',
        fuelEconomy: 'City 8 / Highway 15 mpg'
      }
    };
    
    setCar(mockCar);
    setLoading(false);
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!car) return <div>Car not found</div>;

  return (
    <DetailContainer>
      <HeroSection $bgImage={car.images[0]}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '4rem', marginBottom: '20px' }}>{car.name}</h1>
          <p style={{ fontSize: '1.5rem' }}>{car.price}</p>
        </div>
      </HeroSection>
      
      <div style={{ padding: '50px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '50px', marginBottom: '50px' }}>
          <div>
            <h2 style={{ marginBottom: '20px' }}>Overview</h2>
            <p style={{ lineHeight: '1.6', fontSize: '1.1rem' }}>{car.description}</p>
          </div>
          <div>
            <h2 style={{ marginBottom: '20px' }}>Key Specifications</h2>
            <div style={{ display: 'grid', gap: '15px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #eee', padding: '10px 0' }}>
                <span>Horsepower</span>
                <strong>{car.horsepower} HP</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #eee', padding: '10px 0' }}>
                <span>Top Speed</span>
                <strong>{car.topSpeed} km/h</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #eee', padding: '10px 0' }}>
                <span>Acceleration</span>
                <strong>{car.acceleration}</strong>
              </div>
            </div>
          </div>
        </div>

        <div style={{ marginBottom: '50px' }}>
          <h2 style={{ marginBottom: '20px' }}>Features</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
            {car.features.map((feature, index) => (
              <div key={index} style={{ background: '#f5f5f5', padding: '20px', borderRadius: '5px' }}>
                {feature}
              </div>
            ))}
          </div>
        </div>
      </div>
    </DetailContainer>
  );
};

export default ModelDetail;
