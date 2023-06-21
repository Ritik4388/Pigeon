import { Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import pigeonLogo from "../assests/favicon-2.png";
import HorizontalStack from "./util/HorizontalStack";

const Copyright = () => {
  const date = new Date().getFullYear();
  return (
    <HorizontalStack>
      <Typography variant="subtitle1" color="text.secondary">
        Copyright © {date}{" "}
      </Typography>
      <HorizontalStack>
        <Link to="/" color="inherit">
          Pigeon{" "}
        </Link>
        <img src={pigeonLogo} alt="pigeon" />
      </HorizontalStack>
    </HorizontalStack>
  );
};

export default Copyright;
