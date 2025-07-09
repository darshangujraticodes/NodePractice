import express from "express";
import { userInfo } from "./userInfo.js";

const app = express();

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log("Server is Listening on port :", port);
});

app.get("/", (req, res) => {
  res.send("Home Page");
});

app.get("/about", (req, res) => {
  res.send(`Hi ${req.query.name}`);
});

const userHtml = `

  ${userInfo
    .map(
      (user) => `
    <p>
    ${user.name} <br>
    ${user.email} <br>
    ${user.city} <br> 
    </p> `
    )
    .join("")}  
`;

app.get("/users", (req, res) => {
  res.send(userHtml);
});

app.get("/api/users", (req, res) => {
  res.json(userInfo);
});
