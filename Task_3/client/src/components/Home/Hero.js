import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

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
  z-index: 0;
  transition: transform 0.1s ease-out;
  filter: brightness(0.85);
`;

const AnimatedGrid = styled.div`
  position: absolute;
  /* This component is currently obscuring the video, so we'll disable it for now */
  display: none;
`;

const GradientOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, transparent, rgba(0,0,0,0.5), #000);
  z-index: 1;
`;

const HeroContent = styled(motion.div)`
  max-width: 800px;
  padding: 0 20px;
  position: relative;
  z-index: 2;
`;

const HeroTitle = styled.h1`
  font-size: 8rem;
  margin-bottom: 20px;
  letter-spacing: 4px;
  font-weight: 900;
  background: linear-gradient(135deg, #ffffffff, #ffffff7c, #ffffffff); /* Bugatti Red Gradient */
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: pulse 2s ease-in-out infinite;

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
  color: #d1d5db;
`;

const CTAButton = styled(Link)`
  display: inline-block;
  background: linear-gradient(135deg, #ffffffff, #ffffff89); /* Bugatti Red Gradient */
  color: black;
  border: none;
  padding: 18px 48px;
  font-size: 1.125rem;
  font-weight: bold;
  cursor: pointer;
  letter-spacing: 1px;
  border-radius: 50px;
  position: relative;
  overflow: hidden;
  text-decoration: none;

  &::before {
    content: '';
    border-radius: 50px;
    position: absolute;
    inset: 0; /* Bugatti Red Gradient for hover */
    color: white;
    background: linear-gradient(135deg, #A00020, #BE0F34);
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

const Hero = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    // Future logic can go here
  }, []);

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

      {/* Hero Content */}
      <HeroContent
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <HeroTitle >BUGATTI</HeroTitle>
        
        <HeroSubtitle >
          Where form meets function at 490 km/h
        </HeroSubtitle>
        
        <CTAButton
          to="/bugatti-overview"
        >
          <span>DISCOVER MORE</span>
        </CTAButton>
      </HeroContent>
    </HeroSection>
  );
};

export default Hero;