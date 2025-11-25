import React, { useState, useEffect } from 'react';
import CarCard from '../components/CarCard';
import { getModels } from '../services/api';

function Models() {
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const data = await getModels();
        setModels(data);
      } catch (error) {
        console.error("Failed to fetch models:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchModels();
  }, []);

  if (loading) return <p className="container">Loading...</p>;

  return (
    <div className="container">
      <h1>Our Models</h1>
      <div className="grid">
        {models.map(model => <CarCard key={model.id} model={model} />)}
      </div>
    </div>
  );
}

export default Models;