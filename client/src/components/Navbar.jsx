import { useTheme } from "@emotion/react";
import {
  Avatar,
  IconButton,
  Stack,
  TextField,
  Typography,
  Button,
  InputAdornment,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import "react-icons/ai";
import "react-icons/ri";
import {
  AiFillFileText,
  AiFillHome,
  AiFillMessage,
  AiOutlineSearch,
} from "react-icons/ai";

import { ImSearch } from "react-icons/im";

import { GiWorld } from "react-icons/gi";
import { Link, useNavigate } from "react-router-dom";
import { isLoggedIn, logoutUser } from "../helpers/authHelper";
import UserAvatar from "./UserAvatar";
import HorizontalStack from "./util/HorizontalStack";
import { RiContrast2Line } from "react-icons/ri";
import IconName from "./util/IconName";
import { MdLogin, MdLogout, MdManageAccounts } from "react-icons/md";
import { useWindowWidth } from "../helpers/widthHook";
import pigeonLogo from "../assests/favicon-4.png";

const Navbar = () => {
  const navigate = useNavigate();
  const user = isLoggedIn();
  const theme = useTheme();
  const username = user && isLoggedIn().username;
  const [search, setSearch] = useState("");
  const [searchIcon, setSearchIcon] = useState(false);

  const width = useWindowWidth();
  const mobile = width < 500;
  const mdScrn = width < 900;
  const navbarWidth = width < 600;

  const handleLogout = async (e) => {
    logoutUser();
    navigate("/login");
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/search?" + new URLSearchParams({ search }));
  };

  const handleSearchIcon = (e) => {
    setSearchIcon(!searchIcon);
  };

  //////////////////////////////////////////////////
  return (
    <Stack mb={2}>
      <Stack
        direction={!mdScrn ? "column" : "row"}
        alignItems="center"
        justifyContent="space-between"
        sx={{
          pt: 2,
          pb: 0,
        }}
        spacing={!mdScrn ? 2 : 0}
      >
        <HorizontalStack onClick={() => navigate("/")}>
          {/* <GiWorld size={33} color={theme.palette.secondary.main} /> */}
          <img
            src={pigeonLogo}
            alt="Pigeon"
            color={theme.palette.secondary.main}
          />
          <Typography
            sx={{ display: mobile ? "none" : "block" }}
            variant={navbarWidth ? "h6" : "h4"}
            mr={1}
            color={theme.palette.secondary.main}
          >
            {/* <Link to="/" > */}
            Pigeon
            {/* </Link> */}
          </Typography>
        </HorizontalStack>

        <Stack
          direction={!mdScrn ? "column" : "row"}
          alignItems="flex-start"
          gap="16px"
        >
          {mdScrn ? (
            <IconButton onClick={handleSearchIcon}>
              <AiOutlineSearch />
            </IconButton>
          ) : (
            <HorizontalStack style={{ marginTop: "30px" }}>
              <IconButton onClick={handleSearchIcon}>
                <ImSearch />
              </IconButton>
              <Box component="form" onSubmit={handleSubmit}>
                <TextField
                  size="small"
                  label="Search for posts..."
                  onChange={handleChange}
                  value={search}
                  sx={{ width: "180px" }}
                />
              </Box>
            </HorizontalStack>
          )}

          <IconName
            mobile={mdScrn}
            navbarWidth={navbarWidth}
            name="Home"
            to="/"
          >
            <IconButton>
              <AiFillHome />
            </IconButton>
          </IconName>
          {user ? (
            <>
              <IconName
                mobile={mdScrn}
                navbarWidth={navbarWidth}
                name="Message"
                to="/messenger"
              >
                <IconButton>
                  <AiFillMessage />
                </IconButton>
              </IconName>

              <IconName
                mobile={mdScrn}
                navbarWidth={navbarWidth}
                name="Profile"
                to={`/users/${username}`}
              >
                <IconButton>
                  <UserAvatar width={30} height={30} username={user.username} />
                </IconButton>
              </IconName>

              <HorizontalStack
                sx={{
                  textDecoration: "none",
                  color: "inherit",
                  marginLeft: !mdScrn ? "35px" : "0px",
                  cursor: "pointer",
                }}
                onClick={handleLogout}
              >
                <IconButton>
                  <MdLogout />
                </IconButton>
                <Typography
                  sx={{ display: mdScrn ? "none" : "block" }}
                  variant={navbarWidth ? "h6" : "h5"}
                  mr={1}
                  color={theme.palette.primary.main}
                >
                  Logout
                </Typography>
              </HorizontalStack>
              {/* <Button onClick={handleLogout}>Logout</Button> */}
            </>
          ) : (
            <>
              <IconName
                mobile={mdScrn}
                navbarWidth={navbarWidth}
                name="Sign Up"
                to="/signup"
              >
                <IconButton>
                  <MdManageAccounts />
                </IconButton>
              </IconName>
              <IconName
                mobile={mdScrn}
                navbarWidth={navbarWidth}
                name="Login"
                to="/login"
              >
                <IconButton>
                  <MdLogin />
                </IconButton>
              </IconName>
            </>
          )}
        </Stack>
      </Stack>
      {mdScrn && searchIcon && (
        <Box component="form" onSubmit={handleSubmit} mt={2}>
          <TextField
            size="small"
            label="Search for posts..."
            fullWidth
            onChange={handleChange}
            value={search}
          />
        </Box>
      )}
    </Stack>
  );
};

export default Navbar;
