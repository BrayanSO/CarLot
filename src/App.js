import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa los estilos CSS de Bootstrap
import CarList from "./components/CarList.jsx";
import CarForm from './pages/CarForm.jsx';
import Header from './components/Header.jsx';

function App() {
  return (
    <div>
      <Header/>
      <CarList />
      <hr />
      <CarForm />
    </div>
  );
}

export default App;