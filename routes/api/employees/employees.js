import express from "express";
import {
  getAllEmployees,
  getEmployee,
  addNewEmployee,
  updateEmployee,
  deleteEmployee,
} from "../../../controllers/employees/employeeController.js";
import { v4 as uuid } from "uuid";
import { employeeValidator } from "../../../middleware/employees/employeeValidator.js";

const employeeRouter = express.Router();

employeeRouter
  .route("/")
  .get(getAllEmployees)
  .post(employeeValidator, async (req, res, next) => {
    req.body.e_no = uuid();
    addNewEmployee(req, res, next);
  });

employeeRouter
  .route("/:e_no")
  .get(getEmployee)
  .patch(updateEmployee)
  .put(updateEmployee)
  .delete(deleteEmployee);

export default employeeRouter;
