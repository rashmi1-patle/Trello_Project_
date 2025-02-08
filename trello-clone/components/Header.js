import React from "react";

const Header = ({ onResetBoard }) => {
  return (
    <header className="header">
      <h1>Trello Board</h1>
      <button onClick={onResetBoard}>Reset Board</button> 
    </header>
  );
};

export default Header;
