import express from "express";

import {
  handleGetAllUsers,
  handleCreateNewUser,
  handleGetUserById,
  handleUpdateUserById,
  handleDeleteUserById,
  handleUserLogin,
} from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.route("/").get(handleGetAllUsers).post(handleCreateNewUser);

userRouter
  .route("/:id")
  .get(handleGetUserById)
  .patch(handleUpdateUserById)
  .delete(handleDeleteUserById);

userRouter.post("/login", handleUserLogin);

export default userRouter;
