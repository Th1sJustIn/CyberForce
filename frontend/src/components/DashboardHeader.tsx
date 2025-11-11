import React from 'react';
import { Button, IconButton } from '@mui/material';
import SecurityIcon from '@mui/icons-material/Security';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

interface DashboardHeaderProps {
  currentPage?: 'dashboard' | 'reports' | 'settings';
  setCurrentPage?: (page: 'dashboard' | 'reports' | 'settings') => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ currentPage = 'dashboard', setCurrentPage }) => {
  const handleNavClick = (page: 'dashboard' | 'reports' | 'settings') => {
    if (setCurrentPage) {
      setCurrentPage(page);
    }
  };

  return (
    <header className="dashboard-header">
      <div className="header-left">
        <div className="logo">
          <SecurityIcon className="shield-icon" fontSize="medium" />
          <span className="logo-text">Vulnerability Dashboard</span>
        </div>
        <nav className="nav-links">
          <Button 
            onClick={() => handleNavClick('dashboard')} 
            className={`nav-link ${currentPage === 'dashboard' ? 'active' : ''}`}
            variant={currentPage === 'dashboard' ? 'contained' : 'text'}
            color="primary"
            size="small"
          >
            Dashboard
          </Button>
          <Button 
            onClick={() => handleNavClick('reports')} 
            className={`nav-link ${currentPage === 'reports' ? 'active' : ''}`}
            variant={currentPage === 'reports' ? 'contained' : 'text'}
            color="primary"
            size="small"
          >
            Reports
          </Button>
          <Button 
            onClick={() => handleNavClick('settings')} 
            className={`nav-link ${currentPage === 'settings' ? 'active' : ''}`}
            variant={currentPage === 'settings' ? 'contained' : 'text'}
            color="primary"
            size="small"
          >
            Settings
          </Button>
        </nav>
      </div>
      
      <div className="header-center">
        <div className="search-bar">
          <SearchIcon className="search-icon" fontSize="small" />
          <input type="text" placeholder="Search..." />
        </div>
      </div>
      
      <div className="header-right">
        <Button className="scan-button" variant="contained" color="secondary">
          Scan Now
        </Button>
        <div className="header-icons">
          <IconButton size="small" aria-label="notifications" className="icon">
            <NotificationsNoneIcon />
          </IconButton>
          <IconButton size="small" aria-label="help" className="icon">
            <HelpOutlineIcon />
          </IconButton>
          <IconButton size="small" aria-label="account" className="user-avatar">
            <AccountCircleIcon />
          </IconButton>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
