import React from 'react';
import ReactDOM from 'react-dom';

import '../src/Styles/index.css'; // Si deseas agregar estilos globales
import Layout from './Store/layout';

ReactDOM.render(
  <React.StrictMode>
    <Layout/>
  </React.StrictMode>,
  document.getElementById('root')
);