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

export const employeeRouter = express.Router();

employeeRouter
  .route("/")
  .get(async (req, res, next) => {
    try {
      if (req.query?.e_no) {
        const employee = await getEmployee(req.query.e_no);
        return res.json(employee);
      }
      const employees = await getAllEmployees();
      res.json(employees);
    } catch (error) {
      next(error);
    }
  })
  .post(employeeValidator, async (req, res, next) => {
    try {
      const employeeDetails = {
        e_no: uuid(),
        ...req.body,
      };
      await addNewEmployee(employeeDetails);
      const addedEmployeeDetails = await getEmployee(employeeDetails.e_no);
      res.status(201).json({ message: "Success!", ...addedEmployeeDetails });
    } catch (error) {
      next(error);
    }
  });

employeeRouter
  .route("/:e_no")
  .get(async (req, res, next) => {
    try {
      const employee = await getEmployee(req.params.e_no);
      res.json(employee);
    } catch (error) {
      next(error);
    }
  })
  .patch(async (req, res, next) => {
    try {
      const updatedFields = {
        ...(req.body?.e_name ? { e_name: req.body.e_name } : {}),
        ...(req.body?.salary ? { salary: req.body.salary } : {}),
        ...(req.body?.d_no ? { d_no: req.body.d_no } : {}),
        ...(req.body?.mgr_no ? { mgr_no: req.body.mgr_no } : {}),
        ...(req.body?.date_of_join
          ? { date_of_join: req.body.date_of_join }
          : {}),
        ...(req.body?.designation ? { designation: req.body.designation } : {}),
        ...(req.body?.address ? { address: req.body.address } : {}),
        ...(req.body?.city ? { city: req.body.city } : {}),
        ...(req.body?.pincode ? { pincode: req.body.pincode } : {}),
      };

      const result = await updateEmployee(req.params.e_no, updatedFields);

      if (result.is_error) {
        return res.status(404).json({ message: result.message });
      }

      const updatedDetails = await getEmployee(req.params.e_no);
      res.status(200).json(updatedDetails);
    } catch (error) {
      next(error);
    }
  })
  .put(async (req, res, next) => {
    try {
      const updatedEmployeeDetails = {
        e_name: req.body.e_name,
        salary: req.body.salary,
        d_no: req.body.d_no,
        mgr_no: req.body.mgr_no,
        date_of_join: req.body.date_of_join,
        designation: req.body.designation,
        address: req.body.address,
        city: req.body.city,
        pincode: req.body.pincode,
      };

      const result = await updateEmployee(
        req.params.e_no,
        updatedEmployeeDetails
      );

      if (result.is_error) {
        return res.status(404).json({ message: result.message });
      }

      const updatedDetails = await getEmployee(req.params.e_no);
      res.status(200).json({
        message: "Employee updated successfully",
        updatedDetails,
      });
    } catch (error) {
      next(error);
    }
  })
  .delete(async (req, res, next) => {
    try {
      await deleteEmployee(req.params.e_no);
      res.status(204).json();
    } catch (error) {
      next(error);
    }
  });
