import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser && storedUser.email === email && storedUser.password === password) {
      setIsAuthenticated(true);
      localStorage.setItem('isAuthenticated', 'true');
      navigate('/');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="container py-5 content-wrapper">
      <h2 className="mb-4 slide-up text-center" style={{ color: 'var(--pak-dark)' }}>Login</h2>
      <div className="row justify-content-center">
        <div className="col-md-6 slide-up">
          <form onSubmit={handleSubmit} className="bg-light p-4 rounded shadow-sm">
            <div className="mb-3">
              <label htmlFor="email" className="form-label fw-bold" style={{ color: 'var(--pak-dark)' }}>Email</label>
              <input
                type="email"
                id="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g., user@example.com"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label fw-bold" style={{ color: 'var(--pak-dark)' }}>Password</label>
              <input
                type="password"
                id="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="text-danger text-center mb-3">{error}</p>}
            <div className="text-center">
              <button type="submit" className="btn btn-primary px-5 py-2">Login</button>
            </div>
          </form>
          <p className="text-center mt-3">
            Don’t have an account? <a href="/register" className="text-primary">Register here</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;