import React from 'react';
import Hero from '../components/Hero';

function Home() {
  return (
    <Hero
      title="Art, Forme, Technique"
      subtitle="Experience the pinnacle of automotive engineering and luxury."
      buttonText="Explore Models"
      buttonLink="/models"
    />
  );
}

export default Home;