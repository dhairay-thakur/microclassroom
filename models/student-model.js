const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const studentSchema = new Schema({
  rollNo: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  phone: { type: String, required: true },
  subjects: [
    {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Subjects",
    },
  ],
});

studentSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Students", studentSchema);
