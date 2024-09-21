<div align=center><h1>Express Starter Template</h1></div>

This Express starter template is a beginner-friendly foundation for building RESTful APIs using **Express.js** and **MySQL**. Whether you're building APIs for employees, products, or users, this template makes it easy to get started by providing essential tools like CORS, request logging, error handling, and a modular routing structure.

> **Tip:** Think of this template as a blueprint you can easily modify to fit any kind of project you’re working on—just adjust the routes and controllers to handle whatever data (employees, products, users, etc.) you need!

---

## What's Inside?

Here’s what comes pre-configured in this template:

- **Express** framework for building your backend.
- **MySQL** adapter (mysql2) for handling database operations.
  - > If you use another database like PostgreSQL or Oracle, try changing the adapter and you're good to go!.
- **CORS** support with customizable options (allowing your API to handle requests from different domains).
  - > See `config/cors.config.js` for more info
- **Morgan** for logging all HTTP requests, which is useful for debugging and monitoring.
- **Modular API routes** to help organize your code as it grows.
- **Environment variables** using dotenv for easy configuration of sensitive data (like database credentials).

---

## Frontend Companion Available

This repository includes a companion frontend built with **React** and the **Vite** build system. The frontend serves as a user interface to interact with the APIs defined in this Express starter template. For more details, check the frontend repository [here](https://github.com/sahil-shefeek/express-template-frontend.git).

---

## Step-by-Step Guide to Get Started

### 1. Use This Repository as a Template

This template repository allows you to create your own repository without inheriting any unwanted commit history or configuration files from the template.

Here’s how:

1. **Click "Use this template"** on the GitHub page for this repository.
   - You’ll see a green button on the top-right. Click it to create a copy.
   - **Note:** Make sure you're signed in to GitHub to see the "Use this template" button.
2. **Name your new repository** (e.g., `my-express-api`).
3. **Clone your new repository** to your local machine:
   ```bash
   git clone https://github.com/<your-username>/<your-repo-name>.git
   ```
4. **Navigate to the project directory**:
   ```bash
   cd <your-repo-name>
   ```

> **Reminder**: Don’t just clone the original repository. By using the "Use this template" button, you avoid carrying over the original project’s git history.

---

### 2. Install Project Dependencies

Make sure you have [Node.js](https://nodejs.org/) installed. It’s what powers JavaScript code outside of the browser. Once Node.js is installed, you can install this project’s dependencies:

```bash
npm install
```

This will install all the libraries and modules you need, like Express, MySQL, CORS, Morgan, etc.

---

### 3. Set Up Environment Variables

Your app needs certain information to connect to the MySQL database, determine which port to run on, and so on. This information is stored in a file called `.env`, which you need to create yourself.

Here’s an example of what your `.env` file should look like:

```env
# Server settings
PORT=8000

# MySQL database connection
DB_HOST=localhost
DB_USER=root
DB_PASSWD=password
DB_NAME=defaultdb
DB_PORT=3306
```

#### Explanation of Each Variable:

- **PORT**: The port where your Express server will run (e.g., `8000`).
- **DB_HOST**: Where your MySQL server is hosted (usually `localhost`).
- **DB_USER**: Your MySQL username (e.g., `root`).
- **DB_PASSWD**: Your MySQL password.
- **DB_NAME**: The database you want to connect to (e.g., `defaultdb`).
- **DB_PORT**: The port on which MySQL is running (usually `3306`).

Create this file in the root folder of your project.

---

### 4. Initialize the Database

This template sets up tables like `employees` and `departments` with triggers to manage employee counts. To create these tables, run:

```bash
npm run init
```

This command will execute a script that connects to your MySQL database and sets up the necessary tables and triggers for managing employee and department data.

---

### 5. Running the Server

To start the server in development mode (which automatically reloads when you make changes), run:

```bash
npm run dev
```

Your server will now be running on the port specified in your `.env` file (e.g., `8000`). You can visit your API at `http://localhost:8000`.

---

## Customizing the API for Your Needs

This template provides example routes and controllers for managing **employees**. You can easily modify these or add new routes to handle other types of data, such as **products**, **users**, or **orders**.

---

### Walkthrough: How the Employee API Works

The template already includes an example for managing employees. Here's how it's structured:

1. **Routes**: These define how API requests (e.g., `GET`, `POST`) are handled.

   - You can find the routes in `routes/employees.js`.
   - For example, when a request is made to `GET /employees`, the `getAllEmployees` function in the controller is called.

2. **Controller**: This is where the actual logic for fetching data, adding employees, or retrieving specific employee information lives.
   - The template has a controller in `controllers/employeeController.js` that handles actions like `getAllEmployees()` and `getEmployee()`.

---

### Adding New Routes for Other Entities

Let’s say you want to add a new entity, like **products**. Here’s how you can do that:

#### 1. Create a New Router

You’ll define your new routes in a file like `routes/products.js`:

```js
import express from "express";
import {
  getAllProducts,
  getProduct,
  addNewProduct,
} from "../controllers/productController.js";

const productRouter = express.Router();

productRouter
  .route("/")
  .get(getAllProducts) // Get all products
  .post(addNewProduct); // Add a new product

productRouter.route("/:id").get(getProduct); // Get product by ID

export { productRouter };
```

#### 2. Register the Router in `api.js`

Open `routes/api.js` and add the new router:

```js
import express from "express";
import { productRouter } from "./products.js";

const apiRouter = express.Router();

// Use the product router for all /products requests
apiRouter.use("/products", productRouter);

export { apiRouter };
```

---

### Customizing for Other Entities

Want to add another type of data, like **orders**? Just follow the same steps:

1. **Create a Controller**: Add CRUD operations in a new controller file (e.g., `controllers/orderController.js`).
2. **Create a Router**: Define the routes for handling `GET`, `POST`, etc., requests in a new router (e.g., `routes/orders.js`).
3. **Register the router** in `api.js`
4. **Database Setup**: Ensure your database has the necessary tables and relationships.

---

This template is meant to be flexible and grow with your project. Whether you're adding more routes, customizing controllers, or connecting to a more complex database, this setup gives you a strong foundation to build from.

---

### Sample API Documentation

This API provides access to manage the `employees` resource in the system.

#### Base URL:

```
/api/employees
```

---

#### **1. GET All Employees**

##### Endpoint:

```
GET /api/employees
```

##### Description:

Fetches all employees from the database.

##### Response:

- **200 OK**: A list of all employees in JSON format.

```json
[
  {
    "e_no": "unique-employee-id",
    "e_name": "Employee Name",
    "salary": 50000,
    "d_no": "department-id",
    "mgr_no": "manager-id",
    "date_of_join": "YYYY-MM-DD",
    "designation": "Job Title",
    "address": "Employee address",
    "city": "City",
    "pincode": "Postal Code"
  }
]
```

##### Errors:

- **500 Internal Server Error**: Server failed to process the request.

---

#### **2. GET Single Employee**

##### Endpoint:

```
GET /api/employees/:e_no
```

##### Description:

Fetches the details of a specific employee based on their `e_no`.

##### Request:

- **URL Parameter**: `e_no` (string) – The unique identifier for the employee.

##### Response:

- **200 OK**: Details of the requested employee in JSON format.

```json
{
  "e_no": "unique-employee-id",
  "e_name": "Employee Name",
  "salary": 50000,
  "d_no": "department-id",
  "mgr_no": "manager-id",
  "date_of_join": "YYYY-MM-DD",
  "designation": "Job Title",
  "address": "Employee address",
  "city": "City",
  "pincode": "Postal Code"
}
```

##### Errors:

- **404 Not Found**: Employee with the given `e_no` does not exist.
- **500 Internal Server Error**: Server failed to process the request.

---

#### **3. POST Add New Employee**

##### Endpoint:

```
POST /api/employees
```

##### Description:

Adds a new employee to the database.

##### Request:

- **Body Parameters**:

```json
{
  "e_name": "Employee Name",
  "salary": 50000,
  "d_no": "department-id",
  "mgr_no": "manager-id",
  "date_of_join": "YYYY-MM-DD",
  "designation": "Job Title",
  "address": "Employee address",
  "city": "City",
  "pincode": "Postal Code"
}
```

##### Response:

- **201 Created**: The employee is successfully created.

```json
{
  "message": "Success!",
  "e_no": "unique-employee-id",
  "e_name": "Employee Name",
  "salary": 50000
}
```

##### Errors:

- **400 Bad Request**: Missing or invalid fields.
- **500 Internal Server Error**: Server failed to process the request.
- **Foreign Key Error**: When `d_no` (department ID) does not exist.

---

#### **4. PATCH Update Employee**

##### Endpoint:

```
PATCH /api/employees/:e_no
```

##### Description:

Updates an employee's details based on their `e_no`.

##### Request:

- **URL Parameter**: `e_no` (string) – The unique identifier for the employee.
- **Body Parameters** (only the fields that need updating):

```json
{
  "e_name": "New Employee Name",
  "salary": 60000,
  "d_no": "new-department-id"
}
```

##### Response:

- **200 OK**: Updated employee details.

```json
{
  "e_no": "unique-employee-id",
  "e_name": "Updated Employee Name",
  "salary": 60000
}
```

##### Errors:

- **404 Not Found**: Employee with the given `e_no` does not exist.
- **400 Bad Request**: Missing or invalid fields.
- **Foreign Key Error**: When `d_no` (department ID) does not exist.

---

#### **5. DELETE Employee**

##### Endpoint:

```
DELETE /api/employees/:e_no
```

##### Description:

Deletes an employee from the database based on their `e_no`.

##### Request:

- **URL Parameter**: `e_no` (string) – The unique identifier for the employee.

##### Response:

- **204 No Content**: Employee deleted successfully.

##### Errors:

- **404 Not Found**: Employee with the given `e_no` does not exist.
- **500 Internal Server Error**: Server failed to process the request.

---

### Department API Documentation

This API allows management of `departments` in the system.

#### Base URL:

```
/api/departments
```

---

#### **1. GET All Departments**

##### Endpoint:

```
GET /api/departments
```

##### Description:

Fetches all departments from the database.

##### Response:

- **200 OK**: A list of all departments in JSON format.

```json
[
  {
    "d_no": "department-id",
    "d_name": "Department Name",
    "no_of_employees": 10,
    "dept_hod": "Head of Department Name"
  }
]
```

##### Errors:

- **500 Internal Server Error**: Server failed to process the request.

---

#### **2. GET Single Department**

##### Endpoint:

```
GET /api/departments/:d_no
```

##### Description:

Fetches the details of a specific department based on their `d_no`.

##### Request:

- **URL Parameter**: `d_no` (string) – The unique identifier for the department.

##### Response:

- **200 OK**: Details of the requested department in JSON format.

```json
{
  "d_no": "department-id",
  "d_name": "Department Name",
  "no_of_employees": 10,
  "dept_hod": "Head of Department Name"
}
```

##### Errors:

- **404 Not Found**: Department with the given `d_no` does not exist.
- **500 Internal Server Error**: Server failed to process the request.

---

#### **3. POST Add New Department**

##### Endpoint:

```
POST /api/departments
```

##### Description:

Adds a new department to the database.

##### Request:

- **Body Parameters**:

```json
{
  "d_name": "Department Name",
  "dept_hod": "Head of Department Name"
}
```

##### Response:

- **201 Created**: The department is successfully created.

```json
{
  "message": "Success!",
  "d_no": "unique-department-id",
  "d_name": "Department Name"
}
```

##### Errors:

- **400 Bad Request**: Missing or invalid fields.
- **500 Internal Server Error**: Server failed to process the request.

---

#### **4. PATCH Update Department**

##### Endpoint:

```
PATCH /api/departments/:d_no
```

##### Description:

Updates a department's details based on their `d_no`.

##### Request:

- **URL Parameter**: `d_no` (string) – The unique identifier for the department.
- **Body Parameters** (only the fields that need updating):

```json
{
  "d_name": "Updated Department Name",
  "dept_hod": "Updated HOD Name"
}
```

##### Response:

- **200 OK**: Updated department details.

```json
{
  "d_no": "unique-department-id",
  "d_name": "Updated Department Name",
  "dept_hod": "Updated HOD Name"
}
```

##### Errors:

- **404 Not Found**: Department with the given `d_no` does not exist.
- **400 Bad Request**: Missing or invalid fields.

---

#### **5. DELETE Department**

##### Endpoint:

```
DELETE /api/departments/:d_no
```

##### Description:

Deletes a department from the database based on their `d_no`.

##### Request:

- **URL Parameter**: `d_no` (string) – The unique identifier for the department.

##### Response:

- **204 No Content**: Department deleted successfully.

##### Errors:

- **404 Not Found**: Department with the given `d_no` does not exist.
- **500 Internal Server Error**: Server failed to process the request.

---

### Error Codes and Responses

- **404 Not Found**: The requested resource (employee or department) does not exist.
- **400 Bad Request**: The request contains invalid or missing fields.
- **500 Internal Server Error**: A server error occurred during processing.
- **Foreign Key Constraint Error**: When trying to add or update an employee with an invalid department or manager.
