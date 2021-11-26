const express = require("express");

const router = express.Router();

const teachersController = require("../controllers/teachers-controller");

router.get("/:id", teachersController.getTeacherById);

router.get("/schedule/:id", teachersController.getScheduleById);

router.post("/signup", teachersController.signup);

router.post("/login", teachersController.login);

module.exports = router;
