import { Stack } from "@mui/material";
import React from "react";
import FindUsers from "./FindUsers";
import TopPosts from "./TopPosts";

const Sidebar = () => {
  return (
      <Stack spacing={2}    sx={{
        overflowY: "scroll",
        maxHeight: "90vh",
        "&::-webkit-scrollbar": {
          width: "0.25em",
          backgroundColor: "transparent",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "transparent",
          height: "20px",
        },
        overflow: "auto",
        scrollbarWidth: "thin",
        scrollbarColor: "transparent transparent",
      }}>
        <TopPosts />
        <FindUsers />
        {/* <Footer /> */}
      </Stack>
  );
};

export default Sidebar;
