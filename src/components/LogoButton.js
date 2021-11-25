/* eslint-disable @next/next/no-img-element */
import { Box } from "@mui/material";
import React from "react";
import Logo from "../../src/assets/images/logo.png";
import Link from "next/link";

const LogoButton = () => {
  return (
    <Link href="/home" passHref>
      <Box
        sx={{
          p: 2,
          border: "2px dashed grey",
          borderRadius: 3,
          cursor: "pointer",
          "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.1)" },
        }}
      >
        <img
          src={Logo}
          alt="Logo"
          style={{ width: 80, objectFit: "contain" }}
        />
      </Box>
    </Link>
  );
};

export default LogoButton;
