import { useState } from 'react';
import HotelCard from '../components/HotelCard';

const Hotels = () => {
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [filterLocation, setFilterLocation] = useState('');
  const [sortOrder, setSortOrder] = useState('default');
  const [persons, setPersons] = useState(1);
  const [guestNames, setGuestNames] = useState([]); // Array for guest names
  const [specialRequests, setSpecialRequests] = useState('');

  const hotels = [
    { name: 'Serena Hotel', location: 'Islamabad', price: 15000, image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=800&auto=format&fit=crop' },
    { name: 'PC Hotel', location: 'Lahore', price: 12000, image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop' },
    { name: 'Hunza Inn', location: 'Hunza', price: 8000, image: 'https://images.unsplash.com/photo-1629146987608-6f2df09c7f96?q=80&w=800&auto=format&fit=crop' },
    { name: 'Fairy Meadows Cottages', location: 'Fairy Meadows', price: 6000, image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?q=80&w=800&auto=format&fit=crop' },
    { name: 'Shangrila Resort', location: 'Skardu', price: 10000, image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=800&auto=format&fit=crop' },
    { name: 'Indus Hotel', location: 'Mohenjo-Daro (near Larkana)', price: 7000, image: 'https://images.unsplash.com/photo-1519449556851-5720b33024e6?q=80&w=800&auto=format&fit=crop' },
    { name: 'Swat Continental', location: 'Swat Valley', price: 8500, image: 'https://images.unsplash.com/photo-1564501049412-37d57cc1f7e5?q=80&w=800&auto=format&fit=crop' },
    { name: 'Avari Hotel', location: 'Lahore', price: 13000, image: 'https://images.unsplash.com/photo-1570213489059-0a0e203d760d?q=80&w=800&auto=format&fit=crop' },
    { name: 'Kalam Grand Hotel', location: 'Kalam', price: 7500, image: 'https://images.unsplash.com/photo-1625244724122-2d27c26e7f87?q=80&w=800&auto=format&fit=crop' },
    { name: 'Naltar Pine Guest House', location: 'Naltar Valley', price: 6500, image: 'https://images.unsplash.com/photo-1468070454955-c5b6932b7913?q=80&w=800&auto=format&fit=crop' },
    { name: 'Marriott Hotel', location: 'Karachi', price: 14000, image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d3c?q=80&w=800&auto=format&fit=crop' },
  ];

  const suggestRoomType = (numPersons) => {
    if (numPersons <= 1) return 'Single Room';
    if (numPersons <= 2) return 'Double Room';
    if (numPersons <= 4) return 'Family Room';
    return 'Suite';
  };

  const handleBook = (hotel) => {
    setSelectedHotel(hotel);
    setGuestNames(Array(persons).fill('')); // Initialize guest names array
  };

  const handleGuestNameChange = (index, value) => {
    const updatedNames = [...guestNames];
    updatedNames[index] = value;
    setGuestNames(updatedNames);
  };

  const handleSubmitBooking = (e) => {
    e.preventDefault();
    const nights = Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24)) || 1;
    const totalPrice = selectedHotel.price * nights;
    const roomType = suggestRoomType(persons);
    alert(`Booked ${selectedHotel.name} (${roomType}) for ${persons} person(s) from ${checkIn} to ${checkOut}.\nGuests: ${guestNames.join(', ')}\nSpecial Requests: ${specialRequests || 'None'}\nTotal: PKR ${totalPrice}`);
    setSelectedHotel(null);
    setCheckIn('');
    setCheckOut('');
    setPersons(1);
    setGuestNames([]);
    setSpecialRequests('');
  };

  let filteredHotels = filterLocation
    ? hotels.filter((hotel) => hotel.location.toLowerCase().includes(filterLocation.toLowerCase()))
    : hotels;

  if (sortOrder === 'lowToHigh') {
    filteredHotels = [...filteredHotels].sort((a, b) => a.price - b.price);
  } else if (sortOrder === 'highToLow') {
    filteredHotels = [...filteredHotels].sort((a, b) => b.price - a.price);
  }

  return (
    <div className="container py-5">
      <h2 className="mb-4 slide-up text-center" style={{ color: 'var(--pak-dark)' }}>Book Your Hotel</h2>

      <div className="row g-3 mb-5 justify-content-center slide-up bg-light p-4 rounded shadow-sm">
        <div className="col-md-3">
          <label htmlFor="locationFilter" className="form-label fw-bold" style={{ color: 'var(--pak-dark)' }}>Location</label>
          <input
            type="text"
            id="locationFilter"
            className="form-control"
            placeholder="e.g., Lahore, Hunza"
            value={filterLocation}
            onChange={(e) => setFilterLocation(e.target.value)}
          />
        </div>
        <div className="col-md-3">
          <label htmlFor="sortOrder" className="form-label fw-bold" style={{ color: 'var(--pak-dark)' }}>Sort by Price</label>
          <select
            id="sortOrder"
            className="form-select"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="default">Default</option>
            <option value="lowToHigh">Low to High</option>
            <option value="highToLow">High to Low</option>
          </select>
        </div>
        <div className="col-md-3">
          <label htmlFor="persons" className="form-label fw-bold" style={{ color: 'var(--pak-dark)' }}>Persons</label>
          <input
            type="number"
            id="persons"
            className="form-control"
            value={persons}
            onChange={(e) => setPersons(Math.max(1, parseInt(e.target.value) || 1))}
            min="1"
            max="10"
          />
        </div>
      </div>

      <div className="row">
        {filteredHotels.length > 0 ? (
          filteredHotels.map((hotel, index) => (
            <div className="col-md-4 mb-4 slide-up" key={index}>
              <HotelCard
                name={hotel.name}
                location={hotel.location}
                price={hotel.price}
                image={hotel.image}
                onBook={() => handleBook(hotel)}
              />
            </div>
          ))
        ) : (
          <div className="col-12 text-center slide-up">
            <p className="text-muted">No hotels found for this location.</p>
          </div>
        )}
      </div>

      {selectedHotel && (
        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content fade-in">
              <div className="modal-header">
                <h5 className="modal-title" style={{ color: 'var(--pak-dark)' }}>Book {selectedHotel.name}</h5>
                <button className="btn-close" onClick={() => setSelectedHotel(null)}></button>
              </div>
              <form onSubmit={handleSubmitBooking}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label htmlFor="checkIn" className="form-label">Check-In:</label>
                    <input
                      type="date"
                      id="checkIn"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="checkOut" className="form-label">Check-Out:</label>
                    <input
                      type="date"
                      id="checkOut"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Number of Persons: {persons}</label>
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
                  </div>
                  <div className="mb-3">
                    <label htmlFor="specialRequests" className="form-label">Special Requests:</label>
                    <textarea
                      id="specialRequests"
                      className="form-control"
                      value={specialRequests}
                      onChange={(e) => setSpecialRequests(e.target.value)}
                      placeholder="e.g., Extra bed, late check-in"
                      rows="3"
                    />
                  </div>
                  <p className="mb-3"><strong>Suggested Room:</strong> {suggestRoomType(persons)}</p>
                  <p><strong>Total Price:</strong> PKR {selectedHotel.price * (Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24)) || 1)} (for {persons} person(s))</p>
                </div>
                <div className="modal-footer">
                  <button type="submit" className="btn btn-success">Confirm Booking</button>
                  <button type="button" className="btn btn-danger" onClick={() => setSelectedHotel(null)}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hotels;