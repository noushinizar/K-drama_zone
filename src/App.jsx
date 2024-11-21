import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import DramaDetails from './pages/DramaDetails';
import Home from './pages/home';
import GenrePage from './pages/GenrePage';
import { useEffect, useState } from 'react';
import Loader from './pages/Loader';


function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); 
    }, 3000); 
  }, []);
  return (
    <Router>
       {loading ? (
        <Loader /> 
      ) : (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/genre" element={<GenrePage />} />
        <Route path="/drama/:id" element={<DramaDetails />} />
      </Routes>
      )}
    </Router>
    
  );
}

export default App;
