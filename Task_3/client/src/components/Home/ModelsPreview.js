import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Section = styled.section`
  padding: 100px 0;
  background: white;
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 3rem;
  margin-bottom: 20px;
  color: ${props => props.theme.colors.primary};
`;

const SectionSubtitle = styled.p`
  text-align: center;
  font-size: 1.2rem;
  color: ${props => props.theme.colors.gray};
  margin-bottom: 60px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const ModelsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 40px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const ViewAllButton = styled(motion.a)`
  display: block;
  width: 200px;
  margin: 50px auto 0;
  background: transparent;
  color: ${props => props.theme.colors.primary};
  border: 2px solid ${props => props.theme.colors.primary};
  text-align: center;
  padding: 15px 0;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-weight: bold;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.theme.colors.primary};
    color: white;
  }
`;

// Temporary data - replace with actual API call
const featuredCars = [
  {
    _id: '1',
    name: 'Chiron Super Sport',
    price: '$3,800,000',
    horsepower: 1578,
    topSpeed: 440,
    images: ['/images/chiron.jpg']
  },
  {
    _id: '2',
    name: 'Divo',
    price: '$5,800,000',
    horsepower: 1479,
    topSpeed: 380,
    images: ['/images/divo.jpg']
  }
];

const ModelsPreview = () => {
  return (
    <Section>
      <SectionTitle>MASTERPIECES</SectionTitle>
      <SectionSubtitle>
        Each Bugatti is a unique work of art, representing the pinnacle of automotive excellence and craftsmanship.
      </SectionSubtitle>
      
      <ModelsGrid>
        {featuredCars.map((car, index) => (
          <motion.div
            key={car._id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            {/* We'll create a simplified card for preview */}
            <div style={{
              background: '#f5f5f5',
              padding: '20px',
              borderRadius: '10px',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start'
            }}>
              <img
                src={car.images[0]}
                alt={car.name}
                style={{
                  width: '100%',
                  maxHeight: '180px',
                  objectFit: 'cover',
                  borderRadius: '10px',
                  marginBottom: '15px',
                }}
              />
              <h3 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>{car.name}</h3>
              <p style={{ color: '#BE0F34', fontSize: '1.2rem', marginBottom: '15px' }}>{car.price}</p>
              <p style={{ marginBottom: '20px' }}>{car.horsepower} HP • {car.topSpeed} km/h</p>
              <Link
                to={`/models/${car._id}`}
                style={{
                  display: 'inline-block',
                  background: 'black',
                  color: 'white',
                  padding: '10px 20px',
                  textDecoration: 'none',
                  borderRadius: '5px'
                }}
              >
                DISCOVER
              </Link>
            </div>
          </motion.div>
        ))}
      </ModelsGrid>

      <ViewAllButton
        as={Link}
        to="/models"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        VIEW ALL MODELS
      </ViewAllButton>
    </Section>
  );
};

export default ModelsPreview;