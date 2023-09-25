import React, { useState } from 'react';
import firebase from 'firebase/compat/app'; // Importa firebase
import "firebase/compat/auth";
import 'firebase/compat/firestore';
import db from '../Store/firebase'


const Register = () => {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Crear un nuevo usuario en Firebase Authentication
    firebase.auth().createUserWithEmailAndPassword(correo, password)
      .then((userCredential) => {
        // Usuario registrado con éxito
        var user = userCredential.user;
        // Guardar los datos del usuario en Firestore
        db.collection('users').add({
          nombre: nombre,
          correo: correo,
          userId: user.uid, // Asociar el ID del usuario autenticado
        })
          .then(() => {
            // Limpiar los campos del formulario
            setNombre('');
            setCorreo('');
            setPassword('');
          })
          .catch((error) => {
            console.error('Error al guardar los datos en Firestore:', error);
          });
      })
      .catch((error) => {
        console.error('Error al crear el usuario en Firebase:', error);
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
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Enviar</button>
    </form>
  );
};

export default Register;