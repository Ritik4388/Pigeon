import { Container, Grid, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import GoBack from "../GoBack";
import Loading from "../Loading";
import Navbar from "../Navbar";
import PostCard from "../PostCard";
import Sidebar from "../Sidebar";
import { useParams } from "react-router-dom";
import { getPost } from "../../api/posts";
import Comments from "../Comments";
import ErrorAlert from "../ErrorAlert";
import { isLoggedIn } from "../../helpers/authHelper";
import { useWindowWidth } from "../../helpers/widthHook";

const PostView = () => {
  const params = useParams();

  const [post, setPost] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const user = isLoggedIn();

  const fetchPost = async () => {
    setLoading(true);
    const data = await getPost(params.id, user && user.token);
    if (data.error) {
      setError(data.error);
    } else {
      setPost(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPost();
  }, [params.id]);

  const width = useWindowWidth();
  const mdScrn = width < 900;

  return (
    <>
      {mdScrn ? (
        <Container>
          <Navbar />
          <GoBack />
          {loading ? (
            <Loading />
          ) : post ? (
            <Stack spacing={2}>
              <PostCard post={post} key={post._id} />

              <Comments />
            </Stack>
          ) : (
            error && <ErrorAlert error={error} />
          )}
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
            <GoBack />
            {loading ? (
              <Loading />
            ) : post ? (
              <Stack spacing={2}>
                <PostCard post={post} key={post._id} />

                <Comments />
              </Stack>
            ) : (
              error && <ErrorAlert error={error} />
            )}
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

export default PostView;
