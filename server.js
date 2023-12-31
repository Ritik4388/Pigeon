const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const app = express();
const { authSocket, socketServer } = require("./socketServer");
const posts = require("./routes/posts");
const users = require("./routes/users");
const comments = require("./routes/comments");
const messages = require("./routes/messages");
const PostLike = require("./models/PostLike");
const Post = require("./models/Post");

dotenv.config();

const corsOptions = {
  origin: [
    "http://localhost:3000",
    "http://localhost:4000",
    "https://pigeonx.netlify.app",
  ],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
};

app.use(cors(corsOptions));

// app.options("*", cors(corsOptions));

const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer, {
  cors: corsOptions,
});

io.use(authSocket);
io.on("connection", (socket) => socketServer(socket));

const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(
  MONGO_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("MongoDB connected");
  }
);

httpServer.listen(process.env.PORT || 4000, () => {
  console.log("Listening");
});

app.use(express.json());
app.use("/api/posts", posts);
app.use("/api/users", users);
app.use("/api/comments", comments);
app.use("/api/messages", messages);

if (process.env.NODE_ENV == "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}
