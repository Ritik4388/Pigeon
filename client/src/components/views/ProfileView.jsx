import { Box, Container, Grid, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { getUser, updateUser } from "../../api/users";
import { isLoggedIn } from "../../helpers/authHelper";
import CommentBrowser from "../CommentBrowser";

import ErrorAlert from "../ErrorAlert";
import FindUsers from "../FindUsers";
import Loading from "../Loading";
import MobileProfile from "../MobileProfile";
import Navbar from "../Navbar";
import PostBrowser from "../PostBrowser";
import Profile from "../Profile";
import ProfileTabs from "../ProfileTabs";
import { useWindowWidth } from "../../helpers/widthHook";

const ProfileView = () => {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [tab, setTab] = useState("posts");
  const user = isLoggedIn();
  const [error, setError] = useState("");
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const fetchUser = async () => {
    setLoading(true);
    const data = await getUser(params);
    setLoading(false);
    if (data.error) {
      setError(data.error);
    } else {
      setProfile(data);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const content = e.target.content.value;

    await updateUser(user, { biography: content });

    setProfile({ ...profile, user: { ...profile.user, biography: content } });
    setEditing(false);
  };

  const handleEditing = () => {
    setEditing(!editing);
  };

  const handleMessage = () => {
    navigate("/messenger", { state: { user: profile.user } });
  };

  useEffect(() => {
    fetchUser();
  }, [location]);

  const validate = (content) => {
    let error = "";

    if (content.length > 250) {
      error = "Bio cannot be longer than 250 characters";
    }

    return error;
  };

  let tabs;
  if (profile) {
    tabs = {
      posts: (
        <PostBrowser
          profileUser={profile.user}
          contentType="posts"
          key="posts"
        />
      ),
      liked: (
        <PostBrowser
          profileUser={profile.user}
          contentType="liked"
          key="liked"
        />
      ),
      comments: <CommentBrowser profileUser={profile.user} />,
    };
  }

  const width = useWindowWidth();
  const mdScrn = width < 900;

  return (
    <>
      {mdScrn ? (
        <Container>
          <Navbar />
          <>
            <MobileProfile
              profile={profile}
              editing={editing}
              handleSubmit={handleSubmit}
              handleEditing={handleEditing}
              handleMessage={handleMessage}
              validate={validate}
            />
             {/* <Profile
              profile={profile}
              editing={editing}
              handleSubmit={handleSubmit}
              handleEditing={handleEditing}
              handleMessage={handleMessage}
              validate={validate}
            /> */}
            <Stack spacing={2}>
              {profile ? (
                <>
                  <ProfileTabs tab={tab} setTab={setTab} />
                  <Box sx={{ padding: { md: "100px 0px 0px 0px" } }}>
                    {tabs[tab]}
                  </Box>
                </>
              ) : (
                <Loading />
              )}
              {error && <ErrorAlert error={error} />}
            </Stack>
          </>
          <Stack spacing={2} sx={{marginBottom: "20px"}}>
            <FindUsers />
          </Stack>
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
            {
              <>
                <MobileProfile
                  profile={profile}
                  editing={editing}
                  handleSubmit={handleSubmit}
                  handleEditing={handleEditing}
                  handleMessage={handleMessage}
                  validate={validate}
                />
                <Stack spacing={2}>
                  {profile ? (
                    <>
                      <ProfileTabs tab={tab} setTab={setTab} />
                      <Box sx={{ padding: { md: "100px 0px 0px 0px" } }}>
                        {tabs[tab]}
                      </Box>
                    </>
                  ) : (
                    <Loading />
                  )}
                  {error && <ErrorAlert error={error} />}
                </Stack>
              </>
            }
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
            {
              <Stack spacing={2}>
                <Profile
                  profile={profile}
                  editing={editing}
                  handleSubmit={handleSubmit}
                  handleEditing={handleEditing}
                  handleMessage={handleMessage}
                  validate={validate}
                />

                <FindUsers />
              </Stack>
            }
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default ProfileView;
