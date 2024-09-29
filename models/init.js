import createDepartmentsTable from "./departments/init.js";
import createEmployeesTable from "./employees/init.js";
import initEmployeesCountTriggers from "./employees/init_triggers.js";
import createUsersTable from "./users/init.js";

const initDatabase = async () => {
  await createDepartmentsTable();
  await createEmployeesTable();
  await initEmployeesCountTriggers();
  await createUsersTable();
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
