import dotenv from "dotenv";
import { add, subtract } from "./importModule.js";
import fs from "fs";
import express from "express";
import url from "url";
import http from "http";

dotenv.config({
  path: "./env",
});

// modules

console.log("add = ", add(4, 5));

// -------------------------------------

const currentTime = new Date().toLocaleString();

// file management command

// asynchornous
// fs.writeFile("src/file/serverLogs.txt", "Server Request Log File", (err) => {
//   if (err) console.log("Error in file Creation !");
//   else console.log("File created and content added !");
// });

fs.readFile("src/file/serverLogs.txt", "utf-8", (err, result) => {
  if (err) {
    // console.log("Error ", err);
  } else {
    // console.log("File Read Content = ", result);
  }
});

fs.appendFile("src/file/serverLogs.txt", `\n ${currentTime}`, (err) => {
  if (err) console.log(err);
});

const port = process.env.PORT || 8000;

// app.listen(port, (err) => {
//   console.log("App is Running on Server =", port);
// });

// -------------------------------------

// http server

const server = http.createServer((req, res) => {
  const log = `${currentTime} | ${req.url} | New Request Recieved ! \n`;

  if (req.url !== "/favicon.ico") {
    fs.appendFile("src/file/serverLogs.txt", log, (err) => {
      if (err) console.log("Error = ", err);

      const myurl = url.parse(req.url, true);

      // console.log(myurl, myurl.query.name);

      switch (myurl.pathname) {
        case "/":
          res.end("Home Page");
          break;

        case "/about":
          res.end(`Hi, I am ${myurl.query.name}`);
          break;

        case "/search":
          let search = myurl.query.search;
          res.end(`Search Query ${search}`);
          break;

        default:
          res.end("404 Page Not Found!");
          break;
      }
    });
  }
});

server.listen(port, () => {
  console.log(` HTTP Server is Running on ${port}`);
});

// -------------------------------------------------------------------------

// http methods

/*

GET : This methods helps to fetch/get the data from the server eg Browser it performs GET methods

POST : This methods helps to send the data to the server

PUT : This method helps to upload the data on the server

DELETE : This Method helps to delete the data

PATCH : 

*/

// -------------------------------------------

// request methods

/*

GET /user : It will send the all user data in HTML Document foramt, it is called SSR (server side rendering)
GET /api/user :  It will send the all user data in api json format, it is called CSR (client side rendering) 
GET /api/user/1 :  




*/

// -------------------------------------------

// versioning

/*
Versioning can be view through package json file
it is segragated in 3 types

 "dependencies": {
    "dotenv": "^16.5.0",
    "express": "^5.1.0",
    "mongoose": "^8.15.1",
    "url": "^0.11.4"
  },

  mongoose : ^8.15.1 (^ - denote caret symbol) it is fixed version system

  this version can make or break your system

  1] 1 (right most value) : patch update (optional update)
  2] 15 (center value) : minor update it can be bug fix update or new added feature update.
  3] 8 (left most value) : Major release , it should not be updated... it is one of the major and breaking update 
  4] ^ : it denotes if new changes are rolled out in recommended or minor it will upadte automatically but it will not update major release lib, this (^) symbol will only update minor and patch updates. 
  5] ~ : It denotes if there are new changes in patch update, it will update but note it will only update patch updates.

*/

// Restfull API

/*

It is a type of API which has industry standard rules, which it follows 

1] It follows "server client architechture" in this (client send api request to server and server send api resources to client.)
server and client are 2 different entity and they are not dependent on each other. 
response can be image, json data, html etc.
When server sends html data to client : called SSR 
when server sends json data to client, client can render data

always follow client server architechture

2] Always respect all http methods

GET : this method is used to get required data 
POST :  this method is used to create or add new data  
PATCH : this method is used to update data  
PUT : this method is used to upload file to server
DELETE : this method is used to delete required data

When we are unaware of the client redering side we recommend to use CSR becoz in this client will descide how to display data whether on browser, app or web. Client side rendering in this server server sends the json data to client becoz 

If we are already aware that client will render the data on browser only then server will process and sends the data in html which improves speed and make it seo friendly this  process is call SSR Server Side Rendering.

*/

// REST APT in NodeJS

/*

GET : /users -> get request to fetch all user data (SSR) pass the data in html render format
GET : /api/users -> get request to fetch all user data in json format
GET : /user/id -> get request to fetch user data of id.

POST: /users - Create new user

PATCH: /users/id -> update data of specific user id

DELETE: /users/id -> delete data of specific user id


*/

import userInfo from "../src/userInfo.json";

// console.log(userInfo);

const app = express();

app.listen(8600, () => {
  console.log("Server is Listening on port : 8600");
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

// app.get("/api/users/:id", (req, res) => {
//   const id = Number(req.params.id);
//   const fetchUserData = userInfo.filter((item) => item.id === id);

//   console.log(fetchUserData, id);

//   res.json(fetchUserData);
// });

// middlewares
app.use(express.urlencoded({ extended: false }));

app.post("/api/users", (req, res) => {
  const body = req.body;
  console.log("body = ", body);

  const newUserInfo = userInfo;
  newUserInfo.push({ id: crypto.randomUUID(), ...body });

  fs.writeFile(
    "./src/userInfo.js",
    JSON.stringify(newUserInfo),
    (err, data) => {
      if (err) {
        console.log("File Append Error", err);
        return res.json({ status: "Failed", error_type: err });
      } else {
        console.log("User Data Created Successfully !", data);
        return res.json({
          status: "Success",
          message: "User Data Created Successfully !",
        });
      }
    }
  );
});

// app.patch("/api/users/:id", (req, res) => {
//   return res.json({ status: "pending" });
// });

// app.delete("/api/users/:id", (req, res) => {
//   return res.json({ status: "pending" });
// });

// in simple words
// this methods is useful because it reduces individual line of code for common routes methods

app
  .route("/api/users/:id")
  .get((req, res) => {
    const id = Number(req.params.id);
    const fetchUserData = userInfo.filter((item) => item.id === id);
    res.json(fetchUserData);
  })
  .patch((req, res) => {
    res.json({ status: "Pending" });
  })
  .delete((req, res) => {
    res.json({ status: "Pending" });
  });
