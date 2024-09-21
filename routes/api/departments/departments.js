import express from "express";
import {
  getAllDepartments,
  getDepartment,
  addNewDepartment,
  updateDepartment,
  deleteDepartment,
} from "../../../controllers/departments/departmentController.js";
import { v4 as uuid } from "uuid";

export const departmentRouter = express.Router();

// GET all departments or a specific department by d_no
departmentRouter.route("/").get(async (req, res) => {
  try {
    if (req.query?.d_no) {
      const department = await getDepartment(req.query.d_no);
      res.json(department);
    } else {
      const departments = await getAllDepartments();
      res.json(departments);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST a new department
departmentRouter.route("/").post(async (req, res) => {
  try {
    const departmentDetails = {
      d_no: uuid(),
      d_name: req.body.d_name,
      dept_hod: req.body.dept_hod,
    };
    const newDepartment = await addNewDepartment(departmentDetails);
    res
      .status(201)
      .json({ message: "Department created successfully", newDepartment });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// PATCH to update specific fields of a department
departmentRouter.route("/:d_no").patch(async (req, res) => {
  try {
    const updatedDepartmentDetails = {
      ...(req.body?.d_name ? { d_name: req.body?.d_name } : {}),
      ...(req.body?.dept_hod ? { dept_hod: req.body?.dept_hod } : {}),
    };
    const updatedDepartment = await updateDepartment(
      req.params.d_no,
      updatedDepartmentDetails
    );
    res.json(updatedDepartment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// PUT to fully update the department details
departmentRouter.route("/:d_no").put(async (req, res) => {
  try {
    const updatedDepartmentDetails = {
      d_name: req.body.d_name,
      dept_hod: req.body.dept_hod,
    };
    const updatedDepartment = await updateDepartment(
      req.params.d_no,
      updatedDepartmentDetails
    );
    res.json({
      message: "Department updated successfully",
      updatedDepartment,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE a department by d_no
departmentRouter.route("/:d_no").delete(async (req, res) => {
  try {
    const result = await deleteDepartment(req.params.d_no);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
