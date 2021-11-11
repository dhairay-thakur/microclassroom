const HttpError = require("../models/http-error");

const DUMMY_DATA = [
  {
    student_id: "s1",
    roll_number: "18045117",
    name: "Dhairay",
    email: "test@student.com",
    phone: "9711710000",
    subjects: [],
  },
];

const getStudentById = (req, res, next) => {
  const id = req.params.id;
  const student = DUMMY_DATA.find((x) => x.student_id === id);
  if (!student) {
    return next(
      new HttpError("Could not find a student for the provided id", 404)
    );
  }
  res.json({ message: student });
};

const login = (req, res, next) => {};

const signup = (req, res, next) => {};

exports.getStudentById = getStudentById;
exports.login = login;
exports.signup = signup;
