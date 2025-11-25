import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaCogs, FaRocket, FaCrown, FaPaintBrush } from 'react-icons/fa';

const Section = styled.section`
  padding: 100px 0;
  background: #000;
  color: white;
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 3rem;
  margin-bottom: 60px;
  color: white;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 40px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const FeatureCard = styled(motion.div)`
  text-align: center;
  padding: 40px 20px;
`;

const FeatureIcon = styled.div`
  font-size: 3rem;
  color: ${props => props.theme.colors.secondary};
  margin-bottom: 20px;
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 15px;
  color: white;
`;

const FeatureDescription = styled.p`
  color: #ccc;
  line-height: 1.6;
`;

const features = [
  {
    icon: <FaRocket />,
    title: 'EXTREME PERFORMANCE',
    description: 'Unmatched power and speed that redefines the boundaries of automotive engineering.'
  },
  {
    icon: <FaCogs />,
    title: 'ADVANCED ENGINEERING',
    description: 'Cutting-edge technology and precision engineering in every component.'
  },
  {
    icon: <FaPaintBrush />,
    title: 'BESPOKE DESIGN',
    description: 'Complete customization and personalization to create your unique masterpiece.'
  },
  {
    icon: <FaCrown />,
    title: 'EXCLUSIVE LEGACY',
    description: 'A heritage of excellence and innovation spanning over a century.'
  }
];

const Features = () => {
  return (
    <Section>
      <SectionTitle>BEYOND PERFECTION</SectionTitle>
      <FeaturesGrid>
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
          >
            <FeatureIcon>{feature.icon}</FeatureIcon>
            <FeatureTitle>{feature.title}</FeatureTitle>
            <FeatureDescription>{feature.description}</FeatureDescription>
          </FeatureCard>
        ))}
      </FeaturesGrid>
    </Section>
  );
};

export default Features;