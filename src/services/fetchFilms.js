const fetchFilm = async (url) => {
  try {
    const response = await fetch(url);
    const data = response.json();
    return data;
  } catch (error) {
    console.error(error.message);
  }
};

export default fetchFilm;