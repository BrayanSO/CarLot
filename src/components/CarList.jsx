import React, { useState, useEffect } from 'react';
import "../Styles/CarListSyle.css";
import EditCarModal from "../pages/CarEditForm.jsx"; // Importa tu componente de edición de automóviles
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const CarList = () => {
  const [cars, setCars] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    // Obtener la lista de autos desde el almacenamiento local
    const savedCars = JSON.parse(localStorage.getItem('cars')) || [];
    setCars(savedCars);
  }, []);

  const handleDeleteClick = (index) => {
    const updatedCars = [...cars];
    updatedCars.splice(index, 1);
    setCars(updatedCars);
    localStorage.setItem('cars', JSON.stringify(updatedCars));
  };

  const handleEditClick = (index) => {
    setEditIndex(index);
    setShowEditModal(true);
  };

  const handleEditSave = (editedCar) => {
    const updatedCars = [...cars];
    updatedCars[editIndex] = editedCar;
    setCars(updatedCars);
    setEditIndex(null);
    localStorage.setItem('cars', JSON.stringify(updatedCars));
  };

  return (
    <div className="car-list-container">
      <h1>Inventory</h1>
      <div className="car-card-container">
        {cars.map((car, index) => (
          <div key={index} className="car-card">
            <Carousel autoPlay interval={3000} showThumbs={false}>
              {car.images.map((image, imageIndex) => (
                <div key={imageIndex}>
                  <img src={image} alt={`${car.make} ${car.model}`} />
                </div>
              ))}
            </Carousel>
            <div className="car-info">
              <p>
                <strong>Marca:</strong> {car.make} <br />
                <strong>Modelo:</strong> {car.model} <br />
                <strong>Precio:</strong> ${car.price}
              </p>
              <button onClick={() => handleDeleteClick(index)}>Eliminar</button>
              <button onClick={() => handleEditClick(index)}>Editar</button>
            </div>
          </div>
        ))}
      </div>
      {editIndex !== null && (
        <EditCarModal
          show={showEditModal}
          onHide={() => setShowEditModal(false)}
          car={cars[editIndex]}
          onSave={handleEditSave}
        />
      )}
    </div>
  );
};

export default CarList;
