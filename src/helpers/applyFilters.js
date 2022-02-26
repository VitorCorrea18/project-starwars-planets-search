export const applyInputFilter = (data, filterInput) => {
  const { results } = data; // results é onde estão os planetas na resposta da API.

  // passo o filtro com o valor do input
  const filterResult = results.filter((planet) => planet.name.toLowerCase()
    .includes(filterInput.toLowerCase()));

  return filterResult; // retorna o resultado do filtro
};

export const applyValueFilters = (data, numericFilter) => {
  const { comparison, column, value } = numericFilter;
  const { results } = data;
  switch (comparison) {
  case 'maior que':
    return results.filter((planet) => Number(planet[column]) > Number(value));
    // Usa Number() pois os valores vem do DOM como string causando erro na comparação.

  case 'menor que':
    return results.filter((planet) => Number(planet[column]) < Number(value));

  case 'igual a':
    return results.filter((planet) => Number(planet[column]) === Number(value));
  default:
    return 'deu ruim';
  }
};
