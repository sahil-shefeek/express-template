import express from "express";
import {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  replaceUser,
  deleteUser,
} from "../../../controllers/users/userContoller.js";

import { newUserValidator } from "../../../middleware/users/newUserValidator.js";
import { userValidator } from "../../../middleware/users/userValidator.js";
import verifyJWT from "../../../middleware/auth/verifyJWT.js";

const userRouter = express.Router();

userRouter.route("/signup").post(newUserValidator, createUser);
userRouter.use(verifyJWT);
userRouter.route("/").get(getAllUsers);

userRouter
  .route("/:e_no")
  .get(getUser)
  .patch(updateUser)
  .put(userValidator, replaceUser)
  .delete(deleteUser);

export default userRouter;
