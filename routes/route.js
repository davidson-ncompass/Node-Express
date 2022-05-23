const router = require("express").Router();

const {
  insertStudent,
  deleteStudent,
  updateStudent,
  readAll,
  readOne,
  login,
} = require("../Controller/studentController");
// const { verify, authenticate } = require("../utilities/authentication");

// router.get("/read/", readStudent);
router.get("/", (req, res, next) => {
  console.log("This is middleware");
  res.json("Welcome");
  next();
});
// router.use("/authenticate", authenticate);
router.get("/display-all-student-record", readAll);
router.get("/display-student-record", readOne);
router.get("/create", insertStudent);
router.get("/update", updateStudent);
router.get("/delete", deleteStudent);
router.get("/login", login);

module.exports = router;
