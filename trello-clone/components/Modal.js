import { useState } from 'react';

const Modal = ({ card, onClose, onSave }) => {
    const [title, setTitle] = useState(card.title);
    const [description, setDescription] = useState(card.description || "");
    const [dueDate, setDueDate] = useState(card.dueDate || "");

    const handleSave = () => {
        onSave({ ...card, title, description, dueDate });
        onClose();
    };

    return (
        <div className="modal">
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Card Title"
            />
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
            />
            <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
            />
            <button onClick={handleSave}>Save</button>
            <button onClick={onClose}>Close</button>
        </div>
    );
};

export default Modal;
