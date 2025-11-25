import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const HeroSection = styled.section`
  position: relative;
  height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
`;

const VideoBackground = styled.video`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: translate(-50%, -50%);
  z-index: -2;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5));
  z-index: -1;
`;

const HeroContent = styled(motion.div)`
  max-width: 800px;
  padding: 0 20px;
`;

const HeroTitle = styled.h1`
  font-size: 4rem;
  margin-bottom: 20px;
  letter-spacing: 3px;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.2rem;
  margin-bottom: 30px;
  letter-spacing: 1px;
`;

const CTAButton = styled(motion.button)`
  background: ${props => props.theme.colors.secondary};
  color: white;
  border: none;
  padding: 15px 40px;
  font-size: 16px;
  cursor: pointer;
  letter-spacing: 1px;
  transition: background 0.3s ease;

  &:hover {
    background: #a00d2a;
  }
`;

const Hero = () => {
  return (
    <HeroSection>
      <VideoBackground
        autoPlay
        loop
        muted
        playsInline
        src="/images/hero-bg.mp4"
        type="video/mp4"
      />
      <Overlay />
      <HeroContent
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <HeroTitle>BUGATTI</HeroTitle>
        <HeroSubtitle>
          Beyond perfection. Beyond imagination. Beyond the possible.
        </HeroSubtitle>
        <CTAButton
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          DISCOVER MORE
        </CTAButton>
      </HeroContent>
    </HeroSection>
  );
};

export default Hero;