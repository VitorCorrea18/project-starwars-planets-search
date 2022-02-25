const applyInputFilter = (data, filterInput) => {
  const { results } = data; // results é onde estão os planetas na resposta da API.

  // passo o filtro com o valor do input
  const filterResult = results.filter((planet) => planet.name.toLowerCase()
    .includes(filterInput.toLowerCase()));

  return filterResult; // retorna o resultado do filtro
};

export default applyInputFilter;
