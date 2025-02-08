import React from "react";

const Card = ({ card, onDeleteCard }) => {
  return (
    <div className="card-content">
      <h3>{card.title}</h3>
      <p>{card.description}</p>
      <button
        onClick={(event) => {
          if (event && event.stopPropagation) {
            event.stopPropagation(); 
          }
          onDeleteCard(card.id); 
        }}
      >
        🗑️
      </button>
    </div>
  );
};

export default Card;
