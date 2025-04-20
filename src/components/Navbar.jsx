import { Link, useNavigate } from 'react-router-dom';

function Navbar({ isAuthenticated, handleLogout }) {
  return (
    <nav className="navbar navbar-expand-lg shadow-sm py-3" style={{ backgroundColor: '#ffffff' }}>
      <div className="container">
        <Link className="navbar-brand fw-bold fs-4 text-primary" to="/">
          <span style={{ fontFamily: 'Segoe UI', letterSpacing: '1px' }}>DMA</span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto gap-2 align-items-center">
            <li className="nav-item">
              <Link className="nav-link text-dark fw-medium" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-dark fw-medium" to="/destinations">Destinations</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-dark fw-medium" to="/transport">Transport</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-dark fw-medium" to="/hotels">Hotels</Link>
            </li>
            {isAuthenticated ? (
              <li className="nav-item">
                <button
                  className="btn btn-outline-danger px-3 py-1 rounded-pill"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="btn btn-outline-primary px-3 py-1 rounded-pill" to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="btn btn-primary px-3 py-1 rounded-pill text-white" to="/register">
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
