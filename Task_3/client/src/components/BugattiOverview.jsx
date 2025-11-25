import React from 'react';
import Hyperspeed from './Hyperspeed.jsx';
import { GridScan } from './GridScan.jsx';
import './BugattiOverview.css';

const BugattiOverview = () => {
  return (
    <>
      <Hyperspeed />
      <GridScan />
      <div className="overview-container">
        <header className="overview-header">
          <h1>BUGATTI</h1>
          <p>"If comparable, it is no longer Bugatti."</p>
        </header>

        <section className="overview-section">
          <h2>The Founder: Ettore Bugatti</h2>
          <p>
            Ettore Arco Isidoro Bugatti, born into an artistic family in Milan, Italy, founded his automobile company in 1909 in Molsheim, a region that is now part of France. His vision was to create cars that were not just modes of transportation, but pieces of art and marvels of engineering. This philosophy was rooted in his family's artistic background; his father was a renowned Art Nouveau furniture and jewelry designer.
          </p>
        </section>

        <section className="overview-section">
          <h2>Philosophy: The Pinnacle of Performance and Luxury</h2>
          <p>
            Bugatti's ethos is a relentless pursuit of perfection, blending artistry with engineering to push the boundaries of performance. The brand is synonymous with creating the world's most powerful and luxurious hyper sports cars. This dedication to excellence means that every component is crafted to be a masterpiece, functioning flawlessly while embodying exquisite craftsmanship.
          </p>
        </section>

        <section className="overview-section">
          <h2>Iconic Models</h2>
          <div className="models-grid">
            <div className="model-card">
              <h3>Bugatti Veyron</h3>
              <p>
                Introduced in the early 2000s, the Veyron created the hyper sports car segment. It was the first production car to exceed 1,000 horsepower and a top speed of 400 km/h (253 mph).
              </p>
              <ul>
                <li><strong>Engine:</strong> 8.0L Quad-Turbocharged W16</li>
                <li><strong>Power:</strong> ~1001 HP</li>
                <li><strong>Top Speed:</strong> ~407 km/h</li>
              </ul>
            </div>
            <div className="model-card">
              <h3>Bugatti Chiron</h3>
              <p>
                The successor to the Veyron, the Chiron, continued to redefine speed and usability. It boasts an updated W16 engine producing nearly 1,500 horsepower.
              </p>
              <ul>
                <li><strong>Engine:</strong> 8.0L Quad-Turbocharged W16</li>
                <li><strong>Power:</strong> ~1479 HP</li>
                <li><strong>Top Speed:</strong> ~420 km/h</li>
              </ul>
            </div>
            <div className="model-card">
              <h3>Bugatti Divo</h3>
              <p>
                A track-focused hypercar, the Divo is designed for agility and exceptional handling, with a limited production run that enhances its exclusivity.
              </p>
              <ul>
                <li><strong>Engine:</strong> 8.0L Quad-Turbocharged W16</li>
                <li><strong>Power:</strong> ~1479 HP</li>
                <li><strong>Top Speed:</strong> 380 km/h (limited)</li>
              </ul>
            </div>
          </div>
        </section>

        <footer className="overview-footer">
          <p>Hand-assembled in Molsheim, France.</p>
        </footer>
      </div>
    </>
  );
};

export default BugattiOverview;