import React from 'react';
import { createRoot } from 'react-dom/client'; // Importa createRoot desde 'react-dom/client'

import '../src/Styles/index.css'; // Si deseas agregar estilos globales
import Layout from './Store/layout';
const root = createRoot(document.getElementById('root'));


root.render(
  <React.StrictMode>
    <Layout />
  </React.StrictMode>
);