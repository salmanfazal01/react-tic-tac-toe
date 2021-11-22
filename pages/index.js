import { Button } from "@mui/material";
import Router from "next/router";
import { useContext, useState } from "react";
import { GlobalContext } from "../src/context/globalContext";
import { createRoom, joinRoom } from "../src/utils/functions";

const NEW_GAME_OBJ = {
  board: [0, 0, 0, 0, 0, 0, 0, 0, 0],
  winner: null,
  draw: false,
  player_one: null,
  player_two: null,
  turn: null,
};

const Home = () => {
  const [loading, setLoading] = useState(false);

  const { globalState, setGlobalState } = useContext(GlobalContext);

  const player_one = "Salman";
  const player_two = "Kumayl";

  const handleNewRoomClick = async () => {
    setLoading(true);
    try {
      let { roomID } = await createRoom({
        ...NEW_GAME_OBJ,
        player_one: player_one,
        turn: player_one,
      });
      await setGlobalState({ username: player_one });
      Router.push(`/game/${roomID}`);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const handleJoinRoomClick = async () => {
    setLoading(true);
    try {
      let response = await joinRoom("1637545943029", player_two);
      await setGlobalState({ username: player_two });
      Router.push(`/game/${response.roomID}`);
    } catch (error) {
      console.log(error);
      console.log("No such room! Please enter a valid Room ID");
    }
    setLoading(false);
  };

  return (
    <div>
      <Button onClick={handleNewRoomClick}>Create Room</Button>
      <Button onClick={handleJoinRoomClick}>Join Room</Button>
    </div>
  );
};

export default Home;
