const router = require("express").Router();

const {
  insertStudent,
  deleteStudent,
  updateStudent,
  readAll,
  readOne,
  login,
} = require("../Controller/studentController");
const authenticateUser = require("../modules/middlewareValidation");

router.get("/", (req, res, next) => {
  console.log("This is middleware");
  res.json("Welcome");
  next();
});
router.get("/login", login);
router.get("/create", authenticateUser, insertStudent);
router.get("/update", authenticateUser, updateStudent);
router.get("/delete", authenticateUser, deleteStudent);
router.get("/display-all-student-record", authenticateUser, readAll);
router.get("/display-student-record", authenticateUser, readOne);

module.exports = router;
