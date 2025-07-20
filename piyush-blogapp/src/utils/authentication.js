const jwt = require("jsonwebtoken");

const jwtSecretKey = "D@rsh@n@17";

function createTokenForUser(user) {
  const payload = {
    _id: user._id,
    fullName: user.fullName,
    email: user.email,
    profileImageURL: user.profileImageURL,
    role: user.role,
  };

  const token = jwt.sign(payload, jwtSecretKey);

  //  console.log("createTokenForUser : token = ", token);

  return token;
}

function validateUserToken(token) {
  const tokenResp = jwt.verify(token, jwtSecretKey);
  return tokenResp;
}

module.exports = { createTokenForUser, validateUserToken };
