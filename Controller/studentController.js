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
const compress = require("../utilities/compressRes");
const { verify } = require("../utilities/authentication");

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
    const response = {
      success: false,
      message: result.error.message,
      data: {},
    };
    compress(response);
    res.status(500).send(response);
    next(result.error);
  } else {
    connection.query(sqlQuery, value, (err, results, fields) => {
      if (err) {
        const response = {
          success: false,
          message: err.message,
          data: {},
        };
        compress(response);
        res.status(500).send(response);
        next(err);

        next(err);
        // throw new customErrorHandler(400, err);
      } else {
        const response = {
          success: true,
          message: `${result.affectedRows} rows affected`,
          data: results,
        };
        compress(response);

        res.status(200).send({
          response,
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
    const response = {
      success: false,
      message: result.error.message,
      data: {},
    };
    compress(response);
    res.status(500).send(response);
    next(result.error);
  } else {
    connection.query(sqlQuery, values, (err, results, fields) => {
      if (err) {
        const response = {
          success: false,
          message: err.message,
          data: {},
        };
        compress(response);
        res.status(500).send(response);
        next(err);
      } else {
        const response = {
          success: true,
          message: `${result.affectedRows} rows affected`,
          data: results,
        };
        compress(response);

        res.status(200).send({
          response,
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
    const response = {
      success: false,
      message: result.error.message,
      data: {},
    };
    compress(response);
    res.status(500).send(response);
    next(result.error);
  } else {
    connection.query(sqlQuery, value, (err, results, fields) => {
      if (err) {
        const response = {
          success: false,
          message: err.message,
          data: {},
        };
        compress(response);
        res.status(500).send(response);
        next(err);
      } else {
        const response = {
          success: true,
          message: `${result.affectedRows} rows affected`,
          data: results,
        };
        compress(response);

        res.status(200).send({
          response,
        });
      }
    });
  }
};

const readAll = (req, res, next) => {
  const sqlQuery = "select id, student_name, department, cgpa from student;";
  connection.query(sqlQuery, (err, results, fields) => {
    if (err) {
      const response = {
        success: false,
        message: err.message,
        data: {},
      };
      compress(response);
      res.status(500).send(response);
      next(err);
    } else {
      const response = {
        success: true,
        message: "Rows retrived",
        data: results,
      };
      compress(response);

      res.status(200).send({
        response,
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
    const response = {
      success: false,
      message: result.error.message,
      data: {},
    };
    compress(response);
    res.status(500).send(response);
    next(result.error);
  } else {
    connection.query(sqlQuery, value, (err, results, fields) => {
      if (err) {
        const response = {
          success: false,
          message: err.message,
          data: {},
        };
        compress(response);
        res.status(500).send(response);
        next(err);
        next(err);
      } else {
        const response = {
          success: true,
          message: "Verified and Rows retrived",
          data: results,
        };
        compress(response);
        verify(response.data[0].id);
        res.status(200).send({
          response,
        });
      }
    });
  }
};

const login = (req, results, next) => {
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
    const response = {
      success: true,
      message: result.value,
      data: results,
    };
    compress(response);

    res.status(200).send({
      response,
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
