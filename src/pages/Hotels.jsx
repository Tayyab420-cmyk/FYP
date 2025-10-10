import { useState, useEffect } from 'react';
import axios from 'axios';
//import './Hotels.css';

const Hotels = () => {
  const [formData, setFormData] = useState({
    city: '',
    checkInDate: '',
    guests: 1,
  });
  const [results, setResults] = useState([]);
  const [dateError, setDateError] = useState('');
  const [hotels, setHotels] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch hotels from backend using axios
  useEffect(() => {
    setIsLoading(true);
    axios.get('http://localhost:8000/api/hotels/')
      .then(response => {
        console.log('Fetched hotels:', response.data); // Debug log
        setHotels(response.data);
        setFetchError(null);
      })
      .catch(error => {
        console.error('Error fetching hotels:', error);
        if (error.response) {
          setFetchError(`Server error: ${error.response.status} - ${error.response.statusText}`);
        } else if (error.request) {
          setFetchError('Network error: Check if the backend server is running or if CORS is configured correctly.');
        } else {
          setFetchError(error.message);
        }
      })
      .finally(() => setIsLoading(false));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'checkInDate') {
      const checkInDate = new Date(value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (checkInDate < today) {
        setDateError('Check-in date must be today or in the future.');
      } else {
        setDateError('');
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (dateError) return;

    const filteredResults = hotels
      .filter((hotel) =>
        (!formData.city || hotel.city.toLowerCase().includes(formData.city.toLowerCase()))
      )
      .map((hotel) => ({
        ...hotel,
        totalPrice: hotel.price * formData.guests,
      }));

    setResults(filteredResults);
  };

  const handleReset = () => {
    setFormData({ city: '', checkInDate: '', guests: 1 });
    setResults([]);
    setDateError('');
  };

  const handleBookHotel = (hotel) => {
    alert(`Booked ${hotel.name} in ${hotel.city} on ${formData.checkInDate} for ${formData.guests} guest(s).\nTotal: PKR ${hotel.totalPrice}`);
  };

  return (
    <div className="container py-5">
      <h2 className="mb-4 slide-up text-center">Book Your Hotel</h2>
      {isLoading && (
        <div className="alert alert-info text-center" role="alert">
          Loading hotels...
        </div>
      )}
      {fetchError && (
        <div className="alert alert-danger text-center" role="alert">
          Error fetching hotels: {fetchError}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="d-flex flex-wrap gap-3 justify-content-center mb-4 p-4 bg-light rounded shadow-sm">
          <div className="form-group">
            <label htmlFor="city">City</label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="e.g., Karachi"
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="checkInDate">Check-In Date</label>
            <input
              type="date"
              id="checkInDate"
              name="checkInDate"
              value={formData.checkInDate}
              onChange={handleChange}
              className={`form-control ${dateError ? 'is-invalid' : ''}`}
              required
            />
            {dateError && <div className="invalid-feedback">{dateError}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="guests">Guests</label>
            <input
              type="number"
              id="guests"
              name="guests"
              value={formData.guests}
              onChange={handleChange}
              min="1"
              max="10"
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
          <h3 className="mb-4 text-center">Available Hotels</h3>
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            {results.map((hotel) => (
              <div className="col" key={hotel.id}>
                <div className="card h-100 shadow-sm" onClick={() => handleBookHotel(hotel)}>
                  <img src={hotel.image_url} alt={hotel.name} className="card-img-top" />
                  <div className="card-body text-center">
                    <h5 className="card-title">{hotel.name}</h5>
                    <p className="card-text"><strong>City:</strong> {hotel.city}</p>
                    <p className="card-text"><strong>Room Types:</strong> {hotel.room_types.join(', ')}</p>
                    <p className="card-text"><strong>Total Price:</strong> PKR {hotel.totalPrice} ({formData.guests} guest(s))</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        hotels.length === 0 && !fetchError && !isLoading && (
          <div className="alert alert-info text-center" role="alert">
            No hotels available. Try again later.
          </div>
        )
      )}
    </div>
  );
};

export default Hotels;