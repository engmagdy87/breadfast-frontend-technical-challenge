import React from "react";
import { Box } from "@mui/material";

const Loader = () => {
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
    >
      <img
        src="breadfast.png"
        alt="Loading..."
        style={{ width: "70px", height: "auto" }}
      />
    </Box>
  );
};

export default Loader;
