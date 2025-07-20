const express = require("express");
const {
  handleUserRegistration,
  handleUserLogin,
} = require("../controllers/user.controllers");
const userRouter = express.Router();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve("./public/uploads/"));
  },
  filename: function (req, file, cb) {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

userRouter
  .route("/login")
  .get((req, res) => {
    return res.render("login");
  })
  .post(handleUserLogin);

userRouter.route("/logout").get((req, res) => {
  res.clearCookie("userToken").redirect("/");
});

userRouter
  .route("/register")
  .get((req, res) => {
    return res.render("register");
  })
  .post(upload.single("profileImage"), handleUserRegistration);

module.exports = userRouter;
