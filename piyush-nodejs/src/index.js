import express from "express";
import userInfo from "./userInfo.json" with { type: "json" };
import fs from "fs";
import dotenv from "dotenv";

dotenv.config({
  path: "./env",
});


const app = express();
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log("Server is Listening on port : ", PORT);
});

app.get("/api/users",(req,res)=>{
    return res.json(userInfo)
})

const htmlData = `
    
    ${
    userInfo.map((user) => `
      <p>
        <span>
        ${user.first_name} 
        </span> <br>

        <span>
        ${user.email} 
        </span> <br>

        <span>
        ${user.phone} 
        </span> <br>

        <span>
        ${user.city} 
        </span>  <br> 
      </p>
    `
    ).join("")
    }
    
`

// middlewares

app.use(express.urlencoded({extended: false}))

// it is example of SSR
app.get("/users",(req,res)=>{
  return res.send(htmlData)
})

app.post("/api/users",(req,res)=>{

  const body = req.body;

  if(!body || !body.name || !body.username || !body.email || !body.city || !body.phone || !body.website){
    return res.status(400).json({ status: "Failed", error_msg:"All Fields are Required!" })
  }


  const newUserInfo = userInfo;
  newUserInfo.push({ id: crypto.randomUUID(), ...body });

  const writeFileResp = fs.writeFile(
    "./src/userInfo.json",
    JSON.stringify(newUserInfo),
    (err, data) => {
      if (err) {
        // console.log("File Append Error", err);
        return res.json({ status: "Failed", error_type: err });
      } else {
        console.log("User Data Created Successfully !", data);
        return res.status(201).json({
          status: "Success",
          message: "User Data Created Successfully !",
        });
      }
    }
  );

  


})


app
.route("/api/users/:id")
.get((req,res)=>{  
  const userId = Number(req.params.id);
  const newUserInfo = userInfo;
  const fetchUserData = newUserInfo.filter((item) => item.id == userId )
 
  if(fetchUserData.length > 0) return res.json(fetchUserData)
  else return res.status(404).json("User Data Not Found!") 
  
})
.patch((req,res)=>{  
  const userId = Number(req.params.id);
  const body = req.body;
  const newUsersData = userInfo.map((item) => item.id == userId ? {id: userId, ...body} : item )

    fs.writeFile("./src/userInfo.json",JSON.stringify(newUsersData),(err,data) => {
      if (err) {
        // console.log("File Append Error", err);
        return res.json({ status: "Failed", error_type: err });
      } else {
        // console.log("User Data Updated Successfully !", data);
        return res.json({
          status: "Success",
          message: "User Data Updated Successfully !",
        });
      }
    })


})
.delete((req,res)=>{  
  const userId = Number(req.params.id);
  const newUsersData = userInfo.filter((item) => item.id != userId);

  // console.log(newUsersData);

  fs.writeFile("./src/userInfo.json",JSON.stringify(newUsersData),(err,data)=>{
    if (err) {
      // console.log("File Append Error", err);
      return res.json({ status: "Failed", error_type: err });
    } else {
      // console.log("User Data Deleted Successfully !", data);
      return res.json({
        status: "Success",
        message: "User Data Deleted Successfully !",
      });
    }
  })

  // return res.json(fetchUserData)
})