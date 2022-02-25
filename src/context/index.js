import React, { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import fetchPlanets from '../services/fetchAPI';
import applyInputFilter from '../helpers/applyFilters';

export const PlanetContext = createContext();

export const PlanetProvider = ({ children }) => {
  const [data, setData] = useState({}); // useState recebe chaves pois valor inicial do estado é um objeto
  const [filterInput, setFilterInput] = useState(''); // estado do "filterInput"
  const [filteredPlanets, setFilteredPlanets] = useState([]); // estado com os planetas filtrados

  const getPlanets = async () => { // chama a fetchPlanets para fazer a busca dos dados na API.
    const response = await fetchPlanets();
    const filterResult = applyInputFilter(response, filterInput); // a função "applyInputFilter" deve receber o retorno da API com todos os planetes mais o valor do input
    setData(response);
    setFilteredPlanets(filterResult);
  };

  useEffect(() => { // "componentdidUpdate", não aceita funções assincronas por isso fiz a "getPlanets"
    getPlanets();
  }, []); // o lint pede um array, pesquisar o porque depois

  const handleInputChange = ({ target }) => {
    setFilterInput(target.value);
    const filterResult = applyInputFilter(data, target.value);
    console.log(target.value);
    setFilteredPlanets(filterResult);
  };

  const value = { // passa todos os valores para o componentes filhos, podem ser os estados ou funções
    data,
    filterInput,
    handleInputChange,
    filteredPlanets,
  };

  return (
    <PlanetContext.Provider value={ value }>
      { children }
    </PlanetContext.Provider>
  );
};

PlanetProvider.propTypes = {
  children: PropTypes.instanceOf(Object).isRequired, // conferir essa validação depois...
};
