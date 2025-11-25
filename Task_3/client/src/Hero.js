import React from 'react';
import { Link } from 'react-router-dom';

function Hero({ title, subtitle, buttonText, buttonLink }) {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>{title}</h1>
        <p>{subtitle}</p>
        {buttonText && <Link to={buttonLink} className="btn">{buttonText}</Link>}
      </div>
    </section>
  );
}

export default Hero;