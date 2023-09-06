import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const LoginForm = () => {
  const [loginData, setLoginData] = useState({
    email: '',
    contraseña: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
      // Obtiene los datos de usuario almacenados en localStorage
  const storedUser = localStorage.getItem('user');
  
  // Verifica si los datos de inicio de sesión coinciden con los datos almacenados
  if (storedUser) {
    const storedUserData = JSON.parse(storedUser);
    if (loginData.email === storedUserData.email && loginData.contraseña === storedUserData.contraseña) {
      // El inicio de sesión es exitoso
      console.log('Inicio de sesión exitoso');
    } else {
      // Datos de inicio de sesión incorrectos
      console.log('Datos de inicio de sesión incorrectos');
    }
  } else {
    // No se encontraron datos de usuario
    console.log('Usuario no registrado');
};
    // Aquí puedes agregar la lógica para enviar los datos de inicio de sesión al servidor y autenticar al usuario
    console.log('Datos de inicio de sesión:', loginData);
  };

  return (
    <div>
      <h2>Iniciar Sesión</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="email">
          <Form.Label>Correo Electrónico</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={loginData.email}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="contraseña">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type="password"
            name="contraseña"
            value={loginData.contraseña}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Iniciar Sesión
        </Button>
      </Form>
    </div>
  );
};

export default LoginForm;
