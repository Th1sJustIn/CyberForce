import React from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import AutorenewIcon from '@mui/icons-material/Autorenew';

const FilterBar: React.FC = () => {
  return (
    <div className="filter-bar">
      <div className="filter-group">
        <ArrowDropDownIcon className="filter-icon" fontSize="small" />
        <span className="filter-text">Filter by Severity</span>
      </div>
      <div className="filter-group">
        <ArrowDropDownIcon className="filter-icon" fontSize="small" />
        <span className="filter-text">Filter by Status</span>
      </div>
      <div className="filter-group">
        <AutorenewIcon className="filter-icon" fontSize="small" />
        <span className="filter-text">Sort by</span>
      </div>
    </div>
  );
};

export default FilterBar;
