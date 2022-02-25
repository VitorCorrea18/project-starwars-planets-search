const fetchPlanets = async () => {
  const URL = 'https://swapi-trybe.herokuapp.com/api/planets/';
  try {
    const response = await fetch(URL);
    const data = response.json();
    return data;
  } catch (error) {
    console.error(error.message);
  }
};

export default fetchPlanets;
