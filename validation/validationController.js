const { compress, compressGzip } = require("../utilities/compressRes");
const {
  studentSchema,
  updateSchema,
  deleteSchema,
  readStudentSchema,
  loginSchema,
} = require("../validation/validationSchema");

const createValidation = (req, res, next) => {
  studentDetails = req.query;
  const result = studentSchema.validate(studentDetails);
  if (result.error) {
    const response = {
      success: false,
      message: result.error.message,
      data: {},
    };
    compress(response);
    res.status(500).send(response);
    next(result.error);
  } else {
    next();
  }
};

const updateValidation = (req, res, next) => {
  const updateDetails = req.query;
  const result = updateSchema.validate(updateDetails);
  if (result.error) {
    const response = {
      success: false,
      message: result.error.message,
      data: {},
    };
    compress(response);
    res.status(500).send(response);
    next(result.error);
  } else {
    next();
  }
};

const deleteValidation = (req, res, next) => {
  const studentId = req.query;
  const result = deleteSchema.validate(studentId);
  if (result.error) {
    const response = {
      success: false,
      message: result.error.message,
      data: {},
    };
    compress(response);
    res.status(500).send(response);
    next(result.error);
  } else {
    next();
  }
};

const readOneValidation = (req, res, next) => {
  const studentDetail = req.query;
  const result = readStudentSchema.validate(studentDetail);
  if (result.error) {
    const response = {
      success: false,
      message: result.error.message,
      data: {},
    };
    compress(response);
    res.status(500).send(response);
    next(result.error);
  } else {
    next();
  }
};

const loginValidation = (req, res, next) => {
  const loginDetails = req.query;
  const result = loginSchema.validate(loginDetails);
  if (result.error) {
    const response = {
      success: false,
      message: result.error.message,
      data: {},
    };
    compress(response);
    res.status(500).send(response);
    next(result.error);
  } else {
    next();
  }
};

module.exports = {
  createValidation,
  updateValidation,
  deleteValidation,
  readOneValidation,
  loginValidation,
};
