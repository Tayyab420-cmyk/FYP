import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Destinations from './pages/Destinations';
import Transport from './pages/Transport';
import Hotels from './pages/Hotels';
import DestinationDetails from './pages/DestinationDetails';

function App() {
  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <div className="container">
          <Link className="navbar-brand" to="/">Pakistan Tourism</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/destinations">Destinations</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/transport">Transport</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/hotels">Hotels</Link></li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Page Content */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/destinations" element={<Destinations />} />
        <Route path="/destinations/:name" element={<DestinationDetails />} />
        <Route path="/transport" element={<Transport />} />
        <Route path="/hotels" element={<Hotels />} />
      </Routes>
    </div>
  );
}

export default App;