import React, { useState, useEffect } from 'react';
import { MDBFooter, MDBContainer } from 'mdb-react-ui-kit';
import "../Styles/FooterStyles.css";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth'; // Asegúrate de importar el módulo de autenticación

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Agrega un oyente de cambio de autenticación de Firebase
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // El usuario está autenticado
        setIsLoggedIn(true);
      } else {
        // El usuario no está autenticado
        setIsLoggedIn(false);
      }
    });

    return () => {
      // Limpia el oyente cuando el componente se desmonta
      unsubscribe();
    };
  }, []); // El array vacío garantiza que el efecto se ejecute solo una vez al montar el componente

  const handleLoginLogout = () => {
    if (isLoggedIn) {
      // Si el usuario ya ha iniciado sesión, realiza el cierre de sesión utilizando Firebase.
      firebase.auth().signOut().then(() => {
        // setIsLoggedIn se actualizará automáticamente a false a través del oyente de cambio de autenticación.
        // Redirige al usuario a la página principal.
        window.location.href = "/";
      }).catch((error) => {
        // Maneja cualquier error que ocurra durante el cierre de sesión.
        console.error('Error durante el cierre de sesión:', error);
      });
    } else {
      // Si el usuario no ha iniciado sesión, redirige al formulario de inicio de sesión.
      window.location.href = "/LoginForm";
    }
  };
  

  return (
    <MDBFooter className='footerSt text-center text-white' style={{ backgroundColor: 'grey' }}>
      <MDBContainer className='p-4'></MDBContainer>

      <div className='text-center p-3' style={{ backgroundColor: 'grey' }}>
        © 2023 Copyright:
        <div className='text' href='https://github.com/BrayanSO/CarLot'>
          {/* Más información */}
          <button className="btn btn-link" onClick={handleLoginLogout}>
            {isLoggedIn ? "Logoff" : "Login"}
          </button>
        </div>
      </div>
    </MDBFooter>
  );
}
