import React from 'react';
import styled from 'styled-components';

const FeaturesSection = styled.section`
  padding: 100px 0;
  background: #000;
  color: white;
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 50px;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 40px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const FeatureCard = styled.div`
  text-align: center;
`;

const FeatureIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 20px;
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 15px;
`;

const FeatureDescription = styled.p`
  color: #ccc;
  line-height: 1.6;
`;

const Features = () => {
  const features = [
    {
      icon: '⚙️',
      title: 'Engineering Excellence',
      description: 'Every Bugatti is a masterpiece of engineering, pushing the boundaries of what is possible.',
    },
    {
      icon: '🎨',
      title: 'Customization',
      description: 'Each Bugatti can be tailored to the owner’s exact specifications, making it truly unique.',
    },
    {
      icon: '🚀',
      title: 'Unmatched Performance',
      description: 'With staggering power and speed, Bugatti represents the pinnacle of automotive performance.',
    },
  ];

  return (
    <FeaturesSection>
      <SectionTitle>Why Bugatti</SectionTitle>
      <FeaturesGrid>
        {features.map((feature, index) => (
          <FeatureCard key={index}>
            <FeatureIcon>{feature.icon}</FeatureIcon>
            <FeatureTitle>{feature.title}</FeatureTitle>
            <FeatureDescription>{feature.description}</FeatureDescription>
          </FeatureCard>
        ))}
      </FeaturesGrid>
    </FeaturesSection>
  );
};

export default Features;