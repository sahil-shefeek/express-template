import departments from "../../models/departments/departments.js";

export const getAllDepartments = async (req, res) => {
  try {
    const departmentList = await departments.getAll();
    res.json(departmentList);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving departments" });
  }
};

export const getDepartment = async (req, res) => {
  try {
    const department = await departments.get(req.params.d_no);
    res.json(department);
  } catch (error) {
    if (error.status === 404) {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Error retrieving department" });
    }
  }
};

export const addNewDepartment = async (req, res) => {
  const d_no = uuid();
  const { d_name, dept_hod } = req.body;

  try {
    const newDepartment = { d_no, d_name, dept_hod };
    await departments.add(newDepartment);
    const addedDepartment = await departments.get(d_no);
    res.status(201).json({
      addedDepartment,
    });
  } catch (error) {
    res.status(500).json({ error: "Error adding department" });
  }
};

export const updateDepartment = async (req, res) => {
  const { d_name, dept_hod } = req.body;

  try {
    await departments.update(req.params.d_no, { d_name, dept_hod });
    const updatedDepartment = await departments.get(req.params.d_no);
    res.json({
      updatedDepartment,
    });
  } catch (error) {
    if (error.status === 404) {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Error updating department" });
    }
  }
};

export const deleteDepartment = async (req, res) => {
  try {
    await departments.remove(req.params.d_no);
    res.status(204).end();
  } catch (error) {
    if (error.status === 404) {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Error deleting department" });
    }
  }
};
