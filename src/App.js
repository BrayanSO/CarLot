import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa los estilos CSS de Bootstrap
import CarList from "./components/CarList.jsx";
import Identify from './components/Identify.jsx';
import  "./Styles/App.css"


const handleSearch = (searchData) => {
  // Aquí debes implementar la lógica para buscar autos con los datos de búsqueda (searchData)
  // Puedes mostrar los resultados de la búsqueda en otro componente o realizar cualquier acción necesaria.
  // Por ahora, simplemente mostraremos los datos de búsqueda en la consola.
  console.log('Search Data:', searchData);
};


function App() {
  return (
    <div className="container">
      <div className="row">
        
        <div className="col-md-2 col-sm-12">
          <div className='filter'>
            <Identify onSearch={handleSearch} />
          </div>
        </div>
        <div className="col-md-8 col-sm-12">
          <CarList />
        </div>
      </div>
      <div className="row">
        <div className="col-md-10">
          <hr />
        </div>
        
      </div>
    </div>
  );
}


export default App;