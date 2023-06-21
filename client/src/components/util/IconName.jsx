import { Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
import React from "react";
import HorizontalStack from "./HorizontalStack";
import { Link } from "react-router-dom";

const IconName = ({ mobile, navbarWidth, name, to, children }) => {
  const theme = useTheme();
  return (
    <HorizontalStack
      component={Link}
      to={to}
      sx={{
        textDecoration: "none",
        color: "inherit",
        marginLeft: !mobile ? "35px" : "0px",
      }}
    >
      {children}
      {name ? (
        <Typography
          sx={{ display: mobile ? "none" : "block" }}
          variant={navbarWidth ? "h6" : "h5"}
          mr={1}
          color={theme.palette.primary.main}
        >
          {name && name}
        </Typography>
      ) : (
        <></>
      )}
    </HorizontalStack>
  );
};

export default IconName;
