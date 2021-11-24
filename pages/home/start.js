/* eslint-disable @next/next/no-img-element */
import { Box, Container, Stack, TextField, Typography } from "@mui/material";
import Router from "next/router";
import { useContext, useState } from "react";
import Logo from "../../src/assets/images/logo.png";
import CustomButton from "../../src/components/CustomButton";
import { GlobalContext } from "../../src/context/globalContext";
import { createRoom, joinRoom } from "../../src/utils/functions";

const NEW_GAME_OBJ = {
  board: [0, 0, 0, 0, 0, 0, 0, 0, 0],
  winner: null,
  draw: false,
  player_one: null,
  player_two: null,
  turn: null,
};

const Home = () => {
  const { globalState, setGlobalState } = useContext(GlobalContext);

  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState(globalState.username || "");
  const [code, setCode] = useState("");
  const [mode, setMode] = useState("create");

  const handleNewRoomClick = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let { roomID } = await createRoom({
        ...NEW_GAME_OBJ,
        player_one: username,
        turn: username,
        first_turn: username,
      });
      await setGlobalState({ username: username });
      Router.push(`/game/${roomID}`);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const handleJoinRoomClick = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let response = await joinRoom(code, username);
      await setGlobalState({ username: username });
      Router.push(`/game/${response.roomID}`);
    } catch (error) {
      console.log(error);
      console.log("No such room! Please enter a valid Room ID");
    }
    setLoading(false);
  };

  return (
    <Container maxWidth="xl" sx={{ py: 3, height: "100vh" }}>
      <form
        onSubmit={mode === "create" ? handleNewRoomClick : handleJoinRoomClick}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ height: 130 }}
        >
          <Box sx={{ p: 2, border: "2px dashed grey", borderRadius: 3 }}>
            <img
              src={Logo}
              alt="Logo"
              style={{ width: 80, objectFit: "contain" }}
            />
          </Box>

          <Typography variant="h5" sx={{ flex: 1, fontWeight: 700 }}>
            Enter your name and select your game type
          </Typography>
        </Stack>

        <Stack
          justifyContent="center"
          alignItems="center"
          sx={{ height: "calc(100vh - 178px)" }}
        >
          <Container maxWidth="sm" sx={{ mb: 5 }}>
            <Typography sx={{ mb: 1, ml: 1 }}>Your Username</Typography>
            <TextField
              placeholder="Your Username"
              value={username}
              onChange={(e) => setUsername(e.target.value || "")}
              fullWidth
              variant="outlined"
              required
              inputProps={{
                maxLength: 10,
                sx: {
                  px: 4,
                  fontSize: 20,
                },
              }}
              sx={{
                mb: 5,
                [`& fieldset`]: {
                  borderRadius: 15,
                  padding: "0 20px",
                },
              }}
            />

            <Typography sx={{ mb: 1, ml: 1 }}>Game type</Typography>
            <Stack direction="row" spacing={2} sx={{ mb: 5 }}>
              <CustomButton
                onClick={() => setMode("create")}
                background={
                  mode === "create"
                    ? "linear-gradient(45deg, rgba(62,1,133,1) 0%, rgba(81,8,202,1) 100%)"
                    : "transparent"
                }
                fullWidth
                sx={{
                  flex: 1,
                  fontSize: 18,
                  border: `3px solid ${
                    mode === "create" ? "white" : "transparent"
                  }`,
                }}
              >
                Create Game
              </CustomButton>
              <CustomButton
                onClick={() => setMode("join")}
                background={
                  mode === "join"
                    ? "linear-gradient(45deg, rgba(62,1,133,1) 0%, rgba(81,8,202,1) 100%)"
                    : "transparent"
                }
                fullWidth
                sx={{
                  flex: 1,
                  fontSize: 18,
                  border: `3px solid ${
                    mode === "join" ? "white" : "transparent"
                  }`,
                }}
              >
                Join Game
              </CustomButton>
            </Stack>

            {mode === "join" && (
              <>
                <Typography sx={{ mb: 1, ml: 1 }}>Game Code</Typography>
                <TextField
                  placeholder="Code"
                  value={code}
                  onChange={(e) => setCode(e.target.value || "")}
                  fullWidth
                  required
                  variant="outlined"
                  inputProps={{
                    maxLength: 15,
                    sx: {
                      px: 4,
                      fontSize: 20,
                    },
                  }}
                  sx={{
                    mb: 5,
                    [`& fieldset`]: {
                      borderRadius: 15,
                      padding: "0 20px",
                    },
                  }}
                />
              </>
            )}
          </Container>

          <CustomButton type="submit">Next</CustomButton>
        </Stack>

        {/* <Button onClick={handleNewRoomClick}>Create Room</Button>
        <Button onClick={handleJoinRoomClick}>Join Room</Button> */}
      </form>
    </Container>
  );
};

export default Home;
