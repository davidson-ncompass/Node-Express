const Joi = require("joi");

const studentSchema = Joi.object({
  id: Joi.string().max(4).min(4).alphanum().required(),
  student_name: Joi.string().required(),
  department: Joi.string().required(),
  cgpa: Joi.number().required(),
});

const updateSchema = Joi.object({
  id: Joi.string().max(4).min(4).alphanum().required(),
  student_name: Joi.string().required(),
});

const deleteSchema = Joi.object({
  id: Joi.string().max(4).min(4).alphanum().required(),
});

const readStudentSchema = Joi.object({
  id: Joi.string().max(4).min(4).alphanum().required(),
});

const loginSchema = Joi.object({
  username: Joi.string().email().required(),
  password: Joi.string()
    .min(8)
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .required(),
});

module.exports = {
  studentSchema,
  updateSchema,
  deleteSchema,
  loginSchema,
  readStudentSchema,
};
