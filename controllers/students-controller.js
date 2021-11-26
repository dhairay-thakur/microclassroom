const HttpError = require("../models/http-error");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Student = require("../models/student-model");
const { createSubject } = require("./subject-controller");

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

const getStudentById = async (req, res, next) => {
  const id = req.params.id;
  let student;
  try {
    student = await (await Student.findById(id)).populate("subjects");
  } catch (error) {
    return next(new HttpError("Could not find student", 500));
  }

  if (!student) {
    return next(
      new HttpError("Could not find a student for the provided id", 404)
    );
  }
  res.json({ student: student.toObject({ getters: true }) });
};

const getScheduleById = async (req, res, next) => {
  const id = req.params.id;
  let student;
  try {
    student = await Student.findById(id).populate("subjects");
  } catch (error) {
    return next(new HttpError("Could not find student", 500));
  }

  if (!student) {
    return next(
      new HttpError("Could not find a student for the provided id", 404)
    );
  }
  const subjects = student.subjects;
  subjects.forEach((subject) => {
    subject.toObject({ getters: true });
  });
  res.json({ subjects });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingStudent;
  try {
    existingStudent = await Student.findOne({ email: email });
  } catch (error) {
    return next(new HttpError("Login Failed, Please Try Again Later"));
  }

  if (!existingStudent) {
    return next(
      new Error("Could not identify user, credentials seem to be wrong")
    );
  }

  let isValidPassword;
  try {
    isValidPassword = await bcrypt.compare(password, existingStudent.password);
  } catch (error) {
    console.log(error);
    return next(new HttpError("Login Failed, Please Try Again Later", 500));
  }

  if (!isValidPassword) {
    return next(new HttpError("Wrong Password", 400));
  }

  let token;
  try {
    token = jwt.sign(
      {
        userId: existingStudent.id,
        email: existingStudent.email,
        name: existingStudent.name,
        isStudent: true,
      },
      "micro-classroom-private-key",
      { expiresIn: "7d" }
    );
  } catch (error) {
    console.log(error);
    return next(new HttpError("Login Failed, Please Try Again Later", 500));
  }

  res.status(201).json({ token });
};

const signup = async (req, res, next) => {
  const { name, email, password, phone, rollNo } = req.body;

  let existingUser;
  try {
    existingUser = await Student.findOne({ email: email });
  } catch (error) {
    console.log(error);
    return next(new HttpError("Signup Failed, Please Try Again Later"));
  }

  if (existingUser) {
    return next(new HttpError("User Already Exists, Please Login Instead"));
  }

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (error) {
    console.log(error);
    return next(new Error("Signup Failed, Please Try Again Later"));
  }

  const createdUser = new Student({
    name,
    email,
    password: hashedPassword,
    phone,
    rollNo,
    subjects: [],
  });
  console.log(createdUser);
  try {
    await createdUser.save();
  } catch (error) {
    console.log(error);
    return next(new HttpError("Signup Failed, Please Try Again Later"));
  }
  console.log(createdUser);
  let token;
  try {
    token = jwt.sign(
      {
        userId: createdUser.id,
        email: createdUser.email,
        name: createdUser.name,
        isStudent: true,
      },
      "micro-classroom-private-key",
      { expiresIn: "7d" }
    );
  } catch (error) {
    console.log(error);
    return next(new HttpError("Signup Failed, Please Try Again Later", 400));
  }

  res.status(201).json({ token });
};

exports.getStudentById = getStudentById;
exports.getScheduleById = getScheduleById;
exports.login = login;
exports.signup = signup;
