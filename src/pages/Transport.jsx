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
  const [bookingError, setBookingError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    phone: '',
  });

  // Fetch bus routes
  const fetchBusRoutes = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('http://localhost:8000/api/busroutes/');
      console.log('Fetched bus routes:', response.data);
      setBusRoutes(response.data);
      setFetchError(null);
    } catch (error) {
      console.error('Error fetching bus routes:', error);
      if (error.response) {
        setFetchError(`Server error: ${error.response.status} - ${error.response.statusText}`);
      } else if (error.request) {
        setFetchError('Network error: Check if the backend server is running or if CORS is configured correctly.');
      } else {
        setFetchError(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBusRoutes();
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
    setBookingError(null);
    setShowModal(false);
    setUserDetails({ name: '', email: '', phone: '' });
  };

  const handleBookBus = (route) => {
    if (route.seats_available < formData.passengers) {
      setBookingError(`Only ${route.seats_available} seats available for this route.`);
      return;
    }
    setSelectedRoute(route);
    setShowModal(true);
  };

  const handleUserDetailsChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const submitBooking = async () => {
    if (!userDetails.name || !userDetails.email || !userDetails.phone) {
      setBookingError('Please fill in all user details.');
      return;
    }

    try {
      const bookingData = {
        user: userDetails.name,
        type: 'bus',
        details: {
          from_city: selectedRoute.from_city,
          to_city: selectedRoute.to_city,
          departure_time: selectedRoute.departure_time,
          travel_date: formData.travelDate,
          passengers: formData.passengers,
          email: userDetails.email,
          phone: userDetails.phone,
        },
        total_price: selectedRoute.totalPrice,
      };
      const response = await axios.post('http://localhost:8000/api/bookings/', bookingData);
      alert(`Booking confirmed! Booking ID: ${response.data.id}`);
      setShowModal(false);
      setUserDetails({ name: '', email: '', phone: '' });
      setBookingError(null);
      await fetchBusRoutes(); // Refresh routes to update seats_available
    } catch (error) {
      console.error('Error creating booking:', error);
      setBookingError(error.response?.data?.detail || 'Failed to create booking. Please try again.');
    }
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
      {bookingError && (
        <div className="alert alert-danger text-center" role="alert">
          {bookingError}
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

      {/* Bootstrap Modal for User Details */}
      {showModal && selectedRoute && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Enter Booking Details</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={userDetails.name}
                    onChange={handleUserDetailsChange}
                    className="form-control"
                    placeholder="e.g., John Doe"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={userDetails.email}
                    onChange={handleUserDetailsChange}
                    className="form-control"
                    placeholder="e.g., john@example.com"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="phone" className="form-label">Phone</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={userDetails.phone}
                    onChange={handleUserDetailsChange}
                    className="form-control"
                    placeholder="e.g., 1234567890"
                    required
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="button" className="btn btn-primary" onClick={submitBooking}>
                  Confirm Booking
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Transport;