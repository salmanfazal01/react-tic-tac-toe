import React, { useEffect, useState } from "react";
import { calculateWinner } from "../utils/game";
import Square from "./Square";

const DEFAULT_BOARD = Array(9).fill(0);

const Board = (props) => {
  const {
    board = DEFAULT_BOARD,
    p1,
    p2,
    turn,
    user,
    updateBoard,
    changeTurn,
  } = props;

  const [winner, setWinner] = useState(false);

  const clearBoard = () => {
    updateBoard(DEFAULT_BOARD);
    setXTurn(true);
  };

  const handleClick = (i) => {
    const _squares = board.slice();
    const _winner = calculateWinner(board);
    console.log(_winner);
    if (_winner) {
      setWinner(_winner);
      return;
    }
    if (_squares[i] || turn !== user) return;

    _squares[i] = turn === p1 ? "X" : "O";

    changeTurn(turn === p1 ? p2 : p1);
    updateBoard(_squares);
  };

  console.log(turn, user, winner);

  const renderSquare = (i) => (
    <Square value={board[i]} handleClick={() => handleClick(i)} />
  );

  const status =
    winner !== false ? `Winner: ${winner}` : `Next Player is ${turn}`;

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
