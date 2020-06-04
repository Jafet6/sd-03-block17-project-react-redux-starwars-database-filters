const URL = 'https://swapi-trybe.herokuapp.com/api/planets/';

const apiPlanets = () => fetch(URL)
  .then((response) => response.json()
    .then((data) => (response.ok ? Promise.resolve(data) : Promise.reject(data))));

export default apiPlanets;
