import React, { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import fetchPlanets from '../services/fetchAPI';

export const PlanetContext = createContext();

export const PlanetProvider = ({ children }) => {
  const [data, setData] = useState({}); // useState recebe chaves pois valor inicial do estado é um objeto

  const getPlanets = async () => {
    const response = await fetchPlanets();
    setData(response);
  };

  useEffect(() => {
    getPlanets();
  }, []); // o lint pede um array, pesquiser o porque depois

  const value = { data };
  return (
    <PlanetContext.Provider value={ value }>
      { children }
    </PlanetContext.Provider>
  );
};

PlanetProvider.propTypes = {
  children: PropTypes.instanceOf(Object).isRequired, // conferir essa validação depois...
};
