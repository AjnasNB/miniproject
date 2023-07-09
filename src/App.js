import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Load, ReportForm } from './components';
import { Routes, Route, Link } from 'react-router-dom';
import ReportPage from './components/ReportPage';
import ContractPage from './components/Number';

function App() {
 
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // set the time for the loading animation to show, in milliseconds

    return () => clearTimeout(timer);
  }, []);

  // useEffect(() => {
  //   if (!isLoading) {
  //     navigate('/', { replace: true });
  //   }
  // }, [isLoading, navigate]);

  return (
    <div>
      {isLoading ? (
        <div>
          <Load />
        </div>
      ) : (
        <Routes>
          <Route path="/" element={<ReportForm />} />
          <Route path="/report" element={<ReportPage />} />
          <Route  path="/total" element={<ContractPage />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
