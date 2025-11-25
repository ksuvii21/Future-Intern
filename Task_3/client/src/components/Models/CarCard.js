import React from 'react';

const CarCard = ({ car }) => {
  return (
    <div>
      <h3>{car.name || 'CarCard placeholder'}</h3>
      <p>{car.description || 'Description not available'}</p>
    </div>
  );
};

export default CarCard;
