import React, { useState } from 'react';
import "../Styles/CarFstyle.css";

const CarForm = () => {
  const [formData, setFormData] = useState({ brand: '', style: '', model: '', price: '', image: null });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (event) => {
    const imageFile = event.target.files[0];
    setFormData({ ...formData, image: URL.createObjectURL(imageFile) }); // Mostrar la vista previa de la imagen
  };

  const handleSubmit = () => {
    // Guardar el nuevo auto en el almacenamiento local
    const savedCars = JSON.parse(localStorage.getItem('cars')) || [];
    savedCars.push(formData);
    localStorage.setItem('cars', JSON.stringify(savedCars));
    // Limpiar el formulario
    setFormData({ brand: '', style: '', model: '', price: '', image: null });
  };

  return (
    <div className="car-form-container">
      <h1>Post new ad</h1>
      <form className="car-form">
        <div className="form-group">
          <label>Brand:</label>
          <input type="text" name="brand" value={formData.brand} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label>Style:    </label>
          <input type="text" name="style" value={formData.style} onChange={handleInputChange} />
        </div>

        <div className="form-group">
          <label>Model:</label>
          <input type="text" name="model" value={formData.model} onChange={handleInputChange} />
        </div>

        <div className="form-group">
          <label>Price:</label>
          <input type="number"  placeholder="$" name="price" value={formData.price} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label>Image:</label>
          <input type="file" name="image" accept="image/*" onChange={handleImageChange} />
        </div>

        {formData.image && (
          <div className="image-preview">
            <img src={formData.image} alt="Preview" />
          </div>
        )}

        <button type="button" onClick={handleSubmit} className="submit-button">
          Publicar Anuncio
        </button>
      </form>
    </div>
  );
};

export default CarForm;

