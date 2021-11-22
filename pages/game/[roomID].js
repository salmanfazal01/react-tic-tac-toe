import Router, { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import Board from "../../src/components/Board";
import { useFirestore } from "../../src/config/firebase";
import { GlobalContext } from "../../src/context/globalContext";
import {
  changeGameTurn,
  getGameRoom,
  updateGameBoard,
} from "../../src/utils/functions";

const Game = () => {
  const router = useRouter();
  const { roomID } = router.query;

  const [room, setRoom] = useState({});
  const [loading, setLoading] = useState(true);

  const { globalState } = useContext(GlobalContext);
  const { username, setGlobalState } = globalState;

  const db = useFirestore();

  useEffect(() => {
    if (roomID) {
      const _room = getGameRoom(roomID, (data) => {
        setRoom(data || {});
        setLoading(false);
      });

      return () => _room();
    }
  }, [db, roomID]);

  const updateBoard = (board) => {
    updateGameBoard(board, roomID);
  };

  const changeTurn = (turn) => {
    changeGameTurn(turn, roomID);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!loading && !room.id) {
    Router.push("/");
  }

  return (
    <div>
      Player One: {room.player_one} <br />
      Player Two: {room.player_two || "Waiting ..."} <br />
      <Board
        board={room.board}
        p1={room.player_one}
        p2={room.player_two}
        turn={room.turn}
        user={username}
        updateBoard={updateBoard}
        changeTurn={changeTurn}
      />
    </div>
  );
};

export default Game;
