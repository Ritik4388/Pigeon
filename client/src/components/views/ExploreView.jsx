import { Box, Container, Grid } from "@mui/material";
import React from "react";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import PostBrowser from "../PostBrowser";
import { useWindowWidth } from "../../helpers/widthHook";

const ExploreView = () => {
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
            <Box sx={{ padding: { md: "65px 0px 0px 0px" } }}>
              <PostBrowser createPost contentType="posts" />
            </Box>
          </Grid>
          <Grid
            item
            md={2}
            sx={{
              display: { xs: "none", md: "block" },
              position: { md: "fixed" },
              right: { md: "0px" },
              // overflowY:{md: "auto"}
              // zIndex:"20"
            }}
          >
            <Sidebar />
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default ExploreView;
