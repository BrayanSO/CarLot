import React from 'react';

function CarCard({ car, onDeleteClick, onDetailsClick }) {
  return (
    <div className="car-card">
      <img src={car.imageURL} alt={`${car.make} ${car.model}`} />
      <p>{`Marca: ${car.make}\nModelo: ${car.model}`}</p>
      <button onClick={() => onDeleteClick(car)}>Eliminar</button>
      <button onClick={() => onDetailsClick(car)}>Detalles</button>
    </div>
  );
}

export default CarCard;