import React, { useState } from 'react';
import "../Styles/CarFstyle.css";

const Identify = ({ onSearch }) => {
  const [formData, setFormData] = useState({ make: '', style: '', model: '', price: '', image: null });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (event) => {
    const imageFile = event.target.files[0];
    setFormData({ ...formData, image: URL.createObjectURL(imageFile) });
  };

  const handleSubmit = () => {
    if (onSearch) {
      onSearch(formData);
    } else {
      const savedCars = JSON.parse(localStorage.getItem('cars')) || [];
      savedCars.push(formData);
      localStorage.setItem('cars', JSON.stringify(savedCars));
      setFormData({ make: '', style: '', model: '', price: '', image: null });
    }
  };

  return (
    <div className="car-form-container">
      <h1>{onSearch ? 'Search for Cars' : 'Post new ad'}</h1>
      <form className="car-form">
        <div className="form-group">
          <label>Make:</label>
          <select name="make" value={formData.make} onChange={handleInputChange}>
            <option value="">Select Make</option>
            <option value="Toyota">Toyota</option>
            <option value="Ford">Ford</option>
            <option value="Honda">Honda</option>
            {/* Agrega más opciones de marca según tus necesidades */}
          </select>
        </div>
        <div className="form-group">
          <label>Style:</label>
          <input type="text" name="style" value={formData.style} onChange={handleInputChange} />
        </div>

        <div className="form-group">
          <label>Model:</label>
          <select name="model" value={formData.model} onChange={handleInputChange}>
            <option value="">Select Model</option>
            {/* Agrega opciones de modelo según la marca seleccionada */}
            {formData.make === 'Toyota' && (
              <>
                <option value="Camry">Camry</option>
                <option value="Corolla">Corolla</option>
                {/* Agrega más modelos de Toyota según tus necesidades */}
              </>
            )}
            {formData.make === 'Ford' && (
              <>
                <option value="F-150">F-150</option>
                <option value="Escape">Escape</option>
                {/* Agrega más modelos de Ford según tus necesidades */}
              </>
            )}
            {formData.make === 'Honda' && (
              <>
                <option value="Civic">Civic</option>
                <option value="Accord">Accord</option>
                {/* Agrega más modelos de Honda según tus necesidades */}
              </>
            )}
          </select>
        </div>

        <div className="form-group">
          <label>Price:</label>
          <input type="number" placeholder="$" name="price" value={formData.price} onChange={handleInputChange} />
        </div>
        {onSearch ? null : (
          <div className="form-group">
            <label>Image:</label>
            <input type="file" name="image" accept="image/*" onChange={handleImageChange} />
          </div>
        )}

        {formData.image && !onSearch && (
          <div className="image-preview">
            <img src={formData.image} alt="Preview" />
          </div>
        )}

        <button type="button" onClick={handleSubmit} className="submit-button">
          {onSearch ? 'Search' : 'Post Ad'}
        </button>
      </form>
    </div>
  );
};

export default Identify;
