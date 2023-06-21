import { Stack } from "@mui/material";
import React from "react";

const HorizontalStack = (props) => {
  return (
    <Stack direction="row" alignItems="center" sx={{cursor:"pointer"}} spacing={1} {...props}>
      {props.children}
    </Stack>
  );
};

export default HorizontalStack;
