import React from 'react';

function CarCard({ car, onDeleteClick, onDetailsClick }) {
  return (
    <div className="car-card">
      <img src={car.imageURL} alt={`${car.make} ${car.model} ${car.style}`} />
      <p>{`Make: ${car.make}\nModel: ${car.model}\nStyle: ${car.style}`}</p>
      <button onClick={() => onDeleteClick(car)}>Eliminar</button>
      <button onClick={() => onDetailsClick(car)}>Detalles</button>
    </div>
  );
}

export default CarCard;