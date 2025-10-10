import { useState, useEffect } from 'react';
import axios from 'axios';
import './Transport.css';

const Transport = () => {
  const [formData, setFormData] = useState({
    fromCity: '',
    toCity: '',
    travelDate: '',
    passengers: 1,
  });
  const [results, setResults] = useState([]);
  const [dateError, setDateError] = useState('');
  const [busRoutes, setBusRoutes] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch bus routes from backend using axios
  useEffect(() => {
    setIsLoading(true);
    axios.get('http://localhost:8000/api/busroutes/')
      .then(response => {
        console.log('Fetched bus routes:', response.data); // Debug log
        setBusRoutes(response.data);
        setFetchError(null);
      })
      .catch(error => {
        console.error('Error fetching bus routes:', error);
        setFetchError(error.message);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'travelDate') {
      const travelDate = new Date(value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (travelDate < today) {
        setDateError('Travel date must be today or in the future.');
      } else {
        setDateError('');
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (dateError) return;

    const filteredResults = busRoutes
      .filter((route) =>
        (!formData.fromCity || route.from_city.toLowerCase().includes(formData.fromCity.toLowerCase())) &&
        (!formData.toCity || route.to_city.toLowerCase().includes(formData.toCity.toLowerCase()))
      )
      .map((route) => ({
        ...route,
        totalPrice: route.price * formData.passengers,
      }));

    setResults(filteredResults);
  };

  const handleReset = () => {
    setFormData({ fromCity: '', toCity: '', travelDate: '', passengers: 1 });
    setResults([]);
    setDateError('');
  };

  const handleBookBus = (route) => {
    alert(`Booked bus from ${route.from_city} to ${route.to_city} on ${formData.travelDate} for ${formData.passengers} passenger(s).\nTotal: PKR ${route.totalPrice}`);
  };

  return (
    <div className="container py-5">
      <h2 className="mb-4 slide-up text-center">Book Your Bus</h2>
      {isLoading && (
        <div className="alert alert-info text-center" role="alert">
          Loading bus routes...
        </div>
      )}
      {fetchError && (
        <div className="alert alert-danger text-center" role="alert">
          Error fetching bus routes: {fetchError}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="d-flex flex-wrap gap-3 justify-content-center mb-4 p-4 bg-light rounded shadow-sm">
          <div className="form-group">
            <label htmlFor="fromCity">From City</label>
            <input
              type="text"
              id="fromCity"
              name="fromCity"
              value={formData.fromCity}
              onChange={handleChange}
              placeholder="e.g., Karachi"
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="toCity">To City</label>
            <input
              type="text"
              id="toCity"
              name="toCity"
              value={formData.toCity}
              onChange={handleChange}
              placeholder="e.g., Lahore"
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="travelDate">Travel Date</label>
            <input
              type="date"
              id="travelDate"
              name="travelDate"
              value={formData.travelDate}
              onChange={handleChange}
              className={`form-control ${dateError ? 'is-invalid' : ''}`}
              required
            />
            {dateError && <div className="invalid-feedback">{dateError}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="passengers">Passengers</label>
            <input
              type="number"
              id="passengers"
              name="passengers"
              value={formData.passengers}
              onChange={handleChange}
              min="1"
              max="40"
              className="form-control"
              required
            />
          </div>
          <div className="d-flex gap-2 mt-3">
            <button type="submit" className="btn btn-primary" disabled={dateError}>Search</button>
            <button type="button" className="btn btn-secondary" onClick={handleReset}>Reset</button>
          </div>
        </div>
      </form>

      {results.length > 0 ? (
        <div>
          <h3 className="mb-4 text-center">Available Bus Routes</h3>
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            {results.map((route) => (
              <div className="col" key={route.id}>
                <div className="card h-100 shadow-sm" onClick={() => handleBookBus(route)}>
                  <img src={route.image_url} alt={`${route.from_city} to ${route.to_city}`} className="card-img-top" />
                  <div className="card-body text-center">
                    <h5 className="card-title">{route.from_city} to {route.to_city}</h5>
                    <p className="card-text"><strong>Departure:</strong> {route.departure_time}</p>
                    <p className="card-text"><strong>Available Seats:</strong> {route.seats_available}</p>
                    <p className="card-text"><strong>Total Price:</strong> PKR {route.totalPrice} ({formData.passengers} passengers)</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        busRoutes.length === 0 && !fetchError && !isLoading && (
          <div className="alert alert-info text-center" role="alert">
            No bus routes available. Try again later.
          </div>
        )
      )}
    </div>
  );
};

export default Transport;