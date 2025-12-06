import React, { useState, useEffect } from 'react'
import DashboardHeader from './components/DashboardHeader'
import VulnerabilitySummary from './components/VulnerabilitySummary'
import FilterBar from './components/FilterBar'
import VulnerabilityCards from './components/VulnerabilityCards'
import NoVulnerabilitiesFound from './components/NoVulnerabilitiesFound'
import ReportsPage from './components/ReportsPage'
import './App.css'

interface Vulnerability {
  id: string;
  title: string;
  description: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  details: string;
  fixes: string[];
}

function App() {
  const [currentPage, setCurrentPage] = useState<'dashboard' | 'reports' | 'settings'>('dashboard')
  // Sample vulnerability data
  // const vulnerabilities = [
  //   {
  //     id: '1',
  //     title: 'SQL Injection in User Authentication',
  //     description: 'A vulnerability allowing unauthorized access to the user database through malicious SQL queries.',
  //     severity: 'critical' as const,
  //     details: 'The vulnerability exists in the user login form where user input is directly concatenated into SQL queries without proper sanitization. Attackers can inject malicious SQL code through the username or password fields to bypass authentication or access sensitive data.',
  //     fixes: [
  //       'Use parameterized queries or prepared statements',
  //       'Implement input validation and sanitization',
  //       'Apply the principle of least privilege to database users',
  //       'Enable SQL query logging and monitoring',
  //       'Consider using an ORM (Object-Relational Mapping) framework'
  //     ]
  //   },
  //   {
  //     id: '2',
  //     title: 'Cross-Site Scripting (XSS)',
  //     description: 'Allows attackers to inject malicious scripts into web pages viewed by other users.',
  //     severity: 'high' as const,
  //     details: 'The application does not properly sanitize user input before displaying it in web pages. This allows attackers to inject JavaScript code that executes in the context of other users\' browsers, potentially stealing session cookies or performing actions on behalf of the user.',
  //     fixes: [
  //       'Implement proper input validation and output encoding',
  //       'Use Content Security Policy (CSP) headers',
  //       'Sanitize all user-generated content before display',
  //       'Use framework-specific XSS protection mechanisms',
  //       'Regular security testing and code reviews'
  //     ]
  //   },
  //   {
  //     id: '3',
  //     title: 'Outdated Library (jQuery)',
  //     description: 'The version of jQuery in use has known security vulnerabilities that could be exploited.',
  //     severity: 'medium' as const,
  //     details: 'The application is using jQuery version 1.12.4 which contains multiple known security vulnerabilities including XSS and prototype pollution issues. These vulnerabilities could be exploited by attackers to compromise the application.',
  //     fixes: [
  //       'Update jQuery to the latest stable version (3.7.1 or later)',
  //       'Review and test the application after updating',
  //       'Implement automated dependency scanning',
  //       'Consider migrating to modern alternatives like vanilla JavaScript',
  //       'Establish regular dependency update procedures'
  //     ]
  //   },
  //   {
  //     id: '4',
  //     title: 'Weak Password Policy',
  //     description: 'The current password policy does not enforce strong password creation, increasing risk of brute-force attacks.',
  //     severity: 'low' as const,
  //     details: 'The password policy allows users to create weak passwords with minimal complexity requirements. This makes the system vulnerable to brute-force attacks and password cracking attempts.',
  //     fixes: [
  //       'Implement minimum password length requirements (8+ characters)',
  //       'Require a mix of uppercase, lowercase, numbers, and special characters',
  //       'Enforce password history to prevent reuse',
  //       'Implement account lockout after failed attempts',
  //       'Consider multi-factor authentication (MFA)'
  //     ]
  //   },
  //   {
  //     id: '5',
  //     title: 'Directory Traversal',
  //     description: 'Allows an attacker to access restricted directories and files on the server via file upload functionality.',
  //     severity: 'high' as const,
  //     details: 'The file upload functionality does not properly validate file paths, allowing attackers to use directory traversal sequences (../) to access files outside the intended directory. This could lead to unauthorized access to sensitive system files.',
  //     fixes: [
  //       'Implement strict path validation and sanitization',
  //       'Use whitelist-based file type validation',
  //       'Store uploaded files outside the web root',
  //       'Implement proper access controls and permissions',
  //       'Use secure file handling libraries'
  //     ]
  //   }
  // ]
  const [vulnerabilities, setVulnerabilities] = useState<Vulnerability[]>([])
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    fetch("http://localhost:9981/vulnerabilities")
      .then((res) => res.json())
      .then((data) => {
        setVulnerabilities(data);
        setLoading(false);
        console.log(data,"data");
      })
      .catch((err) => {
        console.error("Error fetching vulnerabilities:", err);
        setLoading(false);
        console.error("Error fetching vulnerabilities:", err);
      });
  }, []);

console.log("vulnerabilities", vulnerabilities);
  // Calculate vulnerability counts
  const [criticalCount, setCriticalCount] = useState(0);
  const [highCount, setHighCount] = useState(0);
  const [mediumCount, setMediumCount] = useState(2);
  const [lowCount, setLowCount] = useState(0);
  useEffect(() => {
    setCriticalCount(vulnerabilities.filter((v: Vulnerability) => v.severity.toLowerCase() === 'critical').length);
    setHighCount(vulnerabilities.filter((v: Vulnerability) => v.severity.toLowerCase() === 'high').length);
    setMediumCount(vulnerabilities.filter((v: Vulnerability) => v.severity.toLowerCase() === 'medium').length);
    setLowCount(vulnerabilities.filter((v: Vulnerability) => v.severity.toLowerCase() === 'low').length);
  }, [vulnerabilities]);

  const hasVulnerabilities = vulnerabilities.length > 0

  const renderPage = () => {
    switch (currentPage) {
      case 'reports':
        return <ReportsPage currentPage={currentPage} setCurrentPage={setCurrentPage} />
      case 'settings':
        return (
          <div className="app">
            <DashboardHeader currentPage={currentPage} setCurrentPage={setCurrentPage} />
            <div className="dashboard-container">
              <h1 className="dashboard-title">Settings</h1>
              <p>Settings page coming soon...</p>
            </div>
          </div>
        )
      default:
        return (
          <div className="app">
            <DashboardHeader currentPage={currentPage} setCurrentPage={setCurrentPage} />
            <div className="dashboard-container">
              <h1 className="dashboard-title">System Vulnerabilities</h1>
              
              <VulnerabilitySummary 
                critical={criticalCount}
                high={highCount}
                medium={mediumCount}
                low={lowCount}
              />
              
              <FilterBar />
              
              {hasVulnerabilities ? (
                <VulnerabilityCards vulnerabilities={vulnerabilities} />
              ) : (
                <NoVulnerabilitiesFound />
              )}
            </div>
          </div>
        )
    }
  }

  return renderPage()
}

export default App
