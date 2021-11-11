const HttpError = require("../models/http-error");
const { v4: uuid } = require("uuid");
const DUMMY_DATA = [
  {
    subject_id: "sub1",
    teacher_id: "t1",
    name: "CS101",
    schedule: {
      mon: [1730, 1830, 0],
      tue: [],
      wed: [1300, 1400, 10],
      thu: [],
      fri: [1800, 1900, 20],
      sat: [],
      sun: [],
    },
    meet_link: "test_link",
    max_capacity: 10,
    attendees: [],
  },
];

const getSubjectById = (req, res, next) => {
  const id = req.params.id;
  const subject = DUMMY_DATA.find((x) => x.subject_id === id);
  if (!subject) {
    return next(
      new HttpError("Could not find a subject for the provided id", 404)
    );
  }
  res.json({ message: subject });
};

const createSubject = (req, res, next) => {
  const { teacher_id, name, schedule, meet_link, max_capacity, attendees } =
    req.body;
  const createdSubject = {
    subject_id: uuid().slice(0, 8),
    teacher_id,
    name,
    schedule,
    meet_link,
    max_capacity,
    attendees,
  };
  DUMMY_DATA.push(createSubject);

  res.status(201).json({ subject: createdSubject });
};

const updateSubject = (req, res, next) => {
  const { teacher_id, name, schedule, meet_link, max_capacity, attendee } =
    req.body;
  const id = req.params.id;
  const updatedSubject = { ...DUMMY_DATA.find((sub) => sub.subject_id === id) };
  if (!updatedSubject) {
    return next(
      new HttpError("Could not find a subject for the provided id", 404)
    );
  }
  res.status(200).json({ subject: updatedSubject });
};

const deleteSubject = (req, res, next) => {
  const id = req.params.id;
  res.status(200).json({ message: "Deleted" });
};

exports.getSubjectById = getSubjectById;
exports.createSubject = createSubject;
exports.updateSubject = updateSubject;
exports.deleteSubject = deleteSubject;
