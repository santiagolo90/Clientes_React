import React from 'react';
import logo from './logo.svg';
import './App.css';
import MyNav from './componentes/navbar/MyNav'
import {Formulario,Example} from  './componentes/formulario/Formulario'

function App() {
  return (
    <div className="App">
      <MyNav logo={logo}></MyNav>
      {/* <header className="App-header">
        <Formulario custom={myFunction}></Formulario>
      </header> */}
    </div>
  );
}

export default App;
