export const employeeValidator = (req, res, next) => {
  const { e_name, salary, d_no, mgr_no, date_of_join, designation } = req.body;

  if (!e_name || !salary || !d_no || !mgr_no || !date_of_join || !designation) {
    return res.status(400).json({
      message: "Validation Error: Missing required fields.",
      required_fields: [
        "e_name",
        "salary",
        "d_no",
        "mgr_no",
        "date_of_join",
        "designation",
      ],
    });
  }
  next();
};
