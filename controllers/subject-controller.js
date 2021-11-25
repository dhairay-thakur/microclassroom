const HttpError = require("../models/http-error");
const { v4: uuid } = require("uuid");
const mongoose = require("mongoose");
const Subject = require("../models/subject-model");
const Student = require("../models/student-model");
const Teacher = require("../models/teacher-model");

const DUMMY_DATA = [
  {
    subject_id: "sub1",
    teacher_id: "t1",
    name: "CS101",
    schedule: {
      mon: [1730, 1830, 1],
      tue: [],
      wed: [1300, 1400, 11],
      thu: [],
      fri: [1800, 1900, 21],
      sat: [],
      sun: [],
    },
    meet_link: "test_link",
    max_capacity: 10,
    attendees: [],
  },
];

const getSubjectById = async (req, res, next) => {
  const subjectId = req.params.id;
  let subject;
  try {
    subject = await Subject.findById(subjectId);
  } catch (error) {
    return next(new HttpError("Could not find subject", 500));
  }

  if (!subject) {
    return next(
      new HttpError("Could not find a subject for the provided id", 404)
    );
  }
  res.json({ subject: subject.toObject({ getters: true }) });
};

const createSubject = async (req, res, next) => {
  const {
    teacher,
    name,
    schedule,
    meetLink,
    maxCapacity,
    attendees,
    description,
  } = req.body;
  const createdSubject = new Subject({
    teacher,
    name,
    description,
    schedule,
    meetLink,
    maxCapacity,
    attendees,
  });

  let teacherId;
  try {
    teacherId = await Teacher.findById(teacher);
  } catch (error) {
    return next(new HttpError("Unable to create subject", 500));
  }
  if (!teacherId) {
    return next(new Error("Teacher does not exist!"));
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdSubject.save({ session: sess });
    teacherId.subjects.push(createdSubject);
    await teacherId.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      "Creating SUbject Failed, Please try again later",
      500
    );
    return next(error);
  }

  res.status(201).json({ subject: createdSubject });
};

const updateSubject = async (req, res, next) => {
  const { name, schedule, meetLink, maxCapacity, description } = req.body;
  const subjectId = req.params.id;
  let subject;
  try {
    subject = await Subject.findById(subjectId);
  } catch (error) {
    return next(new HttpError("Could not Update Subject", 500));
  }

  if (!subject) {
    return next(
      new HttpError("Could not find a subject for the provided id", 404)
    );
  }
  if (name) subject.name = name;
  if (schedule) subject.schedule = schedule;
  if (meetLink) subject.meetLink = meetLink;
  if (maxCapacity) subject.maxCapacity = maxCapacity;
  if (description) subject.description = description;

  try {
    await subject.save();
  } catch (err) {
    const error = new HttpError(
      "Updating SUbject Failed, Please try again later",
      500
    );
    return next(error);
  }

  res.status(200).json({ subject });
};

const deleteSubject = async (req, res, next) => {
  const subjectId = req.params.id;

  let subject;
  try {
    subject = await Subject.findById(subjectId)
      .populate("teacher")
      .populate("attendees");
  } catch (error) {
    console.log(error);
    return next(
      new HttpError("Could not Delete Subject. Please try later", 500)
    );
  }

  if (!subject) {
    return next(
      new HttpError("Could not find a subject for the provided id", 404)
    );
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await subject.remove();
    subject.teacher.subjects.pull(subject);
    await subject.teacher.save({ session: sess });
    console.log(subject.attendees);
    for (const student of subject.attendees) {
      student.subjects.pull(subject);
      await student.save({ session: sess });
    }
    await sess.commitTransaction();
  } catch (error) {
    await sess.abortTransaction();
    console.log(error);
    return next(new HttpError("Could not Delete Subject", 500));
  }
  res.status(200).json({ message: "Deleted Subject Successfully" });
};

const joinSubject = async (req, res, next) => {
  const { studentId } = req.body;
  const subjectId = req.params.id;
  let subject, student;
  try {
    subject = await Subject.findById(subjectId);
  } catch (error) {
    return next(new HttpError("Could not add attendee", 500));
  }

  if (!subject) {
    return next(
      new HttpError("Could not find a subject for the provided id", 404)
    );
  }

  try {
    student = await Student.findById(studentId);
  } catch (error) {
    return next(new HttpError("Could not add attendee", 500));
  }

  if (!student) {
    return next(
      new HttpError("Could not find a subject for the provided id", 404)
    );
  }
  if (student.subjects.includes(subjectId)) {
    return next(new HttpError("Student already enrolled", 400));
  }
  subject.attendees.push(studentId);
  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await subject.save({ session: sess });
    student.subjects.push(subjectId);
    await student.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      "Creating SUbject Failed, Please try again later",
      500
    );
    return next(error);
  }

  res.status(200).json({ subject });
};

exports.getSubjectById = getSubjectById;
exports.createSubject = createSubject;
exports.updateSubject = updateSubject;
exports.deleteSubject = deleteSubject;
exports.joinSubject = joinSubject;
