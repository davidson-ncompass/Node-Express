const router = require("express").Router();

const errorHandler = require("../error/errorHandler");

const {
  insertStudent,
  deleteStudent,
  updateStudent,
  readAll,
  readOne,
  login,
} = require("../Controller/studentController");

// router.get("/read/", readStudent);
router.get("/", (req, res, next) => {
  console.log("This is middleware");
  res.json("Welcome");
  next();
});
router.get("/display-all-student-record", readAll);
router.get("/display-student-record", readOne);
router.get("/create", insertStudent);
router.use(errorHandler);
router.get("/update", updateStudent);
router.get("/delete", deleteStudent);
router.get("/login", login);

module.exports = router;
