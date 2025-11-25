import React from 'react';
import styled from 'styled-components';
import Hero from '../components/Home/Hero';
import ModelsPreview from '../components/Home/ModelsPreview';
import Features from '../components/Home/Features';

const HomeContainer = styled.div`
  overflow-x: hidden;
`;

const Home = () => {
  return (
    <HomeContainer>
      <Hero />
      <ModelsPreview />
      <Features />
    </HomeContainer>
  );
};

export default Home;