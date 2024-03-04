
import React from 'react';
import './Card.css';
const Card = ({ imageUrl, content, label }) => {
  return (
    <div className="card">
      <img src={imageUrl} alt="Card" />
      <div className="card-content">{content}</div>
      <div className="card-label">Label: {label}</div>
    </div>
  );
};

export default Card;
