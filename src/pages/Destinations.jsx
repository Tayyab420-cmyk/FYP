import { useState } from 'react';
import { Link } from 'react-router-dom';

const Destinations = () => {
  const [selectedDestination, setSelectedDestination] = useState(null);

  const destinations = [
    {
      name: 'Hunza Valley',
      image: 'https://images.unsplash.com/photo-1514558427911-8e293bebf18c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D=crop',
      shortDescription: 'A paradise of mountains and culture.',
      details: {
        fullDescription: 'Hunza Valley, nestled in Gilgit-Baltistan, is renowned for its breathtaking landscapes, towering peaks like Rakaposhi, and vibrant local culture. It’s a haven for trekkers and history enthusiasts alike.',
        attractions: ['Attabad Lake', 'Baltit Fort', 'Rakaposhi Viewpoint'],
        travelTips: 'Best visited in spring or autumn. Pack warm clothes for chilly nights.'
      }
    },
    {
      name: 'Lahore',
      image: 'https://images.unsplash.com/photo-1629234932140-49db511736c5?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D=crop',
      shortDescription: 'Rich history and vibrant culture.',
      details: {
        fullDescription: 'Lahore, the cultural heart of Pakistan, blends Mughal heritage with modern energy. From historic forts to bustling bazaars, it’s a city of endless exploration.',
        attractions: ['Lahore Fort', 'Badshahi Mosque', 'Shalimar Gardens'],
        travelTips: 'Try local street food like nihari. Visit in winter for pleasant weather.'
      }
    },
    {
      name: 'Karachi Clifton Beach',
      image: 'https://images.unsplash.com/photo-1629223221079-92a06eb9d8ef?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D=crop',
      shortDescription: 'Seaside charm and bustling energy.',
      details: {
        fullDescription: 'Clifton Beach in Karachi offers a lively coastal escape with its sandy shores and vibrant promenade. It’s a snapshot of Pakistan’s largest city’s dynamic spirit.',
        attractions: ['Clifton Beach', 'Dolmen Mall', 'Mohatta Palace'],
        travelTips: 'Evening walks are best. Watch out for high tides.'
      }
    },
    {
      name: 'Skardu',
      image: 'https://images.unsplash.com/photo-1602147557719-1d65f9e58a24?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      shortDescription: 'Gateway to the world’s highest peaks.',
      details: {
        fullDescription: 'Skardu, in Gilgit-Baltistan, is a base for mountaineers tackling giants like K2. Its rugged beauty, serene lakes, and cold deserts make it unforgettable.',
        attractions: ['Shangrila Lake', 'Deosai National Park', 'Skardu Fort'],
        travelTips: 'Visit in summer for accessibility. Bring layers for cold weather.'
      }
    },
    {
      name: 'Swat Valley',
      image: 'https://plus.unsplash.com/premium_photo-1697729729075-3e56242aef49?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c3dhdCUyMHZhbGxleXxlbnwwfHwwfHx8MA%3D%3D',
      shortDescription: 'The Switzerland of Pakistan.',
      details: {
        fullDescription: 'Swat Valley, dubbed the Switzerland of Pakistan, boasts lush greenery, flowing rivers, and ancient Buddhist ruins, offering a blend of nature and history.',
        attractions: ['Malam Jabba', 'Mingora Bazaar', 'Saidu Sharif Stupa'],
        travelTips: 'Spring and summer are ideal. Try local trout dishes.'
      }
    },
    {
      name: 'Fairy Meadows',
      image: 'https://images.unsplash.com/photo-1691077015817-64ee69ec020c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZmFpcnklMjBtZWFkb3dzfGVufDB8fDB8fHww',
      shortDescription: 'A meadow beneath Nanga Parbat.',
      details: {
        fullDescription: 'Fairy Meadows offers stunning views of Nanga Parbat, the ninth-highest mountain in the world. It’s a trekker’s paradise with lush meadows and serene vibes.',
        attractions: ['Nanga Parbat Base Camp', 'Reflection Lake', 'Beyal Camp'],
        travelTips: 'Requires a jeep ride and trek. Visit in June-July for best views.'
      }
    },
    {
      name: 'Chitral',
      image: 'https://images.unsplash.com/photo-1707504502519-1f743441bca4?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      shortDescription: 'Home of the Kalash culture.',
      details: {
        fullDescription: 'Chitral, in Khyber Pakhtunkhwa, is famous for its unique Kalash people, dramatic valleys, and the towering Trich Mir peak. It’s a cultural and scenic gem.',
        attractions: ['Kalash Valleys', 'Chitral Fort', 'Shahi Masjid'],
        travelTips: 'Attend the Kalash festivals. Summer is the best season.'
      }
    },
    {
      name: 'Naltar Valley',
      image: 'https://images.unsplash.com/photo-1633595731525-706725c3c279?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bmFsdGFyJTIwdmFsbGV5fGVufDB8fDB8fHww',
      shortDescription: 'Colorful lakes and ski slopes.',
      details: {
        fullDescription: 'Naltar Valley, near Gilgit, is known for its vibrant blue-green lakes and winter skiing. It’s a hidden retreat surrounded by pine forests and peaks.',
        attractions: ['Naltar Lakes', 'Ski Resort', 'Bashkiri Lake'],
        travelTips: 'Visit in summer for lakes or winter for skiing. Jeep travel required.'
      }
    },
    {
      name: 'Kaghan Valley',
      image: 'https://images.unsplash.com/photo-1590499982760-1e86005527b5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGthZ2hhbiUyMHZhbGxleXxlbnwwfHwwfHx8MA%3D%3D',
      shortDescription: 'Lush valleys and glacial lakes.',
      details: {
        fullDescription: 'Kaghan Valley, a northern jewel, features alpine scenery, the crystal-clear Lake Saif-ul-Malook, and adventurous trails amidst towering mountains.',
        attractions: ['Lake Saif-ul-Malook', 'Lulusar Lake', 'Naran Bazaar'],
        travelTips: 'Summer is prime time. Bring hiking gear for trails.'
      }
    }
  ];

  const handleShowDetails = (destination) => {
    setSelectedDestination(destination);
  };

  const handleCloseDetails = () => {
    setSelectedDestination(null);
  };

  return (
    <div className="container py-5">
      <h2 className="text-center mb-5 slide-up" style={{ color: 'var(--pak-dark)' }}>Discover Pakistan</h2>
      <div className="row">
        {destinations.map((dest, index) => (
          <div className="col-md-4 mb-4 slide-up" key={index}>
            <div className="card h-100 shadow-sm">
              <img src={dest.image} className="card-img-top" alt={dest.name} style={{ height: '200px', objectFit: 'cover' }} />
              <div className="card-body text-center">
                <h5 className="card-title">{dest.name}</h5>
                <p className="card-text">{dest.shortDescription}</p>
                <button
                  className="btn btn-outline-primary mx-2"
                  onClick={() => handleShowDetails(dest)}
                >
                  Details
                </button>
                <Link to="/transport" className="btn btn-primary mx-2">Book Transport</Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Details Modal */}
      {selectedDestination && (
        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content fade-in">
              <div className="modal-header">
                <h5 className="modal-title" style={{ color: 'var(--pak-dark)' }}>{selectedDestination.name}</h5>
                <button className="btn-close" onClick={handleCloseDetails}></button>
              </div>
              <div className="modal-body">
                <img src={selectedDestination.image} className="img-fluid mb-3" alt={selectedDestination.name} style={{ maxHeight: '300px', objectFit: 'cover', width: '100%' }} />
                <p><strong>Description:</strong> {selectedDestination.details.fullDescription}</p>
                <p><strong>Top Attractions:</strong></p>
                <ul>
                  {selectedDestination.details.attractions.map((attraction, idx) => (
                    <li key={idx}>{attraction}</li>
                  ))}
                </ul>
                <p><strong>Travel Tips:</strong> {selectedDestination.details.travelTips}</p>
              </div>
              <div className="modal-footer">
                <Link to="/hotels" className="btn btn-primary">Book Hotel</Link>
                <Link to="/transport" className="btn btn-primary mx-2">Book Transport</Link>
                <button className="btn btn-danger" onClick={handleCloseDetails}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Destinations;