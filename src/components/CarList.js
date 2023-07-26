import React from 'react';
import CarCard from './CarCard';

function CarList() {
  // Aquí obtendrías la lista de autos desde una API o una base de datos
  const cars = [
    { id: 1, brand: 'Toyota', model: 'Camry', imageURL: 'url_to_image1' },
    { id: 2, brand: 'Honda', model: 'Civic', imageURL: 'url_to_image2' },
    // Agrega más autos aquí
  ];

  return (
    <section id="car-list">
      <h2>Lista de Autos</h2>
      {cars.map((car) => (
        <CarCard key={car.id} car={car} />
      ))}
    </section>
  );
}

export default CarList;