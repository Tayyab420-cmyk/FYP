import React from 'react';

const HotelCard = ({ name, location, price, image, onBook }) => (
  <div className="card h-100 shadow-sm">
    <img src={image} className="card-img-top" alt={name} style={{ height: '200px', objectFit: 'cover' }} />
    <div className="card-body text-center">
      <h5 className="card-title mb-2">{name}</h5>
      <p className="card-text mb-1">{location}</p>
      <p className="card-text mb-3"><strong>PKR {price}</strong> / night</p>
      <button className="btn btn-primary" onClick={onBook}>Book Now</button>
    </div>
  </div>
);

export default HotelCard;