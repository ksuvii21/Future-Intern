import React from 'react';
import './Hyperspeed.css';

const Hyperspeed: React.FC = () => {
  const stars = Array.from({ length: 100 }).map((_, i) => (
    <div
      key={i}
      className="star"
      style={{
        '--star-index': i,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * -2}s`,
      } as React.CSSProperties}
    />
  ));

  return <div className="hyperspeed-bg">{stars}</div>;
};

export default Hyperspeed;