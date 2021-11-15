const HttpError = require("../models/http-error");

const Student = require("../models/student-model");

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
  const student = DUMMY_DATA.find((x) => x.student_id === id);
  if (!student) {
    return next(
      new HttpError("Could not find a student for the provided id", 404)
    );
  }
  res.json({ message: student });
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

  // let isValidPassword;
  // try {
  //   isValidPassword = await bcrypt.compare(password, existingStudent.password);
  // } catch (error) {
  //   console.log(error);
  //   return next(new Error("Login Failed, Please Try Again Later"));
  // }

  // if (!isValidPassword) {
  //   return next(new Error("Wrong Password"));
  // }

  // let token;
  // try {
  //   token = jwt.sign(
  //     {
  //       userId: existingStudent.id,
  //       email: existingStudent.email,
  //       name: existingStudent.name,
  //     },
  //     "sellitup-private-key",
  //     { expiresIn: "7d" }
  //   );
  // } catch (error) {
  //   console.log(error);
  //   return next(new Error("Login Failed, Please Try Again Later"));
  // }

  res.json({ student: existingStudent.toObject({ getters: true }) });
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

  // let hashedPassword;
  // try {
  //   hashedPassword = await bcrypt.hash(password, 12);
  // } catch (error) {
  //   console.log(error);
  //   return next(new Error("Signup Failed, Please Try Again Later"));
  // }

  const createdStudent = new Student({
    name,
    email,
    password,
    phone,
    rollNo,
    subjects: [],
  });

  try {
    await createdStudent.save();
  } catch (error) {
    console.log(error);
    return next(new HttpError("Signup Failed, Please Try Again Later"));
  }

  // let token;
  // try {
  //   token = jwt.sign(
  //     {
  //       userId: createdUser.id,
  //       email: createdUser.email,
  //       name: createdUser.name,
  //     },
  //     "sellitup-private-key",
  //     { expiresIn: "7d" }
  //   );
  // } catch (error) {
  //   console.log(error);
  //   return next(new Error("Signup Failed, Please Try Again Later"));
  // }

  res.status(201).json({ student: createdStudent.toObject({ getters: true }) });
};

exports.getStudentById = getStudentById;
exports.login = login;
exports.signup = signup;
