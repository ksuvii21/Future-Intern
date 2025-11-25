import React from 'react';

function CarCard({ model }) {
  return (
    <div className="card">
      <img src={model.imageUrl} alt={model.name} className="card-img" />
      <div className="card-content">
        <h3>{model.name}</h3>
        <p>Power: {model.power} | Top Speed: {model.topSpeed}</p>
      </div>
    </div>
  );
}

export default CarCard;