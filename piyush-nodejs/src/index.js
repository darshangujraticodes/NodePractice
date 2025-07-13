import express from "express";
import dotenv from "dotenv";
import { connectMongoDb } from "../src/connection/connection.js";
import userRouter from "../src/routes/user.routes.js";
import { logReqRes } from "./middlewares/index.js";

dotenv.config({
  path: "./env",
});

const app = express();
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log("Server is Listening on port : ", PORT);
});

// mongodb connection
try {
  connectMongoDb("mongodb://127.0.0.1:27017/youtube-app").then(() => {
    console.log("MongoDB Connected !");
  });
} catch (error) {
  console.log("MongoDB Connection Error !", error);
}

// middlewares

app.use(logReqRes("ServerRequestLogs.txt"));
app.use(express.urlencoded({ extended: false }));

// routes
app.use("/api/users", userRouter);
