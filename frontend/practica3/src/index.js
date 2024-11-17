import React from 'react';
import ReactDOM from 'react-dom/client';

//Importo el componente que mostrará la data
import SolicitarDatos from "./SolicitarDatos";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <SolicitarDatos/>
  </React.StrictMode>
);
