// Middlewares/validator.js
const { registerSchema, loginSchema } = require("../validator/auth-validator");

const registerValidator = (req, res, next) => {
  const { value, error } = registerSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  // if (value.password !== value.confirmPassword) {
  //   return res.status(400).json({ message: "Passwords do not match" });
  // }

  const { confirmPassword, ...validInput } = value;
  req.input = validInput;
  console.log("Validated Register Input:", req.input);
  next();
};

const loginValidator = (req, res, next) => {
  const { value, error } = loginSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  req.input = value;
  console.log("Validated Login Input:", req.input);
  next();
};

module.exports = { registerValidator, loginValidator };
