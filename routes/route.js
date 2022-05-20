const router = require("express").Router();

const {
  createStudent,
  deleteStudent,
  updateStudent,
  readStudent,
  login,
} = require("../Controller/studentController");

router.get("/read", readStudent);
router.post("/create", createStudent);
router.put("/update/:id", updateStudent);
router.delete("/delete/:id", deleteStudent);
router.post("/login", login);

module.exports = { router };
