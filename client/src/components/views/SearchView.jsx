import { Container, Grid, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import GoBack from "../GoBack";
import GridLayout from "../GridLayout";
import Navbar from "../Navbar";
import PostBrowser from "../PostBrowser";
import Sidebar from "../Sidebar";
import { useWindowWidth } from "../../helpers/widthHook";

const SearchView = () => {
  const width = useWindowWidth();
  const mdScrn = width < 900;
  return (
    <>
      {mdScrn ? (
        <Container>
          <Navbar />
          <PostBrowser createPost contentType="posts" />
          <Sidebar />
        </Container>
      ) : (
        <Grid container spacing={2}>
          <Grid
            item
            sx={{
              display: { xs: "none", md: "block" },
              position: { md: "fixed" },
            }}
            md={2}
          >
            <Navbar />
          </Grid>
          <Grid item xs={12} md={8} sx={{ margin: "0 auto 0 auto" }}>
            <Stack spacing={2} sx={{ padding: { md: "65px 0px 0px 0px" } }}>
              {/* <GoBack /> */}
              <PostBrowser createPost contentType="posts" />
            </Stack>
          </Grid>
          <Grid
            item
            md={2}
            sx={{
              display: { xs: "none", md: "block" },
              position: { md: "fixed" },
              right: { md: "0px" },
            }}
          >
            <Sidebar />
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default SearchView;
