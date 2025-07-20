const User = require("../models/user.models.js");
const { createTokenForUser } = require("../utils/authentication.js");

async function handleUserRegistration(req, res) {
  let profileImagePath;
  if (!req.file) {
    profileImagePath = "/images/defaultBlogThumbnail.jpg";
  } else {
    profileImagePath = `/uploads/${req.file.filename}`;
  }

  try {
    const { fullName, email, password } = req.body;

    const dbResp = await User.create({
      fullName,
      email,
      password,
      profileImageURL: profileImagePath,
    });

    // console.log(dbResp);

    if (!dbResp.id) throw new Error("Database Server Error");

    return res.redirect("/");
  } catch (error) {
    console.log("User controller | handleUserRegistration error :", error);
  }
}

async function handleUserLogin(req, res) {
  try {
    const { email, password } = req.body;

    const user = await User.matchPassword(email, password);
    console.log("User controller | fetch user = ", user);

    if (!user || !user.fullName) {
      // Login failed
      return res.status(401).render("login", {
        error: "Incorrect Email or Password!",
      });
    }

    const token = createTokenForUser(user);
    console.log("User controller | createTokenForUser : ", token);

    res.cookie("userToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.redirect("/");
  } catch (error) {
    console.log("User controller | handleUserLogin error:", error.message);

    // ✅ Ensure we haven't already sent a response
    if (res.headersSent) {
      console.warn("Attempted to render after response sent");
      return;
    }

    return res.status(500).render("login", {
      error: "Something went wrong. Please try again.",
    });
  }
}

module.exports = {
  handleUserRegistration,
  handleUserLogin,
};
