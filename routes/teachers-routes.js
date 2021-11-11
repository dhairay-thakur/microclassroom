const express = require("express");

const { check } = require("express-validator");

const router = express.Router();

const teachersController = require("../controllers/teachers-controller");

router.get("/:id", teachersController.getTeacherById);

router.post("/signup", teachersController.signup);

router.post("/login", teachersController.login);

module.exports = router;
