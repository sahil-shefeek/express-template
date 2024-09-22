import express from "express";
import employeeRouter from "./employees/employees.js";
import { departmentRouter } from "./departments/departments.js";

export const apiRouter = express.Router();

apiRouter.use("/employees", employeeRouter);
apiRouter.use("/departments", departmentRouter);
