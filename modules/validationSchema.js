const Joi = require("joi");

const studentSchema = Joi.object({
  id: Joi.string().max(4).min(4).alphanum(),
  student_name: Joi.string(),
  department: Joi.string(),
  cgpa: Joi.number(),
});

const loginSchema = Joi.object({
  username: Joi.string().email().required(),
  password: Joi.string()
    .required()
    .max(8)
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
});

module.exports = { studentSchema, loginSchema };
