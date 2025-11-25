import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';

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

const ViewAllButton = styled(Link)`
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

const ModelsPreview = () => {
  const [featuredCars, setFeaturedCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedCars = async () => {
      try {
        // Fetch all cars and take the first two as featured
        const { data } = await axios.get('http://localhost:5000/api/cars');
        setFeaturedCars(data.slice(0, 2));
      } catch (error) {
        console.error("Error fetching featured cars:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedCars();
  }, []);

  return (
    <Section>
      <SectionTitle>MASTERPIECES</SectionTitle>
      <SectionSubtitle>
        Each Bugatti is a unique work of art, representing the pinnacle of automotive excellence and craftsmanship.
      </SectionSubtitle>
      
      <ModelsGrid>
        {loading ? <p>Loading models...</p> : featuredCars.map((car, index) => (
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

      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={{ width: '200px', margin: '50px auto 0' }}
      >
        <ViewAllButton
        to="/models"
        >VIEW ALL MODELS</ViewAllButton>
      </motion.div>
    </Section>
  );
};

export default ModelsPreview;