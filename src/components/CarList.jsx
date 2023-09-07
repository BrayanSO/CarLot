import React, { useState, useEffect } from 'react';

const CarList = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    // Obtener la lista de autos desde el almacenamiento local
    const savedCars = JSON.parse(localStorage.getItem('cars')) || [];
    setCars(savedCars);
  }, []);

  return (
    <div>
      <h1>Inventory</h1>
      <ul>
        {cars.map((car, index) => (
          <div key={index}>{car.brand} - {car.model} - ${car.price}</div>
        ))}
      </ul>
    </div>
  );
};

export default CarList;