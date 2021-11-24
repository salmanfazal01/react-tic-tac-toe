import { Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { DEFAULT_BOARD } from "../utils/functions";
import { calculateWinner } from "../utils/game";
import Square from "./Square";

const Board = (props) => {
  const {
    board = DEFAULT_BOARD,
    p1,
    p2,
    turn,
    user,
    game_over,
    updateBoard,
    changeTurn,
    newGame,
  } = props;

  const [winner, setWinner] = useState(null);

  useEffect(() => {
    const _winner = calculateWinner(board);
    if (_winner?.player) {
      setWinner(_winner);
    } else {
      setWinner(null);
    }
  }, [board]);

  const handleClick = (i, e) => {
    e.preventDefault();
    
    if (board[i] || turn !== user || game_over) return;

    const _squares = board.slice();

    _squares[i] = turn === p1 ? "X" : "O";

    changeTurn(turn === p1 ? p2 : p1);
    updateBoard(_squares);
  };

  const renderSquare = (i) => (
    <Square
      value={board[i]}
      handleClick={(e) => handleClick(i, e)}
      idx={i}
      winner={winner?.squares?.includes(i)}
    />
  );

  const status =
    winner !== false ? `Winner: ${winner}` : `Next Player is ${turn}`;

  return (
    <Stack
      container
      justifyContent="center"
      alignItems="center"
      sx={{
        padding: 2,
        height: "70vh",
        width: "100%",
        maxWidth: 800,
        borderRadius: 20,
        border: "3px dashed white",
      }}
    >
      {/* <div className="status">{status}</div> */}
      <Stack direction="row" sx={{ flex: 1, width: "100%" }}>
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </Stack>
      <Stack direction="row" sx={{ flex: 1, width: "100%" }}>
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </Stack>
      <Stack direction="row" sx={{ flex: 1, width: "100%" }}>
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </Stack>
      {winner?.player && (
        <button
          onClick={() => {
            newGame();
            setWinner(false);
          }}
        >
          Clear The Board
        </button>
      )}
    </Stack>
  );
};

export default Board;
