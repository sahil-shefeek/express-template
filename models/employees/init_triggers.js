import mysql from "mysql2";
import { pool_options } from "../../config/database.config.js";

const pool = mysql.createPool(pool_options).promise();

const initEmployeesCountTriggers = async () => {
  try {
    await pool.query(
      `CREATE TRIGGER increment_employees_count
       BEFORE INSERT ON employees
       FOR EACH ROW 
       UPDATE departments AS d 
       SET d.no_of_employees = d.no_of_employees + 1 
       WHERE d.d_no = NEW.d_no`
    );
    console.log("Increment employees count trigger created successfully.");
  } catch (error) {
    console.error("Failed to create increment trigger:", error.message);
    throw new Error(error.message);
  }

  try {
    await pool.query(
      `CREATE TRIGGER decrement_employees_count
       BEFORE DELETE ON employees
       FOR EACH ROW 
       UPDATE departments AS d 
       SET d.no_of_employees = d.no_of_employees - 1 
       WHERE d.d_no = OLD.d_no`
    );
    console.log("Decrement employees count trigger created successfully.");
  } catch (error) {
    console.error("Failed to create decrement trigger:", error.message);
  }
};

export default initEmployeesCountTriggers;
