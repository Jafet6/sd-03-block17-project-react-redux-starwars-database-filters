import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchStarWarsApi, filterPlanetName } from '../actions/index';
import Loading from '../components/Loading';
import Table from '../components/Table';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.filterTableNameOnChange = this.filterTableNameOnChange.bind(this);
  }

  componentDidMount() {
    const { search } = this.props;
    search('planets');
  }

  filterTableNameOnChange(event) {
    const { filterName, data } = this.props;
    const dataFilter = data.filter((item) => item.name.includes(event.target.value));
    console.log(dataFilter);
    filterName(event.target.value, dataFilter);
  }

  render() {
    const { isFetching, dataFilter, filter } = this.props;
    let { data } = this.props;
    if (filter) data = dataFilter;
    if (isFetching) return <Loading />;
    return (
      <div>
        <label htmlFor="namePlanet">
          <input
            name="namePlanet"
            type="text"
            onChange={this.filterTableNameOnChange}
          />
        </label>
        <Table data={data} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.requestData.data,
  isFetching: state.requestData.isFetching,
  error: state.requestData.error,
  name: state.requestData.filters.filterByName.name,
  dataFilter: state.requestData.dataFilter,
  filter: state.requestData.filter,
});

const mapDispatchToProps = (dispatch) => ({
  search: (value) => dispatch(fetchStarWarsApi(value)),
  filterName: (name, dataFilter) => dispatch(filterPlanetName(name, dataFilter)),
});

Home.propTypes = {
  search: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  isFetching: PropTypes.bool.isRequired,
  filterName: PropTypes.func.isRequired,
  dataFilter: PropTypes.arrayOf(PropTypes.object).isRequired,
  filter: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
