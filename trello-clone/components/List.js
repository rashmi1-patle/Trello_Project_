import React, { useState } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import Card from "./Card";

const List = ({ list, onAddCard, onDeleteList, onDeleteCard, onRenameList, onCardClick }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(list.title);
  const [newCardTitle, setNewCardTitle] = useState("");

  const handleRename = () => {
    if (!newTitle.trim()) return;
    onRenameList(list.id, newTitle);
    setIsEditing(false);
  };

  const handleAddCard = () => {
    if (!newCardTitle.trim()) return;
    onAddCard(list.id, newCardTitle);
    setNewCardTitle("");
  };

  return (
    <div className="list">
      {/* Editable List Title */}
      {isEditing ? (
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          onBlur={handleRename}
          onKeyDown={(e) => e.key === "Enter" && handleRename()}
          autoFocus
          className="list-title-input"
        />
      ) : (
        <h2 onClick={() => setIsEditing(true)} className="list-title">
          {list.title}
        </h2>
      )}

      {/* Delete List Button */}
      <button className="delete-list-btn" onClick={() => onDeleteList(list.id)}>🗑️ Delete List</button>

      
      <Droppable droppableId={list.id} type="card">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps} className="cards-container">
            {list.cards.map((card, index) => (
              <Draggable key={card.id} draggableId={card.id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="card"
                    onClick={() => onCardClick(card, list.id)}
                  >
                    <Card card={card} onDeleteCard={() => onDeleteCard(list.id, card.id)} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      {/* ✅ Fixed New Card Input */}
      <div className="new-card-input">
        <input
          type="text"
          placeholder="Enter card title"
          value={newCardTitle}
          onChange={(e) => setNewCardTitle(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAddCard()}
          className="new-card-textbox"
        />
        <button className="add-card-btn" onClick={handleAddCard}>➕ Add Card</button>
      </div>
    </div>
  );
};

export default List;
