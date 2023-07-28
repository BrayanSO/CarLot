import React, { useState } from 'react';

function CarForm() {
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [imageURL, setImageURL] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí enviarías los datos del nuevo auto a una API o base de datos
    // para agregarlo a la lista de autos disponibles
    // Luego, podrías actualizar la lista en CarList.js
  };

  return (
    <section id="car-form">
      <h2>Formulario de Autos</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="brand">Marca:</label>
        <input type="text" id="brand" value={brand} onChange={(e) => setBrand(e.target.value)} required />

        <label htmlFor="model">Modelo:</label>
        <input type="text" id="model" value={model} onChange={(e) => setModel(e.target.value)} required />

        <label htmlFor="imageURL">URL de la imagen:</label>
        <input type="text" id="imageURL" value={imageURL} onChange={(e) => setImageURL(e.target.value)} required />
        
        <label htmlFor="imageURL">URL de la imagen:</label>
        <input type="text" id="imageURL" value={imageURL} onChange={(e) => setImageURL(e.target.value)} required />

        <button type="submit">Guardar</button>
      </form>
    </section>
  );
}

export default CarForm;