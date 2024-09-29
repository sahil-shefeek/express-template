import { query } from "../../services/db.js";
import { v4 as uuid } from "uuid";
import bcrypt from "bcrypt";

const getAll = async () => {
  return await query("SELECT * FROM users");
};

const get = async ({ id = null, email = null, refresh_token = null }) => {
  if (email) {
    const res = await query("SELECT * FROM users WHERE email = ?", [email]);
    if (res.length < 1) {
      throw { status: 404, message: "User not found" };
    }
    return res[0];
  } else if (id) {
    const res = await query("SELECT * FROM users WHERE id = ?", [id]);
    if (res.length < 1) {
      throw { status: 404, message: "User not found" };
    }
    return res[0];
  } else if (refresh_token) {
    const res = await query("SELECT * FROM users WHERE refresh_token = ?", [
      refresh_token,
    ]);
    if (res.length < 1) {
      throw { status: 404, message: "User not found" };
    }
    return res[0];
  } else {
    console.error("Please specifiy the lookup field for .get()");
  }
};

const add = async (userDetails) => {
  const { name, password, gender, email, address, phone, photo } = userDetails;
  const id = uuid();

  try {
    const existingUser = await query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    if (existingUser?.length) {
      return {
        success: false,
        message: "A user with this email already exists.",
      };
    }

    const hashedPasswd = await bcrypt.hash(password, 10);

    const fields = ["id", "name", "password", "email"];
    const values = [id, name, hashedPasswd, email];
    const placeholders = ["?", "?", "?", "?"];

    if (gender) {
      fields.push("gender");
      values.push(gender);
      placeholders.push("?");
    }
    if (address) {
      fields.push("address");
      values.push(address);
      placeholders.push("?");
    }
    if (phone) {
      fields.push("phone");
      values.push(phone);
      placeholders.push("?");
    }
    if (photo) {
      fields.push("photo");
      values.push(photo);
      placeholders.push("?");
    }

    const sql = `
      INSERT INTO users (${fields.join(", ")})
      VALUES (${placeholders.join(", ")})
    `;

    await query(sql, values);

    const createdUser = await get(id, null);

    return {
      success: true,
      createdUser,
    };
  } catch (error) {
    console.error(error);
    throw new Error("Error creating user: " + error.message);
  }
};

export const update = async (id, userDetails) => {
  try {
    const {
      name,
      password,
      refresh_token,
      gender,
      email,
      address,
      phone,
      photo,
    } = userDetails;

    const fields = [];
    const values = [];

    if (name) {
      fields.push("name = ?");
      values.push(name);
    }
    if (password) {
      fields.push("password = ?");
      values.push(password);
    }
    if (refresh_token) {
      fields.push("refresh_token = ?");
      if (refresh_token === "null") values.push(null);
      else values.push(refresh_token);
    }
    if (gender) {
      fields.push("gender = ?");
      values.push(gender);
    }
    if (email) {
      fields.push("email = ?");
      values.push(email);
    }
    if (address) {
      fields.push("address = ?");
      values.push(address);
    }
    if (phone) {
      fields.push("phone = ?");
      values.push(phone);
    }
    if (photo) {
      fields.push("photo = ?");
      values.push(photo);
    }

    if (fields.length === 0) {
      throw { status: 400, message: "No fields provided for update" };
    }

    values.push(id);

    const sql = `UPDATE users SET ${fields.join(", ")} WHERE id = ?`;
    const result = await query(sql, values);
    if (result.affectedRows === 0) {
      throw { status: 404, message: "User not found" };
    }
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const replace = async (id, userDetails) => {
  const {
    name,
    password,
    refresh_token,
    gender,
    email,
    address,
    phone,
    photo,
  } = userDetails;

  const sql = `
    UPDATE users 
    SET name = ?, password = ?, refresh_token = ?, gender = ?, email = ?, address = ?, phone = ?, photo = ? 
    WHERE id = ?`;

  const result = await query(sql, [
    name,
    password,
    refresh_token,
    gender,
    email,
    address,
    phone,
    photo,
    id,
  ]);

  if (result.affectedRows === 0) {
    throw { status: 404, message: "User not found" };
  }
  return result;
};

const remove = async (id) => {
  const result = await query("DELETE FROM users WHERE id = ?", [id]);
  if (result.affectedRows === 0) {
    throw { status: 404, message: "User not found" };
  }
};

export default { getAll, get, add, update, remove };
