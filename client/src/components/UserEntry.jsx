import React from "react";
import HorizontalStack from "./util/HorizontalStack";
import UserAvatar from "./UserAvatar";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import theme from "../theme";

const UserEntry = ({ username }) => {
  return (
    <Box
      component={Link}
      to={"/users/" + username}
      sx={{ textDecoration: "none", color: "inherit"}}
    >
      <HorizontalStack key={username} sx={{marginBottom: "15px"}}  >
        <UserAvatar width={35} height={35} username={username} />
        <Typography fontSize={20} color={theme.palette.secondary.main}>{username}</Typography>
      </HorizontalStack>
    </Box>
  );
};

export default UserEntry;
