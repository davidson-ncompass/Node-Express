const router = require("express").Router();

const {
  insertStudent,
  deleteStudent,
  updateStudent,
  readAll,
  readOne,
  login,
} = require("../Controller/studentController");

// router.get("/read/", readStudent);
router.get("/", (req, res) => {
  res.json("Welcome to student Crud");
});
router.get("/display-all-student-record", readAll);
router.get("/display-student-record", readOne);
router.get("/create", insertStudent);
router.get("/update", updateStudent);
router.get("/delete", deleteStudent);
router.get("/login", login);

module.exports = router;
