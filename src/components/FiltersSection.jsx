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
  const [columnOptions, setcolumnOptions] = useState(COLUMN_OPTIONS);
  const [activeFilter, setActiveFilter] = useState([]);
  const { setPlanetsToRender, data, planetsToRender } = useContext(PlanetContext);

  const onNumericFilterChange = (value) => {
    setNumericFilter({ ...numericFilter, ...value });
  };

  const updateColumnOptions = () => {
    const updatedOptions = columnOptions.filter(
      (option) => option !== numericFilter.column,
    );

    setcolumnOptions(updatedOptions);
    const updateColumnInicialState = { column: updatedOptions[0] };
    setNumericFilter({ ...numericFilter, ...updateColumnInicialState });
  };

  const onButtonFilterClick = () => {
    // const { column, comparison, value } = numericFilter;
    // const newFilter = `${column} | ${comparison} | ${value}`;
    if (activeFilter.length > 0) {
      const filterResults = applyValueFilters(planetsToRender, numericFilter);
      setActiveFilter([...activeFilter, numericFilter]);
      setPlanetsToRender(filterResults);
    } else {
      const filterResults = applyValueFilters(data.results, numericFilter); // passa 'data.results' pois 'applyValueFilters()' espera um array
      setActiveFilter([...activeFilter, numericFilter]);
      setPlanetsToRender(filterResults);
    }
    updateColumnOptions();
  };

  const onEraseFilterClick = (filterToErase) => {
    const filters = activeFilter.filter((filter) => filter !== filterToErase);
    setActiveFilter(filters);
  };

  return (
  // a função (e) => onNumericFilterChange({ column: e.target.value }) passada no onChange dos inputs
  // juntamente com a onButtonFilterClick passada no onClick do botão.
  // foi pega consultando o repositorio da Marina Fischer. Eu havia feito de outra forma bem mais verbosa
  // que funcionava mas não passava nos testes, então encontrei essa forma bem mais simples e sofisticada.

    <section className='filter_section'>
      <select className='filter_select'
        data-testid="column-filter"
        onChange={ (e) => onNumericFilterChange({ column: e.target.value }) }
      >

        {
          columnOptions.map(
            (columnName) => (
              <option key={ columnName } value={ columnName }>{ columnName }</option>),
          )
        }

      </select>

      <select
        className='filter_select'
        data-testid="comparison-filter"
        onChange={ (e) => onNumericFilterChange({ comparison: e.target.value }) }
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>

      <input
        className='filter_input'
        data-testid="value-filter"
        type="number"
        value={ numericFilter.value }
        onChange={ (e) => onNumericFilterChange({ value: e.target.value }) }
      />
      <button
        className='filter_button'
        data-testid="button-filter"
        type="button"
        onClick={ onButtonFilterClick }
      >
        Apply Filter
      </button>

      {
        activeFilter.map((filter) => (
          <div key={ filter.column }>
            <span>{`${filter.column} | ${filter.comparison} | ${filter.value}`}</span>
            <button
              type="button"
              onClick={ () => onEraseFilterClick(filter) }
            >
              X
            </button>
          </div>
        ))
      }

    </section>

  );
};

export default FiltersSection;
