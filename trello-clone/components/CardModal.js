import React, { useState, useEffect } from "react";

const CardModal = ({ card, onClose, onSave, onDelete }) => {
  if (!card) return null; 

  const [title, setTitle] = useState(card.title);
  const [description, setDescription] = useState(card.description || "");
  const [dueDate, setDueDate] = useState(card.dueDate || "");

  useEffect(() => {
    setTitle(card.title);
    setDescription(card.description || "");
    setDueDate(card.dueDate || "");
  }, [card]); 

  const handleSave = () => {
    if (!title.trim()) return; // Prevent empty titles
    onSave({ ...card, title, description, dueDate });
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Edit Card</h2>

        <label>Title:</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />

        <label>Description:</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />

        <label>Due Date:</label>
        <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />

        <div className="modal-buttons">
          <button onClick={handleSave}>Save</button>
          {/* <button onClick={() => onDelete(card.id)}>Delete</button> */}
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default CardModal;
