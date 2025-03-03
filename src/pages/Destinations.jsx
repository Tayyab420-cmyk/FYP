import { useState } from 'react';
import DestinationCard from '../components/DestinationCard';

const Destinations = () => {
  const places = [
    { name: 'Hunza Valley', description: 'A paradise of mountains and culture, famous for its stunning views and apricots.', image: 'https://images.unsplash.com/photo-1629146987608-6f2df09c7f96?q=80&w=800&auto=format&fit=crop' },
    { name: 'Lahore Fort', description: 'Historical gem of Mughal architecture in the heart of Lahore.', image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=800&auto=format&fit=crop' },
    { name: 'Fairy Meadows', description: 'Stunning views of Nanga Parbat, a trekker’s dream.', image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?q=80&w=800&auto=format&fit=crop' },
    { name: 'Skardu', description: 'Gateway to K2, with breathtaking valleys and lakes like Shangrila.', image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=800&auto=format&fit=crop' },
    { name: 'Mohenjo-Daro', description: 'Ancient Indus Valley civilization site, a UNESCO World Heritage Site.', image: 'https://images.unsplash.com/photo-1519449556851-5720b33024e6?q=80&w=800&auto=format&fit=crop' },
    { name: 'Swat Valley', description: 'Known as the Switzerland of Pakistan for its lush greenery and rivers.', image: 'https://images.unsplash.com/photo-1564501049412-37d57cc1f7e5?q=80&w=800&auto=format&fit=crop' },
    { name: 'Badshahi Mosque', description: 'Iconic Mughal-era mosque in Lahore with grand architecture.', image: 'https://images.unsplash.com/photo-1570213489059-0a0e203d760d?q=80&w=800&auto=format&fit=crop' },
    { name: 'Kalam', description: 'A serene valley with forests, waterfalls, and cool weather.', image: 'https://images.unsplash.com/photo-1625244724122-2d27c26e7f87?q=80&w=800&auto=format&fit=crop' },
    { name: 'Naltar Valley', description: 'Famous for its colorful lakes and skiing in winter.', image: 'https://images.unsplash.com/photo-1468070454955-c5b6932b7913?q=80&w=800&auto=format&fit=crop' },
    { name: 'Karachi Clifton Beach', description: 'A bustling coastal spot with seaside charm.', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop' },
  ];

  const [search, setSearch] = useState('');

  const filteredPlaces = places.filter((place) =>
    place.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container py-5">
      <h2 className="mb-4 slide-up" style={{ color: 'var(--pak-dark)' }}>Explore Destinations</h2>
      <div className="mb-4 slide-up">
        <input
          type="text"
          className="form-control"
          placeholder="Search destinations (e.g., Hunza, Lahore)..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="row">
        {filteredPlaces.length > 0 ? (
          filteredPlaces.map((place, index) => (
            <div className="col-md-4 mb-4 slide-up" key={index}>
              <DestinationCard name={place.name} description={place.description} image={place.image} />
            </div>
          ))
        ) : (
          <div className="col-12 text-center slide-up">
            <p className="text-muted">No destinations found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Destinations;