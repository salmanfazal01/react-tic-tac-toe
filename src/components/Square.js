/* eslint-disable @next/next/no-img-element */
import { Button } from "@mui/material";
import React from "react";
import X from "../../src/assets/images/x.png";
import O from "../../src/assets/images/o.png";
import Tada from "react-reveal/Tada";
import Swing from "react-reveal/Swing";

const Square = ({ handleClick, value, idx, winner }) => {
  const getBorder = () => {
    switch (idx) {
      case 0:
        return {
          borderRight: "2px dashed grey",
          borderBottom: "2px dashed grey",
          borderTopLeftRadius: 64,
        };
      case 1:
        return {
          borderBottom: "2px dashed grey",
        };
      case 2:
        return {
          borderLeft: "2px dashed grey",
          borderBottom: "2px dashed grey",
          borderTopRightRadius: 64,
        };
      case 3:
        return {
          borderRight: "2px dashed grey",
          borderBottom: "2px dashed grey",
        };
      case 4:
        return {
          borderBottom: "2px dashed grey",
        };
      case 5:
        return {
          borderLeft: "2px dashed grey",
          borderBottom: "2px dashed grey",
        };
      case 6:
        return {
          borderRight: "2px dashed grey",
          borderBottomLeftRadius: 64,
        };
      case 8:
        return {
          borderLeft: "2px dashed grey",
          borderBottomRightRadius: 64,
        };

      default:
        return {};
    }
  };

  return (
    <Button
      fullWidth
      onClick={(e) => handleClick(e)}
      sx={{
        flex: 1,
        fontSize: 30,
        ...getBorder(),
        backgroundColor: winner && "#FFD652",
      }}
    >
      {value === "O" ? (
        <Tada>
          <img
            src={O}
            alt="O"
            style={{
              height: "100%",
              width: "100%",
              maxWidth: 120,
              objectFit: "contain",
            }}
          />
        </Tada>
      ) : value === "X" ? (
        <Swing>
          <img
            src={X}
            alt="X"
            style={{
              height: "100%",
              width: "100%",
              maxWidth: 120,
              objectFit: "contain",
            }}
          />
        </Swing>
      ) : null}
    </Button>
  );
};

export default Square;
