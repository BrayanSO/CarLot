import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import CarLogo from "../logo/CarLogo.png"
import "../Styles/Header.css"

function Header() {
  return (
    <header>
      <Navbar  className="justify-content-center">
       
            <Nav >
              <div className='logo'>
              <Nav.Link as={Link}to="/"><img src={CarLogo} alt="Logo"></img></Nav.Link>
              </div>
              {/* Usa el componente Link para redireccionar a Register */}
              <div className='login'>
            {/* <Nav.Link as={Link} to="/LoginForm"><p>Login</p></Nav.Link> */}
              </div>
            </Nav>
          
        
      </Navbar>
    </header>
  );
}

export default Header;