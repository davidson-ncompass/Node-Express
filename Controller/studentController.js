const { connection } = require("../utilities/connection");
const customErrorHandler = require("../utilities/errorHandler/customErrorHandler");
const { compress, compressGzip } = require("../utilities/compressRes");
const { sign, verify } = require("../utilities/auth/authentication");

const insertStudent = (req, res, next) => {
  const studentDetails = req.query;
  const sqlQuery = "insert into std_table (id, email) values (?,?);";
  const value = [studentDetails.id, studentDetails.email];

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
        message: `${results.affectedRows} rows affected`,
        data: {},
      };
      compress(response);
      res.status(200).send({
        response,
      });
    }
  });
};

const updateStudent = (req, res, next) => {
  const updateDetails = req.query;
  const sqlQuery = "update std_table set student_name = ? where id = ?;";
  const values = [updateDetails.student_name, updateDetails.id];

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
        message: `${results.affectedRows} rows affected`,
        data: {},
      };
      compress(response);
      res.status(200).send({
        response,
      });
    }
  });
  next();
};

const deleteStudent = (req, res, next) => {
  const studentID = req.query;
  const sqlQuery = "delete from std_table where id =?;";
  const value = [studentID.id];

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
        message: `${results.affectedRows} rows affected`,
        data: {},
      };
      compress(response);
      res.status(200).send({
        response,
      });
    }
  });
};

const readAll = (req, res, next) => {
  const sqlQuery = "select id, email from std_table;";
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
      compressGzip(response);
      res.status(200).send({
        response,
      });
    }
  });
};

const readOne = (req, res, next) => {
  const studentDetail = req.query;
  const sqlQuery = "select id, email from std_table where id =?;";
  const value = [studentDetail.id];

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
};

const login = (req, res, next) => {
  const loginDetails = req.query;
  const query = "Select id from std_table where id =?;";
  const value = loginDetails.id;

  connection.query(query, value, (err, results, fields) => {
    if (err) {
      const response = {
        success: false,
        message: err.message,
        data: {},
      };
      compress(response);
      res.status(500).send(response);
    } else {
      const jwt = sign(loginDetails.id);
      const response = {
        success: true,
        token: jwt,
        message: "Token Genereted and Rows retrived",
        data: results,
      };
      compress(response);
      res.status(200).send({
        response,
      });
    }
  });
};

module.exports = {
  insertStudent,
  updateStudent,
  deleteStudent,
  readAll,
  readOne,
  login,
};
