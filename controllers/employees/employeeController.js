import { query } from "../../services/db.js";

export const getAllEmployees = async () => {
  try {
    return await query("SELECT * FROM employees");
  } catch (error) {
    throw new Error("Failed to fetch employees.");
  }
};

export const getEmployee = async (id) => {
  try {
    const res = await query("SELECT * FROM employees WHERE e_no = ?", [id]);
    if (res.length < 1) {
      throw { status: 404, message: "Employee not found" };
    }
    return res[0];
  } catch (error) {
    throw new Error(error.message || "Failed to fetch employee.");
  }
};

export const addNewEmployee = async (employeeDetails) => {
  const {
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
  } = employeeDetails;

  try {
    const res = await query(
      `INSERT INTO employees (e_no, e_name, salary, d_no, mgr_no, date_of_join, designation, address, city, pincode)
      VALUES (?, ?, ?, ?, ?, ?, ? ,? ,?, ?)`,
      [
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
      ]
    );
    return res;
  } catch (error) {
    if (error.errno === 1452) {
      throw new Error(
        "Invalid department number. Please provide a valid department."
      );
    }
    throw new Error("Error adding new employee: " + error.message);
  }
};

export const updateEmployee = async (id, updatedEmployeeDetails) => {
  const [oldEmployeeDetails] = await query(
    `SELECT * FROM employees WHERE e_no = ?`,
    [id]
  );

  if (oldEmployeeDetails === undefined) {
    throw new Error("Employee with that details does not exist");
  }

  try {
    const employeeDetails = {
      ...oldEmployeeDetails,
      ...updatedEmployeeDetails,
    };

    const {
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
    } = employeeDetails;

    const res = await query(
      `UPDATE employees 
       SET e_name = ?, salary = ?, d_no = ?, mgr_no = ?, date_of_join = ?, designation = ?, address = ?, city = ?, pincode = ? 
       WHERE e_no = ?`,
      [
        e_name,
        salary,
        d_no,
        mgr_no,
        date_of_join,
        designation,
        address,
        city,
        pincode,
        e_no,
      ]
    );
    return res;
  } catch (error) {
    if (error.errno === 1452) {
      throw new Error(
        "Invalid department number. Please provide a valid department."
      );
    }
    throw new Error("Error updating employee details: " + error.message);
  }
};

export const deleteEmployee = async (e_no) => {
  try {
    const result = await query("DELETE FROM employees WHERE e_no = ?", [e_no]);
    if (result.affectedRows === 0) {
      throw { status: 404, message: "Employee not found" };
    }
  } catch (error) {
    throw { status: 500, message: "Failed to delete employee" };
  }
};
