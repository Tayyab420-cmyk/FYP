import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    newsletter: false, // Optional subscription to updates
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (!formData.phone.match(/^\d{10,15}$/)) {
      setError('Phone number must be 10–15 digits');
      return;
    }
    // Mock registration logic
    const user = {
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
      newsletter: formData.newsletter,
    };
    localStorage.setItem('user', JSON.stringify(user));
    alert('Registration successful! Please login.');
    navigate('/login');
  };

  return (
    <div className="container py-5 content-wrapper">
      <h2 className="mb-4 slide-up text-center" style={{ color: 'var(--pak-dark)' }}>Register</h2>
      <div className="row justify-content-center">
        <div className="col-md-6 slide-up">
          <form onSubmit={handleSubmit} className="bg-light p-4 rounded shadow-sm">
            <div className="mb-3">
              <label htmlFor="fullName" className="form-label fw-bold" style={{ color: 'var(--pak-dark)' }}>Full Name</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                className="form-control"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="e.g., Tayyab Ahmad"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label fw-bold" style={{ color: 'var(--pak-dark)' }}>Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-control"
                value={formData.email}
                onChange={handleChange}
                placeholder="e.g., user@example.com"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="phone" className="form-label fw-bold" style={{ color: 'var(--pak-dark)' }}>Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className="form-control"
                value={formData.phone}
                onChange={handleChange}
                placeholder="e.g., 03001234567"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label fw-bold" style={{ color: 'var(--pak-dark)' }}>Password</label>
              <input
                type="password"
                id="password"
                name="password"
                className="form-control"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label fw-bold" style={{ color: 'var(--pak-dark)' }}>Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className="form-control"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3 form-check">
              <input
                type="checkbox"
                id="newsletter"
                name="newsletter"
                className="form-check-input"
                checked={formData.newsletter}
                onChange={handleChange}
              />
              <label htmlFor="newsletter" className="form-check-label" style={{ color: 'var(--pak-dark)' }}>
                Subscribe to newsletter for travel updates
              </label>
            </div>
            {error && <p className="text-danger text-center mb-3">{error}</p>}
            <div className="text-center">
              <button type="submit" className="btn btn-primary px-5 py-2">Register</button>
            </div>
          </form>
          <p className="text-center mt-3">
            Already have an account? <a href="/login" className="text-primary">Login here</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;