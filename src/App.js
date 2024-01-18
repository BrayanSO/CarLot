import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa los estilos CSS de Bootstrap
import CarList from "./components/CarList.jsx";
import  "./Styles/App.css"


function App() {
  return (
    <div className="container">
      <div className="row">
        
        <div className="col-md-2 col-sm-12">
          <div className='filter'>
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