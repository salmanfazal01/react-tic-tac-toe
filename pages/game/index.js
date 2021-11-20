import React, { useState } from "react";
import Board from "../../src/components/Board";

const Game = () => {
  const [history, setHistory] = useState([{ squares: Array(9).fill(null) }]);
  const [xTurn, setXTurn] = useState(true);

  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
      <div className="game-info">
        <div>{/* status */}</div>
        <ol>{/* TODO */}</ol>
      </div>
    </div>
  );
};

export default Game;
