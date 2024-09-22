// routes/departments.js
import express from "express";
import {
  getAllDepartments,
  getDepartment,
  addNewDepartment,
  updateDepartment,
  deleteDepartment,
} from "../../../controllers/departments/departmentController.js";
import { v4 as uuid } from "uuid";
import { departmentValidator } from "../../../middleware/departments/departmentValidator.js";

export const departmentRouter = express.Router();

departmentRouter
  .route("/")
  .get(getAllDepartments)
  .post(departmentValidator, async (req, res, next) => {
    req.body.d_no = uuid(); // Assign a unique ID
    addNewDepartment(req, res, next);
  });

departmentRouter
  .route("/:d_no")
  .get(getDepartment)
  .patch(departmentValidator, updateDepartment)
  .put(departmentValidator, updateDepartment)
  .delete(deleteDepartment);

export default departmentRouter;
