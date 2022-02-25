import React from 'react';
import { PlanetProvider } from './context/index';
import './App.css';
import Table from './components/Table';

function App() {
  return (
    <PlanetProvider>
      <header>
        <h1>Projeto StarWars Planets</h1>
      </header>
      <Table />
    </PlanetProvider>
  );
}

export default App;
