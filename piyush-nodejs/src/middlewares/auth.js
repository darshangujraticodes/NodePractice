import { getUser } from "../service/auth.js";

export async function restrictUserAccess(req, res, next) {
  const userUID = req.cookies?.uid;
  if (!userUID) return res.redirect("/login");

  const user = getUser(userUID);
  if (!user) return res.redirect("/login");

  console.log("middleware execute complete");

  req.user = user;
  next();
}
