import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import List from "./List";
import Header from "./Header";
import CardModal from "./CardModal";

const Board = () => {
  const [lists, setLists] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [newListTitle, setNewListTitle] = useState("");

  // Load board data from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedLists = localStorage.getItem("boardData");
      if (savedLists) {
        setLists(JSON.parse(savedLists));
      } else {
        setLists([
          { id: "1", title: "To Do", cards: [{ id: "c1", title: "Task 1", description: "" }] },
          { id: "2", title: "In Progress", cards: [{ id: "c2", title: "Task 2", description: "" }] },
          { id: "3", title: "Done", cards: [{ id: "c3", title: "Task 3", description: "" }] }
        ]);
      }
    }
  }, []);

  // Save board data to localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("boardData", JSON.stringify(lists));
    }
  }, [lists]);

  // Open modal to edit a card
  const handleEditCard = (card, listId) => {
    setSelectedCard({ ...card, listId });
  };

  // Save updated card data
  const handleSaveCard = (updatedCard) => {
    setLists((prevLists) =>
      prevLists.map((list) =>
        list.id === updatedCard.listId
          ? {
              ...list,
              cards: list.cards.map((card) =>
                card.id === updatedCard.id
                  ? { ...card, title: updatedCard.title, description: updatedCard.description }
                  : card
              ),
            }
          : list
      )
    );
    setSelectedCard(null); // Close modal
  };

  // Delete a specific card
  const handleDeleteCard = (listId, cardId) => {
    setLists((prevLists) =>
      prevLists.map((list) =>
        list.id === listId
          ? { ...list, cards: list.cards.filter((card) => card.id !== cardId) }
          : list
      )
    );
    setSelectedCard(null); // Close modal if open
  };

  // Add a new list
  const handleAddList = () => {
    if (!newListTitle.trim()) return;
    setLists([...lists, { id: `list-${Date.now()}`, title: newListTitle, cards: [] }]);
    setNewListTitle("");
  };

  // Rename a list
  const handleRenameList = (listId, newTitle) => {
    setLists((prevLists) =>
      prevLists.map((list) => (list.id === listId ? { ...list, title: newTitle } : list))
    );
  };

  // Add a new card to a list
  const handleAddCard = (listId, cardTitle) => {
    if (!cardTitle.trim()) return;
    setLists((prevLists) =>
      prevLists.map((list) =>
        list.id === listId
          ? {
              ...list,
              cards: [...list.cards, { id: `c${Date.now()}`, title: cardTitle, description: "" }]
            }
          : list
      )
    );
  };

  // Delete a list
  const handleDeleteList = (listId) => {
    setLists((prevLists) => prevLists.filter((list) => list.id !== listId));
  };

  // Drag-and-drop event handler
  const onDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination, type } = result;

    setLists((prevLists) => {
      const newLists = [...prevLists];

      if (type === "list") {
        // Handle list reordering
        const [movedList] = newLists.splice(source.index, 1);
        newLists.splice(destination.index, 0, movedList);
        return newLists;
      }

      if (type === "card") {
        // Handle card moving
        const sourceList = newLists.find((list) => list.id === source.droppableId);
        const destinationList = newLists.find((list) => list.id === destination.droppableId);

        if (!sourceList || !destinationList) return prevLists;

        const [movedCard] = sourceList.cards.splice(source.index, 1);
        destinationList.cards.splice(destination.index, 0, movedCard);

        return newLists;
      }

      return prevLists;
    });
  };

  return (
    <div className="board">
      <Header onResetBoard={() => setLists([])} />
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="board" direction="horizontal" type="list">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps} className="board">
              {lists.map((list, index) => (
                <Draggable key={list.id} draggableId={list.id} index={index}>
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.draggableProps} className="list-container">
                      <div {...provided.dragHandleProps}> {/* Drag handle applied to list */}
                        <List
                          list={list}
                          onAddCard={handleAddCard}
                          onDeleteList={handleDeleteList}
                          onDeleteCard={handleDeleteCard}
                          onCardClick={handleEditCard}
                          onRenameList={handleRenameList}
                        />
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
              <div className="new-list">
                <input
                  type="text"
                  placeholder="Enter list title"
                  value={newListTitle}
                  onChange={(e) => setNewListTitle(e.target.value)}
                />
                <button onClick={handleAddList}>➕ Add List</button>
              </div>
            </div>
          )}
        </Droppable>
      </DragDropContext>
      {selectedCard && (
        <CardModal
          card={selectedCard}
          onClose={() => setSelectedCard(null)}
          onSave={handleSaveCard}
          onDelete={() => handleDeleteCard(selectedCard.listId, selectedCard.id)} // ✅ Fixed incorrect argument order
        />
      )}
    </div>
  );
};

export default Board;
