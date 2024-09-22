import mysql from "mysql2";
import { pool_options } from "../../config/database.config.js";

const pool = mysql.createPool(pool_options).promise();

const createDepartmentsTable = async () => {
  try {
    await pool.query(
      `CREATE TABLE departments(
        d_no VARCHAR(36) PRIMARY KEY,
        d_name VARCHAR(32) NOT NULL,
        no_of_employees INT DEFAULT 0,
        dept_hod VARCHAR(32)
      )`
    );
    console.log("Departments table created successfully.");
  } catch (error) {
    console.error("Failed to create departments table:", error.message);
    throw new Error(error.message);
  }
};

export default createDepartmentsTable;
