import React from 'react';
import { PlanetProvider } from './context/index';
import './App.css';
import SearchInput from './components/SearchInput';
import Table from './components/Table';
import FiltersSection from './components/FiltersSection';
import './index.css';

function App() {
  return (
    <PlanetProvider>
      <header>
        <h1>Projeto StarWars Planets</h1>
      </header>
      <div className='filter_div'>
      <SearchInput />
      <FiltersSection />
      </div>
      <Table />
    </PlanetProvider>
  );
}

export default App;
