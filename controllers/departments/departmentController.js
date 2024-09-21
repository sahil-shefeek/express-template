import { query } from "../../services/db.js";

export const getAllDepartments = async () => {
  try {
    return await query("SELECT * FROM departments");
  } catch (error) {
    throw new Error("Error retrieving departments: " + error.message);
  }
};

export const getDepartment = async (id) => {
  try {
    const res = await query("SELECT * FROM departments WHERE d_no = ?", [id]);
    if (res.length < 1) {
      return {
        is_error: true,
        message: "Department not found",
      };
    }
    return res[0];
  } catch (error) {
    throw new Error("Error retrieving department: " + error.message);
  }
};

// Add a new department
export const addNewDepartment = async (departmentDetails) => {
  const { d_no, d_name, dept_hod } = departmentDetails;

  if (!d_name) throw new Error("Department name is required");
  if (!dept_hod) throw new Error("Head of Department is required");

  try {
    await query(
      `INSERT INTO departments (d_no, d_name, dept_hod)
      VALUES (?, ?, ?)`,
      [d_no, d_name, dept_hod]
    );
    return await getDepartment(d_no);
  } catch (error) {
    throw new Error("Error adding new department: " + error.message);
  }
};

export const updateDepartment = async (id, updatedDepartmentDetails) => {
  const [oldDepartmentDetails] = await query(
    `SELECT * FROM departments WHERE d_no = ?`,
    [id]
  );

  if (!oldDepartmentDetails) {
    throw new Error("Department does not exist");
  }

  try {
    const departmentDetails = {
      ...oldDepartmentDetails,
      ...updatedDepartmentDetails,
    };

    const { d_name, dept_hod } = departmentDetails;

    await query(
      `UPDATE departments 
       SET d_name = ?, dept_hod = ? 
       WHERE d_no = ?`,
      [d_name, dept_hod, id]
    );

    return await getDepartment(id);
  } catch (error) {
    throw new Error("Error updating department: " + error.message);
  }
};

export const deleteDepartment = async (id) => {
  try {
    const res = await query("DELETE FROM departments WHERE d_no = ?", [id]);
    if (res.affectedRows === 0) {
      throw new Error("Department not found or already deleted");
    }
    return { message: "Department deleted successfully" };
  } catch (error) {
    throw new Error("Error deleting department: " + error.message);
  }
};
