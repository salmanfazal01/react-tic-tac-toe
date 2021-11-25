/* eslint-disable @next/next/no-img-element */
import { Typography, Box, Avatar, Stack, Grid } from "@mui/material";
import React from "react";

const PlayerCard = ({ player, user, username, wins = 0, xo, active }) => {
  return (
    <Box
      sx={(theme) => ({
        maxWidth: "150px",
        [theme.breakpoints.up("md")]: { marginTop: -7 },
      })}
    >
      {active ? (
        <Typography
          variant="h6"
          sx={{ mb: 4, fontWeight: 700, textAlign: "center" }}
        >
          {user === username ? "Your Turn" : "Their Turn"}
        </Typography>
      ) : (
        <Box sx={{ height: 63 }} />
      )}

      <Box
        sx={{
          mb: 1,
          p: 3,
          borderRadius: 9,
          backgroundColor: active ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)",
          width: 100,
        }}
      >
        <Stack alignItems="center" justifyContent="center">
          <Avatar
            sx={{
              width: 50,
              height: 50,
              border: "2px solid white",
              marginTop: -5,
              mb: 2,
            }}
          />
          <Typography variant="caption" sx={{ mb: 0.3 }}>
            {player}
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            {username}
          </Typography>
          <img src={xo} alt="XO" style={{ width: 40, objectFit: "contain" }} />
        </Stack>
      </Box>

      <Typography
        variant="h6"
        sx={{ textAlign: "center", fontWeight: 700, mb: 0.5 }}
      >
        - - - - - - - - - - - -
      </Typography>

      <Grid container spacing={2}>
        {Array(wins)
          .fill()
          .map((_, i) => (
            <Grid item key={i}>
              <Typography
                variant="h5"
                sx={{
                  textAlign: "center",
                  fontWeight: 700,
                  color: "rgba(255, 255, 255, 0.7)",
                }}
              >
                X
              </Typography>
            </Grid>
          ))}
      </Grid>
    </Box>
  );
};

export default PlayerCard;
