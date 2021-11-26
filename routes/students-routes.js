const express = require("express");

const { check } = require("express-validator");

const studentsController = require("../controllers/students-controller");
const router = express.Router();

router.get("/:id", studentsController.getStudentById);

router.get("/schedule/:id", studentsController.getScheduleById);

router.post("/signup", studentsController.signup);

router.post("/login", studentsController.login);

module.exports = router;
