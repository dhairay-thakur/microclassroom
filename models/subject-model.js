const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const subjectSchema = new Schema({
  teacher: { type: mongoose.Types.ObjectId, required: true, ref: "Teachers" },
  name: { type: String, required: true },
  description: { type: String },
  meetLink: { type: String },
  maxCapacity: { type: Number, required: true },
  schedule: { type: Array, required: true },
  attendees: [
    { type: mongoose.Types.ObjectId, required: true, ref: "Students" },
  ],
});

module.exports = mongoose.model("Subjects", subjectSchema);
