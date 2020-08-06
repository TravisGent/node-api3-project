const express = require("express");
const server = express();

const serverJS = require("./server.js");
const userRouter = require("./users/userRouter.js");
const postRouter = require("./posts/postRouter.js");

server.use(express.json());

server.use("/api", serverJS);
server.use("/api/users", userRouter);
server.use("/api/posts", postRouter);

const PORT = 8000;
server.listen(PORT, () => console.log(`Server is Running on port http://localhost:${PORT}`));