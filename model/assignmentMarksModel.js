const { Schema, model } = require("mongoose");

const assignmentMarkModel = new Schema(
 {
  ass_mark_id: {
   type: String,
   required: true,
  },
  student_id: {
   type: String,
   required: true,
  },
  student_name: {
   type: String,
   required: true,
  },
  assignment_id: {
   type: String,
   required: true,
  },
  title: {
   type: String,
   required: true,
  },
  total_mark: {
   type: Number,
   required: true,
  },
  mark: {
   type: Number,
   required: true,
  },
  repo_link: {
   type: String,
   required: true,
  },
  status: {
   type: String,
   required: true,
  },
 },
 {
  timestamps: true,
 }
);

const assignmentMark = model(
 "learning_portal_assignment_mark",
 assignmentMarkModel
);
module.exports = assignmentMark;
