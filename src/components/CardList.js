
import React, { useState } from 'react';
import Card from './Card';
import cardData from '../data.js'; 

const CardsPerPage = 6; 
const CardList = () => {
  const [currentPage, setCurrentPage] = useState(1);

  
  const startIndex = (currentPage - 1) * CardsPerPage;
  const endIndex = startIndex + CardsPerPage;

 
  const currentCards = cardData.slice(startIndex, endIndex);

  const handleLoadMore = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      <div className="card-list">
        {currentCards.map((card, index) => (
          <Card
            key={index}
            imageUrl={card.imageUrl}
            content={card.content}
            label={card.label}
          />
        ))}
      </div>
      <div className="pagination">
        {currentPage > 1 && (
          <button onClick={handlePrevious}>Previous</button>
        )}
        {endIndex < cardData.length && (
          <button onClick={handleLoadMore}>Load More</button>
        )}
      </div>
    </div>
  );
};

export default CardList;
