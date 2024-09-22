import mysql from "mysql2";
import { pool_options } from "../../config/database.config.js";

const pool = mysql.createPool(pool_options).promise();

const createEmployeesTable = async () => {
  try {
    await pool.query(
      `CREATE TABLE employees(
        e_no VARCHAR(36) PRIMARY KEY,
        e_name VARCHAR(52) NOT NULL,
        salary DECIMAL(10, 3) CHECK (salary > 0),
        d_no VARCHAR(36),
        mgr_no VARCHAR(36),
        date_of_join DATE,
        designation VARCHAR(36),
        address VARCHAR(50),
        city VARCHAR(8) CHECK (city IN ('Cochin', 'Mumbai', 'Chennai', 'Delhi')),
        pincode VARCHAR(7),
        FOREIGN KEY (d_no) REFERENCES departments(d_no)
      )`
    );
    console.log("Employees table created successfully.");
  } catch (error) {
    console.error("Failed to create employees table:", error.message);
    throw new Error(error.message);
  }
};

export default createEmployeesTable;
