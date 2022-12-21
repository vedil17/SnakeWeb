import React, { useState } from 'react';
import './Styles/MainApp.scss';
import Header from './Components/Header';
import SnakeGame from './Components/SnakeGame';

function App() {

  const [score,setScore] = useState(0);

  return (
    <div className="main">
      <Header score={score}/>
      <SnakeGame setScore={setScore}></SnakeGame>
    </div>
  );
}

export default App;
