export const newUserValidator = (req, res, next) => {
  const { name, password, email, gender, address, phone, photo } = req.body;

  if (!name || !password || !email) {
    return res.status(400).json({
      message: "Validation Error: Missing required fields.",
      required_fields: ["name", "password", "email"],
    });
  }

  if (typeof name !== "string" || name?.length > 36) {
    return res.status(400).json({ message: "Validation Error: Invalid name." });
  }
  if (typeof password !== "string" || password?.length > 64) {
    return res
      .status(400)
      .json({ message: "Validation Error: Invalid password." });
  }
  if (
    typeof email !== "string" ||
    !/^\S+@\S+\.\S+$/.test(email) ||
    email?.length > 256
  ) {
    return res
      .status(400)
      .json({ message: "Validation Error: Invalid email format." });
  }
  if (gender && typeof gender !== "string") {
    return res
      .status(400)
      .json({ message: "Validation Error: Invalid gender." });
  }
  if (address && typeof address !== "string") {
    return res
      .status(400)
      .json({ message: "Validation Error: Invalid address." });
  }
  if (phone && (typeof phone !== "string" || !/^\d{10,12}$/.test(phone))) {
    return res
      .status(400)
      .json({ message: "Validation Error: Invalid phone number." });
  }
  if (photo && typeof photo !== "string") {
    return res
      .status(400)
      .json({ message: "Validation Error: Invalid photo URL." });
  }
  next();
};
