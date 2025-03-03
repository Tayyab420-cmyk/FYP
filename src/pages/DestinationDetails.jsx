import { useParams, Link } from 'react-router-dom';

const destinationsData = [
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

const DestinationDetails = () => {
  const { name } = useParams(); // Get the destination name from URL
  const destination = destinationsData.find(
    (d) => d.name.toLowerCase().replace(/\s+/g, '-') === name
  );

  if (!destination) {
    return (
      <div className="container py-5 text-center">
        <h2>Destination Not Found</h2>
        <Link to="/destinations" className="btn btn-primary mt-3">Back to Destinations</Link>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-md-6">
          <img
            src={destination.image}
            className="img-fluid rounded"
            alt={destination.name}
            style={{ maxHeight: '400px', objectFit: 'cover', width: '100%' }}
          />
        </div>
        <div className="col-md-6">
          <h2 className="mb-3">{destination.name}</h2>
          <p className="lead">{destination.description}</p>
          <p className="text-muted">Explore more about this destination and plan your visit!</p>
          <Link to="/hotels" className="btn btn-primary me-2">Find Hotels Nearby</Link>
          <Link to="/transport" className="btn btn-outline-primary">Book Transport</Link>
          <Link to="/destinations" className="btn btn-link mt-3 d-block">Back to Destinations</Link>
        </div>
      </div>
    </div>
  );
};

export default DestinationDetails;