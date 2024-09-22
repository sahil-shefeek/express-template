import { query } from "../../services/db.js";

const getAll = async () => {
  return await query("SELECT * FROM employees");
};

const get = async (id) => {
  const res = await query("SELECT * FROM employees WHERE e_no = ?", [id]);
  if (res.length < 1) {
    throw { status: 404, message: "Employee not found" };
  }
  return res[0];
};

const add = async (employeeDetails) => {
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
    `INSERT INTO employees (e_no, e_name, salary, d_no, mgr_no, date_of_join, designation, address, city, pincode)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
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
};

const update = async (id, employeeDetails) => {
  const res = await query(
    `UPDATE employees 
     SET e_name = ?, salary = ?, d_no = ?, mgr_no = ?, date_of_join = ?, designation = ?, address = ?, city = ?, pincode = ? 
     WHERE e_no = ?`,
    [
      employeeDetails.e_name,
      employeeDetails.salary,
      employeeDetails.d_no,
      employeeDetails.mgr_no,
      employeeDetails.date_of_join,
      employeeDetails.designation,
      employeeDetails.address,
      employeeDetails.city,
      employeeDetails.pincode,
      id,
    ]
  );
  return res;
};

const remove = async (id) => {
  const result = await query("DELETE FROM employees WHERE e_no = ?", [id]);
  if (result.affectedRows === 0) {
    throw { status: 404, message: "Employee not found" };
  }
};

export default { getAll, get, add, update, remove };
