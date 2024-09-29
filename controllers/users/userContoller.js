import users from "../../models/users/users.js";

export const getAllUsers = async (req, res) => {
  try {
    const usersList = await users.getAll();
    res.json(usersList);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving users" });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await users.get({
      id: req.params?.id,
      email: req.params?.email,
    });
    res.json(user);
  } catch (error) {
    if (error.status === 404) {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Error retrieving user" });
    }
  }
};

export const createUser = async (req, res) => {
  try {
    const result = await users.add(req.body);

    if (!result.success) {
      // If a duplicate email was found
      return res.status(400).json({
        message: result.message,
      });
    }

    const { id, name, gender, email, address, phone, photo } =
      result.createdUser;

    res.status(201).json({
      id,
      name,
      gender,
      email,
      address,
      phone,
      photo,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;

  try {
    await users.update(id, req.body);
    const updatedUser = await users.get({ id });
    res.json({ updatedUser });
  } catch (error) {
    if (error.status === 404) {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Error updating user" });
    }
  }
};

export const replaceUser = async (req, res) => {
  const { id } = req.params;

  try {
    await users.replace(id, req.body);

    const replacedUser = await users.get({ id });
    res.json({ replacedUser });
  } catch (error) {
    if (error.status === 404) {
      res.status(404).json({ error: error.message });
    } else if (error.status === 400) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Error replacing user" });
    }
  }
};

export const deleteUser = async (req, res) => {
  try {
    await employees.remove(req.params.e_no);
    res.status(204).end();
  } catch (error) {
    if (error.status === 404) {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Error deleting employee" });
    }
  }
};
