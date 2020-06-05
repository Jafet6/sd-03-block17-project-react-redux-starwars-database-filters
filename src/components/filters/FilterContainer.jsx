import React from 'react';
import PropTypes from 'prop-types';
import FilterByNameBar from './FilterByNameBar';
import FilterByValuesBar from './FilterByValuesBar';
import SelectedFilters from './SelectedFilters';
import SortColumnsFilter from './SortColumnsFilter';

function FilterContainer({ onChange }) {
  return (
    <div>
      <FilterByNameBar onChange={onChange} />
      <div>
        <FilterByValuesBar />
      </div>
      <div>
        <SelectedFilters />
      </div>
      <div>
        <SortColumnsFilter />
      </div>
    </div>
  );
}

FilterContainer.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default FilterContainer;
