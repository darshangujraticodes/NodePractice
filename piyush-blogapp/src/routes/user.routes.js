const express = require("express");
const {
  handleUserRegistration,
  handleUserLogin,
} = require("../controllers/user.controllers");
const userRouter = express.Router();

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
  .post(handleUserRegistration);

module.exports = userRouter;
