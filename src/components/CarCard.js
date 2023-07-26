import React from 'react';

function CarCard({ car }) {
  return (
    <div className="car-card">
      <img src={car.imageURL} alt={`${car.brand} ${car.model}`} />
      <p>{`Marca: ${car.brand}\nModelo: ${car.model}`}</p>
      {/* Agrega más detalles y botones para editar/eliminar el auto */}
    </div>
  );
}

export default CarCard;