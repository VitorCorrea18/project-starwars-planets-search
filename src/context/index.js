import React, { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import fetchPlanets from '../services/fetchAPI';
import { applyInputFilter } from '../helpers/applyFilters';

export const PlanetContext = createContext();

export const PlanetProvider = ({ children }) => {
  const [data, setData] = useState({}); // Cria um estado para armazenas o retorno da API e outro para o resultado dos filtros
  const [planetsToRender, setPlanetsToRender] = useState([]); // useState recebe valor inicial do estado

  const getPlanets = async () => {
    const response = await fetchPlanets();
    const filterResult = applyInputFilter(response, ''); // "applyInputFilter" recebe o retorno da API mais o valor a ser filtrado
    setData(response);
    setPlanetsToRender(filterResult);
  };

  useEffect(() => { // equivalente ao "componentDidUpdate", não aceita funções assincronas por isso chama a "getPlanets"
    getPlanets();
  }, []); // * o lint pede um array, pesquisar o porque depois *

  const value = { // guarda todos os valores que serão passados aos componentes filhos, podem ser os estados ou funções
    data,
    planetsToRender,
    setPlanetsToRender,
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
