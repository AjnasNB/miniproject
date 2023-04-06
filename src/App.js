import React, { useState, useEffect } from 'react';

import {Load,ReportForm} from './components'

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // set the time for the loading animation to show, in milliseconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {isLoading ? (
        <div >
          {<Load/>}
        </div>
      ) : (
        <ReportForm />
      )}
    </div>
  );
}

export default App;
