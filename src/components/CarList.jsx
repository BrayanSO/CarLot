import React, { useState, useEffect } from 'react';
import "../Styles/CarFstyle.css";

const CarList = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    // Obtener la lista de autos desde el almacenamiento local
    const savedCars = JSON.parse(localStorage.getItem('cars')) || [];
    setCars(savedCars);
  }, []);

  const handleDeleteClick = (index) => {
    // Elimina el formulario con el índice especificado
    const updatedCars = [...cars];
    updatedCars.splice(index, 1);
    setCars(updatedCars);

    // Actualiza el almacenamiento local
    localStorage.setItem('cars', JSON.stringify(updatedCars));
  };

  return (
    <div className="car-list-container">
      <h1>Inventory</h1>
      <ul>
        {cars.map((car, index) => (
          <div key={index} className="car-card">
            <img src={car.image} alt={`${car.brand} ${car.model}`} />
            <div className="car-info">
              <p>{`Marca: ${car.brand} - Modelo: ${car.model} - Precio: $${car.price} - Estilo: ${car.style}`}</p>
              <button onClick={() => handleDeleteClick(index)}>Eliminar</button>
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default CarList;
