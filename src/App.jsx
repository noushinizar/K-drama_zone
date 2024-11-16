import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home'; // Assuming your Home component is in the pages folder
 // Create this new component
// import Navbar from './components/Navbar';
import DramaDetails from './pages/DramaDetails';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/drama/:id" element={<DramaDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
