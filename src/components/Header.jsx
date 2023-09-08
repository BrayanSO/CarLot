import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import CarLogo from "../logo/CarLogo.png"
import "../Styles/Header.css"

function Header() {
  return (
    <header>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link}to="/"><img src={CarLogo} alt="Logo"></img></Nav.Link>
              {/* Usa el componente Link para redireccionar a Register */}
              <Nav.Link as={Link} to="/LoginForm">Login</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;