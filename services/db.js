import mysql from "mysql2";
import { pool_options } from "../config/database.config.js";

const pool = mysql.createPool(pool_options).promise();

/**
 * Executes an SQL query with optional parameters and returns the results.
 *
 * @param {string} sql - The SQL query string.
 * @param {Array} params - The parameters to be passed into the query (optional).
 * @returns {Promise<Array>} - A promise that resolves to the result of the query, or an empty array if no results.
 * @throws {Error} - Throws an error if the query fails.
 */
export async function query(sql, params) {
  try {
    const [results] = await pool.query(sql, params);

    if (results.length > 0) {
      return results;
    } else {
      return [];
    }
  } catch (error) {
    console.error("db.js: Database query error:", error);
    throw new Error("Database query failed: " + error.message);
  }
}
