import React, { useState, useEffect } from 'react';
import "../Styles/CarListSyle.css";
import EditCarModal from "../pages/CarEditForm.jsx" // Importa tu componente de edición de automóviles


const CarList = () => {
  const [cars, setCars] = useState([]);
  const [editIndex, setEditIndex] = useState(null); // Estado para rastrear el índice del automóvil en edición
  const [showEditModal, setShowEditModal] = useState(false);
  useEffect(() => {
    // Obtener la lista de autos desde el almacenamiento local
    const savedCars = JSON.parse(localStorage.getItem('cars')) || [];
    setCars(savedCars);
  }, []);

  const handleDeleteClick = (index) => {
    // Elimina el formulario con el índice especificado
    const updatedCars = [...cars];
    updatedCars.splice(index, 1);
    setCars(updatedCars);

    // Actualiza el almacenamiento local
    localStorage.setItem('cars', JSON.stringify(updatedCars));
  };

  const handleEditClick = (index) => {
    // Establece el índice del automóvil en edición
    setEditIndex(index);
    // Muestra el modal de edición
    setShowEditModal(true);
  };
  

  const handleEditSave = (editedCar) => {
    // Actualiza la lista de automóviles con los cambios realizados
    const updatedCars = [...cars];
    updatedCars[editIndex] = editedCar;
    setCars(updatedCars);
    setEditIndex(null); // Sale del modo de edición

    // Actualiza el almacenamiento local
    localStorage.setItem('cars', JSON.stringify(updatedCars));
  };

  return (
    <div className="car-list-container">
      <h1>Inventory</h1>
      <ul>
        {cars.map((car, index) => (
          <div key={index} className="car-card">
            <img src={car.image} alt={`${car.make} ${car.model}`} />
            <div className="car-info">
              <p>
                <strong>Marca:</strong> {car.make} <br />
                <strong>Modelo:</strong> {car.model} <br />
                <strong>Precio:</strong> ${car.price}
              </p>
              <button onClick={() => handleDeleteClick(index)}>Eliminate</button>
              <button onClick={() => handleEditClick(index)}>Edit</button>
            </div>
          </div>
        ))}
      </ul>
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
