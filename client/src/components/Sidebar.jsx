import { Stack } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { getPosts } from "../api/posts";
import { isLoggedIn } from "../helpers/authHelper";
import FindUsers from "./FindUsers";
import Footer from "./Footer";
import Loading from "./Loading";
import PostCard from "./PostCard";
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
