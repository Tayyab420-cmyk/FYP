import { useState } from 'react';

const Transport = () => {
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    date: '',
    type: '',
    passengers: 1,
  });
  const [results, setResults] = useState([]);
  const [sortOrder, setSortOrder] = useState('default');
  const [dateError, setDateError] = useState('');
  const [trainError, setTrainError] = useState('');
  const [passengerNames, setPassengerNames] = useState([]); // Array for passenger names
  const [specialRequests, setSpecialRequests] = useState('');

  const transportOptions = [
    { id: 1, type: 'Bus', price: 1500, time: '08:00 AM', image: 'https://images.unsplash.com/photo-1502877331356-035a47f2d3c8?q=80&w=800&auto=format&fit=crop' },
    { id: 2, type: 'Car', price: 5000, time: '10:00 AM', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop' },
    { id: 3, type: 'Van', price: 3000, time: '09:00 AM', image: 'https://images.unsplash.com/photo-1600585154526-990dced436cb?q=80&w=800&auto=format&fit=crop' },
    { id: 4, type: 'Jeep', price: 7000, time: '11:00 AM', image: 'https://images.unsplash.com/photo-1517026575980-d6a1af91402b?q=80&w=800&auto=format&fit=crop' },
    { id: 5, type: 'Train', price: 2000, time: '07:00 AM', image: 'https://images.unsplash.com/photo-1506619216599-9d16d0903dfd?q=80&w=800&auto=format&fit=crop' },
  ];

  const noTrainCities = ['Hunza', 'Skardu', 'Fairy Meadows', 'Naltar Valley', 'Kalam', 'Swat Valley'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'date') {
      const selectedDate = new Date(value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        setDateError('Please select a date today or in the future.');
      } else {
        setDateError('');
      }
    }

    if (name === 'from' || name === 'to') {
      const fromNoTrain = noTrainCities.some((city) => value.toLowerCase().includes(city.toLowerCase()));
      const toNoTrain = name === 'to' && noTrainCities.some((city) => value.toLowerCase().includes(city.toLowerCase()));
      if ((fromNoTrain || toNoTrain) && formData.type === 'Train') {
        setTrainError('Trains are not available for this route.');
      } else {
        setTrainError('');
      }
    }

    if (name === 'type' && value === 'Train') {
      const fromNoTrain = noTrainCities.some((city) => formData.from.toLowerCase().includes(city.toLowerCase()));
      const toNoTrain = noTrainCities.some((city) => formData.to.toLowerCase().includes(city.toLowerCase()));
      if (fromNoTrain || toNoTrain) {
        setTrainError('Trains are not available for this route.');
      } else {
        setTrainError('');
      }
    }

    if (name === 'passengers') {
      setPassengerNames(Array(parseInt(value) || 1).fill('')); // Adjust passenger names array
    }
  };

  const handlePassengerNameChange = (index, value) => {
    const updatedNames = [...passengerNames];
    updatedNames[index] = value;
    setPassengerNames(updatedNames);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (dateError || trainError) return;

    let filteredResults = transportOptions
      .filter((option) => !formData.type || option.type === formData.type)
      .map((option) => ({
        ...option,
        from: formData.from,
        to: formData.to,
        totalPrice: option.price * formData.passengers,
      }));

    if (sortOrder === 'lowToHigh') {
      filteredResults = [...filteredResults].sort((a, b) => a.totalPrice - b.totalPrice);
    } else if (sortOrder === 'highToLow') {
      filteredResults = [...filteredResults].sort((a, b) => b.totalPrice - a.totalPrice);
    }

    setResults(filteredResults);
    setPassengerNames(Array(formData.passengers).fill('')); // Reset names for new search
  };

  const handleReset = () => {
    setFormData({ from: '', to: '', date: '', type: '', passengers: 1 });
    setResults([]);
    setSortOrder('default');
    setDateError('');
    setTrainError('');
    setPassengerNames([]);
    setSpecialRequests('');
  };

  const handleBookTransport = (result) => {
    alert(`Booked ${result.type} for ${formData.passengers} passenger(s) from ${result.from} to ${result.to}.\nPassengers: ${passengerNames.join(', ')}\nSpecial Requests: ${specialRequests || 'None'}\nTotal: PKR ${result.totalPrice}`);
    setResults([]);
    setPassengerNames([]);
    setSpecialRequests('');
  };

  return (
    <div className="container py-5">
      <h2 className="mb-4 slide-up text-center" style={{ color: 'var(--pak-dark)' }}>Book Your Transport</h2>

      <form onSubmit={handleSubmit} className="row g-3 mb-5 justify-content-center slide-up bg-light p-4 rounded shadow-sm">
        <div className="col-md-2">
          <label htmlFor="from" className="form-label fw-bold" style={{ color: 'var(--pak-dark)' }}>From</label>
          <input
            type="text"
            id="from"
            name="from"
            value={formData.from}
            onChange={handleChange}
            placeholder="e.g., Lahore"
            className="form-control"
            required
          />
        </div>
        <div className="col-md-2">
          <label htmlFor="to" className="form-label fw-bold" style={{ color: 'var(--pak-dark)' }}>To</label>
          <input
            type="text"
            id="to"
            name="to"
            value={formData.to}
            onChange={handleChange}
            placeholder="e.g., Karachi"
            className="form-control"
            required
          />
        </div>
        <div className="col-md-2">
          <label htmlFor="date" className="form-label fw-bold" style={{ color: 'var(--pak-dark)' }}>Travel Date</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className={`form-control ${dateError ? 'is-invalid' : ''}`}
            required
          />
          {dateError && <div className="invalid-feedback">{dateError}</div>}
        </div>
        <div className="col-md-2">
          <label htmlFor="type" className="form-label fw-bold" style={{ color: 'var(--pak-dark)' }}>Type</label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            className={`form-select ${trainError ? 'is-invalid' : ''}`}
          >
            <option value="">All Types</option>
            <option value="Bus">Bus</option>
            <option value="Car">Car</option>
            <option value="Van">Van</option>
            <option value="Jeep">Jeep</option>
            <option value="Train">Train</option>
          </select>
          {trainError && <div className="invalid-feedback">{trainError}</div>}
        </div>
        <div className="col-md-2">
          <label htmlFor="passengers" className="form-label fw-bold" style={{ color: 'var(--pak-dark)' }}>Passengers</label>
          <input
            type="number"
            id="passengers"
            name="passengers"
            value={formData.passengers}
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
          <button type="submit" className="btn btn-primary me-3 px-5 py-2" disabled={dateError || trainError}>Search</button>
          <button type="button" className="btn btn-outline-secondary px-5 py-2" onClick={handleReset}>Reset</button>
        </div>
      </form>

      {results.length > 0 && (
        <div className="mt-5">
          <h3 className="slide-up text-center mb-4" style={{ color: 'var(--pak-dark)' }}>Available Transport</h3>
          <div className="row">
            {results.map((result) => (
              <div className="col-md-6 mb-4 slide-up" key={result.id}>
                <div className="card h-100 shadow-sm">
                  <div className="row g-0">
                    <div className="col-md-4">
                      <img src={result.image} className="img-fluid rounded-start" alt={result.type} style={{ height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <h5 className="card-title mb-2">{result.type}</h5>
                        <p className="card-text mb-1"><strong>Route:</strong> {result.from} to {result.to}</p>
                        <p className="card-text mb-1"><strong>Total Price:</strong> PKR {result.totalPrice} ({formData.passengers} pax)</p>
                        <p className="card-text mb-3"><strong>Departure:</strong> {result.time}</p>
                        {passengerNames.map((name, index) => (
                          <input
                            key={index}
                            type="text"
                            className="form-control mb-2"
                            value={name}
                            onChange={(e) => handlePassengerNameChange(index, e.target.value)}
                            placeholder={`Passenger ${index + 1} Name`}
                            required
                          />
                        ))}
                        <textarea
                          className="form-control mb-3"
                          value={specialRequests}
                          onChange={(e) => setSpecialRequests(e.target.value)}
                          placeholder="e.g., Extra luggage, wheelchair access"
                          rows="2"
                        />
                        <button className="btn btn-success w-100" onClick={() => handleBookTransport(result)}>Book Now</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Transport;