import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaCogs, FaRocket, FaCrown, FaPaintBrush } from 'react-icons/fa';
import { Gauge, Zap, Wind, Trophy } from 'lucide-react';

const Section = styled.section`
  padding: 100px 0;
  background: linear-gradient(to bottom, #000000, #000022, #000000);
  color: white;
  position: relative;
  overflow: hidden;
`;

const AnimatedBackground = styled.div`
  position: absolute;
  inset: 0;
  opacity: 0.1;
  pointer-events: none;
`;

const FloatingDot = styled.div`
  position: absolute;
  border-radius: 50%;
  background: #BE0F34; /* Bugatti Red */
  animation: float ${props => props.duration || '15s'} ease-in-out infinite;
  animation-delay: ${props => props.delay || '0s'};
  
  @keyframes float {
    0%, 100% { transform: translate(0, 0); }
    25% { transform: translate(20px, -20px); }
    50% { transform: translate(-20px, 20px); }
    75% { transform: translate(20px, 10px); }
  }
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 4rem;
  margin-bottom: 20px;
  color: white;
  font-weight: 900;
  letter-spacing: 2px;

  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;

const GradientText = styled.span`
  background: linear-gradient(135deg, #BE0F34, #A00020); /* Bugatti Red Gradient */
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const SectionSubtitle = styled.p`
  text-align: center;
  font-size: 1.2rem;
  color: #9ca3af;
  margin-bottom: 60px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const FeatureCard = styled(motion.div)`
  text-align: center;
  padding: 40px 30px;
  background: linear-gradient(135deg, #1f2937, #111827);
  border: 1px solid #374151;
  border-radius: 20px;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;

  &:hover {
    border-color: rgba(6, 182, 212, 0.5);
    box-shadow: 0 0 30px rgba(6, 182, 212, 0.2);
    transform: translateY(-5px);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 80px;
    height: 80px; /* Bugatti Red Gradient */
    background: linear-gradient(135deg, transparent, rgba(190, 15, 52, 0.1));
    border-bottom-left-radius: 100%;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover::before {
    opacity: 1; /* Bugatti Red Gradient */
  }
`;

const FeatureIconContainer = styled.div`
  position: relative;
  margin-bottom: 30px;
`;

const IconWrapper = styled.div`
  width: 80px;
  height: 80px;
  margin: 0 auto;
  border-radius: 20px;
  background: linear-gradient(135deg, rgba(190, 15, 52, 0.2), rgba(160, 0, 32, 0.2)); /* Bugatti Red Gradient */
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  ${FeatureCard}:hover & {
    transform: scale(1.1) rotate(5deg); /* Bugatti Red Gradient */
    background: linear-gradient(135deg, rgba(190, 15, 52, 0.3), rgba(160, 0, 32, 0.3));
  }
`;

const IconGlow = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(6, 182, 212, 0.2);
  background: rgba(190, 15, 52, 0.2); /* Bugatti Red */
  filter: blur(20px);
  opacity: 0;
  transition: opacity 0.3s ease;

  ${FeatureCard}:hover & {
    opacity: 1;
  }
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 15px;
  color: white;
  font-weight: 700;
  transition: color 0.3s ease;

  ${FeatureCard}:hover & {
    color: #BE0F34; /* Bugatti Red */
  }
`;

const FeatureDescription = styled.p`
  color: #d1d5db;
  line-height: 1.6;
  transition: color 0.3s ease;

  ${FeatureCard}:hover & {
    color: #f3f4f6;
  }
`;

const features = [
  {
    icon: Gauge,
    title: 'UNMATCHED SPEED',
    description: 'Record-breaking performance with top speeds exceeding 490 km/h'
  },
  {
    icon: Zap,
    title: 'RAW POWER',
    description: '1,600+ horsepower engines delivering unprecedented acceleration'
  },
  {
    icon: Wind,
    title: 'AERODYNAMICS',
    description: 'Engineering perfection with advanced active aerodynamics'
  },
  {
    icon: Trophy,
    title: 'EXCLUSIVE LEGACY',
    description: '110+ years of automotive excellence and innovation'
  }
];

const Features = () => {
  const [dots, setDots] = useState([]);

  useEffect(() => {
    const generatedDots = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      size: Math.random() * 3 + 1,
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 5
    }));
    setDots(generatedDots);
  }, []);

  return (
    <Section>
      <AnimatedBackground>
        {dots.map(dot => (
          <FloatingDot
            key={dot.id}
            style={{
              width: `${dot.size}px`,
              height: `${dot.size}px`,
              left: `${dot.left}%`,
              top: `${dot.top}%`,
            }}
            duration={`${dot.duration}s`}
            delay={`${dot.delay}s`}
          />
        ))}
      </AnimatedBackground>

      <SectionTitle>
        PERFORMANCE <GradientText>DNA</GradientText>
      </SectionTitle>
      <SectionSubtitle>
        Engineering excellence that defines the boundaries of automotive possibility
      </SectionSubtitle>
      
      <FeaturesGrid>
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            whileHover={{ scale: 1.02 }}
          >
            <FeatureIconContainer>
              <IconWrapper>
                <feature.icon size={32} color="#06b6d4" />
              </IconWrapper>
              <IconGlow />
            </FeatureIconContainer>
            <FeatureTitle>{feature.title}</FeatureTitle>
            <FeatureDescription>{feature.description}</FeatureDescription>
          </FeatureCard>
        ))}
      </FeaturesGrid>
    </Section>
  );
};

export default Features;