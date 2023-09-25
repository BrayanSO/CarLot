import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import firebase from 'firebase/compat/app'; // Importa firebase
import 'firebase/compat/auth'; // Importa la autenticación de Firebase
import '../Styles/LoginStyle.css';

const LoginForm = () => {
  const [loginData, setLoginData] = useState({
    email: '',
    contraseña: '',
  });


  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setLoginData({ ...loginData, [name]: value });
  };

  
  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const { email, contraseña } = loginData;
  
    try {
      // Iniciar sesión con Firebase Authentication
      await firebase.auth().signInWithEmailAndPassword(email, contraseña);
  
        // Si el inicio de sesión tiene éxito, redirige al usuario a la página deseada
        console.log('Inicio de sesión exitoso');
        window.location.href = '/Identify'; // Cambia '/dashboard' por la URL de la página a la que deseas redirigir al usuario
      } catch (error) {
        console.error('Error al iniciar sesión:', error.message);
      }
    };
  

  return (
    <div className="login-form-container">
      <h2>Iniciar Sesión</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={loginData.email}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="contraseña">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="contraseña"
            value={loginData.contraseña}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <div className="button-container">
          <Button variant="primary" type="submit">
            Iniciar Sesión
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default LoginForm;

