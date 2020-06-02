import React from 'react';
import { connect } from 'react-redux';
import { filterList } from '../actions'

class SearchBar extends React.Component {
  render() {
    return (
      <div>
        <input 
          type="text" 
          data-testid='name-filter'
          onChange={(event) => this.props.filterList(event.target.value.toLowerCase())}
        />
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  filterList: e => dispatch(filterList(e)),
});

export default connect(null, mapDispatchToProps)(SearchBar);
