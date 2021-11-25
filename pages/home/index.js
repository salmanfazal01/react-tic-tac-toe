/* eslint-disable @next/next/no-img-element */
import { Box, Container, Stack } from "@mui/material";
import Router from "next/router";
import React from "react";
import Fade from "react-reveal/Fade";
import RubberBand from "react-reveal/RubberBand";
import Logo from "../../src/assets/images/logo.png";
import CustomButton from "../../src/components/CustomButton";

const Home = () => {
  return (
    <Box sx={{ height: "100vh" }}>
      <Container sx={{ height: "100%" }}>
        <Stack
          alignItems="center"
          justifyContent="center"
          sx={{ height: "100%" }}
        >
          <RubberBand>
            <Box sx={{ mb: 4 }}>
              <img
                src={Logo}
                alt="Logo"
                style={{ maxWidth: 300, objectFit: "contain" }}
              />
            </Box>
          </RubberBand>

          <Fade left>
            <CustomButton
              sx={{ mb: 3 }}
              onClick={() => Router.push("/home/start")}
            >
              Multiplayer
            </CustomButton>
          </Fade>

          <Fade right>
            <CustomButton
              background="linear-gradient(45deg, rgba(62,1,133,1) 0%, rgba(81,8,202,1) 100%)"
              disabled
            >
              Local Multiplayer
            </CustomButton>
          </Fade>
        </Stack>
      </Container>
    </Box>
  );
};

export default Home;
