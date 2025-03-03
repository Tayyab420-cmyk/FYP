import { useState } from 'react';

const Transport = () => {
  const [formData, setFormData] = useState({ from: '', to: '', date: '', type: '' });
  const [results, setResults] = useState([]);
  const [sortOrder, setSortOrder] = useState('default'); // 'default', 'lowToHigh', 'highToLow'
  const [dateError, setDateError] = useState('');

  const transportOptions = [
    { id: 1, type: 'Bus', price: 1500, time: '08:00 AM', image: 'https://images.unsplash.com/photo-1502877331356-035a47f2d3c8?q=80&w=800&auto=format&fit=crop' },
    { id: 2, type: 'Car', price: 5000, time: '10:00 AM', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop' },
    { id: 3, type: 'Van', price: 3000, time: '09:00 AM', image: 'https://images.unsplash.com/photo-1600585154526-990dced436cb?q=80&w=800&auto=format&fit=crop' },
    { id: 4, type: 'Jeep', price: 7000, time: '11:00 AM', image: 'https://images.unsplash.com/photo-1517026575980-d6a1af91402b?q=80&w=800&auto=format&fit=crop' },
    { id: 5, type: 'Train', price: 2000, time: '07:00 AM', image: 'https://images.unsplash.com/photo-1506619216599-9d16d0903dfd?q=80&w=800&auto=format&fit=crop' },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Date validation on change
    if (name === 'date') {
      const selectedDate = new Date(value);
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Reset time for comparison
      if (selectedDate < today) {
        setDateError('Please select a date today or in the future.');
      } else {
        setDateError('');
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (dateError) return; // Prevent submission if date is invalid

    let filteredResults = transportOptions
      .filter((option) => !formData.type || option.type === formData.type)
      .map((option) => ({
        ...option,
        from: formData.from,
        to: formData.to,
      }));

    // Apply price sorting
    if (sortOrder === 'lowToHigh') {
      filteredResults = [...filteredResults].sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'highToLow') {
      filteredResults = [...filteredResults].sort((a, b) => b.price - a.price);
    }

    setResults(filteredResults);
  };

  const handleReset = () => {
    setFormData({ from: '', to: '', date: '', type: '' });
    setResults([]);
    setSortOrder('default');
    setDateError('');
  };

  return (
    <div className="container py-5">
      <h2 className="mb-4 slide-up text-center" style={{ color: 'var(--pak-dark)' }}>Book Your Transport</h2>

      {/* Form */}
      <form onSubmit={handleSubmit} className="row g-3 mb-5 justify-content-center slide-up">
        <div className="col-md-3">
          <label htmlFor="from" className="form-label" style={{ color: 'var(--pak-dark)' }}>From</label>
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
        <div className="col-md-3">
          <label htmlFor="to" className="form-label" style={{ color: 'var(--pak-dark)' }}>To</label>
          <input
            type="text"
            id="to"
            name="to"
            value={formData.to}
            onChange={handleChange}
            placeholder="e.g., Hunza"
            className="form-control"
            required
          />
        </div>
        <div className="col-md-3">
          <label htmlFor="date" className="form-label" style={{ color: 'var(--pak-dark)' }}>Date</label>
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
        <div className="col-md-3">
          <label htmlFor="type" className="form-label" style={{ color: 'var(--pak-dark)' }}>Transport Type</label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="form-select"
          >
            <option value="">All Types</option>
            <option value="Bus">Bus</option>
            <option value="Car">Car</option>
            <option value="Van">Van</option>
            <option value="Jeep">Jeep</option>
            <option value="Train">Train</option>
          </select>
        </div>
        <div className="col-md-3">
          <label htmlFor="sortOrder" className="form-label" style={{ color: 'var(--pak-dark)' }}>Sort by Price</label>
          <select
            id="sortOrder"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="form-select"
          >
            <option value="default">Default</option>
            <option value="lowToHigh">Low to High</option>
            <option value="highToLow">High to Low</option>
          </select>
        </div>
        <div className="col-12 text-center mt-4">
          <button type="submit" className="btn btn-primary me-3 px-4 py-2" disabled={dateError}>Search Transport</button>
          <button type="button" className="btn btn-outline-secondary px-4 py-2" onClick={handleReset}>Reset</button>
        </div>
      </form>

      {/* Results */}
      {results.length > 0 && (
        <div className="mt-5">
          <h3 className="slide-up text-center mb-4" style={{ color: 'var(--pak-dark)' }}>Available Options</h3>
          <div className="row">
            {results.map((result) => (
              <div className="col-md-6 mb-4 slide-up" key={result.id}>
                <div className="card h-100">
                  <div className="row g-0">
                    <div className="col-md-5">
                      <img
                        src={result.image}
                        className="img-fluid rounded-start"
                        alt={result.type}
                        style={{ height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                    <div className="col-md-7">
                      <div className="card-body">
                        <h5 className="card-title">{result.type}</h5>
                        <p className="card-text mb-1"><strong>Route:</strong> {result.from} to {result.to}</p>
                        <p className="card-text mb-1"><strong>Price:</strong> PKR {result.price}</p>
                        <p className="card-text mb-3"><strong>Time:</strong> {result.time}</p>
                        <button
                          className="btn btn-success w-100"
                          onClick={() => alert(`Booked ${result.type} from ${result.from} to ${result.to}`)}
                        >
                          Book Now
                        </button>
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