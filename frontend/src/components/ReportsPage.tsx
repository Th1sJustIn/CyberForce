import React from 'react';
import DashboardHeader from './DashboardHeader';
import ReportCard from './ReportCard';

interface ReportsPageProps {
  currentPage?: 'dashboard' | 'reports' | 'settings';
  setCurrentPage?: (page: 'dashboard' | 'reports' | 'settings') => void;
}

const ReportsPage: React.FC<ReportsPageProps> = ({ currentPage = 'reports', setCurrentPage }) => {
  const openPortsData = [
    {
      name: 'Port 80 (HTTP)',
      description: 'Web Server',
      riskLevel: 'high' as const
    },
    {
      name: 'Port 443 (HTTPS)',
      description: 'Secure Web Server',
      riskLevel: 'medium' as const
    },
    {
      name: 'Port 22 (SSH)',
      description: 'Remote Access',
      riskLevel: 'critical' as const
    }
  ];

  const openNetworksData = [
    {
      name: '192.168.1.0/24',
      description: 'Internal Office Network',
      riskLevel: 'low' as const
    },
    {
      name: '10.0.0.0/8',
      description: 'Guest Wi-Fi',
      riskLevel: 'medium' as const
    },
    {
      name: '172.16.0.0/12',
      description: 'VPN Clients',
      riskLevel: 'low' as const
    }
  ];

  const openDomainsData = [
    {
      name: 'api.example.com',
      description: 'Public API',
      riskLevel: 'high' as const
    },
    {
      name: 'dev.example.com',
      description: 'Development Server',
      riskLevel: 'critical' as const
    },
    {
      name: 'staging.example.com',
      description: 'Staging Environment',
      riskLevel: 'medium' as const
    }
  ];

  return (
    <div className="app">
      <DashboardHeader currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <div className="reports-container">
        <h1 className="reports-title">System Reports</h1>
        
        <div className="reports-grid">
          <ReportCard 
            title="Open Ports" 
            icon="🔌" 
            items={openPortsData} 
          />
          <ReportCard 
            title="Open Networks" 
            icon="📶" 
            items={openNetworksData} 
          />
          <ReportCard 
            title="Open Domains" 
            icon="🌐" 
            items={openDomainsData} 
          />
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;
