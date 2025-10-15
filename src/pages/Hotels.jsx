import { useState, useEffect } from 'react';
import axios from 'axios';
import './Hotels.css';

const Hotels = () => {
  const [formData, setFormData] = useState({
    city: '',
    checkInDate: '',
    guests: 1,
    minPrice: '',
    maxPrice: '',
    roomType: '',
  });
  const [results, setResults] = useState([]);
  const [dateError, setDateError] = useState('');
  const [hotels, setHotels] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [bookingError, setBookingError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [roomTypes, setRoomTypes] = useState([]);

  const fetchHotels = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('http://localhost:8000/api/hotels/');
      console.log('Fetched hotels:', response.data);
      setHotels(response.data);
      // Extract unique room types
      const allRoomTypes = [...new Set(response.data.flatMap(hotel => hotel.room_types))];
      setRoomTypes(allRoomTypes);
      setFetchError(null);
    } catch (error) {
      console.error('Error fetching hotels:', error);
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
    fetchHotels();
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
        (!formData.city || hotel.city.toLowerCase().includes(formData.city.toLowerCase())) &&
        (!formData.minPrice || hotel.price >= Number(formData.minPrice)) &&
        (!formData.maxPrice || hotel.price <= Number(formData.maxPrice)) &&
        (!formData.roomType || hotel.room_types.includes(formData.roomType))
      )
      .map((hotel) => ({
        ...hotel,
        totalPrice: hotel.price * formData.guests,
      }));

    setResults(filteredResults);
  };

  const handleReset = () => {
    setFormData({ city: '', checkInDate: '', guests: 1, minPrice: '', maxPrice: '', roomType: '' });
    setResults([]);
    setDateError('');
    setBookingError(null);
    setShowModal(false);
    setUserDetails({ name: '', email: '', phone: '' });
  };

  const handleBookHotel = (hotel) => {
    setSelectedHotel(hotel);
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
        type: 'hotel',
        details: {
          name: selectedHotel.name,
          city: selectedHotel.city,
          check_in_date: formData.checkInDate,
          guests: formData.guests,
          email: userDetails.email,
          phone: userDetails.phone,
        },
        total_price: selectedHotel.totalPrice,
      };
      const response = await axios.post('http://localhost:8000/api/bookings/', bookingData);
      alert(`Booking confirmed! Booking ID: ${response.data.id}`);
      setShowModal(false);
      setUserDetails({ name: '', email: '', phone: '' });
      setBookingError(null);
    } catch (error) {
      console.error('Error creating booking:', error);
      setBookingError(error.response?.data?.detail || 'Failed to create booking. Please try again.');
    }
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
      {bookingError && (
        <div className="alert alert-danger text-center" role="alert">
          {bookingError}
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
          <div className="form-group">
            <label htmlFor="minPrice">Min Price (PKR)</label>
            <input
              type="number"
              id="minPrice"
              name="minPrice"
              value={formData.minPrice}
              onChange={handleChange}
              placeholder="e.g., 5000"
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="maxPrice">Max Price (PKR)</label>
            <input
              type="number"
              id="maxPrice"
              name="maxPrice"
              value={formData.maxPrice}
              onChange={handleChange}
              placeholder="e.g., 20000"
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="roomType">Room Type</label>
            <select
              id="roomType"
              name="roomType"
              value={formData.roomType}
              onChange={handleChange}
              className="form-control"
            >
              <option value="">All Room Types</option>
              {roomTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
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
                    <p className="card-text"><strong>Price per Night:</strong> PKR {hotel.price}</p>
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

      {showModal && selectedHotel && (
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

export default Hotels;