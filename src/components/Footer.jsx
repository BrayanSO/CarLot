import React, { useState } from 'react';
import { MDBFooter, MDBContainer } from 'mdb-react-ui-kit';
import "../Styles/FooterStyles.css"

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginLogout = () => {
    if (isLoggedIn) {
      // Si ya has iniciado sesión, entonces puedes hacer clic para cerrar sesión.
      setIsLoggedIn(false);
    } else {
      // Si aún no has iniciado sesión, redirige al formulario de inicio de sesión.
      // Puedes usar React Router o cualquier otra forma de navegación que prefieras.
      // Aquí supongo que estás utilizando React Router.
      // Reemplaza "/LoginForm" con la ruta correcta a tu formulario de inicio de sesión.
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
