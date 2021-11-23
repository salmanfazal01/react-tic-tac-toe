import React from "react";
import { Button } from "@mui/material";

const CustomButton = ({
  children,
  sx,
  background = "linear-gradient(45deg, rgba(230,29,116,1) 0%, rgba(141,80,235,1) 100%)",
  ...props
}) => {
  return (
    <Button
      disableElevation
      variant="contained"
      fullWidth={true}
      sx={{
        textTransform: "inherit",
        color: "#fff",
        maxWidth: 300,
        borderRadius: 30,
        padding: "8px 24px",
        fontSize: 22,
        fontWeight: 700,
        border: "3px dashed transparent",
        background: background,
        "&:hover": {
          outline: "none",
          borderSpacing: 20,
          border: "3px dashed white",
        },
        ...sx,
      }}
      style={{
        backgroundClip: "padding-box",
      }}
      {...props}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
