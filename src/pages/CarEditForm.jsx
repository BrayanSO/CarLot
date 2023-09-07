import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const CarEditForm = ({ car, onSave, onCancel }) => {
  const [editedCar, setEditedCar] = useState(car);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedCar({ ...editedCar, [name]: value });
  };

  const handleSubmit = () => {
    onSave(editedCar); // Llama a la función onSave para guardar los cambios
  };

  return (
    <div className="car-edit-form">
      <h2>Editar Automóvil</h2>
      <form>
        <div className="form-group">
          <label>Marca:</label>
          <input
            type="text"
            name="brand"
            value={editedCar.brand}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Modelo:</label>
          <input
            type="text"
            name="model"
            value={editedCar.model}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Precio:</label>
          <input
            type="number"
            name="price"
            value={editedCar.price}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Estilo:</label>
          <input
            type="text"
            name="style"
            value={editedCar.style}
            onChange={handleInputChange}
          />
        </div>
        <button type="button" onClick={handleSubmit}>
          Guardar Cambios
        </button>
      </form>
    </div>
  );
};

const EditCarModal = ({ show, onHide, car, onSave, onCancel }) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Editar Automóvil</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <CarEditForm car={car} onSave={onSave} onCancel={onCancel} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancelar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditCarModal;
