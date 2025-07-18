import express from "express";
import { User } from "../models/user.models.js";
import { getUser } from "../service/auth.js";
const router = express.Router();

router.route("/").get(async (req, res) => {
  try {
    const userUID = req.cookies.uid;
    if (!userUID) return res.redirect("/login");
    const user = getUser(userUID);
    if (!user) return res.redirect("/login");

    const allUserInfo = await User.find({});
    return res.render("home", {
      users: allUserInfo,
    });
  } catch (error) {
    console.log(error);

    return res.redirect("/login");
  }
});

router.get("/login", (req, res) => {
  return res.render("login");
});

export default router;
