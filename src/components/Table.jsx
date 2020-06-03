import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FilterComp from './FilterComp';

const head = [
  'name',
  'rotation_period',
  'orbital_period',
  'diameter',
  'climate',
  'gravity',
  'terrain',
  'surface_water',
  'population',
  'residents',
  'films',
  'created',
  'edited',
  'url',
];

const filterArray = [
  { filter: 'population', name: 'Population' },
  { filter: 'orbital_period', name: 'Período orbital' },
  { filter: 'diameter', name: 'Diâmetro' },
  { filter: 'rotation_period', name: 'Periodo Rotacional' },
  { filter: 'surface_water', name: 'Agua na superfície' },
];

class Table extends Component {
  constructor(props) {
    super(props);
    const { data } = this.props;
    this.state = {
      filteredNumberData: data,
    };
    this.handleChange = this.handleChange.bind(this);
    this.fireFilter = this.fireFilter.bind(this);
  }

  componentDidMount() {
    console.log('mont');
    const { getPlanets } = this.props;
    getPlanets();
  }


  componentDidUpdate(prevProps) {
    const { data } = this.props;
    if (prevProps.data !== data) {
      this.setState({ filteredNumberData: data });
    }
  }

  handleChange(e) {
    const { setNameFilter } = this.props;
    setNameFilter(e.target.value);
  }

  fireFilter(id) {
    // let { filteredNumberData } = this.state;
    const { filters: { filterByNumericValues }, data } = this.props;
    const { comparison: type, column: name, value } = filterByNumericValues[id];
    function filter() {
      if (type === 'Maior que') {
        return (e) => e[name] > value;
      }
      if (type === 'Menor que') {
        return (e) => e[name] < value;
      }
      if (type === 'Igual a') {
        return (e) => e[name] === value;
      }
      return (e) => e;
    }
    // console.log(type, name, value);
    // console.log(filteredNumberData);
    const filteredNumberData = data.filter(filter());
    console.log(filteredNumberData);
    this.setState({ filteredNumberData });
  }

  filterData(data) {
    const { filters: { filterByName } } = this.props;
    let newData;

    if (data.length && filterByName.name) {
      newData = data.filter((planet) => planet.name.includes(filterByName.name));

      return newData;
    }

    return data;
  }

  render() {
    const { filteredNumberData } = this.state;
    const {
      filters: { filterByName },
    } = this.props;

    const filteredData = this.filterData(filteredNumberData);

    return (
      <>
        <input
          value={filterByName.name}
          type="text"
          onChange={this.handleChange}
          data-testid="name-filter"
        />

        <FilterComp fireFilter={this.fireFilter} filterArray={filterArray} />
        <table>
          <thead>
            <tr>
              {head.map((header) => (<th key={header}>{header}</th>))}
            </tr>
          </thead>

          <tbody>
            {filteredData.map((planet) => (
              <tr key={planet.name}>
                {Object.entries(planet).map((header) => (header[0] === 'residents' ? (
                  <td key={header}>null </td>
                ) : (
                  <td key={header}>{header[1]}</td>
                )))}
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  }
}

Table.propTypes = {
  getPlanets: PropTypes.func.isRequired,
  filters: PropTypes.isRequired,
  setNameFilter: PropTypes.isRequired,
  data: PropTypes.isRequired,

};


function mapDispatch(dispatch) {
  return {
    getPlanets: () => fetch('https://swapi-trybe.herokuapp.com/api/planets/')
      .then((r) => r.json())
      .then((r) => dispatch({ type: 'API_CALL', r })),

    setNameFilter: (filter) => dispatch({ type: 'SET_NAME_FILTER', filter }),
  };
}
function mapState(state) {
  return {
    data: state.data.results,
    filters: state.filters,

  };
}

export default connect(mapState, mapDispatch)(Table);
