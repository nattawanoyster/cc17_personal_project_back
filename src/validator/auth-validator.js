const Joi = require("joi");

const registerSchema = Joi.object({
  username: Joi.string().required().trim(),
  email: Joi.alternatives([Joi.string().email({ tlds: false })])
    .required()
    .strip(),
  password: Joi.string()
    .required()
    .trim()
    .pattern(/^[0-9a-zA-Z]{1,20}$/),
  confirmPassword: Joi.string().required().valid(Joi.ref("password")).strip(),
});

module.exports = { registerSchema };
