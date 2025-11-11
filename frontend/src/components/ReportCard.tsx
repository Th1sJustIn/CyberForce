import React from 'react';

interface ReportItem {
  name: string;
  description: string;
  riskLevel: 'critical' | 'high' | 'medium' | 'low';
}

interface ReportCardProps {
  title: string;
  icon: string;
  items: ReportItem[];
}

const ReportCard: React.FC<ReportCardProps> = ({ title, icon, items }) => {
  return (
    <div className="report-card">
      <div className="report-card-header">
        <span className="report-icon">{icon}</span>
        <h3 className="report-title">{title}</h3>
      </div>
      <div className="report-items">
        {items.map((item, index) => (
          <div key={index} className="report-item">
            <div className="item-name">{item.name}</div>
            <div className="item-description">{item.description}</div>
            <span className={`risk-tag ${item.riskLevel}`}>
              {item.riskLevel.toUpperCase()} RISK
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReportCard;
