import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config("");
import connectDB from "./db/connect.js";

import notFoundMiddleWare from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";

import authRouter from "./routers/authRouter.js";
import userRouter from "./routers/userRouter.js";
import postRouter from "./routers/postRouter.js";

app.use(express.json());

//middleware
app.get("/", (req, res) => {
  res.send("Welcome");
});
app.get("/home", (req, res) => {
  res.json({ msg: "it works" });
});
app.get("/api/v1", (req, res) => {
  res.json({ msg: "API" });
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/post", postRouter);
app.use(notFoundMiddleWare);
app.use(errorHandlerMiddleware);
const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => {
      `Server is listening at Port : ${port}`;
    });
  } catch (error) {
    error;
  }
};

start();
