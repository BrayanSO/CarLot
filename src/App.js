import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa los estilos CSS de Bootstrap
import CarList from "./components/CarList.jsx";
import Identify from './components/Identify.jsx';
const handleSearch = (searchData) => {
  // Aquí debes implementar la lógica para buscar autos con los datos de búsqueda (searchData)
  // Puedes mostrar los resultados de la búsqueda en otro componente o realizar cualquier acción necesaria.
  // Por ahora, simplemente mostraremos los datos de búsqueda en la consola.
  console.log('Search Data:', searchData);
};


function App() {
  return (
    <div>
      <CarList />
      <Identify onSearch={handleSearch} />
      <hr />
    </div>
  );
}

export default App;