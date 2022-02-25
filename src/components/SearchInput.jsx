import React, { useContext } from 'react';
import { PlanetContext } from '../context';

const SearchInput = () => {
  // traz os valores do input "filterByName" e a função que trata do onChange salvos no index do contexto.
  const { handleInputChange, filterInput } = useContext(PlanetContext);

  return (
    <input
      type="text"
      data-testid="name-filter"
      placeholder="Search"
      value={ filterInput }
      onChange={ handleInputChange }
    />
  );
};

export default SearchInput;
