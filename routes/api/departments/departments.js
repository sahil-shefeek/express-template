import express from "express";
import {
  getAllDepartments,
  getDepartment,
  addNewDepartment,
  updateDepartment,
  deleteDepartment,
} from "../../../controllers/departments/departmentController.js";
import { departmentValidator } from "../../../middleware/departments/departmentValidator.js";

export const departmentRouter = express.Router();

departmentRouter
  .route("/")
  .get(getAllDepartments)
  .post(departmentValidator, addNewDepartment);

departmentRouter
  .route("/:d_no")
  .get(getDepartment)
  .patch(departmentValidator, updateDepartment)
  .put(departmentValidator, updateDepartment)
  .delete(deleteDepartment);

export default departmentRouter;
