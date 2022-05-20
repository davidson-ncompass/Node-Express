const { connection } = require("../utilities/connection");
const { loginSchema, studentSchema } = require("../modules/validationSchema");

const updateStudent = (req, res) => {
  var qry =
    "UPDATE student SET student_name = ? , department = ?  WHERE id = ?;";
  connection.query(
    qry,
    [req.query.student_name, req.query.department, req.query.id],
    (err, results, fields) => {
      if (err) {
        res.status(500).send(err);
      }
      res.send(`${results.affectedRows} row effected!`);
    }
  );
};

const createStudent = (req, res) => {
  const students = {
    id: req.query.id,
    student_name: req.query.student_name,
    department: req.query.department,
    cgpa: req.query.cgpa,
  };

  const { error } = studentSchema.validate(req.query);
  if (error) {
    console.log(error.message);
    return;
  } else {
    connection.query(
      "INSERT INTO student SET ?",
      students,
      (err, results, fields) => {
        if (err) {
          throw err;
        } else {
          res.send(
            JSON.stringify({ status: 200, error: null, response: results })
          );
        }
      }
    );
  }
};

const deleteStudent = (req, res) => {
  let studentId = req.query.id;
  let sqlQuery = "delete from student where id =?";
  connection.query(sqlQuery, [studentId], (err, results) => {
    if (err) {
      res.status(500).send(err);
    }
    res.send(`${results.affectedRows} row deleted!`);
  });
};

const readStudent = (req, res) => {
  let sqlQuery = "SELECT * FROM student";

  connection.query(sqlQuery, (err, results) => {
    if (err) throw err;
    res.send(JSON.stringify({ status: 200, error: null, response: results }));
  });
};

const login = (req, res) => {
  username = req.query.username;
  password = req.query.password;

  console.log(req.query.username);

  const error = loginSchema.validate(req.body);
  if (error) {
    console.log(error.error.message);
  } else {
    console.log("Validation SuccessFul");
  }
};

(module.exports = createStudent),
  updateStudent,
  deleteStudent,
  readStudent,
  login;
