const router = require("express").Router();

const authenticateUser = require("../validation/authValidation");
const {
  insertStudent,
  deleteStudent,
  updateStudent,
  readAll,
  readOne,
  login,
} = require("../Controller/studentController");
const {
  createValidation,
  updateValidation,
  deleteValidation,
  readOneValidation,
  loginValidation,
} = require("../validation/validationController");

router.get("/", (req, res, next) => {
  console.log("This is middleware");
  res.json("Welcome");
  next();
});
router.get("/login", loginValidation, login);
router.get("/create", authenticateUser, createValidation, insertStudent);
router.get("/update", authenticateUser, updateValidation, updateStudent);
router.get("/delete", authenticateUser, deleteValidation, deleteStudent);
router.get("/display-all-student-record", authenticateUser, readAll);
router.get(
  "/display-student-record",
  authenticateUser,
  readOneValidation,
  readOne
);

module.exports = router;
