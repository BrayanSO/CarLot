import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes,} from 'react-router-dom';
import './index.css'; // Si deseas agregar estilos globales
import Register from './components/Register';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
     <Router>
  <Routes>
    <switch>
        <Route path="/" exact component={App} />
        <Route path="/register" component={Register} />
        </switch>
        </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);