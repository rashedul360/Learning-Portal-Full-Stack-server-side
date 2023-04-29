const { Schema, model } = require("mongoose");

const assignmentModel = new Schema({
 assignment_id: {
  type: String,
  required: true,
 },
 video_id: {
  type: String,
  required: true,
 },
 assignment_title: {
  type: String,
  required: true,
 },
 video_title: {
  type: String,
  required: true,
 },
 total_mark: {
  type: Number,
  required: true,
 },
});
const assignment = model("learning__portal_assignment", assignmentModel);
module.exports = assignment;
