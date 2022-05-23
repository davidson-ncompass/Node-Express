const { connection } = require("../utilities/connection");
const {
  studentSchema,
  updateSchema,
  deleteSchema,
  readStudentSchema,
  loginSchema,
} = require("../modules/validationSchema");
const { status } = require("express/lib/response");
const customErrorHandler = require("../error/customErrorHandler");

const insertStudent = (req, res, next) => {
  const studentDetails = req.query;
  const sqlQuery =
    "insert into student (id, student_name, department, cgpa) values (?,?,?,?);";
  const value = [
    studentDetails.id,
    studentDetails.student_name,
    studentDetails.department,
    studentDetails.cgpa,
  ];
  const result = studentSchema.validate(studentDetails);
  if (result.error) {
    res.status(500).send({
      status: status,
      success: false,
      message: result.error.message,
      data: {},
    });
    next(result.error);
  } else {
    connection.query(sqlQuery, value, (err, result, fields) => {
      if (err) {
        // res.status(500).send({
        //   success: false,
        //   message: err.message,
        //   data: {},
        // });
        // next(err);
        throw new customErrorHandler(400, err);
      } else {
        res.status(200).send({
          status: status,
          success: true,
          message: `${result.affectedRows} row affected`,
          data: {},
        });
      }
    });
  }
};

const updateStudent = (req, res, next) => {
  const updateDetails = req.query;
  const sqlQuery = "update student set student_name = ? where id = ?;";
  const values = [updateDetails.student_name, updateDetails.id];

  const result = updateSchema.validate(updateDetails);
  if (result.error) {
    res.status(500).send({
      success: false,
      message: result.error.message,
      data: {},
    });
  } else {
    connection.query(sqlQuery, values, (err, result, fields) => {
      if (err) {
        res.status(500).send({
          success: false,
          message: err.message,
          data: {},
        });
        next(err);
      } else {
        res.status(200).send({
          success: true,
          message: `${result.affectedRows} rows affected`,
          data: {},
        });
      }
    });
  }
  next();
};

const deleteStudent = (req, res, next) => {
  const studentID = req.query;
  const sqlQuery = "delete from student where id =?;";
  const value = [studentID.id];
  const result = deleteSchema.validate(studentID);
  if (result.error) {
    res.status(500).send({
      success: false,
      message: result.error.message,
      data: {},
    });
  } else {
    connection.query(sqlQuery, value, (err, results, fields) => {
      if (err) {
        // res.status(500).send({
        //   success: false,
        //   message: err.message,
        //   data: {},
        // });
        // next(err);
      } else {
        res.status(200).send({
          success: true,
          message: `${result.affectedRows} rows affected`,
          data: {},
        });
      }
    });
  }
};

const readAll = (req, res, next) => {
  const sqlQuery = "select id, student_name, department, cgpa from student;";
  connection.query(sqlQuery, (err, results, fields) => {
    if (err) {
      res.status(500).send({
        success: false,
        message: err.message,
        data: {},
      });
      next(err);
    } else {
      res.status(200).send({
        success: true,
        message: "Rows retrived",
        data: results.map((result) => result),
      });
    }
  });
};

const readOne = (req, res, next) => {
  const studentDetail = req.query;
  const sqlQuery =
    "select id, student_name, department, cgpa from student where id =?;";
  const value = [studentDetail.id];

  const result = readStudentSchema.validate(studentDetail);
  if (result.error) {
    res.status(500).send({
      success: false,
      message: result.error.message,
      data: {},
    });
  } else {
    connection.query(sqlQuery, value, (err, results, fields) => {
      if (err) {
        res.status(500).send({
          success: false,
          message: err.message,
          data: {},
        });
        next(err);
      } else {
        res.status(200).send({
          success: true,
          message: "Record Retrived",
          data: results.map((result) => result),
        });
      }
    });
  }
};

const login = (req, res, next) => {
  const loginDetails = req.query;
  const result = loginSchema.validate(loginDetails);
  if (result.error) {
    res.status(500).send({
      success: false,
      message: result.error.message,
      data: {},
    });
    next(result.error);
  } else {
    res.status(200).send({
      success: true,
      message: result.value,
      data: {},
    });
  }
};

module.exports = {
  insertStudent,
  updateStudent,
  deleteStudent,
  readAll,
  readOne,
  login,
};
