import { BASE_URL } from "../config";

const getUserLikedPosts = async (likerId, token, query) => {
  try {
    const res = await fetch(
      BASE_URL +
        "api/posts/liked/" +
        likerId +
        "?" +
        new URLSearchParams(query),
      {
        headers: {
          "x-access-token": token,
          "Access-Control-Allow-Origin": BASE_URL,
        },
      }
    );
    return await res.json();
  } catch (err) {
    console.log(err);
  }
};

const getPosts = async (token, query) => {
  try {
    const res = await fetch(
      BASE_URL + "api/posts?" + new URLSearchParams(query),
      {
        headers: {
          "x-access-token": token,
          "Access-Control-Allow-Origin": BASE_URL,
        },
      }
    );
    return await res.json();
  } catch (err) {
    console.log(err);
  }
};

const getPost = async (postId, token) => {
  try {
    const res = await fetch(BASE_URL + "api/posts/" + postId, {
      headers: {
        "x-access-token": token,
        "Access-Control-Allow-Origin": BASE_URL,
      },
    });
    return await res.json();
  } catch (err) {
    console.log(err);
  }
};

const getUserLikes = async (postId, anchor) => {
  try {
    const res = await fetch(
      BASE_URL +
        "api/posts/like/" +
        postId +
        "/users?" +
        new URLSearchParams(
          {
            anchor,
          },
          {
            headers: {
              "Access-Control-Allow-Origin": BASE_URL,
            },
          }
        )
    );

    return await res.json();
  } catch (err) {
    console.log(err);
  }
};

const createPost = async (post, user) => {
  try {
    const res = await fetch(BASE_URL + "api/posts", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token": user.token,
        "Access-Control-Allow-Origin": BASE_URL,
      },
      body: JSON.stringify(post),
    });
    return await res.json();
  } catch (err) {
    console.log(err);
  }
};

const updatePost = async (postId, user, data) => {
  try {
    const res = await fetch(BASE_URL + "api/posts/" + postId, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token": user.token,
        "Access-Control-Allow-Origin": BASE_URL,
      },
      body: JSON.stringify(data),
    });
    return res.json();
  } catch (err) {
    console.log(err);
  }
};

const deletePost = async (postId, user) => {
  try {
    const res = await fetch(BASE_URL + "api/posts/" + postId, {
      method: "DELETE",
      headers: {
        "x-access-token": user.token,
        "Access-Control-Allow-Origin": BASE_URL,
        "Access-Control-Allow-Headers":
          "Origin, X-Requested-With, Content-Type, Accept, Z-Key",
        "Access-Control-Allow-Methods": "GET, HEAD, POST, PUT, DELETE, OPTIONS",
      },
    });
    return res.json();
  } catch (err) {
    console.log("delete post Error from api/posts line 130", err);
  }
};

const getComments = async (params) => {
  try {
    const { id } = params;
    const res = await fetch(BASE_URL + "api/comments/post/" + id, {
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": BASE_URL,
      },
    });
    const comments = res.json();
    // console.log(comments);
    return comments;
  } catch (err) {
    console.log(err);
  }
};

const getUserComments = async (params) => {
  try {
    const { id, query } = params;
    const res = await fetch(
      BASE_URL + "api/comments/user/" + id + "?" + new URLSearchParams(query),
      {
        headers: {
          "Access-Control-Allow-Origin": BASE_URL,
        },
      }
    );
    return res.json();
  } catch (err) {
    console.log(err);
  }
};

const createComment = async (comment, params, user) => {
  try {
    const { id } = params;
    const res = await fetch(BASE_URL + "api/comments/" + id, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token": user.token,
        "Access-Control-Allow-Origin": BASE_URL,
      },
      body: JSON.stringify(comment),
    });
    return res.json();
  } catch (err) {
    console.log(err);
  }
};

const updateComment = async (commentId, user, data) => {
  try {
    const res = await fetch(BASE_URL + "api/comments/" + commentId, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token": user.token,
        "Access-Control-Allow-Origin": BASE_URL,
      },
      body: JSON.stringify(data),
    });
    return res.json();
  } catch (err) {
    console.log(err);
  }
};

const deleteComment = async (commentId, user) => {
  try {
    const res = await fetch(BASE_URL + "api/comments/" + commentId, {
      method: "DELETE",
      headers: {
        "x-access-token": user.token,
        "Access-Control-Allow-Origin": BASE_URL,
      },
    });
    return res.json();
  } catch (err) {
    console.log(err);
  }
};

const likePost = async (postId, user) => {
  try {
    const res = await fetch(BASE_URL + "api/posts/like/" + postId, {
      method: "POST",
      headers: {
        "x-access-token": user.token,
        "Access-Control-Allow-Origin": BASE_URL,
      },
    });
    return res.json();
  } catch (err) {
    console.log(err);
  }
};

const unlikePost = async (postId, user) => {
  try {
    const res = await fetch(BASE_URL + "api/posts/like/" + postId, {
      method: "DELETE",
      headers: {
        "x-access-token": user.token,
        "Access-Control-Allow-Origin": BASE_URL,
      },
    });
    return res.json();
  } catch (err) {
    console.log(err);
  }
};

export {
  getPost,
  createPost,
  updatePost,
  deletePost,
  getPosts,
  getUserComments,
  getUserLikedPosts,
  getComments,
  createComment,
  deleteComment,
  updateComment,
  likePost,
  unlikePost,
  getUserLikes,
};
