export const departmentValidator = (req, res, next) => {
  const { d_name, dept_hod } = req.body;

  if (!d_name || !dept_hod) {
    return res.status(400).json({
      message: "Validation Error: Missing required fields.",
      required_fields: ["d_name", "dept_hod"],
    });
  }
  next();
};
