import { Box, Typography } from "@mui/material";
import React from "react";
import { BiArrowBack } from "react-icons/bi";
import { Link } from "react-router-dom";
import HorizontalStack from "./util/HorizontalStack";

const GoBack = () => {
  return (
    <HorizontalStack style={{ margin: "10px" }}>
      <Box
        component={Link}
        to="/"
        sx={{
          display: "flex",
          justifyContent: "Center",
          alignItems: "center",
          textDecoration: "none",
          color: "inherit",
        }}
      >
        {" "}
        <BiArrowBack size={25} />
      </Box>
      <Typography sx={{ mb: 2 }}>
        <Box
          component={Link}
          to="/"
          sx={{ textDecoration: "none", color: "inherit" }}
        >
          {" "}
          Go Back
        </Box>
      </Typography>
    </HorizontalStack>
  );
};

export default GoBack;
