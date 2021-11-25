const HttpError = require("../models/http-error");

const Teacher = require("../models/teacher-model");

const getTeacherById = async (req, res, next) => {
  const id = req.params.id;
  let teacher;
  try {
    teacher = await Teacher.findById(id).populate("subjects");
  } catch (error) {
    return next(new HttpError("Could not find teacher", 500));
  }

  if (!teacher) {
    return next(
      new HttpError("Could not find a teacher for the provided id", 404)
    );
  }
  res.json({ teacher });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingTeacher;
  try {
    existingTeacher = await Teacher.findOne({ email: email });
  } catch (error) {
    return next(new HttpError("Login Failed, Please Try Again Later"));
  }

  if (!existingTeacher) {
    return next(
      new Error("Could not identify user, credentials seem to be wrong")
    );
  }

  // let isValidPassword;
  // try {
  //   isValidPassword = await bcrypt.compare(password, existingTeacher.password);
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
  //       userId: existingTeacher.id,
  //       email: existingTeacher.email,
  //       name: existingTeacher.name,
  //     },
  //     "sellitup-private-key",
  //     { expiresIn: "7d" }
  //   );
  // } catch (error) {
  //   console.log(error);
  //   return next(new Error("Login Failed, Please Try Again Later"));
  // }

  res.json({ teacher: existingTeacher.toObject({ getters: true }) });
};

const signup = async (req, res, next) => {
  const { name, email, password, phone, rollNo } = req.body;

  let existingUser;
  try {
    existingUser = await Teacher.findOne({ email: email });
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

  const createdUser = new Teacher({
    name,
    email,
    password,
    phone,
    subjects: [],
  });

  try {
    await createdUser.save();
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

  res.status(201).json({ teacher: createdUser.toObject({ getters: true }) });
};

exports.getTeacherById = getTeacherById;
exports.login = login;
exports.signup = signup;
