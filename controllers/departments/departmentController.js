import departments from "../../models/departments/departments.js";

export const getAllDepartments = async (req, res, next) => {
  try {
    const departmentList = await departments.getAll();
    res.json(departmentList);
  } catch (error) {
    next(error);
  }
};

export const getDepartment = async (req, res, next) => {
  try {
    const department = await departments.get(req.params.d_no);
    res.json(department);
  } catch (error) {
    next(error);
  }
};

export const addNewDepartment = async (req, res, next) => {
  try {
    const newDepartment = {
      d_no: req.body.d_no,
      ...req.body,
    };
    await departments.add(newDepartment);
    const addedDepartment = await departments.get(newDepartment.d_no);
    res
      .status(201)
      .json({ message: "Department created successfully", addedDepartment });
  } catch (error) {
    next(error);
  }
};

export const updateDepartment = async (req, res, next) => {
  try {
    await departments.update(req.params.d_no, req.body);
    const updatedDepartment = await departments.get(req.params.d_no);
    res.json({ message: "Department updated successfully", updatedDepartment });
  } catch (error) {
    next(error);
  }
};

export const deleteDepartment = async (req, res, next) => {
  try {
    await departments.remove(req.params.d_no);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
