import { createDepartmentsTable } from "./departments/departments.js";
import { createEmployeesTable } from "./employees/employees.js";
import { initEmployeesCountTriggers } from "./employees/triggers.js";

const initDatabase = async () => {
  await createDepartmentsTable();
  await createEmployeesTable();
  await initEmployeesCountTriggers();
};

const startInitialization = async () => {
  console.log("Attempting database initialization...");
  try {
    await initDatabase();
    console.log("Database initialization successful.");
    process.exit(0);
  } catch (error) {
    console.error("Database initialization failed:", error.message);
    process.exit(1);
  }
};

startInitialization();
