import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section
        className="hero-section text-center text-white fade-in"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1514558427911-8e293bebf18c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D=crop')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundColor:'green',
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        <div className="overlay" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}></div>
        <div className="container position-relative">
          <h1 className="display-3 fw-bold mb-3">Explore the Wonders of Pakistan</h1>
          <p className="lead mb-4">Book your hotels, transportation, and discover breathtaking destinations.</p>
          <Link to="/destinations">
            <button className="btn btn-primary btn-lg px-5 py-3">Start Your Journey</button>
          </Link>
        </div>
      </section>

      {/* Featured Destinations Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-5 slide-up" style={{ color: 'var(--pak-dark)' }}>Featured Destinations</h2>
          <div className="row">
            <div className="col-md-4 mb-4 slide-up">
              <div className="card">
                <img src="https://images.unsplash.com/photo-1514558427911-8e293bebf18c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D=crop" className="card-img-top" alt="Hunza Valley" style={{ height: '200px', objectFit: 'cover' }} />
                <div className="card-body text-center">
                  <h5 className="card-title">Hunza Valley</h5>
                  <p className="card-text">A paradise of mountains and culture.</p>
                  <Link to="/destinations" className="btn btn-outline-primary">Explore</Link>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4 slide-up">
              <div className="card">
                <img src="https://images.unsplash.com/photo-1629234932140-49db511736c5?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D=crop" className="card-img-top" alt="Lahore" style={{ height: '200px', objectFit: 'cover' }} />
                <div className="card-body text-center">
                  <h5 className="card-title">Lahore</h5>
                  <p className="card-text">Rich history and vibrant culture.</p>
                  <Link to="/destinations" className="btn btn-outline-primary">Explore</Link>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4 slide-up">
              <div className="card">
                <img src="https://images.unsplash.com/photo-1629223221079-92a06eb9d8ef?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D=crop" className="card-img-top" alt="Karachi Beach" style={{ height: '200px', objectFit: 'cover' }} />
                <div className="card-body text-center">
                  <h5 className="card-title">Karachi Clifton Beach</h5>
                  <p className="card-text">Seaside charm and bustling energy.</p>
                  <Link to="/destinations" className="btn btn-outline-primary">Explore</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-5">
        <div className="container text-center">
          <h2 className="mb-5 slide-up" style={{ color: 'var(--pak-dark)' }}>Why Choose Pakistan Tourism?</h2>
          <div className="row">
            <div className="col-md-4 mb-4 slide-up">
              <i className="bi bi-geo-alt fs-1 mb-3" style={{ color: 'var(--pak-green)' }}></i>
              <h4 style={{ color: 'var(--pak-dark)' }}>Stunning Destinations</h4>
              <p>From mountains to beaches, explore Pakistan’s diverse beauty.</p>
            </div>
            <div className="col-md-4 mb-4 slide-up">
              <i className="bi bi-house-door fs-1 mb-3" style={{ color: 'var(--pak-blue)' }}></i>
              <h4 style={{ color: 'var(--pak-dark)' }}>Comfortable Hotels</h4>
              <p>Book top-notch stays across the country.</p>
            </div>
            <div className="col-md-4 mb-4 slide-up">
              <i className="bi bi-bus-front fs-1 mb-3" style={{ color: 'var(--pak-gold)' }}></i>
              <h4 style={{ color: 'var(--pak-dark)' }}>Reliable Transport</h4>
              <p>Travel with ease—bus, car, jeep, and more.</p>
            </div>
          </div>
          <Link to="/hotels" className="btn btn-outline-primary mt-3">Browse Hotels</Link>
          <Link to="/transport" className="btn btn-outline-primary mt-3 mx-3">Book Transport</Link>
        </div>
      </section>
    </div>
  );
};

export default Home;