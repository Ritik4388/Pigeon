import { Avatar } from "@mui/material";
import React from "react";

const UserAvatar = ({ username, height, width }) => {
  return (
    <Avatar
      sx={{
        height: height,
        width: width,
        backgroundColor: "lightgray",
      }}
      src={"https://api.dicebear.com/6.x/adventurer/svg?seed=" + username}
    />
  );
};

export default UserAvatar;
