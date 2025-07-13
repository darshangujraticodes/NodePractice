import express from "express";

import {
  handleGetAllUsers,
  handleCreateNewUser,
  handleGetUserById,
  handleUpdateUserById,
  handleDeleteUserById,
} from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.route("/").get(handleGetAllUsers).post(handleCreateNewUser);

userRouter
  .route("/:id")
  .get(handleGetUserById)
  .patch(handleUpdateUserById)
  .delete(handleDeleteUserById);

export default userRouter;
