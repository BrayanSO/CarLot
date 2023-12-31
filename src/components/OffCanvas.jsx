import { useState } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Identify from './Identify';
import "../Styles/Canvas.css"

function Canvas() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const offcanvasStyle = {
    height: "1000px", // Define la altura deseada
  
  };
  
const handleSearch = (searchData) => {
    // Aquí debes implementar la lógica para buscar autos con los datos de búsqueda (searchData)
    // Puedes mostrar los resultados de la búsqueda en otro componente o realizar cualquier acción necesaria.
    // Por ahora, simplemente mostraremos los datos de búsqueda en la consola.
    console.log('Search Data:', searchData);
  };
  

  return (
    <div className='icono'>
      <Button className='button'  variant="light"   onClick={handleShow}>
        <i className=" bi bi-list"></i>
      </Button>
      <Offcanvas className="style2" show={show} onHide={handleClose} placement="top" style={offcanvasStyle}>
        <Offcanvas.Header className='closebutton' closeButton>
        </Offcanvas.Header>
        <Offcanvas.Body className="style">
          <Identify className="style3" onSearch={handleSearch} />
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}

export default Canvas;