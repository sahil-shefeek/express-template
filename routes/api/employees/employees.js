import express from "express";
import {
  getAllEmployees,
  getEmployee,
  addNewEmployee,
  updateEmployee,
  deleteEmployee,
} from "../../../controllers/employees/employeeController.js";
import { employeeValidator } from "../../../middleware/employees/employeeValidator.js";

const employeeRouter = express.Router();

employeeRouter
  .route("/")
  .get(getAllEmployees)
  .post(employeeValidator, addNewEmployee);

employeeRouter
  .route("/:e_no")
  .get(getEmployee)
  .patch(updateEmployee)
  .put(updateEmployee)
  .delete(deleteEmployee);

export default employeeRouter;
