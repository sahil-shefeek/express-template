import { query } from "../../services/db.js";

const getAll = async () => {
  return await query("SELECT * FROM departments");
};

const get = async (id) => {
  const res = await query("SELECT * FROM departments WHERE d_no = ?", [id]);
  if (res.length < 1) {
    throw { status: 404, message: "Department not found" };
  }
  return res[0];
};

const add = async (departmentDetails) => {
  const { d_no, d_name, dept_hod } = departmentDetails;

  const res = await query(
    `INSERT INTO departments (d_no, d_name, dept_hod)
     VALUES (?, ?, ?)`,
    [d_no, d_name, dept_hod]
  );
  return res;
};

const update = async (id, departmentDetails) => {
  const res = await query(
    `UPDATE departments 
     SET d_name = ?, dept_hod = ? 
     WHERE d_no = ?`,
    [departmentDetails.d_name, departmentDetails.dept_hod, id]
  );
  return res;
};

const remove = async (id) => {
  const result = await query("DELETE FROM departments WHERE d_no = ?", [id]);
  if (result.affectedRows === 0) {
    throw { status: 404, message: "Department not found" };
  }
};

export default { getAll, get, add, update, remove };
