import React, { useEffect } from 'react';
import styled from 'styled-components';
import Hero from '../components/Home/Hero';
import HeroSecond from '../components/Home/HeroSecond';
import ModelsPreview from '../components/Home/ModelsPreview';
import Features from '../components/Home/Features';

const HomeContainer = styled.div`
  overflow-x: hidden;
`;

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <HomeContainer>
      <Hero />
      <HeroSecond />
      <ModelsPreview />
      <Features />
    </HomeContainer>
  );
};

export default Home;
