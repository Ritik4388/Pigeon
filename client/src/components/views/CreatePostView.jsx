import { Container, Grid } from "@mui/material";
import React from "react";
import GoBack from "../GoBack";
import GridLayout from "../GridLayout";
import Navbar from "../Navbar";
import PostEditor from "../PostEditor";
import Sidebar from "../Sidebar";
import { useWindowWidth } from "../../helpers/widthHook";

const CreatePostView = () => {
  const width = useWindowWidth();
  const mobile = width < 500;
  return (
    <>
      {mobile ? (
        <Container>
          <Navbar />
          <GoBack />
          <GridLayout left={<PostEditor />} right={<Sidebar />} />
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
            <GoBack />
            <PostEditor />
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

export default CreatePostView;
