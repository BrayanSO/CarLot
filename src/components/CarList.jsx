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
      <h1>Listado de Autos</h1>
      <ul>
        {cars.map((car, index) => (
          <li key={index}>{car.brand} - {car.model} - ${car.price}</li>
        ))}
      </ul>
    </div>
  );
};

export default CarList;