import jwt from "jsonwebtoken";
const secretKey = "Darsh@123$";

export function setUser(user) {
  const payload = {
    _id: user._id,
    username: user.username,
    email: user.email,
  };
  return jwt.sign(payload, secretKey);
}

export function getUser(token) {
  if (!token) return null;
  return jwt.verify(token, secretKey);
}
