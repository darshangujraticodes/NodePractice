const path = require("path");
const express = require("express");
const userRouter = require("./routes/user.routes.js");
const connectMongoDb = require("./connection/connection.js");

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

// routes

app.get("/", (req, res) => {
  res.render("home");
});

app.use("/user", userRouter);
