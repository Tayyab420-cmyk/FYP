import React from 'react';

const HotelCard = ({ name, location, price, image, onBook }) => (
  <div className="card h-100">
    <img
      src={image}
      className="card-img-top"
      alt={name}
      style={{ height: '200px', objectFit: 'cover' }}
    />
    <div className="card-body text-center">
      <h5 className="card-title">{name}</h5>
      <p className="card-text">{location}</p>
      <p className="card-text">PKR {price} / night</p>
      <button className="btn btn-primary" onClick={onBook}>
        Book Now
      </button>
    </div>
  </div>
);

export default HotelCard;