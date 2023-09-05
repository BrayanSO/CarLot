import React, { useState } from 'react';

const CarForm = () => {
  const [formData, setFormData] = useState({ brand: '', model: '', price: '' });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    // Guardar el nuevo auto en el almacenamiento local
    const savedCars = JSON.parse(localStorage.getItem('cars')) || [];
    savedCars.push(formData);
    localStorage.setItem('cars', JSON.stringify(savedCars));
    // Limpiar el formulario
    setFormData({ brand: '', model: '', price: '' });
  };

  return (
    <div>
      <h1>Publicar Anuncio</h1>
      <form>
        <label>Marca:</label>
        <input type="text" name="brand" value={formData.brand} onChange={handleInputChange} />
        <br />

        <label>Modelo:</label>
        <input type="text" name="model" value={formData.model} onChange={handleInputChange} />
        <br />

        <label>Precio:</label>
        <input type="number" name="price" value={formData.price} onChange={handleInputChange} />
        <br />

        <button type="button" onClick={handleSubmit}>Publicar Anuncio</button>
      </form>
    </div>
  );
};

export default CarForm;
