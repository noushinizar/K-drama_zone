import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import DramaDetails from './pages/DramaDetails';
import Home from './pages/home';
import GenrePage from './pages/GenrePage';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/genre" element={<GenrePage />} />
        <Route path="/drama/:id" element={<DramaDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
