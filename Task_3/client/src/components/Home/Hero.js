import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const speedLine = keyframes`
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
`;

const HeroSection = styled.section`
  position: relative;
  height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
  background: #000;
`;

const VideoBackground = styled.video`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: translate(-50%, -50%) scale(1);
  z-index: -2;
  transition: transform 0.1s ease-out;
  filter: brightness(0.6);
`;

const AnimatedGrid = styled.div`
  position: absolute;
  inset: 0;
  opacity: 0.2;
  z-index: -1;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
      linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px);
    background-size: 50px 50px; /* Corrected background-size */
    transform: perspective(500px) rotateX(60deg) translateY(${props => props.scrollY * 0.5}px);
    transform-origin: center top;
    transition: transform 0.1s ease-out;
  }
`;

const GradientOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, transparent, rgba(0,0,0,0.5), #000);
  z-index: -1;
`;

const SpeedLinesContainer = styled.div`
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  z-index: 1;
`;

const SpeedLine = styled.div`
  position: absolute;
  height: 1px;
  background: linear-gradient(90deg, transparent, #60a5fa, transparent);
  opacity: 0.3;
  animation: ${speedLine} ${props => 2 + Math.random() * 2}s linear infinite;
  animation-delay: ${props => Math.random() * 2}s;
  top: ${props => Math.random() * 100}%;
  left: -100%;
  width: 200%;
`;

const HeroContent = styled(motion.div)`
  max-width: 800px;
  padding: 0 20px;
  position: relative;
  z-index: 10;
`;

const HeroTitle = styled.h1`
  font-size: 8rem;
  margin-bottom: 20px;
  letter-spacing: 4px;
  font-weight: 900;
  background: linear-gradient(135deg, #60a5fa, #06b6d4, #60a5fa);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: pulse 2s ease-in-out infinite; /* Corrected animation name */
  transform: translateY(${props => props.$scrollY * -0.3}px);
  opacity: ${props => Math.max(1 - props.scrollY / 500, 0)};

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.8; }
  }

  @media (max-width: 768px) {
    font-size: 4rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.5rem;
  margin-bottom: 40px;
  letter-spacing: 1px;
  color: #d1d5db; /* Corrected color */
  transform: translateY(${props => props.scrollY * -0.1}px);
  opacity: ${props => Math.max(1 - props.scrollY / 500, 0)};
`;

const SpeedDisplay = styled(motion.div)`
  display: inline-block;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(96, 165, 250, 0.3);
  border-radius: 20px;
  padding: 24px 32px;
  margin-bottom: 30px; /* Corrected margin-bottom */
  transform: translateY(${props => props.scrollY * -0.2}px);
  opacity: ${props => Math.max(1 - props.scrollY / 500, 0)};
`;

const SpeedLabel = styled.div`
  font-size: 0.875rem;
  color: #93c5fd;
  margin-bottom: 8px;
  letter-spacing: 2px;
`;

const SpeedValue = styled.div`
  font-size: 4rem;
  font-weight: 900;
  font-variant-numeric: tabular-nums;
  color: white;
`;

const SpeedUnit = styled.span`
  font-size: 2rem;
  color: #60a5fa;
  margin-left: 8px;
`;

const SpeedBar = styled.div`
  width: 256px;
  height: 8px;
  background: #374151;
  border-radius: 4px;
  margin-top: 12px;
  overflow: hidden;
`;

const SpeedProgress = styled.div`
  height: 100%;
  background: linear-gradient(90deg, #3b82f6, #06b6d4, #3b82f6);
  border-radius: 4px;
  width: ${props => (props.speed / 490) * 100}%;
  transition: width 0.3s ease;
`;

const CTAButton = styled(motion.button)`
  background: linear-gradient(135deg, #3b82f6, #06b6d4);
  color: white;
  border: none;
  padding: 18px 48px;
  font-size: 1.125rem;
  font-weight: bold;
  cursor: pointer;
  letter-spacing: 1px;
  border-radius: 50px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, #06b6d4, #3b82f6);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover::before {
    opacity: 1;
  }

  span {
    position: relative;
    z-index: 2;
  }
`;

const ScrollIndicator = styled(motion.div)`
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  opacity: ${props => Math.max(1 - props.scrollY / 200, 0)};
`;

const Hero = () => {
  const [scrollY, setScrollY] = useState(0);
  const [speed, setSpeed] = useState(0);
  const videoRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setSpeed(prev => {
        const target = Math.min(scrollY / 3, 490);
        const diff = target - prev;
        return prev + diff * 0.1;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [scrollY]);

  const speedLines = Array.from({ length: 20 }, (_, i) => (
    <SpeedLine key={i} />
  ));

  return (
    <HeroSection>
      {/* Video Background */}
      <VideoBackground
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline

        src="/images/hero-bg.mp4" // Corrected video path
        type="video/mp4"
      >
        Your browser does not support the video tag.
      </VideoBackground>

      {/* Animated Grid */}
      <AnimatedGrid  />
      
      {/* Gradient Overlay */}
      <GradientOverlay />
      
      {/* Speed Lines Animation */}
      <SpeedLinesContainer>
        {speedLines}
      </SpeedLinesContainer>

      {/* Hero Content */}
      <HeroContent
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <HeroTitle >BUGATTI</HeroTitle>
        
        {/* Speed Display */}
        <SpeedDisplay
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          $scrollY={scrollY}
        > 
          <SpeedLabel>TOP SPEED</SpeedLabel>
          <SpeedValue>
            {Math.floor(speed)}
            <SpeedUnit>km/h</SpeedUnit>
          </SpeedValue> {/* Corrected closing tag */}
          <SpeedBar>
            <SpeedProgress speed={speed} />
          </SpeedBar>
        </SpeedDisplay>

        <HeroSubtitle >
          Where form meets function at 490 km/h
        </HeroSubtitle> {/* Corrected closing tag */}
        
        <CTAButton
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span>DISCOVER MORE</span>
        </CTAButton>
      </HeroContent>

      {/* Scroll Indicator */}
      <ScrollIndicator
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        scrollY={scrollY}
      >
        <ChevronDown size={32} color="#60a5fa" />
      </ScrollIndicator>
    </HeroSection>
  );
};

export default Hero;