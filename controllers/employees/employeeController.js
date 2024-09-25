import employees from "../../models/employees/employees.js";

export const getAllEmployees = async (req, res) => {
  try {
    const employeeList = await employees.getAll();
    res.json(employeeList);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving employees" });
  }
};

export const getEmployee = async (req, res) => {
  try {
    const employee = await employees.get(req.params.e_no);
    res.json(employee);
  } catch (error) {
    if (error.status === 404) {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Error retrieving employee" });
    }
  }
};

export const addNewEmployee = async (req, res) => {
  const e_no = uuid();
  const {
    e_name,
    salary,
    d_no,
    mgr_no,
    date_of_join,
    designation,
    address,
    city,
    pincode,
  } = req.body;

  try {
    const newEmployee = {
      e_no,
      e_name,
      salary,
      d_no,
      mgr_no,
      date_of_join,
      designation,
      address,
      city,
      pincode,
    };
    await employees.add(newEmployee);
    const addedEmployee = await employees.get(e_no);
    res.status(201).json({
      addedEmployee,
    });
  } catch (error) {
    res.status(500).json({ error: "Error adding employee" });
  }
};

export const updateEmployee = async (req, res) => {
  const {
    e_name,
    salary,
    d_no,
    mgr_no,
    date_of_join,
    designation,
    address,
    city,
    pincode,
  } = req.body;

  try {
    await employees.update(req.params.e_no, {
      e_name,
      salary,
      d_no,
      mgr_no,
      date_of_join,
      designation,
      address,
      city,
      pincode,
    });
    const updatedEmployee = await employees.get(req.params.e_no);
    res.json({
      updatedEmployee,
    });
  } catch (error) {
    if (error.status === 404) {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Error updating employee" });
    }
  }
};

export const deleteEmployee = async (req, res) => {
  try {
    await employees.remove(req.params.e_no);
    res.status(204).end();
  } catch (error) {
    if (error.status === 404) {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Error deleting employee" });
    }
  }
};
