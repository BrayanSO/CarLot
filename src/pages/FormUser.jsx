import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const Register = () => {
  const [userData, setUserData] = useState({
    nombre: '',
    email: '',
    contraseña: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    localStorage.setItem('user', JSON.stringify(userData));
  
  // Limpia el formulario
  setUserData({ email: '', contraseña: '' });
    
    // Aquí puedes agregar la lógica para enviar los datos del usuario al servidor o almacenarlos localmente
    console.log('Datos del usuario registrados:', userData);
  };

  return (
    <div>
      <h2>Registro de Usuario</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="nombre">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            name="nombre"
            value={userData.nombre}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label>Correo Electrónico</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={userData.email}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="contraseña">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type="password"
            name="contraseña"
            value={userData.contraseña}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Registrar
        </Button>
      </Form>
    </div>
  );
};

export default Register;
