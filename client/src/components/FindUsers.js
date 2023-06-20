import {
  Avatar,
  Box,
  Card,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { MdRefresh } from "react-icons/md";
import { Link } from "react-router-dom";
import { getRandomUsers } from "../api/users";
import Loading from "./Loading";
import UserAvatar from "./UserAvatar";
import HorizontalStack from "./util/HorizontalStack";
import UserEntry from "./UserEntry";

const FindUsers = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState(null);

  const fetchUsers = async () => {
    setLoading(true);
    const data = await getRandomUsers({ size: 5 });
    setLoading(false);
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleClick = () => {
    fetchUsers();
  };

  return (
    <Card>
      <Stack spacing={2} >
        <HorizontalStack justifyContent="space-between">
          <HorizontalStack>
            <AiOutlineUser />
            <Typography>Find Others</Typography>
          </HorizontalStack>
          <IconButton
            sx={{ padding: 0 }}
            disabled={loading}
            onClick={handleClick}
          >
            <MdRefresh />
          </IconButton>
        </HorizontalStack>

        <Divider />
        <Box
          sx={{
            // overflowY: "scroll",
            maxHeight: "180px",
            "&::-webkit-scrollbar": {
              width: "0.25em",
              backgroundColor: "transparent",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "transparent",
              height: "20px",
            },
            overflowY: "auto",
            scrollbarWidth: "thin",
            scrollbarColor: "transparent transparent",
            scrollBehavior:"smooth"
          }}
        >
          {loading ? (
            <Loading />
          ) : (
            users &&
            users.map((user) => (
              <UserEntry username={user.username} key={user.username} />
            ))
          )}
        </Box>
      </Stack>
    </Card>
  );
};

export default FindUsers;
