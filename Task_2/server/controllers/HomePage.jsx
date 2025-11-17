import React from 'react';
import Silk from '../components/Silk';

function HomePage() {
  return (
    <div className="relative h-screen">
      {/* Dynamic Silk Background */}
      <div className="absolute inset-0">
        <Silk
          speed={3}
          scale={1.2}
          color="#A084CF"
          noiseIntensity={1.0}
          rotation={0.2}
        />
      </div>

      {/* Hero Content (ensure it's above the Silk component) */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white">
        <h1 className="text-4xl font-bold mb-4">Welcome to Fansee Rebel</h1>
        <p className="text-lg">Discover our amazing products.</p>
        {/* Add more content here */}
      </div>
    </div>
  );
}

export default HomePage;