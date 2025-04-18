import { useState } from 'react';

const Hotels = () => {
  const [formData, setFormData] = useState({
    city: '',
    checkIn: '',
    checkOut: '',
    guests: 1,
  });
  const [results, setResults] = useState([]);
  const [sortOrder, setSortOrder] = useState('default');
  const [dateError, setDateError] = useState('');
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [guestNames, setGuestNames] = useState([]);
  const [specialRequests, setSpecialRequests] = useState('');
  const [roomSuggestion, setRoomSuggestion] = useState('');

  const hotelOptions = [
    // Hunza Valley
    { id: 1, name: 'Hunza Serena Inn', city: 'Hunza Valley', price: 12000, roomTypes: ['Standard', 'Deluxe'], image: 'https://images.unsplash.com/photo-1514558427911-8e293bebf18c?q=80&w=2070&auto=format&fit=crop' },
    { id: 2, name: 'Eagle’s Nest Hotel', city: 'Hunza Valley', price: 15000, roomTypes: ['Standard', 'View Room'], image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop' },
    { id: 3, name: 'Hunza View Hotel', city: 'Hunza Valley', price: 10000, roomTypes: ['Basic', 'Family'], image: 'https://images.unsplash.com/photo-1517026575980-d6a1af91402b?q=80&w=800&auto=format&fit=crop' },
    { id: 4, name: 'Baltit Inn', city: 'Hunza Valley', price: 13000, roomTypes: ['Standard', 'Suite'], image: 'https://images.unsplash.com/photo-1595858391328-591454e6b7d3?q=80&w=800&auto=format&fit=crop' },
    
    // Lahore
    { id: 5, name: 'Avari Lahore', city: 'Lahore', price: 15000, roomTypes: ['Executive', 'Suite'], image: 'https://images.unsplash.com/photo-1629234932140-49db511736c5?q=80&w=1974&auto=format&fit=crop' },
    { id: 6, name: 'Pearl Continental Lahore', city: 'Lahore', price: 20000, roomTypes: ['Deluxe', 'Presidential Suite'], image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop' },
    { id: 7, name: 'Luxus Grand Hotel', city: 'Lahore', price: 12000, roomTypes: ['Standard', 'Business'], image: 'https://images.unsplash.com/photo-1502877331356-035a47f2d3c8?q=80&w=800&auto=format&fit=crop' },
    { id: 8, name: 'Heritage Luxury Suites', city: 'Lahore', price: 18000, roomTypes: ['Suite', 'Family'], image: 'https://images.unsplash.com/photo-1517026575980-d6a1af91402b?q=80&w=800&auto=format&fit=crop' },
    
    // Karachi Clifton Beach
    { id: 9, name: 'Marriott Karachi', city: 'Karachi Clifton Beach', price: 18000, roomTypes: ['Deluxe', 'Ocean View'], image: 'https://images.unsplash.com/photo-1629223221079-92a06eb9d8ef?q=80&w=1974&auto=format&fit=crop' },
    { id: 10, name: 'Beach Luxury Hotel', city: 'Karachi Clifton Beach', price: 14000, roomTypes: ['Standard', 'Seafront'], image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop' },
    { id: 11, name: 'Ramada Plaza Karachi', city: 'Karachi Clifton Beach', price: 16000, roomTypes: ['Executive', 'Suite'], image: 'https://images.unsplash.com/photo-1502877331356-035a47f2d3c8?q=80&w=800&auto=format&fit=crop' },
    { id: 12, name: 'Clifton Guest Houses', city: 'Karachi Clifton Beach', price: 11000, roomTypes: ['Basic', 'Twin'], image: 'https://images.unsplash.com/photo-1517026575980-d6a1af91402b?q=80&w=800&auto=format&fit=crop' },
    
    // Skardu
    { id: 13, name: 'Shangrila Resort', city: 'Skardu', price: 14000, roomTypes: ['Standard', 'Lake View'], image: 'https://images.unsplash.com/photo-1602147557719-1d65f9e58a24?q=80&w=2070&auto=format&fit=crop' },
    { id: 14, name: 'Skardu Continental', city: 'Skardu', price: 11000, roomTypes: ['Standard', 'Family'], image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop' },
    { id: 15, name: 'Himalaya Hotel Skardu', city: 'Skardu', price: 13000, roomTypes: ['Basic', 'Deluxe'], image: 'https://images.unsplash.com/photo-1517026575980-d6a1af91402b?q=80&w=800&auto=format&fit=crop' },
    { id: 16, name: 'Mashabrum Hotel', city: 'Skardu', price: 16000, roomTypes: ['Suite', 'Mountain View'], image: 'https://images.unsplash.com/photo-1595858391328-591454e6b7d3?q=80&w=800&auto=format&fit=crop' },
    
    // Swat Valley
    { id: 17, name: 'Swat Continental', city: 'Swat Valley', price: 10000, roomTypes: ['Standard', 'Family'], image: 'https://plus.unsplash.com/premium_photo-1697729729075-3e56242aef49?w=600&auto=format&fit=crop' },
    { id: 18, name: 'Rock City Resort', city: 'Swat Valley', price: 12000, roomTypes: ['Deluxe', 'Cottage'], image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop' },
    { id: 19, name: 'Malam Jabba Hotel', city: 'Swat Valley', price: 14000, roomTypes: ['Standard', 'Slope View'], image: 'https://images.unsplash.com/photo-1517026575980-d6a1af91402b?q=80&w=800&auto=format&fit=crop' },
    { id: 20, name: 'Swat Serena Hotel', city: 'Swat Valley', price: 16000, roomTypes: ['Executive', 'Suite'], image: 'https://images.unsplash.com/photo-1629131647248-8196f3c8a4ed?q=80&w=800&auto=format&fit=crop' },
    
    // Fairy Meadows
    { id: 21, name: 'Fairy Meadows Cottages', city: 'Fairy Meadows', price: 8000, roomTypes: ['Basic', 'Cottage'], image: 'https://images.unsplash.com/photo-1691077015817-64ee69ec020c?w=600&auto=format&fit=crop' },
    { id: 22, name: 'Raikot Sarai', city: 'Fairy Meadows', price: 9000, roomTypes: ['Standard', 'Tent'], image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop' },
    { id: 23, name: 'Nanga Parbat Lodge', city: 'Fairy Meadows', price: 10000, roomTypes: ['Basic', 'View Room'], image: 'https://images.unsplash.com/photo-1517026575980-d6a1af91402b?q=80&w=800&auto=format&fit=crop' },
    { id: 24, name: 'Meadows Guest House', city: 'Fairy Meadows', price: 8500, roomTypes: ['Twin', 'Family'], image: 'https://images.unsplash.com/photo-1628943774520-4f5a3988f811?q=80&w=800&auto=format&fit=crop' },
    
    // Chitral
    { id: 25, name: 'Chitral Guest House', city: 'Chitral', price: 9000, roomTypes: ['Standard', 'Twin'], image: 'https://images.unsplash.com/photo-1707504502519-1f743441bca4?q=80&w=1974&auto=format&fit=crop' },
    { id: 26, name: 'Hindukush Heights', city: 'Chitral', price: 12000, roomTypes: ['Deluxe', 'Suite'], image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop' },
    { id: 27, name: 'Pamir Riverside Inn', city: 'Chitral', price: 10000, roomTypes: ['Standard', 'River View'], image: 'https://images.unsplash.com/photo-1517026575980-d6a1af91402b?q=80&w=800&auto=format&fit=crop' },
    { id: 28, name: 'Chitral Mountain View', city: 'Chitral', price: 11000, roomTypes: ['Basic', 'Family'], image: 'https://images.unsplash.com/photo-1603715104048-8ae91ae83d31?q=80&w=800&auto=format&fit=crop' },
    
    // Naltar Valley
    { id: 29, name: 'Naltar Pine Retreat', city: 'Naltar Valley', price: 11000, roomTypes: ['Standard', 'Pine View'], image: 'https://images.unsplash.com/photo-1633595731525-706725c3c279?w=600&auto=format&fit=crop' },
    { id: 30, name: 'Naltar Lakeside Inn', city: 'Naltar Valley', price: 13000, roomTypes: ['Deluxe', 'Lake View'], image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop' },
    { id: 31, name: 'Snow Leopard Lodge', city: 'Naltar Valley', price: 10000, roomTypes: ['Basic', 'Twin'], image: 'https://images.unsplash.com/photo-1517026575980-d6a1af91402b?q=80&w=800&auto=format&fit=crop' },
    { id: 32, name: 'Naltar Ski Resort', city: 'Naltar Valley', price: 14000, roomTypes: ['Standard', 'Suite'], image: 'https://images.unsplash.com/photo-1628943774520-4f5a3988f811?q=80&w=800&auto=format&fit=crop' },
    
    // Kaghan Valley
    { id: 33, name: 'Naran Hotel', city: 'Kaghan Valley', price: 9500, roomTypes: ['Standard', 'River View'], image: 'https://images.unsplash.com/photo-1590499982760-1e86005527b5?w=600&auto=format&fit=crop' },
    { id: 34, name: 'Pine Park Hotel', city: 'Kaghan Valley', price: 11000, roomTypes: ['Deluxe', 'Family'], image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop' },
    { id: 35, name: 'Saif-ul-Malook Resort', city: 'Kaghan Valley', price: 12000, roomTypes: ['Standard', 'Lake View'], image: 'https://images.unsplash.com/photo-1517026575980-d6a1af91402b?q=80&w=800&auto=format&fit=crop' },
    { id: 36, name: 'Kaghan Valley Inn', city: 'Kaghan Valley', price: 10000, roomTypes: ['Basic', 'Twin'], image: 'https://images.unsplash.com/photo-1629131647248-8196f3c8a4ed?q=80&w=800&auto=format&fit=crop' },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'checkIn' || name === 'checkOut') {
      const checkInDate = name === 'checkIn' ? new Date(value) : new Date(formData.checkIn);
      const checkOutDate = name === 'checkOut' ? new Date(value) : new Date(formData.checkOut);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (checkInDate < today) {
        setDateError('Check-in date must be today or in the future.');
      } else if (checkOutDate <= checkInDate) {
        setDateError('Check-out date must be after check-in date.');
      } else {
        setDateError('');
      }
    }

    if (name === 'guests') {
      setGuestNames(Array(parseInt(value) || 1).fill(''));
    }
  };

  const handleGuestNameChange = (index, value) => {
    const updatedNames = [...guestNames];
    updatedNames[index] = value;
    setGuestNames(updatedNames);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (dateError) return;

    let filteredResults = hotelOptions
      .filter((hotel) => 
        (!formData.city || hotel.city.toLowerCase().includes(formData.city.toLowerCase()))
      )
      .map((hotel) => ({
        ...hotel,
        totalPrice: hotel.price * Math.ceil(formData.guests / 2), // Assuming 2 guests per room
      }));

    if (sortOrder === 'lowToHigh') {
      filteredResults = [...filteredResults].sort((a, b) => a.totalPrice - b.totalPrice);
    } else if (sortOrder === 'highToLow') {
      filteredResults = [...filteredResults].sort((a, b) => b.totalPrice - a.totalPrice);
    }

    setResults(filteredResults);
  };

  const handleReset = () => {
    setFormData({ city: '', checkIn: '', checkOut: '', guests: 1 });
    setResults([]);
    setSortOrder('default');
    setDateError('');
    setGuestNames([]);
    setSpecialRequests('');
    setRoomSuggestion('');
    setSelectedHotel(null);
  };

  const handleSelectHotel = (hotel) => {
    setSelectedHotel(hotel);
    setGuestNames(Array(formData.guests).fill(''));
    setSpecialRequests('');
    setRoomSuggestion('');
  };

  const handleBookHotel = () => {
    if (!selectedHotel) return;
    alert(`Booked ${selectedHotel.name} in ${selectedHotel.city} for ${formData.guests} guest(s).\nGuests: ${guestNames.join(', ')}\nSpecial Requests: ${specialRequests || 'None'}\nRoom Suggestion: ${roomSuggestion || 'No preference'}\nTotal: PKR ${selectedHotel.totalPrice}`);
    setSelectedHotel(null);
    setGuestNames([]);
    setSpecialRequests('');
    setRoomSuggestion('');
  };

  return (
    <div className="container py-5">
      <h2 className="mb-4 slide-up text-center" style={{ color: 'var(--pak-dark)' }}>Book Your Hotel</h2>

      <form onSubmit={handleSubmit} className="row g-3 mb-5 justify-content-center slide-up bg-light p-4 rounded shadow-sm">
        <div className="col-md-3">
          <label htmlFor="city" className="form-label fw-bold" style={{ color: 'var(--pak-dark)' }}>City</label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="e.g., Hunza Valley"
            className="form-control"
            required
          />
        </div>
        <div className="col-md-2">
          <label htmlFor="checkIn" className="form-label fw-bold" style={{ color: 'var(--pak-dark)' }}>Check-In</label>
          <input
            type="date"
            id="checkIn"
            name="checkIn"
            value={formData.checkIn}
            onChange={handleChange}
            className={`form-control ${dateError ? 'is-invalid' : ''}`}
            required
          />
          {dateError && <div className="invalid-feedback">{dateError}</div>}
        </div>
        <div className="col-md-2">
          <label htmlFor="checkOut" className="form-label fw-bold" style={{ color: 'var(--pak-dark)' }}>Check-Out</label>
          <input
            type="date"
            id="checkOut"
            name="checkOut"
            value={formData.checkOut}
            onChange={handleChange}
            className={`form-control ${dateError ? 'is-invalid' : ''}`}
            required
          />
        </div>
        <div className="col-md-2">
          <label htmlFor="guests" className="form-label fw-bold" style={{ color: 'var(--pak-dark)' }}>Guests</label>
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
        <div className="col-md-2">
          <label htmlFor="sortOrder" className="form-label fw-bold" style={{ color: 'var(--pak-dark)' }}>Sort By</label>
          <select
            id="sortOrder"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="form-select"
          >
            <option value="default">Default</option>
            <option value="lowToHigh">Price: Low to High</option>
            <option value="highToLow">Price: High to Low</option>
          </select>
        </div>
        <div className="col-12 text-center mt-4">
          <button type="submit" className="btn btn-primary me-3 px-5 py-2" disabled={dateError}>Search</button>
          <button type="button" className="btn btn-outline-secondary px-5 py-2" onClick={handleReset}>Reset</button>
        </div>
      </form>

      {results.length > 0 && (
        <div className="mt-5">
          <h3 className="slide-up text-center mb-4" style={{ color: 'var(--pak-dark)' }}>Available Hotels</h3>
          <div className="row">
            {results.map((hotel) => (
              <div className="col-md-4 mb-4 slide-up" key={hotel.id}>
                <div className="card h-100 shadow-sm" onClick={() => handleSelectHotel(hotel)} style={{ cursor: 'pointer' }}>
                  <img src={hotel.image} className="card-img-top" alt={hotel.name} style={{ height: '200px', objectFit: 'cover' }} />
                  <div className="card-body text-center">
                    <h5 className="card-title mb-2">{hotel.name}</h5>
                    <p className="card-text mb-1"><strong>Location:</strong> {hotel.city}</p>
                    <p className="card-text mb-3"><strong>Total Price:</strong> PKR {hotel.totalPrice} ({formData.guests} guests)</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Booking Modal */}
      {selectedHotel && (
        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content fade-in">
              <div className="modal-header">
                <h5 className="modal-title" style={{ color: 'var(--pak-dark)' }}>Book {selectedHotel.name}</h5>
                <button className="btn-close" onClick={() => setSelectedHotel(null)}></button>
              </div>
              <div className="modal-body">
                <img src={selectedHotel.image} className="img-fluid mb-3" alt={selectedHotel.name} style={{ maxHeight: '300px', objectFit: 'cover', width: '100%' }} />
                <p><strong>Location:</strong> {selectedHotel.city}</p>
                <p><strong>Total Price:</strong> PKR {selectedHotel.totalPrice} ({formData.guests} guests)</p>
                {guestNames.map((name, index) => (
                  <input
                    key={index}
                    type="text"
                    className="form-control mb-2"
                    value={name}
                    onChange={(e) => handleGuestNameChange(index, e.target.value)}
                    placeholder={`Guest ${index + 1} Name`}
                    required
                  />
                ))}
                <div className="mb-3">
                  <label htmlFor="roomSuggestion" className="form-label">Room Suggestion:</label>
                  <select
                    id="roomSuggestion"
                    className="form-select"
                    value={roomSuggestion}
                    onChange={(e) => setRoomSuggestion(e.target.value)}
                  >
                    <option value="">No Preference</option>
                    {selectedHotel.roomTypes.map((type, idx) => (
                      <option key={idx} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                <textarea
                  className="form-control mb-3"
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  placeholder="e.g., Early check-in, extra bed"
                  rows="2"
                />
              </div>
              <div className="modal-footer">
                <button className="btn btn-success" onClick={handleBookHotel}>Confirm Booking</button>
                <button className="btn btn-danger" onClick={() => setSelectedHotel(null)}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hotels;