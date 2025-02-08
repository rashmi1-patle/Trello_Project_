// pages/index.js
import { useState } from 'react';
// import Header from '../components/Header';
import Board from '../components/Board';
import Footer from '../components/Footer';

const Home = () => {
  // Initialize state with empty lists and cards
  const [lists, setLists] = useState([
    { id: 1, title: 'List 1', cards: [{ id: 1, title: 'Card 1' }, { id: 2, title: 'Card 2' }] },
    { id: 2, title: 'List 2', cards: [{ id: 3, title: 'Card 3' }] },
  ]);

 

  return (
    <div className="container">
      {/* <Header onResetBoard={handleResetBoard} /> */}
      <Board lists={lists} />
      <Footer />
    </div>
  );
};

export default Home;
