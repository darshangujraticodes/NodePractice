import express from "express";
import userInfo from "./userInfo.json" with { type: "json" };
import fs from "fs";
import dotenv from "dotenv";
import mongoose from "mongoose"
import { User } from "../src/models/user.models.js";

const app = express();
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log("Server is Listening on port : ", PORT);
});



dotenv.config({
  path: "./env",
});


// mongodb connection

mongoose
.connect("mongodb://127.0.0.1:27017/youtube-app")
.then(() => {console.log("MongoDB Connected !")})
.catch(error => console.error(error))


// middlewares plugin

app.use(express.urlencoded({extended: false}))

// it is example of SSR

app
.route("/api/users")
.get( async (req,res)=>{


  const dbAllUsers = await User.find({});

  return res.status(200).json(dbAllUsers);
})
.post(async (req,res)=>{


  try {

    // here X denote custom header
  res.setHeader("X-MyName","Darshan Gujrati")
  const body = req.body;
  
  if(!body || !body.fullName || !body.username || !body.email || !body.city || !body.gender || !body.phone || !body.website){
    return res.status(400).json({ status: "Failed", error_msg:"All Fields are Required!" })
  }

  const result = await User.create({
    fullName : body.fullName,
    username : body.username,
    email : body.email,
    gender : body.gender,
    city : body.city, 
    phone : body.phone,
    website : body.website
  });

  console.log(result);

  return res.status(201).json( {msg: "Success"})
    
  } catch (error) {
    return res.status(404).json({ status:"Error",  type: error ,});
    
  }

  

})



app
.route("/api/users/:id")
.get( async (req,res)=>{  

  try {

    const fetchUserData = await User.findById(req.params.id);

    if(!fetchUserData){
      return res.status(404).json({msg : "User Not Found !"});
    } 
  
    return res.status(200).json(fetchUserData);
    
  } catch (error) {
    return res.status(404).json({ status:"Client Error",  type: error ,   msg : "User Not Found !"});
  }
 
  
})
.patch(async(req,res)=>{  

  try {

    const UpdatedData =  await User.updateOne({ _id : req.params.id }, {  $set : { ...req.body }  } );
 
    if(UpdatedData.modifiedCount !== 1){
      return res.status(404).json({msg : "User Not Found ! "});
    }
  
    return res.status(200).json({msg : "User Data Updated Successfully ! "});
  
  } catch (error) {
    return res.status(404).json({ status:"Client Error",  type: error ,   msg : "User Not Found !"});
  }

 

})
.delete((req,res)=>{  
  const userId = Number(req.params.id);
  const newUsersData = userInfo.filter((item) => item.id != userId);


  // console.log(userInfo.length);

  // console.log(newUsersData.length);

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