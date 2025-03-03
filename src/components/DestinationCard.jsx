import React from 'react';
import { Link } from 'react-router-dom';

const DestinationCard = ({ name, description, image }) => (
  <div className="card h-100 transition-all duration-300 hover:shadow-lg">
    <img src={image} className="card-img-top" alt={name} style={{ height: '200px', objectFit: 'cover' }} />
    <div className="card-body text-center">
      <h5 className="card-title">{name}</h5>
      <p className="card-text">{description}</p>
      <Link to={`/destinations/${name.toLowerCase().replace(/\s+/g, '-')}`} className="btn btn-outline-primary btn-sm">
        Details
      </Link>
    </div>
  </div>
);

export default DestinationCard;