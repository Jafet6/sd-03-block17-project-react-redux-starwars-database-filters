import { DATA_API, REQUESTING_STAR_WARS_API, RECEIVE_ISS_LOCATION_FAILURE } from '../reducers/data';
import fetchDataApiStarWars from '../services/starWarsApi';

const requestingDataApi = () => ({
  type: REQUESTING_STAR_WARS_API,
});

const apiTabelSucess = (value) => ({
  type: DATA_API,
  data: value,
});

const apiTableError = (error) => ({
  type: RECEIVE_ISS_LOCATION_FAILURE,
  error,
});

export default function dataApiStarWars() {
  return (dispatch) => {
    requestingDataApi();
    return fetchDataApiStarWars()
      .then(
        (sucess) => dispatch(apiTabelSucess(sucess)),
        (error) => dispatch(apiTableError(error)),
      );
  };
}
