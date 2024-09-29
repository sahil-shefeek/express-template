import express from "express";
import employeeRouter from "./employees/employees.js";
import departmentRouter from "./departments/departments.js";
import userRouter from "./users/users.js";
import authRouter from "./auth/auth.js";
import verifyJWT from "../../middleware/auth/verifyJWT.js";

export const apiRouter = express.Router();

apiRouter.use("/auth", authRouter);
apiRouter.use("/users", userRouter);
apiRouter.use(verifyJWT);
apiRouter.use("/employees", employeeRouter);
apiRouter.use("/departments", departmentRouter);
