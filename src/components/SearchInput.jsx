import React, { useContext, useState } from 'react';
import { PlanetContext } from '../context';
import { applyInputFilter } from '../helpers/applyFilters';

const INICIAL_STATE = {
  name: '',
};

const SearchInput = () => {
  // useState cria o estado o seu modificador 'setEstado'
  // useContext tras as informações do "estado global" que estão no contexto

  const [filterByName, setFilterByName] = useState(INICIAL_STATE); // estado do "filterByNameInput"
  const { setPlanetsToRender, data } = useContext(PlanetContext); // valores do contexto

  const handleSearchInputChange = (value) => {
    setFilterByName({ ...filterByName, ...value });
    const filterResult = applyInputFilter(data, value.name);
    setPlanetsToRender(filterResult);
  };

  return (
    <input
      type="text"
      data-testid="name-filter"
      placeholder="Search"
      value={ filterByName.name }
      onChange={ (e) => handleSearchInputChange({ name: e.target.value }) }
    />
  );
};

export default SearchInput;
