export const applyInputFilter = (data, searchInput) => {
  const { results } = data; // results é onde estão os planetas na resposta da API.

  const filterResult = results.filter((planet) => planet.name.toLowerCase()
    .includes(searchInput.toLowerCase()));
  return filterResult;
};

export const applyValueFilters = (data, numericFilter) => {
  const { comparison, column, value } = numericFilter;
  // const { results } = data;
  switch (comparison) {
  case 'maior que':
    return data.filter((planet) => Number(planet[column]) > Number(value));
    // Usa Number() pois os valores vem do DOM como string causando erro na comparação.

  case 'menor que':
    return data.filter((planet) => Number(planet[column]) < Number(value));

  case 'igual a':
    return data.filter((planet) => Number(planet[column]) === Number(value));
  default:
    return 'Operador Inválido';
  }
};
