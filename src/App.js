import React from 'react';
import './Styles/MainApp.scss';
import Header from './Components/Header';
import SnakeGame from './Components/SnakeGame';

function App() {
  return (
    <div className="main">
      <Header/>
      <SnakeGame></SnakeGame>
    </div>
  );
}

export default App;
