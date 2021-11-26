const express = require("express");

const router = express.Router();

const subjectController = require("../controllers/subject-controller");

router.get("/:id", subjectController.getSubjectById);

router.post("/", subjectController.createSubject);

router.patch("/join/:id", subjectController.joinSubject);

router.patch("/:id", subjectController.updateSubject);

router.delete("/:id", subjectController.deleteSubject);

module.exports = router;
