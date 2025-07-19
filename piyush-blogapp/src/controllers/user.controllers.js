const User = require("../models/user.models.js");

async function handleUserRegistration(req, res) {
  try {
    const { fullName, email, password } = req.body;

    const dbResp = await User.create({
      fullName,
      email,
      password,
    });

    console.log(dbResp);

    return res.redirect("/");
  } catch (error) {
    console.log("handleUserRegistration error :", error);
  }
}

async function handleUserLogin(req, res) {
  try {
    // here we have implement mongoose virtual functions
    const { email, password } = req.body;

    const user = await User.matchPassword(email, password);

    if (!user || !user.fullName) {
      throw new Error("Invalid credentials");
    }

    console.log("fetch user = ", user);

    return res.redirect("/");
  } catch (error) {
    console.log("handleUserLogin error :", error.message);

    return res.status(404).json({ execution: "Failed", error: error.message });
  }
}

module.exports = {
  handleUserRegistration,
  handleUserLogin,
};
