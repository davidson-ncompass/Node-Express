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
router.post("/create", insertStudent);
router.put("/update", updateStudent);
router.delete("/delete", deleteStudent);
router.get("/display-all-student-record", readAll);
router.get("/display-student-record", readOne);
router.get("/login", login);

module.exports = router;
