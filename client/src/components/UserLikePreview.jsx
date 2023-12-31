import { Avatar, AvatarGroup, Button } from "@mui/material";
import React, { useState } from "react";
import HorizontalStack from "./util/HorizontalStack";
import { AiFillLike } from "react-icons/ai";
import UserLikeModal from "./UserLikeModal";

const UserLikePreview = ({ postId, userLikePreview }) => {
  const [open, setOpen] = useState(false);

  const handleClick = (event) => {
    event.stopPropagation();
    setOpen(true);
  };

  let userLikes;
  if (userLikePreview) {
    userLikes = userLikePreview.slice(0, 3);
  }

  return (
    userLikes && (
      <>
        <Button
          variant="filled"
          size="small"
          startIcon={<AiFillLike />}
          color="primary"
          onClick={handleClick}
        >
          <HorizontalStack>
            <AvatarGroup>
              {userLikes &&
                userLikes.map((userLike) => (
                  <Avatar
                    key={userLike?._id}
                    src={
                      "https://api.dicebear.com/6.x/adventurer/svg?seed=" +
                      userLike?.username
                    }
                    sx={{ backgroundColor: "lightgray", width: 30, height: 30 }}
                  />
                ))}
            </AvatarGroup>
          </HorizontalStack>
        </Button>
        {open && (
          <UserLikeModal open={open} setOpen={setOpen} postId={postId} />
        )}
      </>
    )
  );
};

export default UserLikePreview;
