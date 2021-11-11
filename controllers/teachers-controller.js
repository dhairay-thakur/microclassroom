const HttpError = require("../models/http-error");

const DUMMY_DATA = [
  {
    teacher_id: "t1",
    name: "Dhairay",
    email: "test@teacher.com",
    phone: "1234567890",
    subjects: [],
  },
];

const getTeacherById = (req, res, next) => {
  const id = req.params.id;
  const teacher = DUMMY_DATA.find((x) => x.teacher_id === id);
  if (!teacher) {
    return next(
      new HttpError("Could not find a teacher for the provided id", 404)
    );
  }
  res.json({ message: teacher });
};

const login = (req, res, next) => {};

const signup = (req, res, next) => {};


exports.getTeacherById = getTeacherById;
exports.login = login;
exports.signup = signup;
