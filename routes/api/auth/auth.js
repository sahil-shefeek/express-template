import express from "express";
import loginValidator from "../../../middleware/auth/loginValidator.js";
import {
  handleLogin,
  handleLogout,
} from "../../../controllers/auth/authContoller.js";
import handleRefreshToken from "../../../controllers/auth/refreshController.js";

export const authRouter = express.Router();

authRouter.route("/login").post(loginValidator, handleLogin);
authRouter.route("/logout").get(handleLogout);
authRouter.route("/refresh").post(handleRefreshToken);

export default authRouter;
