import employees from "../../models/employees/employees.js";

export const getAllEmployees = async (req, res, next) => {
  try {
    const employeeList = await employees.getAll();
    res.json(employeeList);
  } catch (error) {
    next(error);
  }
};

export const getEmployee = async (req, res, next) => {
  try {
    const employee = await employees.get(req.params.e_no);
    res.json(employee);
  } catch (error) {
    next(error);
  }
};

export const addNewEmployee = async (req, res, next) => {
  try {
    const newEmployee = {
      e_no: req.body.e_no,
      ...req.body,
    };
    await employees.add(newEmployee);
    const addedEmployee = await employees.get(newEmployee.e_no);
    res.status(201).json({ message: "Success!", ...addedEmployee });
  } catch (error) {
    next(error);
  }
};

export const updateEmployee = async (req, res, next) => {
  try {
    await employees.update(req.params.e_no, req.body);
    const updatedEmployee = await employees.get(req.params.e_no);
    res.json({ message: "Employee updated successfully", updatedEmployee });
  } catch (error) {
    next(error);
  }
};

export const deleteEmployee = async (req, res, next) => {
  try {
    await employees.remove(req.params.e_no);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
