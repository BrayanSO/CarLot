import React, { useState } from 'react';
import "../Styles/CarFstyle.css";

const Identify = ({ onSearch }) => {
  const [formData, setFormData] = useState({ make: '', style: '', model: '', transmission: '', price: '', images: [] });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (event) => {
    const imageFiles = event.target.files;
    const imageUrls = Array.from(imageFiles).map((file) => URL.createObjectURL(file));
    setFormData({ ...formData, images: [...formData.images, ...imageUrls] });
  };

  const handleSubmit = () => {
    if (onSearch) {
      onSearch(formData);
    } else {
      const savedCars = JSON.parse(localStorage.getItem('cars')) || [];
      savedCars.push(formData);
      localStorage.setItem('cars', JSON.stringify(savedCars));
      setFormData({ make: '', style: '', model: '', price: '', transmission:'', images: [] }); 
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
          <select  name="style" value={formData.style} onChange={handleInputChange} >
          <option value="">Select Model</option>
          <option value="Sedan">Sedan</option>
          <option value="Hatchback">Hastback</option>
          <option value="Suv">SUV</option>
          </select>
        </div>
        <div className="form-group">
          <label>Transmission:</label>
          <select  name="transmission" value={formData.transmission} onChange={handleInputChange}>
          <option value="">Select Model</option>
          <option value="Manual">Manual</option>
          <option value="Automatic">Automatic</option>
          <option value="CVT Automatic">CVT Automatic</option>
          </select>
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
        
        {!onSearch && (
  <div className="form-group">
    <label>Images:</label>
    <input type="file" name="image" accept="image/*" onChange={handleImageChange} multiple={true} />
  </div>
)}

        {formData.images.length > 0 && !onSearch && (
          <div className="image-preview">
            {formData.images.map((imageUrl, index) => (
              <img key={index} src={imageUrl} alt={`Preview ${index}`} />
            ))}
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
