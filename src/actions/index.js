import getPlanetsList from '../services/swapi';

export const REQUEST_PLANETS_LIST = 'REQUEST_PLANETS_LIST';
export const RECEIVE_PLANETS_LIST_SUCCESS = 'RECEIVE_PLANETS_LIST_SUCCESS';
export const RECEIVE_PLANETS_LISTS_FAILURE = 'RECEIVE_PLANETS_LISTS_FAILURE';
export const FILTER_PLANETS = 'FILTER_PLANETS';

const requestPlanetsList = () => ({
  type: REQUEST_PLANETS_LIST
,
});

const receivePlanetsListSuccess = ({ results }) => ({
  type: RECEIVE_PLANETS_LIST_SUCCESS,
  data: results,
});

const receivePlanetsListFailure = (error) => ({
  type: RECEIVE_PLANETS_LISTS_FAILURE,
  error,
});

export const filterList = (value) => ({
  type: FILTER_PLANETS,
  value,
})

export function fetchPlanetsList() {
  return (dispatch) => {
    dispatch(requestPlanetsList());

    return getPlanetsList()
      .then(
        (list) => dispatch(receivePlanetsListSuccess(list)),
        (error) => dispatch(receivePlanetsListFailure(error.message)),
      );
  };
}
