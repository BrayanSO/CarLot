import React, { useState } from 'react';
import db from '../Store/firebase.js';

const Register = () => {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Guardar los datos en Firestore
    db.collection('users').add({
      nombre: nombre,
      correo: correo,
      password: password,
    })
      .then(() => {
        // Limpiar los campos del formulario
        setNombre('');
        setCorreo('');
        setPassword('');
      })
      .catch((error) => {
        console.error('Error al enviar el formulario:', error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />
      <input
        type="email"
        placeholder="Correo electrónico"
        value={correo}
        onChange={(e) => setCorreo(e.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Enviar</button>
    </form>
  );
};
export default Register;