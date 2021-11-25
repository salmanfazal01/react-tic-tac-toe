/* eslint-disable @next/next/no-img-element */
import {
  Alert,
  Checkbox,
  Container,
  Hidden,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Router from "next/router";
import { useContext, useState } from "react";
import CustomButton from "../../src/components/CustomButton";
import LogoButton from "../../src/components/LogoButton";
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
  const [error, setError] = useState(null);
  const { globalState, setGlobalState } = useContext(GlobalContext);

  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState(globalState.username || "");
  const [code, setCode] = useState("");
  const [playRandom, setPlayRandom] = useState(false);
  const [mode, setMode] = useState("create");

  const _username = username.toUpperCase();

  const handleNewRoomClick = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let { roomID } = await createRoom({
        ...NEW_GAME_OBJ,
        player_one: _username,
        turn: _username,
        first_turn: _username,
        random: playRandom,
      });
      await setGlobalState({ username: _username });
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
      let response = await joinRoom(code, _username);
      await setGlobalState({ username: response.username });
      Router.push(`/game/${response.roomID}`);
    } catch (err) {
      setError(err);
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
          spacing={3}
        >
          <LogoButton />

          <Hidden mdUp>
            <Typography variant="h5" sx={{ flex: 1, fontWeight: 700 }}>
              Enter your name and select your game type
            </Typography>
          </Hidden>
        </Stack>

        <Stack
          justifyContent="center"
          alignItems="center"
          sx={{ height: "calc(100vh - 178px)" }}
        >
          <Container maxWidth="sm" sx={{ mb: 5 }}>
            <Hidden mdDown>
              <Typography variant="h5" sx={{ flex: 1, fontWeight: 700, mb: 5 }}>
                Enter your name and select your game type
              </Typography>
            </Hidden>

            <Typography sx={{ mb: 1.5, ml: 1 }}>Your Username</Typography>
            <TextField
              placeholder="Your Username"
              value={_username}
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

            <Typography sx={{ mb: 1.5, ml: 1 }}>Game type</Typography>
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

            {mode === "join" ? (
              <>
                <Typography sx={{ mb: 1.5, ml: 1 }}>Game Code</Typography>
                <TextField
                  placeholder="Leave empty for a random opponent"
                  value={code}
                  onChange={(e) => setCode(e.target.value || "")}
                  fullWidth
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
            ) : (
              <Stack direction="row" alignItems="center">
                <Checkbox
                  checked={playRandom}
                  onChange={(_, v) => setPlayRandom(v)}
                  sx={{ mr: 2 }}
                />
                <Typography variant="h6">
                  Play against a random opponent?
                </Typography>
              </Stack>
            )}
          </Container>

          <CustomButton type="submit">Next</CustomButton>
        </Stack>
      </form>

      {error && (
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open
          autoHideDuration={4000}
          onClose={() => setError(null)}
        >
          <Alert
            onClose={() => setError(null)}
            severity="error"
            sx={{ maxWidth: 300 }}
          >
            {error.message}
          </Alert>
        </Snackbar>
      )}
    </Container>
  );
};

export default Home;
