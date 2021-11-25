/* eslint-disable @next/next/no-img-element */
import { Box, Container, Grid, Hidden, Stack } from "@mui/material";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import O from "../../src/assets/images/o.png";
import X from "../../src/assets/images/x.png";
import Board from "../../src/components/Board";
import LogoButton from "../../src/components/LogoButton";
import PlayerCard from "../../src/components/PlayerCard";
import { useFirestore } from "../../src/config/firebase";
import { GlobalContext } from "../../src/context/globalContext";
import {
  changeGameTurn,
  getGameRoom,
  setNewGame,
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
    updateGameBoard(board, roomID, room);
  };

  const changeTurn = (turn) => {
    changeGameTurn(turn, roomID);
  };

  const updateWinner = (winner) => {
    updateGameWinner(winner.player, roomID, room);
  };

  const newGame = () => {
    const first_turn =
      room.first_turn === room.player_one ? room.player_two : room.player_one;

    setNewGame(roomID, first_turn);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!loading && !room.id) {
    Router.push("/");
  }

  return (
    <Container maxWidth="xl" sx={{ py: 3, height: "100vh" }}>
      <Hidden mdDown>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{
            height: 130,
            width: "fit-content",
          }}
        >
          <LogoButton />
        </Stack>
      </Hidden>

      <Grid
        container
        spacing={5}
        justifyContent="space-around"
        alignItems="center"
        sx={(theme) => ({
          [theme.breakpoints.up("md")]: {
            mt: -12,
          },
        })}
      >
        <Hidden mdDown>
          <Grid item md={2}>
            <Stack alignItems="center">
              <PlayerCard
                player="Player 1"
                user={username}
                username={room.player_one}
                wins={room.player_one_wins}
                xo={X}
                active={room.turn === room.player_one}
              />
            </Stack>
          </Grid>
        </Hidden>

        <Grid item xs={12} md={8}>
          <Stack alignItems="center" sx={{ p: 3 }}>
            <Board
              board={room.board}
              p1={room.player_one}
              p2={room.player_two}
              turn={room.turn}
              user={username}
              game_over={room.game_over}
              updateBoard={updateBoard}
              changeTurn={changeTurn}
              updateWinner={updateWinner}
              newGame={newGame}
            />
          </Stack>
        </Grid>

        <Hidden mdUp>
          <Grid item md={2}>
            <Stack alignItems="center">
              <PlayerCard
                player="Player 1"
                user={username}
                username={room.player_one}
                wins={room.player_one_wins}
                xo={X}
                active={room.turn === room.player_one}
              />
            </Stack>
          </Grid>
        </Hidden>

        <Grid item md={2}>
          <Stack>
            <PlayerCard
              player="Player 2"
              user={username}
              username={room.player_two || "Waiting..."}
              wins={room.player_two_wins}
              xo={O}
              active={room.turn === room.player_two}
            />
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Game;
