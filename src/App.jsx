import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import Destinations from './pages/Destinations';
import Transport from './pages/Transport';
import Hotels from './pages/Hotels';
import DestinationDetails from './pages/DestinationDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/Navbar'; // <-- import the navbar
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated') === 'true';
    setIsAuthenticated(authStatus);
  }, []);

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div>
      <Navbar isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
      <div className="content-wrapper" style={{ paddingTop: '0px' }}>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/destinations" element={<Destinations />} />
          <Route path="/destinations/:name" element={<DestinationDetails />} />
          <Route path="/transport" element={<Transport />} />
          <Route path="/hotels" element={<Hotels />} />
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
