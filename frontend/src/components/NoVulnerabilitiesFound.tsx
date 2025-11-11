import React from 'react';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const NoVulnerabilitiesFound: React.FC = () => {
  return (
    <div className="no-vulnerabilities">
      <CheckCircleOutlineIcon className="success-icon" color="success" fontSize="large" />
      <h2 className="success-title">No Vulnerabilities Found</h2>
      <p className="success-message">
        Congratulations! Your systems appear to be secure at the moment. 
        Run a new scan to check for the latest threats.
      </p>
    </div>
  );
};

export default NoVulnerabilitiesFound;
