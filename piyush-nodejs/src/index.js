import express from "express";
import dotenv from "dotenv";
import { connectMongoDb } from "../src/connection/connection.js";
import userRouter from "../src/routes/user.routes.js";
import { logReqRes } from "./middlewares/index.js";
import path from "path";
import staticRouter from "./routes/staticRouter.js";
import cookieParser from "cookie-parser";
import { restrictUserAccess } from "./middlewares/auth.js";

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

// view engine setup
app.set("view engine", "ejs");
app.set("views", path.resolve("./src/views"));

// middlewares
app.use(express.json());
app.use(logReqRes("ServerRequestLogs.txt"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// routes
app.use("/", staticRouter);
app.use("/api/users", userRouter);

// ejs view routes
// app.get("/home", async (req, res) => {
//   const allUserInfo = await User.find({});

//   return res.render("home", {
//     users: allUserInfo,
//   });
// });
