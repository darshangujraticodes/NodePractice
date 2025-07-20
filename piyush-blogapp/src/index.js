const path = require("path");
const express = require("express");
const userRouter = require("./routes/user.routes.js");
const connectMongoDb = require("./connection/connection.js");
const cookieParser = require("cookie-parser");
const {
  checkForUserCookieAuthentication,
} = require("./middlewares/userCookieAuthentication.js");
const blogRouter = require("./routes/blog.routes.js");

const app = express();
const PORT = 8000;

// mongodb connection
try {
  connectMongoDb("mongodb://127.0.0.1:27017/blogify").then(() => {
    console.log("MongoDB Connected !");
  });
} catch (error) {
  console.log("MongoDB Connection Error !", error);
}

// view engine
app.set("view engine", "ejs");
app.set("views", path.resolve("./src/views"));

app.listen(PORT, () => {
  console.log(`Server is listening on PORT ${PORT}`);
});

// middleware

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForUserCookieAuthentication("userToken"));

// routes

app.get("/", (req, res) => {
  res.render("home", {
    // req.user value is fetch from checkForUserCookieAuthentication() middleware
    user: req.user,
  });
});

app.use("/user", userRouter);
app.use("/blog", blogRouter);
