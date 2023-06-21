import { Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const Copyright = () => {
  const date = new Date().getFullYear();
  // console.log(date);
  return (
    <Typography variant="subtitle1" color="text.secondary">
      Copyright © {date}{" "}
      <Link to="/" color="inherit">
        Pigeon
      </Link>
    </Typography>
  );
};

export default Copyright;
