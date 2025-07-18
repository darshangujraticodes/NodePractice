import { User } from "../models/user.models.js";
import { setUser } from "../service/auth.js";

export async function handleGetAllUsers(req, res) {
  try {
    const dbAllUsers = await User.find({});
    console.log("Success in GET /api/users ");

    return res.status(200).json(dbAllUsers);
  } catch (error) {
    console.log("Error in GET /api/users : ", error);
    return res
      .status(404)
      .json({ status: "Failed", error_msg: "All Fields are Required!" });
  }
}

export async function handleCreateNewUser(req, res) {
  try {
    // here X denote custom header
    res.setHeader("X-MyName", "Darshan Gujrati");
    const body = req.body;

    if (
      !body ||
      !body.fullName ||
      !body.username ||
      !body.email ||
      !body.city ||
      !body.gender ||
      !body.phone ||
      !body.website
    ) {
      return res
        .status(400)
        .json({ status: "Failed", error_msg: "All Fields are Required!" });
    }

    const result = await User.create({
      fullName: body.fullName,
      username: body.username,
      email: body.email,
      gender: body.gender,
      city: body.city,
      phone: body.phone,
      website: body.website,
    });

    // console.log(result);

    return res.status(201).json({ msg: "Success", user_id: result._id });
  } catch (error) {
    return res.status(404).json({ status: "Error", type: error });
  }
}

export async function handleGetUserById(req, res) {
  try {
    const fetchUserData = await User.findById(req.params.id);

    if (!fetchUserData) {
      return res.status(404).json({ msg: "User Not Found !" });
    }

    return res.status(200).json(fetchUserData);
  } catch (error) {
    return res
      .status(404)
      .json({ status: "Client Error", type: error, msg: "User Not Found !" });
  }
}

export async function handleUpdateUserById(req, res) {
  try {
    const UpdatedData = await User.updateOne(
      { _id: req.params.id },
      { $set: { ...req.body } }
    );

    if (UpdatedData.modifiedCount !== 1) {
      return res.status(404).json({ msg: "User Not Found ! " });
    }

    return res.status(200).json({ msg: "User Data Updated Successfully ! " });
  } catch (error) {
    return res
      .status(404)
      .json({ status: "Client Error", type: error, msg: "User Not Found !" });
  }
}

export async function handleDeleteUserById(req, res) {
  try {
    const result = await User.deleteOne({ _id: req.params.id });

    // console.log(result,result.acknowledged);

    if (result.deletedCount === 0) {
      throw "User Not Found";
    }

    return res.status(200).json({ msg: "User Data Deleted Successfully ! " });
  } catch (error) {
    return res
      .status(404)
      .json({ status: "Client Error", type: error, msg: "User Not Found !" });
  }
}

export async function handleUserLogin(req, res) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email, password });

    // console.log(user);

    if (!user) {
      return res.render("login", {
        error: "Invalid Username or Password!",
      });
    }

    const token = setUser(user);

    // console.log("setuser token", token);

    res.cookie("uid", token);

    // console.log("cookie created!!");

    return res.redirect("/");
  } catch (error) {
    // return res
    //   .status(404)
    //   .json({ status: "Client Error", type: error, msg: "User Not Found !" });

    return res.redirect("/login");
  }
}
