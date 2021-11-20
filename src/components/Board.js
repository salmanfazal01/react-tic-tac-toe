import React, { useEffect, useState } from "react";
import { calculateWinner } from "../utils/game";
import Square from "./Square";

const DEFAULT_SQUARES = Array(9).fill(null);

const Board = () => {
  const [squares, setSquares] = useState(DEFAULT_SQUARES);
  const [xTurn, setXTurn] = useState(true);
  const [winner, setWinner] = useState(false);

  useEffect(() => {
    const _winner = calculateWinner(squares);
    if (_winner) setWinner(_winner);
  }, [squares]);

  const clearBoard = () => {
    setSquares(DEFAULT_SQUARES);
    setXTurn(true);
  };

  const handleClick = (i) => {
    const _squares = squares.slice();
    if (_squares[i] || calculateWinner(_squares)) return;

    _squares[i] = xTurn ? "X" : "O";

    setSquares(_squares);
    setXTurn(!xTurn);
  };

  const renderSquare = (i) => (
    <Square value={squares[i]} handleClick={() => handleClick(i)} />
  );

  const status =
    winner !== false
      ? `Winner: ${winner}`
      : `Next Player is ${xTurn ? "X" : "O"}`;

  return (
    <div>
      <div className="status">{status}</div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      <button onClick={() => clearBoard()}>Clear The Board</button>
    </div>
  );
};

export default Board;
