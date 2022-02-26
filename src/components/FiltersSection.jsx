import React, { useContext, useState } from 'react';
import { PlanetContext } from '../context';
import { applyValueFilters } from '../helpers/applyFilters';

const COLUMN_OPTIONS = [
  'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water'];

const INICIAL_NUMERIC_FILTER = {
  column: 'population',
  comparison: 'maior que',
  value: 0,
};

const FiltersSection = () => {
  const [numericFilter, setNumericFilter] = useState(INICIAL_NUMERIC_FILTER);
  const { setPlanetsToRender, data } = useContext(PlanetContext);

  const onNumericFilterChange = (value) => {
    setNumericFilter({ ...numericFilter, ...value });
  };

  const onButtonFilterClick = () => {
    const filterResults = applyValueFilters(data, numericFilter);
    setPlanetsToRender(filterResults);
  };

  return (
  // a função (e) => onNumericFilterChange({ column: e.target.value }) passada no onChange dos inputs
  // juntamente com a onButtonFilterClick passada no onClick do botão.
  // foi pega consultando o repositorio da Marina Fischer. Eu havia feito de outra forma bem mais verbosa
  // que funcionava mas não passava nos testes, então encontrei essa forma bem mais simples e sofisticada.

    <section>
      <select
        data-testid="column-filter"
        onChange={ (e) => onNumericFilterChange({ column: e.target.value }) }
      >

        {
          COLUMN_OPTIONS.map(
            (columnName) => (
              <option key={ columnName } value={ columnName }>{ columnName }</option>),
          )
        }

      </select>

      <select
        data-testid="comparison-filter"
        onChange={ (e) => onNumericFilterChange({ comparison: e.target.value }) }
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>

      <input
        data-testid="value-filter"
        type="number"
        value={ numericFilter.value }
        onChange={ (e) => onNumericFilterChange({ value: e.target.value }) }
      />
      <button
        data-testid="button-filter"
        type="button"
        onClick={ onButtonFilterClick }
      >
        Apply Filter
      </button>
    </section>

  );
};

export default FiltersSection;
